// classroom.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.classroom)
  schedules: Schedule[];
}
