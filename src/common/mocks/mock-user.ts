import { UserRoleRole } from 'src/common/types/user.types';
import { User } from '../entities/user.entity';

export const mockUser: User = {
  id: 1,
  username: 'usuario1',
  password: 'hashedpassword',
  role: UserRoleRole.Seller,
  products: [],
  hashPassword: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const mockUserList: User[] = [
  {
    id: 1,
    username: 'usuario1',
    password: 'hashedpassword',
    role: UserRoleRole.Seller,
    products: [],
    hashPassword: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  },
  {
    id: 2,
    username: 'usuario2',
    password: 'hashedpassword2',
    role: UserRoleRole.Buyer,
    products: [],
    hashPassword: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  },
  {
    id: 3,
    username: 'admin',
    password: 'hashedadmin',
    role: UserRoleRole.Admin,
    products: [],
    hashPassword: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
  },
];
