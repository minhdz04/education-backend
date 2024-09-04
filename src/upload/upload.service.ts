import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { readXlsxFile } from 'read-excel-file';
import { StudentList } from '../entity/studentlist.entity';
import { Schedule } from '../entity/schedule.entity';
import { Class } from '../entity/class.entity';
import { Shift } from '../entity/shift.entity';
import { Subject } from '../entity/Subject.entity';
import { Lecturer } from '../entity/lecturer.entity';
import { Classroom } from '../entity/classroom.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(StudentList)
    private readonly studentRepository: Repository<StudentList>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Lecturer)
    private readonly lecturerRepository: Repository<Lecturer>,
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}

  async processExcelFile(fileBuffer: Buffer, fileType: 'student' | 'schedule') {
    try {
      const rows = await readXlsxFile(fileBuffer);

      if (fileType === 'student') {
        return this.processStudentData(rows);
      } else if (fileType === 'schedule') {
        return this.processScheduleData(rows);
      } else {
        throw new Error('Invalid file type');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error processing the file');
    }
  }

  private async processStudentData(rows: any[]) {
    const dataRows = rows.slice(1); // Bỏ qua dòng đầu tiên nếu nó là tiêu đề
    for (const row of dataRows) {
      const student = new StudentList();
      student.studentId = row[0]; // Cột đầu tiên là studentId
      student.name = row[1]; // Cột thứ hai là name
      student.birthDate = new Date(row[2]); // Cột thứ ba là birthDate

      const classEntity = await this.classRepository.findOne({ where: { id: row[3] } }); // Cột thứ tư là classId
      student.class = classEntity;

      await this.studentRepository.save(student);
    }
    console.log('Student data saved successfully');
    return dataRows;
  }

  private async processScheduleData(rows: any[]) {
    const dataRows = rows.slice(1); // Bỏ qua dòng đầu tiên nếu nó là tiêu đề
    for (const row of dataRows) {
      const schedule = new Schedule();
      schedule.date = row[0]; // Cột đầu tiên là date

      schedule.shift = await this.shiftRepository.findOne({ where: { id: row[1] } }); // Cột thứ hai là shiftId
      schedule.class = await this.classRepository.findOne({ where: { id: row[2] } }); // Cột thứ ba là classId
      schedule.subject = await this.subjectRepository.findOne({ where: { id: row[3] } }); // Cột thứ tư là subjectId
      schedule.lecturer = await this.lecturerRepository.findOne({ where: { id: row[4] } }); // Cột thứ năm là lecturerId
      schedule.classroom = await this.classroomRepository.findOne({ where: { id: row[5] } }); // Cột thứ sáu là classroomId

      await this.scheduleRepository.save(schedule);
    }
    console.log('Schedule data saved successfully');
    return dataRows;
  }
}
