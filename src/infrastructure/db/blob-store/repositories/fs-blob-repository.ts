import { BlobRepository } from '@domain/contracts';
import { FileSystemStoreService } from '../services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileSystemRepository implements BlobRepository {
  constructor(private fileSystemStore: FileSystemStoreService) {}

  async create(blob: ArrayBuffer): Promise<string> {
    return this.fileSystemStore.save(blob);
  }

  async remove(hash: string): Promise<void> {
    return this.fileSystemStore.delete(hash);
  }

  async findOne(hash: string): Promise<string> {
    return this.fileSystemStore.getBase64(hash);
  }
}
