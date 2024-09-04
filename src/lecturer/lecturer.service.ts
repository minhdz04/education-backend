import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecturer } from '../entity/lecturer.entity';

@Injectable()
export class LecturerService {
  constructor(
    @InjectRepository(Lecturer)
    private lecturerRepository: Repository<Lecturer>,
  ) {}

  findAll(): Promise<Lecturer[]> {
    return this.lecturerRepository.find({ relations: ['schedules'] });
  }

  findOne(id: number): Promise<Lecturer | null> {
    return this.lecturerRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
  }

  async create(lecturer: Lecturer): Promise<Lecturer> {
    return this.lecturerRepository.save(lecturer);
  }

  async update(id: number, lecturer: Partial<Lecturer>): Promise<Lecturer> {
    await this.lecturerRepository.update(id, lecturer);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.lecturerRepository.delete(id);
  }
}
