// student_list.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentListService } from './studentlist.service';
import { StudentList } from '../entity/studentlist.entity';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

ApiTags('student-list');
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

  @Public()
   //// Get student
   @Get(':id/students')
   getStudents(@Param('id') id: number) {
     return this.studentListService.getStudentsByClassId(id);
   }

  @Public()
  @Get('class/:classId')
  getByClassStudents(@Param('classId') classId: number) {
    return this.studentListService.getStudentsByClassId(classId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() studentList: StudentList) {
    console.log(studentList);
    return this.studentListService.update(+id, studentList);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentListService.remove(id);
  }
}
