import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecturer } from '../entity/lecturer.entity';
import { LecturerService } from './lecturer.service';
import { LecturerController } from './lecturer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lecturer])],
  providers: [LecturerService],
  controllers: [LecturerController],
  exports: [LecturerService],  // Exports service if other modules need to use it
})
export class LecturerModule {}
