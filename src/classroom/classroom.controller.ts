// classroom.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { Classroom } from '../entity/classroom.entity';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('classroom')
@Controller('classroom')
@UseGuards(RolesGuard)
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() classroom: Classroom) {
    return this.classroomService.create(classroom);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.classroomService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.classroomService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() classroom: Classroom) {
    return this.classroomService.update(+id, classroom);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.classroomService.remove(+id);
  }

  // @Get('building/:buildingId')
  // async getClassroomsByBuildingId(
  //   @Param('buildingId') buildingId: number,
  // ): Promise<Classroom[]> {
  //   return this.classroomService.getClassroomsByBuildingId(buildingId);
  // }
}
