// attendance_history.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceHistoryService } from './attendance-history.service';
import { AttendanceHistoryController } from './attendance-history.controller';
import { AttendanceHistory } from '../entity/attendance_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceHistory])],
  providers: [AttendanceHistoryService],
  controllers: [AttendanceHistoryController],
})
export class AttendanceHistoryModule {}
