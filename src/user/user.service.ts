import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDto } from './dto/update.dto'; // Đảm bảo bạn có DTO này cho update

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(username: string, password: string): Promise<User> {
    const newUser = this.userRepository.create({ username, password });
    return this.userRepository.save(newUser);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateDto): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Cập nhật thông tin người dùng với updateUserDto
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user); // Lưu người dùng đã cập nhật vào DB
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.remove(user); // Xóa người dùng khỏi DB
  }
}
