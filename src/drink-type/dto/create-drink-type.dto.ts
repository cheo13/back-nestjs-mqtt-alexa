import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDrinkTypeDto {
  @ApiProperty({
    description: 'Name of the drink type',
    example: 'Ron',
  })
  @IsString()
  name: string;
}
