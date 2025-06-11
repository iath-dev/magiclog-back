import { Expose, Type } from 'class-transformer';

export class ProductOwnerDto {
  @Expose()
  username!: string;

  @Expose()
  role!: string;
}

export class ProductResponseDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  sku!: string;

  @Expose()
  quantity!: number;

  @Expose()
  price!: number;

  @Expose()
  @Type(() => ProductOwnerDto)
  owner!: ProductOwnerDto;
}
