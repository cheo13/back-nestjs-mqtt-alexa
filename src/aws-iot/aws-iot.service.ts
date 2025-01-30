import { Inject, Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { mqtt, iot, io } from 'aws-iot-device-sdk-v2';
import { TextDecoder } from 'util';
import { OrderService } from '../order/order.service';
import { MqttService } from '../mqtt/mqtt.service';

interface AwsIotConfig {
  endpoint: string;
  keyPath: string;
  certPath: string;
  caPath: string;
  clientId: string;
}

@Injectable()
export class AwsIotService implements OnModuleDestroy {
  private mqttClient: mqtt.MqttClientConnection;
  private connected = false;
  private readonly logger = new Logger(AwsIotService.name);

  constructor(
    @Inject('AWS_IOT_CONFIG') private readonly config: AwsIotConfig,
    private readonly orderService: OrderService,
    private readonly mqttService: MqttService,
  ) {
    this.connect();
  }

  // Establece conexión con AWS IoT Core
  async connect(): Promise<void> {
    const { endpoint, keyPath, certPath, caPath, clientId } = this.config;

    const clientBootstrap = new io.ClientBootstrap();
    const config =
      iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path(
        certPath,
        keyPath,
      )
        .with_certificate_authority_from_path(undefined, caPath)
        .with_client_id(clientId)
        .with_clean_session(false)
        .with_endpoint(endpoint)
        .build();

    const client = new mqtt.MqttClient(clientBootstrap);
    this.mqttClient = client.new_connection(config);

    try {
      await this.mqttClient.connect();
      this.connected = true;
      this.logger.log('Connected to AWS IoT Core');
      await this.subscribeToAlexaBarbox(); // Suscribirse al topic solo después de la conexión
    } catch (err) {
      this.logger.error('Error connecting to AWS IoT Core:', err);
    }
  }

  // Publica un mensaje en un tópico de IoT Core
  async publish(
    topic: string,
    message: any,
    qos: mqtt.QoS = mqtt.QoS.AtLeastOnce,
  ): Promise<void> {
    if (!this.connected) {
      throw new Error('MQTT client is not connected');
    }

    const payload = JSON.stringify(message);
    await this.mqttClient.publish(topic, payload, qos);
    this.logger.log(`Message published to topic "${topic}": ${payload}`);
  }

  // Suscripción específica para el topic alexa/barbox
  private async subscribeToAlexaBarbox() {
    try {
      if (!this.connected) {
        this.logger.warn('Not connected, attempting to reconnect...');
        await this.reconnect();
      }
      this.logger.log('Subscribing to alexa/barbox');
      await this.mqttClient.subscribe(
        'alexa/barbox',
        mqtt.QoS.AtLeastOnce,
        this.handleAlexaBarboxMessage.bind(this),
      );
      this.logger.log('Successfully subscribed to alexa/barbox');
    } catch (error) {
      this.logger.error('Error subscribing to topic "alexa/barbox":', error);
    }
  }

  // Maneja mensajes recibidos en el topic alexa/barbox
  private async handleAlexaBarboxMessage(topic: string, payload: ArrayBuffer) {
    const decoder = new TextDecoder('utf8');
    const message = decoder.decode(payload);
    this.logger.log(`Raw message received on topic "${topic}":`, message);

    try {
      const parsedMessage = JSON.parse(message);
      this.logger.log(`Parsed message:`, parsedMessage);

      const { drinkId } = parsedMessage;

      if (!drinkId) {
        this.logger.warn('Message does not contain a drinkId, skipping...');
        return;
      }

      // Llama al servicio para crear la orden
      await this.createOrderFromDrinkId(drinkId);
    } catch (error) {
      this.logger.error(`Error parsing or processing message:`, error);
    }
  }

  // Crea una orden usando el servicio de órdenes
  private async createOrderFromDrinkId(drinkId: string) {
    try {
      const orderData = {
        drinkId: parseInt(drinkId),
        origin: 'alexa',
      };

      const createdOrder = await this.orderService.create(orderData); // Usa OrderService directamente
      this.logger.log('Order created successfully:', createdOrder);

      // Enviar el comando al ESP32 por MQTT
      if (createdOrder && createdOrder.drinkId) {
        const mqttMessage = { drinkId: createdOrder.drinkId }; // Solo enviar el drinkId
        this.logger.log(`Sending MQTT command: ${JSON.stringify(mqttMessage)}`);
        await this.mqttService.sendCommands(createdOrder.drinkId); // Llama al servicio MQTT
      }
    } catch (error) {
      this.logger.error('Error creating order:', error);
    }
  }

  // Suscribirse a un tópico genérico
  async subscribe(
    topic: string,
    qos: mqtt.QoS,
    messageHandler: (topic: string, payload: ArrayBuffer) => void,
  ) {
    if (!this.connected) {
      this.logger.warn('Not connected. Attempting to reconnect...');
      await this.reconnect();
    }

    try {
      this.logger.log(`Attempting to subscribe to topic "${topic}"`);
      const subscribeRequest = await this.mqttClient.subscribe(
        topic,
        qos,
        messageHandler,
      );
      this.logger.log(`Successfully subscribed to "${topic}"`);
      return subscribeRequest;
    } catch (error) {
      this.logger.error('Subscription error:', error);
      if (error.message.includes('AWS_ERROR_MQTT_CONNECTION_SHUTDOWN')) {
        this.logger.warn('Connection lost. Attempting to reconnect...');
        await this.reconnect();
        await this.subscribe(topic, qos, messageHandler);
      }
    }
  }

  // Reconexión en caso de pérdida de conexión
  async reconnect(): Promise<void> {
    this.logger.log('Reconnecting to AWS IoT Core...');
    this.connected = false;
    await this.connect();
  }

  // Desconecta el cliente de IoT Core
  async disconnect(): Promise<void> {
    if (this.mqttClient && this.connected) {
      await this.mqttClient.disconnect();
      this.connected = false;
      this.logger.log('Disconnected from AWS IoT Core');
    }
  }

  // Llamado cuando el módulo se destruye
  onModuleDestroy(): void {
    this.disconnect();
  }
}
