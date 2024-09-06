// schedule.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entity/attendance.entity';
import { StudentList } from 'src/entity/studentlist.entity';
import { Between, Repository } from 'typeorm';
import { Schedule } from '../entity/schedule.entity';
import { ScheduleCountByDayDto } from './dto/schedule-count-by-day.dto';
import { ScheduleStudentDto } from './dto/schedule-student.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(StudentList)
    private readonly studentListRepository: Repository<StudentList>,

    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  create(schedule: Schedule): Promise<Schedule> {
    return this.scheduleRepository.save(schedule);
  }

  async findAll() {
    return this.scheduleRepository.find({
      relations: [
        'class',
        'shift',
        'lecturer',
        'subject',
        'classroom',
        'classroom.building',
      ],
    });
  }

  findOne(id: number): Promise<Schedule> {
    return this.scheduleRepository.findOne({
      where: { id },
      relations: ['class', 'shift', 'lecturer', 'subject', 'classroom'],
    });
  }

  async update(id: number, schedule: Schedule): Promise<Schedule> {
    await this.scheduleRepository.update(id, schedule);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.scheduleRepository.delete(id);
  }

  async findByDate(date: string): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      where: { date: date },
      relations: [
        'class',
        'shift',
        'lecturer',
        'subject',
        'classroom',
        'classroom.building',
      ],
    });
  }

  async getScheduleCountByDayInMonth(
    date: string,
  ): Promise<ScheduleCountByDayDto[]> {
    const [year, month] = date.split('-').map(Number);

    const schedules = await this.scheduleRepository.find({
      where: {
        date: Between(`${year}-${month}-01`, `${year}-${month}-31`),
      },
      relations: [
        'class',
        'shift',
        'lecturer',
        'subject',
        'classroom',
        'classroom.building',
      ],
    });

    const scheduleCountByDay = schedules.reduce(
      (acc, schedule) => {
        const day = new Date(schedule.date).getDate();
        if (!acc[day]) {
          acc[day] = 0;
        }
        acc[day]++;
        return acc;
      },
      {} as { [key: number]: number },
    );

    return Object.entries(scheduleCountByDay).map(([day, count]) => ({
      day: Number(day),
      count: count,
    })) as ScheduleCountByDayDto[];
  }
  async findByClassId(classId: number): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      where: { class: { id: classId } },
      relations: [
        'class',
        'shift',
        'lecturer',
        'subject',
        'classroom',
        'classroom.building',
      ],
    });
  }

  async findByLecturerId(lecturerId: number): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      where: { lecturer: { id: lecturerId } },
      relations: [
        'class',
        'shift',
        'lecturer',
        'subject',
        'classroom',
        'classroom.building',
      ],
    });
  }

  async getStudentsBySchedule(
    scheduleId: number,
  ): Promise<ScheduleStudentDto[]> {
    // Lấy lịch học
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
      relations: ['class'],
    });

    if (!schedule) {
      throw new Error('Schedule not found');
    }

    // Lấy danh sách học sinh của lớp trong lịch học
    const students = await this.studentListRepository.find({
      where: { class: { id: schedule.class.id } },
    });

    // Lấy danh sách điểm danh của lớp trong lịch học
    const attendances = await this.attendanceRepository.find({
      where: { schedule: { id: scheduleId } },
      relations: ['student'],
    });
    console.log(attendances);
    // Sử dụng Map để dễ dàng tra cứu trạng thái điểm danh
    // Giả sử studentId là chuỗi trong StudentList
    const attendanceMap = new Map<string, boolean>();
    attendances.forEach((attendance) => {
      attendanceMap.set(attendance.student.studentId, true);
    });
    console.log(attendanceMap);
    // So sánh và tạo danh sách DTO để trả về
    return students.map((student) => {
      const isChecked = attendanceMap.has(student.studentId);
      return {
        id: student.id,
        studentId: student.studentId,
        studentName: student.name,
        isChecked,
      };
    });
  }
}
