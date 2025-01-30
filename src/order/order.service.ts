import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { drinkId, origin } = createOrderDto;
    const orderOrigin = origin || 'appweb';

    // Verificar si la bebida existe
    const drink = await this.prisma.drink.findUnique({
      where: { id: drinkId },
      include: { ingredients: true },
    });

    if (!drink) {
      throw new Error('La bebida especificada no existe');
    }

    // Crear la orden con el estado inicial "En proceso"
    const order = await this.prisma.order.create({
      data: {
        drinkId,
        origin: orderOrigin,
        statusOrder: 'En proceso',
      },
    });

    // Crear las porciones servidas para cada ingrediente
    for (const ingredient of drink.ingredients) {
      await this.prisma.portionServed.create({
        data: {
          drinkId: drink.id,
          orderId: order.id,
          ingredient: ingredient.ingredient,
          amountOz: ingredient.amountOz,
        },
      });
    }

    // Actualizar la orden al estado "Completada"
    const completedOrder = await this.prisma.order.update({
      where: { id: order.id },
      data: {
        statusOrder: 'Completada',
      },
    });

    // Crear una transacción para la orden
    await this.prisma.transaction.create({
      data: {
        orderId: completedOrder.id,
        drinkId: completedOrder.drinkId,
        amount: drink.price,
        statusTrans: 'Pendiente',
      },
    });

    return completedOrder;
  }
  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async findById(id: number): Promise<Order> {
    return this.prisma.order.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id: id },
      data: updateOrderDto,
    });
  }

  async remove(id: number) {
    return this.prisma.order.delete({ where: { id: id } });
  }
}
