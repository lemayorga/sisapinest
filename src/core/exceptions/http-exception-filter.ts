import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express'; 
	 
@Catch(HttpException) 
export class HttpExceptionFilter implements ExceptionFilter { 

    catch(exception: HttpException, host: ArgumentsHost) { 

    const ctx = host.switchToHttp(); 
    const response = ctx.getResponse<Response>(); 
    const request = ctx.getRequest<Request>(); 
    const status = exception.getStatus(); 

    response 
        .status(status) 
        .json({ 
        statusCode: status, 
        timestamp: new Date().toISOString(), 
        path: request.url, 
        }); 
    } 
}  


//https://www.linkedin.com/pulse/nestjs-exception-filters-part-02-udara-abeythilake?trk=pulse-article_more-articles_related-content-card