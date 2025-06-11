export interface ProductDto {
  name: string;
  price: number;
  description?: string;
}

export interface ProductEntity {
  id: number;
  name: string;
  price: number;
  description?: string;
  owner: any; // Puedes reemplazar 'any' por el tipo de usuario si lo deseas
}
