import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { PrismaService } from './prisma/prisma.service';
import { AppModule } from './app.module';




const PORT:number =  Number(process.env.PORT || 0);
const DataBaseName:string = process.env.DATABASE_URL || "";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  var myEnv = dotenv.config()
  dotenvExpand.expand(myEnv)

  app.setGlobalPrefix('api');

  app.useGlobalPipes( 
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
   )
   
   const config = new DocumentBuilder()
   .setTitle('Nest Workshop')
   .setDescription('Nest Workshop')
   .setVersion('1.0')
   .setContact('UEBERBIT GmbH', 'https://www.ueberbit.de/', 'contact [at] ueberbit.de')
   .addBearerAuth() // optional if any route has bearer authentication
   .build();
 
   const options: SwaggerDocumentOptions = {  deepScanRoutes: true  };
   const document = SwaggerModule.createDocument(app,config , options);
   SwaggerModule.setup('api', app, document);


 
  await app.listen(PORT, () => {
    console.log(`********************* DATABASE_URL: ${DataBaseName} Port: ${PORT} *********************`);
    console.log(`Application is listening on port ${PORT} ,http://localhost:${PORT}/api/v1. `);

  }).catch((error) => { console.log(error); });


  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
}
bootstrap();


