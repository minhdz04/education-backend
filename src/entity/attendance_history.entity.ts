// attendance_history.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Lecturer } from './lecturer.entity';

@Entity()
export class AttendanceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Attendance, (attendance) => attendance.attendanceHistories)
  attendance: Attendance;
   lecturer: Lecturer;
}
