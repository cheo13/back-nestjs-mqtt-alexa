import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DrinkService } from './drink.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { Drink } from '@prisma/client';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@Controller('drink')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Post()
  async createDrink(@Body() createDrinkDto: CreateDrinkDto): Promise<Drink> {
    return this.drinkService.create(createDrinkDto);
  }

  @Get()
  async getAllDrinks(): Promise<Drink[]> {
    return this.drinkService.findAll();
  }

  @Get(':id')
  async getDrinkById(@Param('id') id: string): Promise<Drink> {
    return this.drinkService.findById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrinkDto: UpdateDrinkDto) {
    return this.drinkService.update(+id, updateDrinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drinkService.remove(+id);
  }
}
