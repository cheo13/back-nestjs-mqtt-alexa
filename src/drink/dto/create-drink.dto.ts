import { IsNotEmpty, IsOptional, IsString, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDrinkDto {
  @ApiProperty({
    description: 'Nombre de la bebida',
    example: 'Mojito',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la bebida es obligatorio' })
  name: string;

  @ApiProperty({
    description: 'Price of the drink',
    example: 5.5,
  })
  @IsDecimal()
  price: number;

  @ApiProperty({
    description: 'URL de la imagen de la bebida',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'ID del tipo de bebida',
    example: 1,
  })
  @IsNotEmpty({ message: 'El ID del tipo de bebida es obligatorio' })
  drinkTypeId: number;
}
