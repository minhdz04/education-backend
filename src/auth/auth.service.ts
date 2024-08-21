import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return this.userService.create(username, hashedPassword);
  }

  async login(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    console.log('Password provided:', password);
    console.log('Hashed password from DB:', user.password);

    if (!password || !user.password) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
