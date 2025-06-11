import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { ProductEntity } from '../common/types/product.types';
import { AuthenticatedRequest } from '../common/types/request.types';
import { FilterProductDto } from 'src/common/dto/filter-product.dto';
import { PageResponseDto } from 'src/common/response/page-response.dto';
import { Product } from '../common/entities/product.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { UserRoleRole } from 'src/common/types/user.types';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('search')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleRole.Admin, UserRoleRole.Buyer)
  getFilteredProducts(
    @Query() filterDto: FilterProductDto,
  ): Promise<PageResponseDto<Product>> {
    return this.productService.findAllFiltered(filterDto);
  }

  @Get('own')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleRole.Seller, UserRoleRole.Admin)
  async findByOwner(
    @Request() req: AuthenticatedRequest,
  ): Promise<ProductEntity[]> {
    return this.productService.findByOwner(req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleRole.Admin)
  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleRole.Seller, UserRoleRole.Admin)
  @Post()
  async create(
    @Body() body: CreateProductDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<ProductEntity> {
    const { name, sku, price, quantity } = body;
    return this.productService.create(
      { name, sku, price, quantity },
      req.user.username,
    );
  }
}
