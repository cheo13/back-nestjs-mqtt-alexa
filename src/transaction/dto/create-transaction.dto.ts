import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'ID de la orden asociada a la transacción',
    example: 1,
  })
  @IsNotEmpty({ message: 'El campo orderId es obligatorio' })
  orderId: number;

  @ApiProperty({
    description: 'ID de la bebida asociada a la transacción',
    example: 2,
  })
  @IsNotEmpty({ message: 'El campo drinkId es obligatorio' })
  drinkId: number;

  @ApiProperty({
    description: 'Monto de la transacción',
    example: 10.5,
  })
  @IsDecimal(
    { decimal_digits: '1,2' },
    { message: 'El campo amount debe ser un número decimal válido' },
  )
  amount: number;

  @ApiProperty({
    description: 'Estado actual de la transacción',
    example: 'Pendiente',
    default: 'Pendiente',
  })
  @IsString({ message: 'El campo statusTrans debe ser un string válido' })
  @IsOptional() // Es opcional ya que tiene un valor por defecto en la base de datos
  statusTrans?: string;

  @ApiProperty({
    description: 'Fecha de creación de la transacción',
    example: '2024-11-17T10:00:00.000Z',
  })
  @IsOptional() // Normalmente se gestiona automáticamente en la base de datos
  createdAt?: Date;
}
