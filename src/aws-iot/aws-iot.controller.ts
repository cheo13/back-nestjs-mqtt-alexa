import { Controller } from '@nestjs/common';
import { AwsIotService } from './aws-iot.service';

@Controller('aws-iot')
export class AwsIoTController {
  constructor(private readonly awsIotService: AwsIotService) {}
}
