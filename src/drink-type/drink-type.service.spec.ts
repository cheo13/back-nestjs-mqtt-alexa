import { Test, TestingModule } from '@nestjs/testing';
import { DrinkTypeService } from './drink-type.service';

describe('DrinkTypeService', () => {
  let service: DrinkTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrinkTypeService],
    }).compile();

    service = module.get<DrinkTypeService>(DrinkTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
