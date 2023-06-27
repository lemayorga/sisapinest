import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchemaEnvConfig } from './config/join.validation';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunModule } from './commun/commun.module';
import { SecurityModule } from './modules/security/security.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedModule } from './modules/seed/seed.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[ EnvConfiguration],
      validationSchema:  JoiValidationSchemaEnvConfig
    }), 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public')
    }),
    CommunModule,
    SecurityModule,
    PrismaModule,
    AuthModule,
    SeedModule,
    FilesModule,
 ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
