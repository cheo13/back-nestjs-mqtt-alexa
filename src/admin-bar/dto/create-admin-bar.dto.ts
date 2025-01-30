import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminBarDto {
  @ApiProperty({
    description: 'ID único del administrador (correo o identificador)',
    example: 'admin123',
  })
  @IsString()
  @IsNotEmpty()
  adminId: string;

  @ApiProperty({
    description: 'Contraseña del administrador',
    example: 'StrongPassw0rd!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @ApiProperty({
    description:
      'Fecha de creación (opcional, se genera automáticamente si no se proporciona)',
    example: '2024-11-17T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  createAt?: Date;
}
