import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/entity/class.entity';
import { StudentList } from 'src/entity/studentlist.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { Attendance } from '../entity/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Schedule } from 'src/entity/schedule.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(StudentList)
    private studentRepository: Repository<StudentList>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    let attendance = await this.attendanceRepository.findOne({
      where: {
        student: { studentId: createAttendanceDto.studentId },
        class: { id: createAttendanceDto.classId },
        schedule: { id: createAttendanceDto.scheduleId },
      },
    });

    if (attendance) {
      attendance.status = createAttendanceDto.status;
      attendance.note = createAttendanceDto.note || attendance.note;
      attendance.updatedAt = new Date();
      return this.attendanceRepository.save(attendance);
    } else {
      // Tạo mới nếu chưa tồn tại
      attendance = this.attendanceRepository.create(createAttendanceDto);
      return this.attendanceRepository.save(attendance);
    }
  }
  async markAttendance(
    studentId: string,
    scheduleId: number,
    classId: number,
    userId: number,
    status: number,
    note: string,
  ): Promise<Attendance> {
    try {
      console.log(classId, studentId, userId);
      // Tìm sinh viên
      const student = await this.studentRepository.findOne({
        where: { studentId: studentId },
      });

      // Tìm lịch học
      const schedule = await this.scheduleRepository.findOne({
        where: { id: scheduleId },
      });

      // Tìm lớp học
      const classEntity = await this.classRepository.findOne({
        where: { id: classId },
      });

      // Tìm người dùng
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      // Kiểm tra sự tồn tại của sinh viên, lịch học, lớp học và người dùng
      if (!student || !schedule || !classEntity || !user) {
        throw new Error('Student, schedule, class, or user not found');
      }

      // Tìm điểm danh theo các tiêu chí
      let attendance = await this.attendanceRepository.findOne({
        where: {
          student: { studentId: studentId },
          schedule: { id: scheduleId },
          class: { id: classId },
          user: { id: userId },
        },
        relations: ['student', 'schedule', 'class', 'user'],
      });

      // Cập nhật hoặc tạo mới điểm danh
      if (attendance) {
        // Cập nhật trạng thái điểm danh
        attendance.status = status;
        attendance.note = note;
        attendance.updatedAt = new Date();
      } else {
        // Tạo mới nếu chưa có
        attendance = this.attendanceRepository.create({
          student,
          schedule,
          class: classEntity,
          user,
          status,
          note,
          updatedAt: new Date(),
        });
      }

      console.log('Saving attendance:', attendance);
      return await this.attendanceRepository.save(attendance);
    } catch (error) {
      console.error('Error marking attendance:', error);
      throw new Error('Error marking attendance');
    }
  }

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      relations: ['user', 'student', 'class', 'attendanceHistories'],
    });
  }

  async findOne(id: number): Promise<Attendance | null> {
    return this.attendanceRepository.findOne({
      where: { id },
      relations: ['user', 'student', 'class', 'attendanceHistories'],
    });
  }

  async update(
    id: number,
    attendance: Partial<Attendance>,
  ): Promise<Attendance> {
    const existingAttendance = await this.attendanceRepository.findOne({
      where: { id },
      relations: ['student', 'class', 'user'],
    });

    if (!existingAttendance) {
      throw new Error('Attendance not found');
    }

    // Cập nhật các trường của đối tượng hiện tại
    const updatedAttendance = this.attendanceRepository.merge(
      existingAttendance,
      attendance,
    );

    // Lưu đối tượng đã cập nhật
    await this.attendanceRepository.save(updatedAttendance);

    return updatedAttendance;
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

  async findByScheduleId(scheduleId: number): Promise<Attendance[]> {
    return this.attendanceRepository.find({
      where: { schedule: { id: scheduleId } },
      relations: ['schedule'],
    });
  }
}
