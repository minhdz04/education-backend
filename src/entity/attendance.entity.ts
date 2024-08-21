// attendance.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Schedule } from './schedule.entity';
import { StudentList } from './studentlist.entity';
import { Lecturer } from './lecturer.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Schedule, (schedule) => schedule.attendances)
  schedule: Schedule;

  @ManyToOne(() => StudentList, (student) => student.attendances)
  student: StudentList;

  @Column()
  status: number;

  @Column({ length: 200 })
  note: string;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.attendances)
  lecturer: Lecturer;
   attendanceHistories: any;
}
