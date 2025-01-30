import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DrinkTypeService } from './drink-type.service';
import { CreateDrinkTypeDto } from './dto/create-drink-type.dto';
import { DrinkType } from '@prisma/client';
import { UpdateDrinkTypeDto } from './dto/update-drink-type.dto';

@Controller('drink-type')
export class DrinkTypeController {
  constructor(private readonly drinkTypeService: DrinkTypeService) {}

  @Post()
  async createDrinkType(
    @Body() createDrinkTypeDto: CreateDrinkTypeDto,
  ): Promise<DrinkType> {
    return this.drinkTypeService.create(createDrinkTypeDto);
  }

  @Get()
  async getAllDrinkTypes(): Promise<DrinkType[]> {
    return this.drinkTypeService.findAll();
  }

  @Get(':id')
  async getDrinkTypeById(@Param('id') id: string): Promise<DrinkType> {
    return this.drinkTypeService.findById(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDrinkTypeDto: UpdateDrinkTypeDto,
  ) {
    return this.drinkTypeService.update(+id, updateDrinkTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drinkTypeService.remove(+id);
  }
}
