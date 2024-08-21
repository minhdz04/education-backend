// student_class.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentClassService } from './studentclass.service';
import { StudentClassController } from './studentclass.controller';
import { StudentClass } from '../entity/student_class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentClass])],
  providers: [StudentClassService],
  controllers: [StudentClassController],
  exports: [StudentClassService],
})
export class StudentClassModule {}
