import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Role } from 'src/auth/role.enum';
import { Lecturer } from './lecturer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100, nullable: true })
  email: string;

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

  @OneToOne(() => Lecturer, (lecturer) => lecturer.user)
  lecturer: Lecturer; 
}
