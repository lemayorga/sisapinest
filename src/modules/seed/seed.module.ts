import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SecurityModule } from '../security/security.module';
import { CommunModule } from '../commun/commun.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PrismaModule,
    SecurityModule,
    CommunModule,
    AuthModule
  ]
})
export class SeedModule {}
