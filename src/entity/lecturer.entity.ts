// lecturer.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AttendanceHistory } from './attendance_history.entity';
import { Schedule } from './schedule.entity';
import { User } from './user.entity';

@Entity()
export class Lecturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Schedule, (schedule) => schedule.lecturer)
  schedules: Schedule[];

  status: number;

  @OneToOne(() => User, (user) => user.lecturer,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // Thay đổi tên cột khóa ngoại
  user: User;
}
