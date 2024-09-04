// shift.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from '../entity/shift.entity';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private shiftRepository: Repository<Shift>,
  ) {}

  create(shift: Shift): Promise<Shift> {
    return this.shiftRepository.save(shift);
  }

  findAll(): Promise<Shift[]> {
    return this.shiftRepository.find();
  }

  findOne(id: number): Promise<Shift> {
    return this.shiftRepository.findOne({ where: { id } });
  }

  async update(id: number, shift: Shift): Promise<Shift> {
    await this.shiftRepository.update(id, shift);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.shiftRepository.delete(id);
  }
}
