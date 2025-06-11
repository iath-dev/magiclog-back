import { IsEnum, IsString } from 'class-validator';
import { UserRoleRole } from '../types/user.types';

export class RegisterUserDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsString()
  @IsEnum(UserRoleRole)
  role!: UserRoleRole;
}
