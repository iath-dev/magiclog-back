import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserRoleRole } from '../types/user.types';

export class RegisterUserDto {
  @ApiProperty({
    example: 'usuario1',
    description: 'Nombre de usuario',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @IsString()
  password!: string;

  @ApiProperty({
    example: 'buyer',
    description: 'Rol del usuario (admin, buyer, seller)',
    required: false,
  })
  @IsString()
  @IsEnum(UserRoleRole)
  role!: UserRoleRole;
}
