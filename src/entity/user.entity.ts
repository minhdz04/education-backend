import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Role } from 'src/auth/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Teacher, // Giá trị mặc định là Teacher
  })
  role: Role;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances: Attendance[];
}
