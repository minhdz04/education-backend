import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Class } from './class.entity';
import { Shift } from './shift.entity';
import { Attendance } from './attendance.entity';
import { Subject } from './subject.entity';
import { Lecturer } from './lecturer.entity';
import { Classroom } from './classroom.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.schedules)
  class: Class;

  @Column({ type: 'date' })
  date: string;

  @OneToOne(() => Shift, (shift) => shift.schedules)
  shift: Shift;

  @OneToOne(() => Subject, (subject) => subject.schedules)
  subject: Subject;

  @OneToMany(() => Attendance, (attendance) => attendance.schedule)
  attendances: Attendance[];

  @OneToOne(() => Lecturer, (lecturer) => lecturer.schedules)
  lecturer: Lecturer;

  @ManyToOne(() => Classroom, (classroom) => classroom.schedules)
  classroom: Classroom;
}
