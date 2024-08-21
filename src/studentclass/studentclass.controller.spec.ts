import { Test, TestingModule } from '@nestjs/testing';
import { StudentClassController } from './studentclass.controller';

describe('StudentclassController', () => {
  let controller: StudentClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentClassController],
    }).compile();

    controller = module.get<StudentClassController>(StudentClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
