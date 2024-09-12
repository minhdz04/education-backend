import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserController } from './user.controller';
import { Lecturer } from 'src/entity/lecturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Lecturer])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}