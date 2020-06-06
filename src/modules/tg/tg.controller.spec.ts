import { Test, TestingModule } from '@nestjs/testing';
import { TgController } from './tg.controller';

describe('Tgs Controller', () => {
  let controller: TgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TgController],
    }).compile();

    controller = module.get<TgController>(TgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
