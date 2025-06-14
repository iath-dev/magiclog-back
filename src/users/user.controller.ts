import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoleRole } from 'src/common/types/user.types';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/entities/user.entity';
import { FilterUsersDto } from 'src/common/dto/filter-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Obtener todos los usuarios',
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta OK',
    type: Array<User>,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales Invalidas',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleRole.Admin)
  @Get()
  async findAll(@Query() filter: FilterUsersDto): Promise<User[]> {
    return this.userService.findAll(filter);
  }
}
