import { Test, TestingModule } from '@nestjs/testing';
import { StudentListService } from './studentlist.service';

describe('StudentlistService', () => {
  let service: StudentListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentListService],
    }).compile();

    service = module.get<StudentListService>(StudentListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
