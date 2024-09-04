// schedule.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Schedule } from '../entity/schedule.entity';
import { ScheduleCountByDayDto } from './dto/schedule-count-by-day.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
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
}
