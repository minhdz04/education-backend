// schedule.controller.ts
import { Schedule } from '../entity/schedule.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleCountByDayDto } from './dto/schedule-count-by-day.dto';
import { Public } from 'src/auth/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

ApiTags('schedule');
@Controller('schedule')
@UseGuards(RolesGuard)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() schedule: Schedule) {
    return this.scheduleService.create(schedule);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get('date')
  async findByDate(@Query('date') date: string): Promise<Schedule[]> {
    return this.scheduleService.findByDate(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() schedule: Schedule) {
    return this.scheduleService.update(+id, schedule);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }

  @Public()
  @Get('count-by-day/:date')
  async getScheduleCountByDayInMonth(
    @Param('date') date: string, @Query('lecturerId') lecturerId: string
  ): Promise<ScheduleCountByDayDto[]> {
    return this.scheduleService.getScheduleCountByDayInMonth(date, lecturerId);
  }

  @Get('by-class/:classId')
  async getByClassId(@Param('classId') classId: string): Promise<Schedule[]> {
    return this.scheduleService.findByClassId(+classId);
  }

  @Get('by-lecturer/:lecturerId')
  //@Roles(Role.Teacher)
  async getByLecturerId(
    @Param('lecturerId') lecturerId: string,
  ): Promise<Schedule[]> {
    return this.scheduleService.findByLecturerId(+lecturerId);
  }

  @Get(':scheduleId/students')
  // @Roles(Role.Teacher)
  async getStudentsBySchedule(@Param('scheduleId') scheduleId: number) {
    return this.scheduleService.getStudentsBySchedule(scheduleId);
  }
}
