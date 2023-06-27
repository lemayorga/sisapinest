
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../../commun/dto';
import { CommunCompanyCreateDto, CommunCompanyDto, CommunCompanyUpdateDto } from '../dto';
import { CompanyService } from '../services';
@ApiTags('Company')
@Controller('commun/company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}


  @Get()
  async get(): Promise<CommunCompanyDto[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<CommunCompanyDto> {
    return this.service.getOne(id);
  }

  @Post()
  async insert(@Body() data: CommunCompanyCreateDto): Promise<ResponseDto> {
    return this.service.insert(data);
  }

  @Put(':id')
  async modify(@Param('id',ParseIntPipe) id: number, @Body() data: CommunCompanyUpdateDto): Promise<ResponseDto> {
    return this.service.modify(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    return this.service.remove(id);
  }
}
