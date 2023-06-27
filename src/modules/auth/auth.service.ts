import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common/exceptions';
import { PrismaService } from '../../prisma/prisma.service';
import { ResponseDto } from '../../commun/dto';
import { LoginUserDto, UserDataRequest } from './dto';
import { JwtPayload } from './interfaces/jwt-payload-interface';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../security/services';

@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly roleService: RolesService
    ){}

    async login(loginUser: LoginUserDto) {
        try{
            const { username: userLogin, password } = loginUser;

            const user = await this.prisma.securityUser.findFirst({
                where: {
                    OR:[
                        { username:  userLogin },
                        { email:  userLogin },
                    ]
                  },
                select: { email: true, password: true, id: true }   
            });

            if(!user)
                 throw new UnauthorizedException('Credentials are not valid (user).');
            
            // if(!user.isActive)
            //      throw new UnauthorizedException('User is inactive.');

            if(!bcrypt.compareSync(password, user.password))
                throw new UnauthorizedException('Credentials are not valid (password).');

          
          // var response = new ResponseDto('Login successful',false);
            
            const rolUser = await this.roleService.findRolOfUserId(user.id);
            
            return {
                ...user,
                token: this.getJwtToken({
                     id: user.id, 
                     username: loginUser.username,
                     email: user.email, 
                     roleCode: rolUser!.codeRole
                })
            }
            
        }catch(error){
            this.handleDBErrors(error);
        }
    }

    private getJwtToken(payload: JwtPayload){
        const token  = this.jwtService.sign(payload);
        return token;
    }

    async  checkAuthStatus(userReq: UserDataRequest) {
        const user = await this.prisma.securityUser.findFirst({
            where:{ 
                id: userReq.userId
              },
            select: { email: true, password: true, id: true }   
        });
        return {
            ... user,
            token: this.getJwtToken({
                 id: userReq.userId, 
                 username: userReq.username,
                 email: userReq.email, 
                 roleCode: userReq.codeRole
            })
        }
    }
  

    private handleDBErrors (error: any): never{
        if(error.code === '23505')
        throw new BadRequestException(error.detail);

        console.log(error);

        throw new InternalServerErrorException('Please check server logs');
    }

}


