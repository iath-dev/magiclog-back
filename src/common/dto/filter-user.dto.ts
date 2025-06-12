// src/users/dto/filter-users.dto.ts
import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterUsersDto {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  sellerOnly?: boolean;

  @IsOptional()
  @IsString()
  search?: string; // email o nombre si quieres mejorar la búsqueda
}
