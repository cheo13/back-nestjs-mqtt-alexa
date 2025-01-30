import { PartialType } from '@nestjs/mapped-types';
import { CreateDrinkIngredientDto } from './create-drink-ingredient.dto';

export class UpdateDrinkIngredientDto extends PartialType(
  CreateDrinkIngredientDto,
) {}
