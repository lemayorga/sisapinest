import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecurityUser } from '@prisma/client';
import { CreateUserDto } from '../dto';
import { UserService } from '../services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('security/user')
export class UserController {

  constructor(private readonly service: UserService) {}
  
  @Get()
  async get(): Promise<SecurityUser[]> {
    return this.service.findAll();
  }
  
  @Post()
  async create(@Body() userCreate: CreateUserDto): Promise<SecurityUser> {
    return this.service.create(userCreate);
  }
}
