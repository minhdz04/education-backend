// attendance_history.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendanceHistoryService } from './attendance-history.service';
import { AttendanceHistory } from '../entity/attendance_history.entity';

@Controller('attendance-history')
export class AttendanceHistoryController {
  constructor(private readonly attendanceHistoryService: AttendanceHistoryService) {}

  @Post()
  create(@Body() attendanceHistory: AttendanceHistory) {
    return this.attendanceHistoryService.create(attendanceHistory);
  }

  @Get()
  findAll() {
    return this.attendanceHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() attendanceHistory: AttendanceHistory) {
    return this.attendanceHistoryService.update(+id, attendanceHistory);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceHistoryService.remove(+id);
  }
}
