import { Injectable } from '@nestjs/common';
import { readXlsxFile } from 'read-excel-file';

@Injectable()
export class UploadService {
  async processExcelFile(fileBuffer: Buffer) {
    try {
      const rows = await readXlsxFile(fileBuffer);
      // Thêm logic xử lý ở đây, ví dụ lưu vào cơ sở dữ liệu+
      console.log(rows);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Error processing the file');
    }
  }
}
