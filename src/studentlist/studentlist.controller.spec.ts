import { Test, TestingModule } from '@nestjs/testing';
import { StudentListController } from './studentlist.controller';

describe('StudentlistController', () => {
  let controller: StudentListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentListController],
    }).compile();

    controller = module.get<StudentListController>(StudentListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
