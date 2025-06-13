import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponse {
  @ApiProperty({ example: 'access_token', description: 'Token de JWT' })
  access_token!: string;
}
