import { Test, TestingModule } from '@nestjs/testing';
import { AdminBarService } from './admin-bar.service';

describe('AdminBarService', () => {
  let service: AdminBarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminBarService],
    }).compile();

    service = module.get<AdminBarService>(AdminBarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
