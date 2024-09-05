import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../entity/class.entity';
import { Classroom } from '../entity/classroom.entity';
import { Schedule } from '../entity/schedule.entity';
import { Shift } from '../entity/shift.entity';
import { StudentList } from '../entity/studentlist.entity';
import moment from 'moment';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(StudentList)
    private readonly studentListRepository: Repository<StudentList>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}

  private parseDate(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  async importData(data: any) {
    // Lấy thông tin lớp học
    const className = data['Column6'][1];
    const classroomName = 'Classroom Name'; // Placeholder, cần lấy từ dữ liệu hoặc định nghĩa sẵn
    const shiftName = data['Column8'][1];
    const shiftStartTime = '08:00:00'; // Placeholder, cần lấy từ dữ liệu hoặc định nghĩa sẵn
    const shiftEndTime = '17:00:00'; // Placeholder, cần lấy từ dữ liệu hoặc định nghĩa sẵn

    // Tạo hoặc tìm lớp học
    let classEntity = await this.classRepository.findOne({
      where: { name: className },
    });
    if (!classEntity) {
      classEntity = this.classRepository.create({ name: className });
      await this.classRepository.save(classEntity);
    }

    // Tạo hoặc tìm classroom
    let classroomEntity = await this.classroomRepository.findOne({
      where: { name: classroomName },
    });
    if (!classroomEntity) {
      classroomEntity = this.classroomRepository.create({
        name: classroomName,
      });
      await this.classroomRepository.save(classroomEntity);
    }

    // Tạo hoặc tìm shift
    let shiftEntity = await this.shiftRepository.findOne({
      where: { name: shiftName },
    });
    if (!shiftEntity) {
      shiftEntity = this.shiftRepository.create({
        name: shiftName,
        startTime: shiftStartTime,
        endTime: shiftEndTime,
      });
      await this.shiftRepository.save(shiftEntity);
    }

    // Lặp qua dữ liệu sinh viên để tạo hoặc cập nhật sinh viên
    for (let i = 1; i < data['Column1'].length; i++) {
      const studentId = data['Column2'][i];
      const studentName = data['Column3'][i];
      const birthDateString = data['Column4'][i];
      const birthDate = this.parseDate(birthDateString);

      let studentEntity = await this.studentListRepository.findOne({
        where: { studentId },
      });
      if (!studentEntity) {
        studentEntity = this.studentListRepository.create({
          studentId,
          name: studentName,
          birthDate,
          class: classEntity,
        });
        await this.studentListRepository.save(studentEntity);
      }
    }

    // Tạo lịch trình
    for (let i = 1; i < data['Column9'].length; i++) {
      const scheduleDateString = data['Column9'][i];
      const date = moment('1899-12-30')
        .add(scheduleDateString, 'days')
        .format('YYYY/MM/DD');

      const scheduleEntity = this.scheduleRepository.create({
        date: date + '',
        shift: shiftEntity,
        class: classEntity,
        classroom: classroomEntity,
      });
      await this.scheduleRepository.save(scheduleEntity);
    }
  }
}
