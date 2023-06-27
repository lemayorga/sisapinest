import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecurityRole } from '@prisma/client';
import { CreateUserToRolDto, RoleDto } from '../dto';
import { RolesService } from '../services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@Controller('security/role')
export class RoleController {
  constructor(private readonly roleService: RolesService) {}
  
    @Get()
    async get(): Promise<SecurityRole[]> {
      return this.roleService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<SecurityRole> {
      return this.roleService.findOne(Number(id));
    }

    @Post()
    async create(@Body() postData: RoleDto): Promise<SecurityRole> {
      return this.roleService.create(postData);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<SecurityRole> {
      return this.roleService.remove(Number(id));
    }

    @Post('addUserToRole')
    async addUserToRole(@Body() data: CreateUserToRolDto) {
      return this.roleService.addUserToRole(data);
    }  
    
    @Get('rolOfUserId/:userId')
    async findRolesFromUser(@Param('userId') userId: string){
      return this.roleService.findRolOfUserId(userId);
    }

    @Get('usersInRoleCode/:codeRole')
    async findUsersInRoleByCode(@Param('codeRole') codeRole: string){
      return this.roleService.findUsersInRoleByCode(codeRole);
    }
}
