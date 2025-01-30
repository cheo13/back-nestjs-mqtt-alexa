import { Test, TestingModule } from '@nestjs/testing';
import { DrinkIngredientService } from './drink-ingredient.service';

describe('DrinkIngredientService', () => {
  let service: DrinkIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrinkIngredientService],
    }).compile();

    service = module.get<DrinkIngredientService>(DrinkIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
