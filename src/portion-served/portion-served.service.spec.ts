import { Test, TestingModule } from '@nestjs/testing';
import { PortionServedService } from './portion-served.service';

describe('PortionServedService', () => {
  let service: PortionServedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortionServedService],
    }).compile();

    service = module.get<PortionServedService>(PortionServedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
