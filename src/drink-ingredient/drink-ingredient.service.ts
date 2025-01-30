import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDrinkIngredientDto } from './dto/create-drink-ingredient.dto';
import { DrinkIngredient } from '@prisma/client';
import { UpdateDrinkIngredientDto } from './dto/update-drink-ingredient.dto';

@Injectable()
export class DrinkIngredientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDrinkIngredientDto: CreateDrinkIngredientDto,
  ): Promise<DrinkIngredient> {
    return this.prisma.drinkIngredient.create({
      data: createDrinkIngredientDto,
    });
  }

  async findAll(): Promise<DrinkIngredient[]> {
    return this.prisma.drinkIngredient.findMany();
  }

  async findById(id: number): Promise<DrinkIngredient> {
    return this.prisma.drinkIngredient.findUnique({
      where: { id: id },
    });
  }

  async findByDrinkId(drinkId: number): Promise<DrinkIngredient[]> {
    return this.prisma.drinkIngredient.findMany({
      where: { drinkId: drinkId },
    });
  }

  async update(id: number, updateDrinkIngredientDto: UpdateDrinkIngredientDto) {
    return this.prisma.drinkIngredient.update({
      where: { id: id },
      data: updateDrinkIngredientDto,
    });
  }

  async remove(id: number) {
    return this.prisma.drinkIngredient.delete({ where: { id: id } });
  }
}
