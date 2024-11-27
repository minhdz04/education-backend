// user.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { CreateUserDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { UserService } from './user.service';
import { RolesGuard } from 'src/auth/roles.guard';
import * as bcrypt from 'bcrypt';
@ApiTags('user')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Roles(Role.Admin)
  @Post('createTeacher')
  async createTeacher(@Body() createUserDto: CreateUserDto) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    return this.userService.create(
      createUserDto.username,
      hashedPassword,
      createUserDto.email, 
      Role.Teacher, // Đảm bảo rằng Role.Teacher là giá trị hợp lệ
    );
  }

  @Post('createAdmin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    return this.userService.create(
      createUserDto.username,
      hashedPassword,
      createUserDto.email,
      Role.Admin, // Đảm bảo rằng Role.Admin là giá trị hợp lệ
    );

  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  @Get('id/:id')
  async findOneById(@Param('id') id: number) {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
