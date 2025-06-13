import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product } from 'src/common/entities/product.entity';
import { UserService } from 'src/users/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockProduct, mockProductList } from 'src/common/mocks/mock-product';

const mockFindByUsername = jest.fn();
const mockFind = jest.fn();
const mockCreate = jest.fn();

const mockProductRepository = () => ({
  createQueryBuilder: jest.fn(),
  find: mockFind,
  create: mockCreate,
  save: jest.fn(),
});

const mockUserService = () => ({
  findByUsername: mockFindByUsername,
});

describe('ProductService', () => {
  let service: ProductService;
  let productRepo: jest.Mocked<Repository<Product>>;
  let userService: ReturnType<typeof mockUserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: UserService, useFactory: mockUserService },
        {
          provide: getRepositoryToken(Product),
          useFactory: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepo = module.get(getRepositoryToken(Product));
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByOwner', () => {
    it('should return products by owner ID', async () => {
      const fakeProducts: Product[] = mockProductList;
      productRepo.find.mockResolvedValue(fakeProducts);

      const result = await service.findByOwner(1);
      expect(result).toEqual(fakeProducts);
      expect(mockFind).toHaveBeenCalledWith({
        where: { owner: { id: 1 } },
        relations: ['owner'],
      });
    });
  });

  describe('create', () => {
    it('should create a product linked to user', async () => {
      const user = { id: 1, username: 'test' };
      const newProduct = mockProduct;
      const createdProduct = { ...newProduct, id: 1, owner: user } as Product;

      userService.findByUsername.mockResolvedValue(user);
      productRepo.create.mockReturnValue(createdProduct);
      productRepo.save.mockResolvedValue(createdProduct);

      const result = await service.create(newProduct, 'test');
      expect(userService.findByUsername).toHaveBeenCalledWith('test');
      expect(mockCreate).toHaveBeenCalledWith({
        ...newProduct,
        owner: user,
      });
      expect(result).toEqual(
        expect.objectContaining({ name: mockProduct.name }),
      );
    });

    it('should throw if user not found', async () => {
      userService.findByUsername.mockResolvedValue(undefined);

      await expect(
        service.create({ name: 'P1' } as any, 'test'),
      ).rejects.toThrow('User not found');
    });
  });

  // Agrega aquí más pruebas unitarias para los métodos del servicio
});
