// class.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { Class } from '../entity/class.entity';
import { StudentList } from 'src/entity/studentlist.entity';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('classes')
@Controller('classes')
@UseGuards(RolesGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @Roles(Role.Admin) 
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
  

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() classEntity: Class) {
    return this.classService.update(+id, classEntity);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
