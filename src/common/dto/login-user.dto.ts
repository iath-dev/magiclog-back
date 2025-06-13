import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @ApiProperty({
    example: 'admin@email.com',
    description: 'Nombre de usuario',
  })
  username!: string;

  @IsString()
  @ApiProperty({
    example: '123456',
    description: 'Contraseña del usuario',
  })
  password!: string;
}
