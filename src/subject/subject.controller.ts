import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { Subject } from '../entity/subject.entity';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Subject> {
    return this.subjectService.findOne(id);
  }

  @Post()
  create(@Body() subject: Subject): Promise<Subject> {
    return this.subjectService.create(subject);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() subject: Subject): Promise<Subject> {
    return this.subjectService.update(id, subject);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.subjectService.remove(id);
  }

  
}
