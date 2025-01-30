import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PortionServedService } from './portion-served.service';
import { CreatePortionServedDto } from './dto/create-portion-served.dto';
import { PortionServed } from '@prisma/client';
import { UpdatePortionServedDto } from './dto/update-portion-served.dto';

@Controller('portion-served')
export class PortionServedController {
  constructor(private readonly portionServedService: PortionServedService) {}

  @Post()
  async createPortionServed(
    @Body() createPortionServedDto: CreatePortionServedDto,
  ): Promise<PortionServed> {
    return this.portionServedService.create(createPortionServedDto);
  }

  @Get()
  async getAllPortionsServed(): Promise<PortionServed[]> {
    return this.portionServedService.findAll();
  }

  @Get(':id')
  async getPortionServedById(@Param('id') id: string): Promise<PortionServed> {
    return this.portionServedService.findById(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePortionServedDto: UpdatePortionServedDto,
  ) {
    return this.portionServedService.update(+id, updatePortionServedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portionServedService.remove(+id);
  }
}
