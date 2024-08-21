// class.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Lecturer } from './lecturer.entity';
import { StudentClass } from './student_class.entity';
import { Schedule } from './schedule.entity';
import { StudentList } from './studentlist.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.classes)
  lecturer: Lecturer;

  @OneToMany(() => StudentClass, (studentClass) => studentClass.class)
  studentClasses: StudentClass[];

  @OneToMany(() => Schedule, (schedule) => schedule.class)
  schedules: Schedule[];
  
  @OneToMany(() => StudentList, student => student.class)
  students: StudentList[];
}
