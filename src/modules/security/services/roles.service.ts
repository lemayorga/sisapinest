import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvCofigName } from 'src/config/env.config';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserToRolDto, RoleDto } from '../dto';
import { UserService } from './user.service';
import { RoleAndUserDto } from '../interfaces';

@Injectable()
export class RolesService {

 constructor(private  prisma: PrismaService,
            private readonly configService: ConfigService,
            private readonly userService: UserService
      ) {
        // console.log(`************OTOR*********`);
        // console.log(this.configService.get(EnvCofigName.enviroment));
      }
    
  async findAll() {
    
    return  await this.prisma.securityRole.findMany();
  }

  async findOne(id: number) {

    return await this.prisma.securityRole.findUnique({ where: { id } });
  }

  async findByCode(codeRole: string) {
    const role = await this.prisma.securityRole.findUnique({
                  where: {  codeRole: codeRole}
            });
    return role;
  }

  async findByCodes(codeRole: string[]): Promise<RoleDto[]> {

    if(!codeRole) return [];

    const role = await this.prisma.securityRole.findMany({
              where: {
                  codeRole: {  in: codeRole  }
                }
            });

    return role;
  }

  async create(dataCreate: RoleDto) {
    dataCreate =  {...dataCreate, codeRole:  dataCreate.codeRole.toUpperCase() };
    return  await this.prisma.securityRole.create({ data: dataCreate });
  }


  async update(id: number, dataUpdate: RoleDto) {
    dataUpdate =  {...dataUpdate, codeRole:  dataUpdate.codeRole.toUpperCase() };

    return await this.prisma.securityRole.update({
      where: { id },
      data: dataUpdate,
    });
  }

  remove(id: number) {
    return this.prisma.securityRole.delete({ where: { id } });
  }


  async addUserToRole(data: CreateUserToRolDto){
      const { userId, codeRole } = data;

      const rol = await this.findByCode(codeRole);

      const user = await this.userService.findById(userId);

      const result =  await this.prisma.securityUserOnRol.create({
            data: {
                rolId: rol.id,
                userId: userId,
                isActive: true
            }
        });

        return result;
  }

  async findUsersInRoleByCode(codeRole: string): Promise<RoleAndUserDto[]> {
      const data = await this.prisma.securityUserOnRol.findMany({ 
          where: {   role: { codeRole: codeRole  } },
          include:  { user: true , role: true }
      }).then((r) =>{
          return r.map(d => <RoleAndUserDto> {
            codeRole: d.role.codeRole,
            roleName:  d.role.name,
            userId: d.userId,
            userName: d.user.username,
            userEmail: d.user.email,
          });
      });

      return data;
  }

  
  async findRolOfUserId(userId: string): Promise<RoleAndUserDto> {
      const data: RoleAndUserDto  = await this.prisma.securityUserOnRol.findFirst({ 
          where: { userId: userId} ,
          include: { role: true, user: true },
      }).then(d => {
        const { role, user } = d;
        return {
          codeRole: role.codeRole,
          roleName: role.name,
          userId: d.userId,
          userName: user.username,
          userEmail: user.email
        };
    });
      return data;
  }
}
