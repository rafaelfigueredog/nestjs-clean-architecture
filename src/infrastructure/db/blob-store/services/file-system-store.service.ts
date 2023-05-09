import { CryptoIDGeneratorService } from '@infrastructure/common';
import { Inject, Injectable } from '@nestjs/common';
import { FileSystemDirectoryService } from './file-system-directory.service';

import {
  CryptoHashGeneratorService,
  FileSystemService,
} from '@infrastructure/common';

@Injectable()
export class FileSystemStoreService {
  constructor(
    @Inject('fs') private fileSystemService: FileSystemService,
    private directoryService: FileSystemDirectoryService,
    private hashService: CryptoHashGeneratorService,
    private uuidGeneratorService: CryptoIDGeneratorService
  ) {}

  async getBase64(hash: string): Promise<string> {
    const path = this.directoryService.getPathByHash(hash);
    return this.fileSystemService.readFileSync(path, {
      encoding: 'base64',
    });
  }

  async delete(hash: string): Promise<void> {
    const path = this.directoryService.getPathByHash(hash);
    return this.fileSystemService.unlinkSync(path);
  }

  async save(image: ArrayBuffer): Promise<string> {
    const uuid = this.uuidGeneratorService.generateUUID();
    const hash = await this.hashService.generateHash(uuid);
    const path = this.directoryService.getPathByHash(hash);
    this.fileSystemService.writeFileSync(path, Buffer.from(image));
    return hash;
  }
}
