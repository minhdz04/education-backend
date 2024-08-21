import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Shift } from './shift.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Schedule, (schedule) => schedule.subject)
  schedules: Schedule[];

  @OneToMany(() => Shift, (shift) => shift.subject)
  shifts: Shift[];
}
