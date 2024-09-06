import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, role: Role) {
    const user = await this.userService.findOne(username);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Truyền thêm role khi tạo user
    return this.userService.create(username, hashedPassword, role);
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

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
