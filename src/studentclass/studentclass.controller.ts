// student_class.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentClassService } from './studentclass.service';
import { StudentClass } from '../entity/student_class.entity';

@Controller('student-class')
export class StudentClassController {
  constructor(private readonly studentClassService: StudentClassService) {}

  @Post()
  create(@Body() studentClass: StudentClass) {
    return this.studentClassService.create(studentClass);
  }

  @Get()
  findAll() {
    return this.studentClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentClassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() studentClass: StudentClass) {
    return this.studentClassService.update(+id, studentClass);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentClassService.remove(+id);
  }
}
