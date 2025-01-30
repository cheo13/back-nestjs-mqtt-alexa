import { Test, TestingModule } from '@nestjs/testing';
import { AdminBarController } from './admin-bar.controller';

describe('AdminBarController', () => {
  let controller: AdminBarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminBarController],
    }).compile();

    controller = module.get<AdminBarController>(AdminBarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
