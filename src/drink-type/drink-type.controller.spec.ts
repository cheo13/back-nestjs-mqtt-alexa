import { Test, TestingModule } from '@nestjs/testing';
import { DrinkTypeController } from './drink-type.controller';

describe('DrinkTypeController', () => {
  let controller: DrinkTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrinkTypeController],
    }).compile();

    controller = module.get<DrinkTypeController>(DrinkTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
