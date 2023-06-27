import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilterImage, fileNameImage } from './helpers';
import { ConfigService } from '@nestjs/config';
import { EnvCofigName } from 'src/config/env.config';

@ApiTags('ManagerFiles')
@Controller('managerFiles')
export class FilesController {

  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile()file: Express.Multer.File){
    return file;
  }

  @Get('findByName/:imageName')
  findImagenByName(
    @Res()  res: Response,
    @Param('imageName') imageName: string){
    const path = this.filesService.findStaticImagenByName(imageName);

    // res.status(403).json({
    //   ok : false,
    //   path: path
    // })

    //res.sendFile(path);
    res.sendFile(path);
  }

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file', { 
      fileFilter: fileFilterImage,
      storage: diskStorage({
        destination: './static/images',
        filename: fileNameImage
      })
  }))
  uploadFileImagen(@UploadedFile()file: Express.Multer.File){

    if(!file){
      throw new BadRequestException('Make sure that the file is an imagen.');
    }

    const secureUrl = `${this.configService.get(EnvCofigName.hostAPI)}/managerFiles/findByName/${file.filename}`;
    return { secureUrl };
  }
}
