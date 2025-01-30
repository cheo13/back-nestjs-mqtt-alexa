import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDrinkTypeDto } from './dto/create-drink-type.dto';
import { DrinkType } from '@prisma/client';
import { UpdateDrinkTypeDto } from './dto/update-drink-type.dto';

@Injectable()
export class DrinkTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDrinkTypeDto: CreateDrinkTypeDto): Promise<DrinkType> {
    return this.prisma.drinkType.create({
      data: createDrinkTypeDto,
    });
  }

  async findAll(): Promise<DrinkType[]> {
    return this.prisma.drinkType.findMany();
  }

  async findById(id: number): Promise<DrinkType> {
    return this.prisma.drinkType.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateDrinkTypeDto: UpdateDrinkTypeDto) {
    return this.prisma.drinkType.update({
      where: { id: id },
      data: updateDrinkTypeDto,
    });
  }

  async remove(id: number) {
    return this.prisma.drinkType.delete({ where: { id: id } });
  }
}
