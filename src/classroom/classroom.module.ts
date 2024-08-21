import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from '../entity/classroom.entity';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Classroom])],
  providers: [ClassroomService],
  controllers: [ClassroomController],
  exports: [ClassroomService],  // Exports service if other modules need to use it
})
export class ClassroomModule {}
