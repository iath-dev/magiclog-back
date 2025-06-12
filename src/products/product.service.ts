import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../common/entities/product.entity';
import { FilterProductDto } from 'src/common/dto/filter-product.dto';
import { PageResponseDto } from 'src/common/response/page-response.dto';
import { UserService } from 'src/users/user.service';
import { ProductResponseDto } from 'src/common/response/product-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAllFiltered(
    filterDto: FilterProductDto,
  ): Promise<PageResponseDto<Product>> {
    const {
      name,
      sku,
      username,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = filterDto;

    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.owner', 'owner')
      .select([
        'product.id',
        'product.name',
        'product.sku',
        'product.price',
        'product.stock',
        'owner.username',
      ])
      .addSelect('owner.username', 'ownerUsername');

    if (name) query.andWhere('product.name LIKE :name', { name: `%${name}%` });
    if (sku) query.andWhere('product.sku = :sku', { sku });

    if (username) query.andWhere('owner.username = :username', { username });

    if (minPrice) query.andWhere('product.price >= :minPrice', { minPrice });
    if (maxPrice) query.andWhere('product.price <= :maxPrice', { maxPrice });

    query.skip((page - 1) * limit).take(limit);

    const [products, total] = await query.getManyAndCount();

    return {
      items: products,
      currentPage: page,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      pageSize: limit,
    };
  }

  async findByOwner(userId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { owner: { id: userId } },
      relations: ['owner'],
    });
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['owner'] });
  }

  async create(
    product: Partial<Product>,
    username: string,
  ): Promise<ProductResponseDto> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new Error('User not found');
    }

    const newProduct = this.productRepository.create({
      ...product,
      owner: user,
    });

    return plainToInstance(
      ProductResponseDto,
      this.productRepository.save(newProduct),
      { excludeExtraneousValues: true },
    );
  }
}
