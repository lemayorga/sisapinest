import { Injectable } from '@nestjs/common';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {

    constructor(private readonly  prisma: PrismaService){}

    async create(userCreate: CreateUserDto) {
        try{

            const { userpass, ...userData } = userCreate;

            const user = await this.prisma.securityUser.create({ data: {
                ...userData,
                password: bcrypt.hashSync(userpass, 10)
            }} );

            delete user.password;
            return user;
            
        }catch(error){
            this.handleDBErrors(error);
        }
    }

    findAll() {
        return this.prisma.securityUser.findMany();
    }
     
    async findByUserName(username: string) {
        try{

            const user = await this.prisma.securityUser.findFirst({
                where:   { username:  username }
            });

            return user;
            
        }catch(error){
            this.handleDBErrors(error);
        }
    }

    async findById(userId: string) {
        const user = await this.prisma.securityUser.findUnique({
            where:   { id:  userId }
        });

        return user;
    }




    private handleDBErrors (error: any): never{
        if(error.code === '23505')
        throw new BadRequestException(error.detail);

        console.log(error);

        throw new InternalServerErrorException('Please check server logs');
    }

}



