// lecturer.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { AttendanceHistory } from './attendance_history.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Lecturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Schedule, (schedule) => schedule.lecturer)
  schedules: Schedule[];

  status: number;
}
