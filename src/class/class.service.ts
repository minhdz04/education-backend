import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../entity/class.entity';
import { StudentList } from 'src/entity/studentlist.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  findAll(): Promise<Class[]> {
    return this.classRepository.find({ relations: ['lecturer', 'studentClasses', 'schedules'] });
  }

  findOne(id: number): Promise<Class | null> {
    return this.classRepository.findOne({
      where: { id },
      relations: ['lecturer', 'studentClasses', 'schedules'],
    });
  }

  async create(classEntity: Class): Promise<Class> {
    return this.classRepository.save(classEntity);
  }

  async update(id: number, classEntity: Partial<Class>): Promise<Class> {
    await this.classRepository.update(id, classEntity);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
  //Hàm lấy danh sách sinh viên theo id lớp học
  async getStudentByClass(classId: number): Promise<StudentList[]> {
    const classEntity = await this.classRepository.findOne({
      where: { id: classId },
      relations: ['students'], // Include students in the query
    });

    if (!classEntity) {
      throw new Error('Class not found');
    }

    return classEntity.students;
  }
}
