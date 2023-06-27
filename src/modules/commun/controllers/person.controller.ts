import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../../commun/dto';
import { CommunPersonCreateDto, CommunPersonDto, CommunPersonUpdateDto } from '../dto';
import { PersonService } from '../services';

@ApiTags('Person')
@Controller('commun/person')
export class PersonController {
  constructor(private readonly service: PersonService) {}


  @Get()
  async get(): Promise<CommunPersonDto[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<CommunPersonDto> {
    return this.service.getOne(id);
  }

  @Post()
  async insert(@Body() data: CommunPersonCreateDto): Promise<ResponseDto> {
    return this.service.insert(data);
  }

  @Put(':id')
  async modify(@Param('id',ParseIntPipe) id: number, @Body() data: CommunPersonUpdateDto): Promise<ResponseDto> {
    return this.service.modify(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    return this.service.remove(id);
  }
}
