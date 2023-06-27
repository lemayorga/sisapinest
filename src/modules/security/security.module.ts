import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvCofigName } from '../../config/env.config';
import { PrismaModule } from "../../prisma/prisma.module";
import { AccessController } from './controllers/access.controller';
import { RoleController } from './controllers/roles.controller';
import { UserController } from './controllers/user.controller';

import { 
   RolesService, 
   ModuleService, 
   AccessService, 
   UserService
} from './services';
import { ModuleController } from './controllers/module.controller';

@Module({
  controllers: [
    RoleController,
    UserController,
    AccessController,
    ModuleController,
  ],
  imports:[
   PrismaModule,
   ConfigModule,
   PassportModule.register({ defaultStrategy:  'jwt' }),
   JwtModule.registerAsync({
      imports:[
        ConfigModule
      ],
      inject:[
        ConfigService
      ],
      useFactory: (configService: ConfigService) => {
          return {
            secret: configService.get(EnvCofigName.jwtSecret),
            signOptions: {
              expiresIn:configService.get(EnvCofigName.jwtRefresh)
          } 
        }
      }
   })
  ],
  providers: [
     RolesService,
     ModuleService,
     AccessService,
     UserService
  ],
  exports:[
    RolesService,
    ModuleService,
    AccessService,
    UserService
  ]
})
export class SecurityModule {}
