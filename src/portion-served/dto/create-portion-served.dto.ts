import { Ingredients, OnzaLevel } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePortionServedDto {
  @ApiProperty({
    description: 'Id de la bebida',
    example: 1,
  })
  @IsNotEmpty()
  drinkId: number;

  @ApiProperty({
    description: 'Id de la orden',
    example: 10,
  })
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    description: 'Ingrediente utilizado en la bebida',
    enum: Ingredients,
    example: Ingredients.Ron,
  })
  @IsEnum(Ingredients)
  @IsNotEmpty()
  ingredient: Ingredients;

  @ApiProperty({
    description: 'Cantidad de ingrediente en onzas',
    enum: OnzaLevel,
    example: OnzaLevel.OneOz,
  })
  @IsEnum(OnzaLevel)
  @IsNotEmpty()
  amountOz: OnzaLevel;

  @ApiProperty({
    description:
      'Fecha de creación (opcional, se asigna automáticamente si no se proporciona)',
    example: new Date(),
  })
  @IsOptional()
  createdAt?: Date;
}
