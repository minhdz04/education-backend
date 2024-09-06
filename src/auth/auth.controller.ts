import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
//import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './auth.decorator';
import { Role } from './role.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.username,
      registerDto.password,
      Role.Teacher,
    );
  }

  @Post('login')
  @Public()
  login(@Body() loginDto: LoginDto) {
    console.log('Login ...');
    return this.authService.login(loginDto.username, loginDto.password);
  }
}
