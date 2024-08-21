// student_class.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Class } from './class.entity';
import { StudentList } from './studentlist.entity';

@Entity()
export class StudentClass {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.studentClasses)
  class: Class;

  @ManyToOne(() => StudentList, (student) => student.studentClasses)
  student: StudentList;
}
