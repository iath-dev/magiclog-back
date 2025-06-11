import { JwtService, JwtSignOptions } from '@nestjs/jwt';

export function signJwt(
  jwtService: JwtService,
  payload: string,
  options?: JwtSignOptions,
): string {
  return jwtService.sign(payload, options);
}

export function verifyJwt(
  jwtService: JwtService,
  token: string,
  options?: JwtSignOptions,
): object {
  return jwtService.verify(token, options);
}
