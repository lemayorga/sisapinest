import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ModuleService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../../commun/dto';
import { SecurityModuleCreateDto, SecurityModuleDto, SecurityModuleUpdateDto } from '../dto';
@ApiTags('Module')
@Controller('security/module')
export class ModuleController {
  constructor(private readonly service: ModuleService) {}

  @Get()
  async get(): Promise<SecurityModuleDto[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<SecurityModuleDto> {
    return this.service.getOne(id);
  }

  @Post()
  async insert(@Body() data: SecurityModuleCreateDto): Promise<ResponseDto> {
    return this.service.insert(data);
  }

  @Put(':id')
  async modify(@Param('id',ParseIntPipe) id: number, @Body() data: SecurityModuleUpdateDto): Promise<ResponseDto> {
    return this.service.modify(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    return this.service.remove(id);
  }
}
