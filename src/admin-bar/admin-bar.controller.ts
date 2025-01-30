import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminBarService } from './admin-bar.service';
import { CreateAdminBarDto } from './dto/create-admin-bar.dto';
import { AdminBar } from '@prisma/client';
import { UpdateAdminBarDto } from './dto/update-admin-bar.dto';

@Controller('admin-bar')
export class AdminBarController {
  constructor(private readonly adminBarService: AdminBarService) {}

  @Post()
  async createAdminBar(
    @Body() createAdminBarDto: CreateAdminBarDto,
  ): Promise<AdminBar> {
    return this.adminBarService.create(createAdminBarDto);
  }

  @Get()
  async getAllAdminBars(): Promise<AdminBar[]> {
    return this.adminBarService.findAll();
  }

  @Get(':id')
  async getAdminBarById(@Param('id') id: string): Promise<AdminBar> {
    return this.adminBarService.findById(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminBarDto: UpdateAdminBarDto,
  ) {
    return this.adminBarService.update(+id, updateAdminBarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminBarService.remove(+id);
  }
}
