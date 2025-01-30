import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from '@prisma/client';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.prisma.transaction.create({
      data: createTransactionDto,
    });
  }

  async findAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  async findById(id: number): Promise<Transaction> {
    return this.prisma.transaction.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id: id },
      data: updateTransactionDto,
    });
  }

  async remove(id: number) {
    return this.prisma.transaction.delete({ where: { id: id } });
  }

  async findByDate(
    date: string,
  ): Promise<{ transactions: Transaction[]; totalAmount: number }> {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const transactions = await this.prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const totalAmount = transactions
      .filter((transaction) => transaction.statusTrans === 'Completado')
      .reduce(
        (sum, transaction) => sum + (transaction.amount as Decimal).toNumber(),
        0,
      );

    return { transactions, totalAmount };
  }
}
