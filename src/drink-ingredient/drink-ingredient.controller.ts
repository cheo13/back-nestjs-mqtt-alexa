import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DrinkIngredientService } from './drink-ingredient.service';
import { CreateDrinkIngredientDto } from './dto/create-drink-ingredient.dto';
import { DrinkIngredient } from '@prisma/client';
import { UpdateDrinkIngredientDto } from './dto/update-drink-ingredient.dto';

@Controller('drink-ingredient')
export class DrinkIngredientController {
  constructor(
    private readonly drinkIngredientService: DrinkIngredientService,
  ) {}

  @Post()
  async createDrinkIngredient(
    @Body() createDrinkIngredientDto: CreateDrinkIngredientDto,
  ): Promise<DrinkIngredient> {
    return this.drinkIngredientService.create(createDrinkIngredientDto);
  }

  @Get()
  async getAllDrinkIngredients(): Promise<DrinkIngredient[]> {
    return this.drinkIngredientService.findAll();
  }

  @Get(':id')
  async getDrinkIngredientById(
    @Param('id') id: string,
  ): Promise<DrinkIngredient> {
    return this.drinkIngredientService.findById(Number(id));
  }
  @Get(':drinkId/drink')
  async getDrinkIngredientsByDrinkId(
    @Param('drinkId') drinkId: string,
  ): Promise<DrinkIngredient[]> {
    return this.drinkIngredientService.findByDrinkId(Number(drinkId));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDrinkIngredientDto: UpdateDrinkIngredientDto,
  ) {
    return this.drinkIngredientService.update(+id, updateDrinkIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drinkIngredientService.remove(+id);
  }
}
