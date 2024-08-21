import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentList } from '../entity/studentlist.entity';
import { StudentListService } from './studentlist.service';
import { StudentListController } from './studentlist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudentList])],
  providers: [StudentListService],
  controllers: [StudentListController],
  exports: [StudentListService],  // Exports service if other modules need to use it
})
export class StudentListModule {}
