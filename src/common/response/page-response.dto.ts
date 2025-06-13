import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PageResponseDto<T> {
  @ApiProperty({ description: 'Contenido de la respuesta' })
  @Expose()
  items!: T[];

  @ApiProperty({ example: 10, description: 'Numero total de objetos' })
  @Expose()
  totalItems!: number;

  @ApiProperty({ example: 10, description: 'Total de paginas' })
  @Expose()
  totalPages!: number;

  @ApiProperty({ example: 1, description: 'Pagina actual' })
  @Expose()
  currentPage!: number;

  @ApiProperty({ example: 10, description: 'Tamaño de pagina' })
  @Expose()
  pageSize!: number;
}
