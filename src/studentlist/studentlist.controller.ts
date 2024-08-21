// student_list.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentListService } from './studentlist.service';
import { StudentList } from '../entity/studentlist.entity';

@Controller('student-list')
export class StudentListController {
  constructor(private readonly studentListService: StudentListService) {}

  @Post()
  create(@Body() studentList: StudentList) {
    return this.studentListService.create(studentList);
  }

  @Get()
  findAll() {
    return this.studentListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() studentList: StudentList) {
    return this.studentListService.update(+id, studentList);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentListService.remove(+id);
  }
}
