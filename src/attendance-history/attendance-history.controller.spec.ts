import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceHistoryController } from './attendance-history.controller';

describe('AttendanceHistoryController', () => {
  let controller: AttendanceHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceHistoryController],
    }).compile();

    controller = module.get<AttendanceHistoryController>(AttendanceHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
