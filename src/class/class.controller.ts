// class.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { Class } from '../entity/class.entity';
import { StudentList } from 'src/entity/studentlist.entity';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() classEntity: Class) {
    return this.classService.create(classEntity);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }
  ////
  @Get(':id/students')
  async getStudentsByClass(@Param('id') id: number): Promise<StudentList[]> {
    // return this.classService.getStudentByClass(id);
    return null;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() classEntity: Class) {
    return this.classService.update(+id, classEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
