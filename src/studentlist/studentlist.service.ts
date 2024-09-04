// student_list.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentList } from '../entity/studentlist.entity';

@Injectable()
export class StudentListService {
  constructor(
    @InjectRepository(StudentList)
    private studentListRepository: Repository<StudentList>,
  ) {}

  create(studentList: StudentList): Promise<StudentList> {
    return this.studentListRepository.save(studentList);
  }

  findAll(): Promise<StudentList[]> {
    return this.studentListRepository.find();
  }

  findOne(id: number): Promise<StudentList> {
    return this.studentListRepository.findOne({ where: { id } });
  }

  async update(id: number, studentList: StudentList): Promise<StudentList> {
    await this.studentListRepository.update(id, studentList);
    return this.findOne(id);
  }

  async remove(studentId: string): Promise<void> {
    const student = await this.studentListRepository.findOne({
      where: { studentId },
    });
    if (student) {
      await this.studentListRepository.delete(student.id);
    }
  }

  // Method to find student by studentId
  async findByStudentId(studentId: string): Promise<StudentList> {
    return this.studentListRepository.findOne({ where: { studentId } });
  }

  async getStudentsByClassId(classId: number): Promise<StudentList[]> {
    return this.studentListRepository.find({
      where: { class: { id: classId } },
      relations: ['class'], 
    });
  }
}
