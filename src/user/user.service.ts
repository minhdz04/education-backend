import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDto } from './dto/update.dto'; // Đảm bảo bạn có DTO này cho update
import { Role } from 'src/auth/role.enum'; // Import enum Role
import * as bcrypt from 'bcrypt';
import { Lecturer } from 'src/entity/lecturer.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Lecturer) // Tiêm Lecturer repository
    private readonly lecturerRepository: Repository<Lecturer>,
  ) {}
  async create(username: string, password: string, email: string, role: Role): Promise<User> {
    try {
      // Kiểm tra người dùng đã tồn tại chưa
      const existingUser = await this.userRepository.findOne({
        where: { username },
      });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Tạo người dùng mới và bao gồm trường email
      const newUser = this.userRepository.create({ username, password, email, role });

      // Lưu người dùng mới
      const savedUser = await this.userRepository.save(newUser);

      // Nếu vai trò là Teacher, tạo thông tin cho Lecturer
      if (role === Role.Teacher) {
        const newLecturer = this.lecturerRepository.create({
          name: savedUser.username,
          user: savedUser,
        });
        await this.lecturerRepository.save(newLecturer);
      }

      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new Error(`Failed to create user: ${error.message}`);
    }
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

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
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

    // Xóa thông tin Lecturer liên quan (nếu có)
    await this.lecturerRepository.delete({ user: user });

    // Xóa người dùng
    await this.userRepository.remove(user);
  }

}
