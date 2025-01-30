import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminBarDto } from './dto/create-admin-bar.dto';
import { AdminBar } from '@prisma/client';
import { UpdateAdminBarDto } from './dto/update-admin-bar.dto';

@Injectable()
export class AdminBarService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminBarDto: CreateAdminBarDto): Promise<AdminBar> {
    return this.prisma.adminBar.create({
      data: createAdminBarDto,
    });
  }

  async findAll(): Promise<AdminBar[]> {
    return this.prisma.adminBar.findMany();
  }

  async findById(id: number): Promise<AdminBar> {
    return this.prisma.adminBar.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateAdminBarDto: UpdateAdminBarDto) {
    return this.prisma.adminBar.update({
      where: { id: id },
      data: updateAdminBarDto,
    });
  }

  async remove(id: number) {
    return this.prisma.adminBar.delete({ where: { id: id } });
  }
}
