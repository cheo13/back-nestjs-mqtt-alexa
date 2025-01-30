import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { MqttModule } from './mqtt/mqtt.module';
import { DrinkTypeModule } from './drink-type/drink-type.module';
import { DrinkIngredientModule } from './drink-ingredient/drink-ingredient.module';
import { PortionServedController } from './portion-served/portion-served.controller';
import { PortionServedModule } from './portion-served/portion-served.module';
import { AdminBarModule } from './admin-bar/admin-bar.module';
import { DrinkModule } from './drink/drink.module';
import { TransactionModule } from './transaction/transaction.module';
import { AwsIotModule } from './aws-iot/aws-iot.module';

@Module({
  imports: [
    PrismaModule,
    OrderModule,
    MqttModule,
    DrinkTypeModule,
    DrinkIngredientModule,
    PortionServedModule,
    AdminBarModule,
    DrinkModule,
    TransactionModule,
    AwsIotModule,
  ],
  controllers: [AppController, PortionServedController],
  providers: [AppService],
})
export class AppModule {}
