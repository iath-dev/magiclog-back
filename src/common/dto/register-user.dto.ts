import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '../types/user.types';

export class RegisterUserDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsString()
  @IsEnum(UserRole)
  role!: UserRole;
}
