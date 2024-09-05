// student_list.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToOne, ManyToMany } from 'typeorm';
//import { StudentClass } from './student_class.entity';
import { Attendance } from './attendance.entity';
import { Class } from './class.entity';
import { StudentClass } from './student_class.entity';

@Entity()
export class StudentList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  studentId: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'date' })
  birthDate: string;

  @OneToMany(() => StudentClass, (studentClass) => studentClass.student)
  studentClasses: StudentClass[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  @ManyToOne(() => Class, classEntity => classEntity.students)
  class: Class;

}
