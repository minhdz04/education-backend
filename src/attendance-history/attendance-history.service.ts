import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceHistory } from '../entity/attendance_history.entity';

@Injectable()
export class AttendanceHistoryService {
  constructor(
    @InjectRepository(AttendanceHistory)
    private attendanceHistoryRepository: Repository<AttendanceHistory>,
  ) {}

  create(attendanceHistory: AttendanceHistory): Promise<AttendanceHistory> {
    return this.attendanceHistoryRepository.save(attendanceHistory);
  }

  findAll(): Promise<AttendanceHistory[]> {
    return this.attendanceHistoryRepository.find({
      relations: ['attendance'], // Include relations if needed
    });
  }

  findOne(id: number): Promise<AttendanceHistory | null> {
    return this.attendanceHistoryRepository.findOne({
      where: { id },
      relations: ['attendance'], // Include relations if needed
    });
  }

  async update(id: number, attendanceHistory: Partial<AttendanceHistory>): Promise<AttendanceHistory | null> {
    await this.attendanceHistoryRepository.update(id, attendanceHistory);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.attendanceHistoryRepository.delete(id);
  }
}
