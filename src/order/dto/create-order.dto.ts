import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID de la bebida asociada a la orden',
    example: 1,
  })
  @IsNotEmpty({ message: 'El campo drinkId es obligatorio' })
  drinkId: number;

  @ApiProperty({
    description: 'Origen del pedido (ejemplo: app, bar, sitio web)',
    example: 'app',
  })
  origin: string;

  @ApiProperty({
    description: 'Estado actual de la orden',
    example: 'En proceso',
    default: 'En proceso',
  })
  @IsOptional()
  statusOrder?: string;
}
