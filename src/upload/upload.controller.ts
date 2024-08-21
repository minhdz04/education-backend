import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

@Controller('excel')
export class UploadController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcelFile(@UploadedFile() file: Express.Multer.File) {
    
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      console.log(file);
      // Đọc dữ liệu từ buffer của tệp
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });

      // Lấy tên của sheet đầu tiên
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Chuyển đổi sheet thành JSON
      const data = XLSX.utils.sheet_to_json(worksheet);

      console.log(data);

      return data;
    } catch (error) {
      console.error('Error processing the file:', error);
      throw new HttpException('Error processing the file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
