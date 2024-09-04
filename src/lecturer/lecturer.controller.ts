// lecturer.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { Lecturer } from '../entity/lecturer.entity';
import { ApiTags } from '@nestjs/swagger';

ApiTags('lecturer')
@Controller('lecturer')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Post()
  create(@Body() lecturer: Lecturer) {
    return this.lecturerService.create(lecturer);
  }

  @Get()
  findAll() {
    return this.lecturerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lecturerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() lecturer: Lecturer) {
    return this.lecturerService.update(+id, lecturer);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lecturerService.remove(+id);
  }
}
