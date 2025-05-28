import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { basename, extname } from 'path';
import { FileType } from 'src/constants';

@Injectable()
export class BucketsService {
  private basePath = path.join(process.cwd(), 'uploads');

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
      const extension = extname(originalName); // e.g. ".png"
      const baseName = basename(originalName, extension); // e.g. "avatar"
      const timestampedName = `${baseName}_${Date.now()}${extension}`;

      const folder = path.join(this.basePath, type);

      // Ensure folder exists (extra safety)
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }

      const fullPath = path.join(folder, timestampedName);

      // Write file synchronously
      fs.writeFileSync(fullPath, file.buffer);

      return fullPath;
    }
    return null
  }

  deleteFile(type: FileType, fileName: string) {
    const filePath = path.join(this.basePath, type, fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException();
    }

    fs.unlinkSync(filePath);
  }
}
