import { Test, TestingModule } from '@nestjs/testing';
import { TunController } from './tun.controller';

describe('TunController', () => {
  let controller: TunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TunController],
    }).compile();

    controller = module.get<TunController>(TunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
