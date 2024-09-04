// class.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Lecturer } from './lecturer.entity';
//import { StudentClass } from './student_class.entity';
import { Schedule } from './schedule.entity';
import { StudentList } from './studentlist.entity';
import { StudentClass } from './student_class.entity';
import { Classroom } from './classroom.entity';
import { Attendance } from './attendance.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @ManyToOne(() => Lecturer, (lecturer) => lecturer.classes)
  // lecturer: Lecturer;

  @OneToMany(() => StudentClass, (studentClass) => studentClass.class)
  studentClasses: StudentClass[];

  @OneToMany(() => Schedule, (schedule) => schedule.class)
  schedules: Schedule[];

  @OneToMany(() => Attendance, (attendance) => attendance.class)
  attendances: Attendance[]; 
  
  @OneToMany(() => StudentList, student => student.class)
  students: StudentList;
  // @ManyToMany(() => StudentList, (studentlist) => studentlist.classes)
  // @JoinTable({ name: 'student_class' }) // Tên của bảng trung gian
  // studentlists: StudentList[];
  
  @ManyToOne(() => Classroom, (classroom) => classroom.classes) // Thêm quan hệ ManyToOne
  classroom: Classroom;

}
