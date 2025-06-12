import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { FilterUsersDto } from 'src/common/dto/filter-user.dto';
import { UserRoleRole } from 'src/common/types/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findAll(filter: FilterUsersDto): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');

    if (filter.sellerOnly) {
      query.andWhere('user.role = :isSeller', {
        isSeller: UserRoleRole.Seller,
      });
    }

    if (filter.search) {
      query.andWhere('(user.username ILIKE :search)', {
        search: `%${filter.search}%`,
      });
    }

    return query.select(['user.id', 'user.username']).getMany();
  }
}
