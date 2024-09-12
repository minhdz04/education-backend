import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.enum';
import { Lecturer } from 'src/entity/lecturer.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(username: string, password: string, email:string ,role: Role) {
    const user = await this.userService.findOne(username);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Truyền thêm role khi tạo user
    return this.userService.create(username, hashedPassword,email, role);
  }

  async login(username: string, password: string) {
    console.log('Run');
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!password || !user.password) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    const TEACHER_ROLE = 'teacher'
    const response: any =  {
      access_token: await this.jwtService.signAsync(payload),
      role: user.role,
      user_id: user.id
    }
    if( user.role === TEACHER_ROLE){
   const lecturerInfor = await this.userRepository.findOne({
    where: { id: user.id },
    relations: ['lecturer']
      })
      response.lecturer_id = lecturerInfor.lecturer.id
    }
    return response;
  }
}
