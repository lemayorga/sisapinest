import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { AccessService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../../commun/dto';
import { SecurityAccessCreateDto, SecurityAccessDto, SecurityAccessUpdateDto } from '../dto';
@ApiTags('Access')
@Controller('security/acess')
export class AccessController {
  constructor(private readonly service: AccessService) {}


  @Get()
  async get(): Promise<SecurityAccessDto[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<SecurityAccessDto> {
    return this.service.getOne(id);
  }

  @Post()
  async insert(@Body() data: SecurityAccessCreateDto): Promise<ResponseDto> {
    return this.service.insert(data);
  }

  @Put(':id')
  async modify(@Param('id',ParseIntPipe) id: number, @Body() data: SecurityAccessUpdateDto): Promise<ResponseDto> {
    return this.service.modify(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    return this.service.remove(id);
  }
}
