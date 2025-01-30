import { Module } from '@nestjs/common';
import { PortionServedService } from './portion-served.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PortionServedController } from './portion-served.controller';

@Module({
  imports: [PrismaModule],
  providers: [PortionServedService],
  controllers: [PortionServedController],
  exports: [PortionServedService],
})
export class PortionServedModule {}
