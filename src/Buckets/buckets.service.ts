import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { basename, extname } from 'path';
import { baseUrl, FileType } from 'src/constants';

@Injectable()
export class BucketsService {
  private basePath = 'uploads';

  constructor() {
    this.ensureBaseFolders();
  }

  private async ensureBaseFolders() {
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath);
    }

    for (const type of Object.values(FileType)) {
      const dirPath = path.join(this.basePath, type);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    }
  }

  saveFile(file: Express.Multer.File, type: FileType) {
    if (file) {
      const originalName = file.originalname;
      const baseName = basename(originalName); // e.g. "avatar"
      const timestampedName = `${Date.now()}_${baseName}`;

      const folder = path.join(this.basePath, type);

      // Ensure folder exists (extra safety)
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }

      let fullPath = path.join(folder, timestampedName);
      fullPath = fullPath.replace(/\\/g, '/');

      // Write file synchronously
      fs.writeFileSync(fullPath, file.buffer);

      return baseUrl + '/' + fullPath;
    }
    return null;
  }

  deleteFile(type: FileType, fileName: string) {
    const filePath = path.join(this.basePath, type, fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException();
    }

    fs.unlinkSync(filePath);
  }
}
