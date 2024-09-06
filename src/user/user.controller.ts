// user.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles(Role.Admin)
  @Post('createTeacher')
  async createTeacher(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(
      createUserDto.username,
      createUserDto.password,
      Role.Teacher,
    );
  }
  @Roles(Role.Admin)
  @Post('createAdmin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(
      createUserDto.username,
      createUserDto.password,
      Role.Admin,
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
