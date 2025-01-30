import { Test, TestingModule } from '@nestjs/testing';
import { AwsIotController } from './aws-iot.controller';

describe('AwsIotController', () => {
  let controller: AwsIotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsIotController],
    }).compile();

    controller = module.get<AwsIotController>(AwsIotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
