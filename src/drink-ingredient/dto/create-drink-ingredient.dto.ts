import { Ingredients, OnzaLevel } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDrinkIngredientDto {
  @ApiProperty({
    description: 'Id de la bebida',
  })
  @IsNotEmpty()
  drinkId: number;
  @ApiProperty({
    description: 'Ingrediente utilizado en la bebida',
    enum: Ingredients,
  })
  @IsEnum(Ingredients)
  @IsNotEmpty()
  ingredient: Ingredients;

  @ApiProperty({
    description: 'Cantidad de ingrediente en onzas',
    enum: OnzaLevel,
  })
  @IsEnum(OnzaLevel)
  @IsNotEmpty()
  amountOz: OnzaLevel;
}
