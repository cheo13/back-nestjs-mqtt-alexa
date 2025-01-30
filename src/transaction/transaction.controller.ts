import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from '@prisma/client';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.findById(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(Number(id), updateTransactionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }

  @Get('date/:date')
  async getTransactionsByDate(
    @Param('date') date: string,
  ): Promise<{ transactions: Transaction[]; totalAmount: number }> {
    return this.transactionService.findByDate(date);
  }
}
