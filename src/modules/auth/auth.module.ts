import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from "../../prisma/prisma.module";
import { SecurityModule } from '../security/security.module';
import { EnvCofigName } from "../../config/env.config";
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    PrismaModule,
    ConfigModule,
    SecurityModule,
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
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}
