import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../entity/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find({ relations: ['schedule', 'student', 'lecturer'] });
  }

  findOne(id: number): Promise<Attendance | null> {
    return this.attendanceRepository.findOne({
      where: { id },
      relations: ['schedule', 'student', 'lecturer'],
    });
  }

  async create(attendance: Attendance): Promise<Attendance> {
    return this.attendanceRepository.save(attendance);
  }

  async update(id: number, attendance: Partial<Attendance>): Promise<Attendance> {
    await this.attendanceRepository.update(id, attendance);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.attendanceRepository.delete(id);
  }
}
