// attendance.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from '../entity/attendance.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('attendances')
@ApiTags('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('mark')
  async markAttendance(
    @Body('studentId') studentId: number,
    @Body('classId') classId: number, 
    @Body('userId') userId: number,
    @Body('status') status: number,
    @Body('note') note: string,
  ): Promise<Attendance> {
    return this.attendanceService.markAttendance(studentId, classId, userId, status, note);
  }

  @Get('class/:classId')
  async findAttendancesByClass(@Param('classId') classId: number): Promise<Attendance[]> {
    return this.attendanceService.findAttendancesByClass(classId);
  }

  @Get('student/:studentId')
  async findAttendancesByStudent(@Param('studentId') studentId: number): Promise<Attendance[]> {
    return this.attendanceService.findAttendancesByStudent(studentId);
  }

  
}
