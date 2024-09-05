// create-attendance.dto.ts
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAttendanceDto {
  studentId: number;
  classId: number;
  userId: number;
  scheduleId: number;
  note?: string;
  status: number;
}
