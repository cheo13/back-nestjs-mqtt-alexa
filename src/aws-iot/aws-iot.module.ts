import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsIoTController } from './aws-iot.controller';
import { AwsIotService } from './aws-iot.service';
import * as Joi from 'joi';
import { OrderModule } from '../order/order.module';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_IOT_ENDPOINT: Joi.string().required(),
        AWS_IOT_KEY_PATH: Joi.string().required(),
        AWS_IOT_CERT_PATH: Joi.string().required(),
        AWS_IOT_CA_PATH: Joi.string().required(),
        AWS_IOT_CLIENT_ID: Joi.string().required(),
      }),
    }),
    OrderModule,
    MqttModule,
  ],
  providers: [
    AwsIotService,
    {
      provide: 'AWS_IOT_CONFIG',
      useValue: {
        endpoint: process.env.AWS_IOT_ENDPOINT,
        keyPath: process.env.AWS_IOT_KEY_PATH,
        certPath: process.env.AWS_IOT_CERT_PATH,
        caPath: process.env.AWS_IOT_CA_PATH,
        clientId: process.env.AWS_IOT_CLIENT_ID,
      },
    },
  ],
  exports: [AwsIotService],
  controllers: [AwsIoTController],
})
export class AwsIotModule {}
