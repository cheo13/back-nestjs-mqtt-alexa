import { Module } from '@nestjs/common';
import { AdminBarService } from './admin-bar.service';
import { AdminBarController } from './admin-bar.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AdminBarService],
  controllers: [AdminBarController],
  exports: [AdminBarService],
})
export class AdminBarModule {}
