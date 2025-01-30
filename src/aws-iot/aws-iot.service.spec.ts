import { Test, TestingModule } from '@nestjs/testing';
import { AwsIotService } from './aws-iot.service';

describe('AwsIotService', () => {
  let service: AwsIotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsIotService],
    }).compile();

    service = module.get<AwsIotService>(AwsIotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
