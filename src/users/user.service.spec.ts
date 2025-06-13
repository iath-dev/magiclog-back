import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from 'src/common/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUserRepository = () => ({
  createQueryBuilder: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Agrega aquí más pruebas unitarias para los métodos del servicio
});
