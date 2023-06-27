import { HttpException } from "@nestjs/common";

export class CustomFuelStationException extends HttpException {
    constructor(message: string, statusCode: number) { 
        super(message, statusCode); 
    } 
}
