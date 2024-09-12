// building.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Classroom } from './classroom.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Classroom, (classroom) => classroom.building)
  classrooms: Classroom[];
}
