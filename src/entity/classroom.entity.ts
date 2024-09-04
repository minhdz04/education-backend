// classroom.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Building } from './building.entity';
import { Class } from './class.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Building, (building) => building.classrooms)
  building: Building;

  @OneToMany(() => Schedule, (schedule) => schedule.classroom)
  schedules: Schedule[];
  
  @OneToMany(() => Class, (classEntity) => classEntity.classroom)
  classes: Class[];
}
