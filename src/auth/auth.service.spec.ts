import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload, UserRoleRole } from 'src/common/types/user.types';
import { RegisterUserDto } from 'src/common/dto/register-user.dto';
import { mockUser } from 'src/common/mocks/mock-user';

const mockJwtService = () => ({
  sign: jest.fn().mockReturnValue('mockToken'),
});

const mockUserService = () => ({
  findByUsername: jest.fn().mockResolvedValue(mockUser),
  create: jest.fn(),
});

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('AuthService', () => {
  let authService: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByUsername: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockToken'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('debería retornar null si el usuario no existe', async () => {
      userService.findByUsername.mockResolvedValue(null);

      const result = await authService.validateUser('nonexistent', 'password');
      expect(result).toBeNull();
    });

    it('debería retornar null si la contraseña es incorrecta', async () => {
      mockUserService().findByUsername.mockResolvedValue(mockUser);
      // (userService.findByUsername as jest.Mock).mockResolvedValue(mockUser);

      // jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      jest.mock('bcryptjs', () => ({
        ...jest.requireActual('bcryptjs'),
        compare: jest.fn(),
      }));

      const result = await authService.validateUser(
        'testuser',
        'wrongpassword',
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('debería retornar un token de acceso', () => {
      const mockUserPayload = {
        username: 'testuser',
        sub: 1,
        role: UserRoleRole.Seller,
      };

      const result = authService.login(mockUserPayload);
      expect(result).toEqual({ access_token: 'mockToken' });
    });
  });
});
