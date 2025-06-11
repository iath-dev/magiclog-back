export enum UserRoleRole {
  Admin = 'admin',
  Buyer = 'buyer',
  Seller = 'seller',
}

export interface JwtPayload {
  sub: number;
  username: string;
  role: UserRoleRole;
}
