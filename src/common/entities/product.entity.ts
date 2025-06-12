import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  sku!: string;

  @Column('int')
  stock!: number;

  @Column('decimal')
  price!: number;

  @ManyToOne(() => User, (user) => user.products)
  owner!: User;
}
