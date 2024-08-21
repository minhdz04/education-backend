// shift.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { Shift } from '../entity/Shift.entity';

@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  create(@Body() shift: Shift) {
    return this.shiftService.create(shift);
  }

  @Get()
  findAll() {
    return this.shiftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() shift: Shift) {
    return this.shiftService.update(+id, shift);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftService.remove(+id);
  }
}
