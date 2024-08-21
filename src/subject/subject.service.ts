import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../entity/subject.entity';


@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  findAll(): Promise<Subject[]> {
    return this.subjectRepository.find({ relations: ['schedules'] });
  }

  findOne(id: number): Promise<Subject> {
    return this.subjectRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
  }

  create(subject: Subject): Promise<Subject> {
    return this.subjectRepository.save(subject);
  }

  async update(id: number, subject: Subject): Promise<Subject> {
    await this.subjectRepository.update(id, subject);
    return this.subjectRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.subjectRepository.delete(id);
  }
}
