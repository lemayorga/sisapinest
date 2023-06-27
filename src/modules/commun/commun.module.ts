import { Module } from '@nestjs/common';
import { PrismaModule } from "../../prisma/prisma.module";
import { CompanyController } from './controllers/company.controller';
import { CatalogueController } from './controllers/catalogue.controller';
import { PersonController } from './controllers/person.controller';
import {
   CompanyService, 
   CatalogueService, 
   PersonService 
  } from './services';

@Module({
  controllers: [
    CompanyController,
    PersonController,
    CatalogueController
  ],
  imports:[
    PrismaModule
  ],
  providers: [
     CompanyService,
     PersonService,
     CatalogueService
  ]
})
export class CommunModule {}
