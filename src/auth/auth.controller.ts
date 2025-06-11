import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from '../common/types/auth.types';
import { RegisterUserDto } from 'src/common/dto/register-user.dto';
import { User } from 'src/common/entities/user.entity';
import { LoginUserDto } from 'src/common/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<AuthResponse> {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body);
  }
}
