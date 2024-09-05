// attendance.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from '../entity/attendance.entity';
import { StudentList } from 'src/entity/studentlist.entity';
import { Class } from 'src/entity/class.entity';
import { User } from 'src/entity/user.entity';
import { Schedule } from 'src/entity/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, StudentList, Class, User, Schedule]),
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController],
  exports: [AttendanceService],
})
export class AttendanceModule {}
