import { Module } from '@nestjs/common';
import { DrinkIngredientService } from './drink-ingredient.service';
import { DrinkIngredientController } from './drink-ingredient.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DrinkIngredientService],
  controllers: [DrinkIngredientController],
  exports: [DrinkIngredientService],
})
export class DrinkIngredientModule {}
