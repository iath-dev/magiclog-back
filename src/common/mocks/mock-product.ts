import { Product } from '../entities/product.entity';
import { mockUser, mockUserList } from './mock-user';

export const mockProduct: Product = {
  id: 1,
  name: 'Producto de prueba',
  sku: 'SKU-001',
  price: 10000,
  stock: 5,
  owner: mockUser,
};

export const mockProductList: Product[] = [
  {
    id: 1,
    name: 'Producto de prueba 1',
    sku: 'SKU-001',
    price: 10000,
    stock: 5,
    owner: mockUserList[0],
  },
  {
    id: 2,
    name: 'Producto de prueba 2',
    sku: 'SKU-002',
    price: 20000,
    stock: 10,
    owner: mockUserList[1],
  },
  {
    id: 3,
    name: 'Producto de prueba 3',
    sku: 'SKU-003',
    price: 30000,
    stock: 2,
    owner: mockUserList[2],
  },
];
