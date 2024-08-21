// student_class.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentClass } from '../entity/student_class.entity';


@Injectable()
export class StudentClassService {
  constructor(
    @InjectRepository(StudentClass)
    private studentClassRepository: Repository<StudentClass>,
  ) {}

  create(studentClass: StudentClass): Promise<StudentClass> {
    return this.studentClassRepository.save(studentClass);
  }

  findAll(): Promise<StudentClass[]> {
    return this.studentClassRepository.find({
      relations: ['class', 'student'], // Include relations if needed
    });
  }

  findOne(id: number): Promise<StudentClass> {
    return this.studentClassRepository.findOne({
      where: { id },
      relations: ['class', 'student'], // Include relations if needed
    });
  }

  async update(id: number, studentClass: StudentClass): Promise<StudentClass> {
    await this.studentClassRepository.update(id, studentClass);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.studentClassRepository.delete(id);
  }
}
