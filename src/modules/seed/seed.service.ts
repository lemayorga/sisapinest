import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RolesService, UserService } from '../security/services';
import { initialDataSeed } from './seed-data';
import { RoleDto } from '../security/dto';

@Injectable()
export class SeedService {

    constructor(
        private  prisma: PrismaService,
        private readonly roleService: RolesService,
        private readonly userService: UserService
    ){}
    
    async runSeed() {
        const rolesInserted = await this.insertRoles();

        return {
            message: 'SEED EXECUTED',
            rolesInserted
        };
    }


    private async insertRoles() : Promise<RoleDto[]>{

        let { roles: rolesInsert } = initialDataSeed;

        const rolesCodeSeed = rolesInsert.map(x => x.codeRole);
        const rolesExistents = await this.roleService.findByCodes(rolesCodeSeed);

        rolesInsert  = rolesInsert.filter(r =>  !rolesExistents.map(x => x.codeRole).includes(r.codeRole));
        
        if(!rolesInsert || rolesInsert.length === 0) return [];

        return await this.prisma.$transaction(
            rolesInsert.map((rolNew) =>  this.prisma.securityRole.create({ data: rolNew })),
         );
    }
}
