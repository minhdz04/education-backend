// building.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuildingService } from './building.service';
import { Building } from '../entity/building.entity';

@Controller('buildings')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  create(@Body() building: Building) {
    return this.buildingService.create(building);
  }

  @Get()
  findAll() {
    return this.buildingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() building: Building) {
    return this.buildingService.update(+id, building);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingService.remove(+id);
  }
}
