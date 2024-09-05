// attendance.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from '../entity/attendance.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

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
    console.log('Running ....');
    return this.attendanceService.markAttendance(
      studentId,
      classId,
      userId,
      status,
      note,
    );
  }

  @Get('class/:classId')
  async findAttendancesByClass(
    @Param('classId') classId: number,
  ): Promise<Attendance[]> {
    return this.attendanceService.findAttendancesByClass(classId);
  }

  @Get('student/:studentId')
  async findAttendancesByStudent(
    @Param('studentId') studentId: number,
  ): Promise<Attendance[]> {
    return this.attendanceService.findAttendancesByStudent(studentId);
  }

  @Get('schedule/:scheduleId')
  async findByScheduleId(@Param('scheduleId') scheduleId: number) {
    return this.attendanceService.findByScheduleId(scheduleId);
  }

  @Post()
  async create(
    @Body() createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendanceService.create(createAttendanceDto);
  }
}
