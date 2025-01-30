import { Test, TestingModule } from '@nestjs/testing';
import { DrinkIngredientController } from './drink-ingredient.controller';

describe('DrinkIngredientController', () => {
  let controller: DrinkIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrinkIngredientController],
    }).compile();

    controller = module.get<DrinkIngredientController>(DrinkIngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
