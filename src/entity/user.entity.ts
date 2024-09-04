// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Attendance } from './attendance.entity';

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

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances: Attendance[];
}
