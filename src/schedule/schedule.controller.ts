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
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleCountByDayDto } from './dto/schedule-count-by-day.dto';
import { Public } from 'src/auth/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

ApiTags('schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() schedule: Schedule) {
    return this.scheduleService.create(schedule);
  }

  @Get()
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
  update(@Param('id') id: string, @Body() schedule: Schedule) {
    return this.scheduleService.update(+id, schedule);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }

  @Public()
  @Get('count-by-day/:date')
  async getScheduleCountByDayInMonth(
    @Param('date') date: string,
  ): Promise<ScheduleCountByDayDto[]> {
    return this.scheduleService.getScheduleCountByDayInMonth(date);
  }
}
