import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';


@Injectable()
export class FilesService {

    findStaticImagenByName(imageName: string){
        const path =  join(__dirname,'../../../static/images', imageName);
        if(!existsSync(path)){
            throw new BadRequestException('No image found');
        }
        return path;
    }
}
