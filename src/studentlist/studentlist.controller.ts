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
import { StudentListService } from './studentlist.service';
import { StudentList } from '../entity/studentlist.entity';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { StudentAttendanceDto } from './dto/student-attendance.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
 // Import DTO nếu chưa có

@ApiTags('student-list')
@Controller('student-list')
@UseGuards(RolesGuard)
export class StudentListController {
  constructor(private readonly studentListService: StudentListService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() studentList: StudentList) {
    return this.studentListService.create(studentList);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.studentListService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.studentListService.findOne(+id);
  }

  @Public()
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
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() studentList: StudentList) {
    console.log(studentList);
    return this.studentListService.update(+id, studentList);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.studentListService.remove(id);
  }

  @Public()
  @Get('attendance/class/:classId')
  async compareStudentListWithAttendance(@Param('classId') classId: number): Promise<StudentAttendanceDto[]> {
    return this.studentListService.compareStudentListWithAttendance(classId);
  }

  @Public()
  @Get('class/:classId/total')
  async getTotalStudentsByClassId(@Param('classId') classId: number) {
    const total = await this.studentListService.getTotalStudentsByClassId(classId);
    return { total };
  }
}
