import { Module } from '@nestjs/common';
import { DrinkTypeController } from './drink-type.controller';
import { DrinkTypeService } from './drink-type.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DrinkTypeController],
  providers: [DrinkTypeService],
  exports: [DrinkTypeService],
})
export class DrinkTypeModule {}
