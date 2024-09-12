import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from '../entity/attendance.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { RolesGuard } from 'src/auth/roles.guard';


@Controller('attendances')
@ApiTags('attendances')
@UseGuards(RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('mark')
  async markAttendance(
    @Body() markAttendanceDto: CreateAttendanceDto, // Sử dụng DTO mới
  ): Promise<Attendance> {
    console.log('Running ....');
    const { studentId, classId, userId, status, note, scheduleId } =
      markAttendanceDto;
    return this.attendanceService.markAttendance(
      studentId,
      scheduleId,
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
  async findByScheduleId(
    @Param('scheduleId') scheduleId: number,
  ): Promise<Attendance[]> {
    return this.attendanceService.findByScheduleId(scheduleId);
  }

  @Post()
  async create(
    @Body() createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendanceService.create(createAttendanceDto);
  }
}
