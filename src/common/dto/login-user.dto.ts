import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @ApiProperty({
    example: 'usuario1',
    description: 'Nombre de usuario',
  })
  username!: string;

  @IsString()
  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  password!: string;
}
