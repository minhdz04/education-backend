import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentList } from '../entity/studentlist.entity';
import { StudentAttendanceDto } from './dto/student-attendance.dto';
import { Attendance } from 'src/entity/attendance.entity';

@Injectable()
export class StudentListService {
  constructor(
    @InjectRepository(StudentList)
    private studentListRepository: Repository<StudentList>,
    
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
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

  async compareStudentListWithAttendance(classId: number): Promise<StudentAttendanceDto[]> {
    // Lấy danh sách học sinh trong lớp
    const students = await this.studentListRepository.find({
      where: { class: { id: classId } }, // Đảm bảo quan hệ đúng
      relations: ['class'],
    });

    // Lấy danh sách điểm danh theo lớp
    const attendances = await this.attendanceRepository.find({
      where: { class: { id: classId } }, // Sử dụng quan hệ
      relations: ['class'], // Đảm bảo rằng quan hệ được nạp
    });

    // Sử dụng Map để dễ dàng tra cứu trạng thái điểm danh
    const attendanceMap = new Map<number, boolean>();
    attendances.forEach((attendance) => {
      attendanceMap.set(attendance.student.id, true); // Lấy id của student từ attendance
    });

    // So sánh và tạo danh sách DTO để trả về
    return students.map((student) => {
      const isChecked = attendanceMap.has(student.id);
      return {
        studentId: student.id,
        studentName: student.name,
        isChecked,
      };
    });
  }
}
