// attendance.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { AttendanceHistory } from './attendance_history.entity';
import { User } from './user.entity';
import { StudentList } from './studentlist.entity';
import { Class } from './class.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  status: number;

  @Column({ length: 200,nullable :true })
  note: string;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.attendances)
  user: User;

  @ManyToOne(() => StudentList, (studentList) => studentList.attendances,{cascade:["update"]})
  student: StudentList;

  @ManyToOne(() => Class, (classEntity) => classEntity.attendances)
  class: Class;

  @OneToMany(() => AttendanceHistory, (attendanceHistory) => attendanceHistory.attendance)
  attendanceHistories: AttendanceHistory[];
}
