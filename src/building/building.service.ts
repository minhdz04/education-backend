import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from '../entity/building.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
  ) {}

  findAll(): Promise<Building[]> {
    return this.buildingRepository.find();
  }

  findOne(id: number): Promise<Building | null> {
    return this.buildingRepository.findOneBy({ id });
  }

  async create(building: Building): Promise<Building> {
    return this.buildingRepository.save(building);
  }

  async update(id: number, building: Partial<Building>): Promise<Building> {
    await this.buildingRepository.update(id, building);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.buildingRepository.delete(id);
  }
}
