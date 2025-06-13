import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/common/dto/register-user.dto';
import { User } from 'src/common/entities/user.entity';
import { LoginUserDto } from 'src/common/dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/common/types/request.types';
import { JwtPayload } from 'src/common/types/user.types';
import { AccessTokenResponse } from 'src/common/response/access-token-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Autentificacion del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta OK',
  })
  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<AccessTokenResponse> {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @ApiOperation({
    summary: 'Registro del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta OK',
  })
  @Post('register')
  async register(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body);
  }

  @ApiOperation({
    summary: 'Ontener perfil del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta OK',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest): JwtPayload {
    return req.user;
  }
}
