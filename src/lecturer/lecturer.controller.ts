// lecturer.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { Lecturer } from '../entity/lecturer.entity';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('lecturer')
@Controller('lecturer')
@UseGuards(RolesGuard)
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Post()
  @Roles(Role.Admin) 
  create(@Body() lecturer: Lecturer) {
    return this.lecturerService.create(lecturer);
  }

  @Get()
  @Roles(Role.Admin) 
  findAll() {
    return this.lecturerService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin) 
  findOne(@Param('id') id: string) {
    return this.lecturerService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() lecturer: Lecturer) {
    return this.lecturerService.update(+id, lecturer);
  }

  @Delete(':id')
  @Roles(Role.Admin) 
  remove(@Param('id') id: string) {
    return this.lecturerService.remove(+id);
  }
}
