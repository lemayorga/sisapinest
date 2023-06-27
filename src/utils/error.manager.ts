import { BadRequestException, HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { ResponseDto } from "../commun/dto";

export class ErrorManager extends Error {

    constructor({ type, message }: { type: keyof typeof HttpStatus, message: string}){
        super(`${type} :: ${message}`);
    }

    public static createSignatureError(error: any){
        const codesErrorPrisma: string[] = ['P2002','P2025'];

        if(error.code === '23505'){
            throw new BadRequestException(error.detail);
        }
    
        if(codesErrorPrisma.includes( error.code)){
            throw new BadRequestException(error.message);
        }

        let name: string;
        if (typeof error === 'string' &&  error.includes("::")){
            name = error.split(" :: ")[0];
        } else if(error.message){
            name =  error.message.split(" :: ")[0];
        }

        if(name){
            throw new HttpException(name, HttpStatus[name]);
        }
           
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public static handleDBErrors (error: any){
        let result: ResponseDto = new ResponseDto('Please check server logs',true);
        const codesErrorPrisma: string[] = ['P2002','P2025'];
    
        console.log(error);
    
        if(error.code === '23505'){
            result.mensaje = error.detail;
            throw new BadRequestException(error.detail);
        }
    
        if(codesErrorPrisma.includes( error.code)){
            result.mensaje = error.message;
            throw new BadRequestException(result.mensaje);
        }
    
    
        if (typeof error === 'string'){
            result.mensaje = error;
           return result;
        }
    
        throw new InternalServerErrorException('Please check server logs');
    }
    
}