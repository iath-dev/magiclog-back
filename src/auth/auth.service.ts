import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from '../common/types/user.types';
import { AuthResponse } from '../common/types/auth.types';
import { RegisterUserDto } from 'src/common/dto/register-user.dto';
import { User } from 'src/common/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<JwtPayload | null> {
    const user = (await this.userService.findByUsername(username)) as
      | User
      | undefined;
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return {
        username: result.username,
        sub: result.id,
        role: result.role,
      };
    }
    return null;
  }

  login(user: JwtPayload): AuthResponse {
    const payload = { username: user.username, sub: user.sub, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  register(data: RegisterUserDto) {
    return this.userService.create(data);
  }
}
