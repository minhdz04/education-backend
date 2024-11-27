import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classroom } from '../entity/classroom.entity';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
  ) {}

  findAll(): Promise<Classroom[]> {
    return this.classroomRepository.find({relations:["building"]});
  }

  findOne(id: number): Promise<Classroom | null> {
    return this.classroomRepository.findOneBy({ id });
  }

  async create(classroom: Classroom): Promise<Classroom> {
    return this.classroomRepository.save(classroom);
  }

  async update(id: number, classroom: Partial<Classroom>): Promise<Classroom> {
    await this.classroomRepository.update(id, classroom);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.classroomRepository.delete(id);
  }

  // async getClassroomsByBuildingId(buildingId: number): Promise<Classroom[]> {
  //   return this.classroomRepository.getClassroomsByBuildingId(buildingId);
  // }
}
