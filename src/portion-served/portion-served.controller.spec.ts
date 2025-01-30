import { Test, TestingModule } from '@nestjs/testing';
import { PortionServedController } from './portion-served.controller';

describe('PortionServedController', () => {
  let controller: PortionServedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortionServedController],
    }).compile();

    controller = module.get<PortionServedController>(PortionServedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
