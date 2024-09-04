import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../entity/attendance.entity';
import { StudentList } from 'src/entity/studentlist.entity';
import { Class } from 'src/entity/class.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async markAttendance(studentId: number, classId: number, userId: number, status: number, note: string): Promise<Attendance> {
    let attendance = await this.attendanceRepository.findOne({
      where: { student: { id: studentId }, class: { id: classId }, user: { id: userId } },
    });

    if (attendance) {
      // Cập nhật trạng thái điểm danh
      attendance.status = status ?? attendance.status; // Đảm bảo status được cập nhật
      attendance.note = note ?? attendance.note; 
      attendance.updatedAt = new Date();
    } else {
      // Tạo mới nếu chưa có
      attendance = this.attendanceRepository.create({
        student: { id: studentId } as StudentList,
        class: { id: classId } as Class,
        user: { id: userId } as User,
        status,
        note,
        updatedAt: new Date(),
      });
    }
    console.log('Saving attendance:', attendance);
    return this.attendanceRepository.save(attendance);
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find({ relations: ['user', 'student', 'class', 'attendanceHistories'] });
  }

  async findOne(id: number): Promise<Attendance | null> {
    return this.attendanceRepository.findOne({
      where: { id },
      relations: ['user', 'student', 'class', 'attendanceHistories'],
    });
  }

  async update(id: number, attendance: Partial<Attendance>): Promise<Attendance> {
    await this.attendanceRepository.update(id, attendance);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.attendanceRepository.delete(id);
  }

  async findAttendancesByClass(classId: number): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { class: { id: classId } },
      relations: ['student', 'user', 'attendanceHistories'],
    });
  }

  async findAttendancesByStudent(studentId: number): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { student: { id: studentId } },
      relations: ['class', 'user', 'attendanceHistories'],
    });
  }
}
