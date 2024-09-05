import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Class } from './class.entity';
import { Shift } from './shift.entity';
import { Subject } from './subject.entity';
import { Lecturer } from './lecturer.entity';
import { Classroom } from './classroom.entity';
import { Attendance } from './attendance.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @ManyToOne(() => Shift, (shift) => shift.schedules)
  shift: Shift;

  @ManyToOne(() => Class, (classEntity) => classEntity.schedules)
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.schedules)
  subject: Subject;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.schedules)
  lecturer: Lecturer;

  @ManyToOne(() => Classroom, (classroom) => classroom.schedules)
  classroom: Classroom;

  @OneToMany(() => Attendance, (attendance) => attendance.schedule)
  attendances: Attendance[];
}
