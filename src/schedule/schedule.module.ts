// schedule.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from '../entity/schedule.entity';
import { StudentList } from 'src/entity/studentlist.entity';
import { StudentListModule } from 'src/studentlist/studentlist.module';
import { Attendance } from 'src/entity/attendance.entity';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { Shift } from 'src/entity/shift.entity';
import { Classroom } from 'src/entity/classroom.entity';
import { Class } from 'src/entity/class.entity';
import { Building } from 'src/entity/building.entity';
import { Lecturer } from 'src/entity/lecturer.entity';
import { Subject } from 'src/entity/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, StudentList, Attendance, Shift, Classroom , Class, Building, Lecturer, Subject ]),
    StudentListModule, // Đảm bảo StudentListModule được nhập vào
    AttendanceModule, // Nếu có, nhập AttendanceModule
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
