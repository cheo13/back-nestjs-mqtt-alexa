import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { Drink } from '@prisma/client';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Injectable()
export class DrinkService {
  constructor(private prisma: PrismaService) {}

  async create(createDrinkDto: CreateDrinkDto): Promise<Drink> {
    return this.prisma.drink.create({
      data: createDrinkDto,
    });
  }

  async findAll(): Promise<Drink[]> {
    return this.prisma.drink.findMany();
  }

  async findById(id: number): Promise<Drink> {
    return this.prisma.drink.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateDrinkDto: UpdateDrinkDto) {
    return this.prisma.drink.update({
      where: { id: id },
      data: updateDrinkDto,
    });
  }

  async remove(id: number) {
    return this.prisma.drink.delete({ where: { id: id } });
  }
}
