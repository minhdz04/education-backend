import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { StudentList } from '../entity/studentlist.entity';
import { Schedule } from '../entity/schedule.entity';
import { Class } from '../entity/class.entity';
import { Shift } from '../entity/shift.entity';
import { Subject } from '../entity/Subject.entity';
import { Lecturer } from '../entity/lecturer.entity';
import { Classroom } from '../entity/classroom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentList,
      Schedule,
      Class,
      Shift,
      Subject,
      Lecturer,
      Classroom,
    ]),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
