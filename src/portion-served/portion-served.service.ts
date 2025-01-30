import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePortionServedDto } from './dto/create-portion-served.dto';
import { PortionServed } from '@prisma/client';
import { UpdatePortionServedDto } from './dto/update-portion-served.dto';

@Injectable()
export class PortionServedService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPortionServedDto: CreatePortionServedDto,
  ): Promise<PortionServed> {
    return this.prisma.portionServed.create({
      data: createPortionServedDto,
    });
  }

  async findAll(): Promise<PortionServed[]> {
    return this.prisma.portionServed.findMany();
  }

  async findById(id: number): Promise<PortionServed> {
    return this.prisma.portionServed.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updatePortionServedDto: UpdatePortionServedDto) {
    return this.prisma.portionServed.update({
      where: { id: id },
      data: updatePortionServedDto,
    });
  }

  async remove(id: number) {
    return this.prisma.portionServed.delete({ where: { id: id } });
  }
}
