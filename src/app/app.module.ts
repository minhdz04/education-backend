import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { StudentListModule } from 'src/studentlist/studentlist.module';
import { ClassModule } from 'src/class/class.module';
import { ShiftModule } from 'src/shift/shift.module';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { BuildingModule } from 'src/building/building.module';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { LecturerModule } from 'src/lecturer/lecturer.module';
import { StudentClassModule } from 'src/studentclass/studentclass.module';
import { AttendanceHistoryModule } from 'src/attendance-history/attendance-history.module';
import { UploadModule } from 'src/upload/upload.module';
import { SubjectModule } from 'src/subject/subject.module';
import { AuthModule } from 'src/auth/auth.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: '103.229.42.113',
        port: 3306,
        username: 'root',
        password: 'PASSWORD',
        database: 'attendence_system_v2',
        entities: ['dist/**/*.entity{.ts,.js}'],
        // synchronize: true,
      }),
    }),
    //Thêm các module khác
    UserModule,
    StudentListModule,
    StudentClassModule,
    ShiftModule,
    ScheduleModule,
    ClassroomModule,
    ClassModule,
    BuildingModule,
    AttendanceModule,
    AttendanceHistoryModule,
    LecturerModule,
    UploadModule,
    SubjectModule,
    AuthModule
    
  ],
})
export class AppModule {}
