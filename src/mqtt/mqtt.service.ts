import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderService } from '../order/order.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);

  constructor(
    @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
    private readonly orderService: OrderService,
  ) {}

  async publish(topic: string, message: string) {
    try {
      await firstValueFrom(this.client.emit(topic, message));
    } catch (error) {
      this.logger.error(`Failed to publish message: ${error.message}`);
    }
  }

  async sendCommands(drinkId: number) {
    if (!drinkId) {
      throw new Error('El drinkId is required');
    }
    const message = `${drinkId}`;
    const topic = 'barbox/command';

    this.logger.log(`Publishing to topic ${topic}: ${message}`);
    await this.publish(topic, message);
    await this.delay(500);
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
