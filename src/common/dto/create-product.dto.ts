import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Computador', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'computer', description: 'SKU del producto' })
  @IsString()
  @IsNotEmpty()
  sku!: string;

  @ApiProperty({ example: 5, description: 'Cantidad' })
  @IsNumber()
  stock!: number;

  @ApiProperty({ example: 10000, description: 'Precio por unidad COP' })
  @IsNumber()
  price!: number;
}
