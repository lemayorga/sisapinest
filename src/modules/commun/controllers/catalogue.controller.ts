import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../../commun/dto';
import { CommunCatalogueCreateDto, CommunCatalogueDto, CommunCatalogueUpdateDto } from '../dto';
import { CatalogueService } from '../services';

@ApiTags('Catalogue')
@Controller('commun/catalogue')
export class CatalogueController {
  constructor(private readonly service: CatalogueService) {}


  @Get()
  async get(): Promise<CommunCatalogueDto[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<CommunCatalogueDto> {
    return this.service.getOne(id);
  }

  @Post()
  async insert(@Body() data: CommunCatalogueCreateDto): Promise<ResponseDto> {
    return this.service.insert(data);
  }

  @Put(':id')
  async modify(@Param('id',ParseIntPipe) id: number, @Body() data: CommunCatalogueUpdateDto): Promise<ResponseDto> {
    return this.service.modify(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    return this.service.remove(id);
  }
}
