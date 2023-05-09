import { Inject, Injectable } from '@nestjs/common';
import { AppConfigService } from '@infrastructure/config';
import { FileSystemService } from '@infrastructure/common';

@Injectable()
export class FileSystemDirectoryService {
  private readonly storeDirectory: string;

  constructor(
    @Inject('fs') private fileSystemService: FileSystemService,
    private appConfigService: AppConfigService
  ) {
    this.storeDirectory = this.appConfigService.getStoreDirectory();
    this.ensureStoreDirectoryExists();
  }

  private ensureStoreDirectoryExists(): void {
    if (!this.fileSystemService.existsSync(this.storeDirectory)) {
      this.fileSystemService.mkdirSync(this.storeDirectory);
    }
  }

  public getPathByHash(hash: string): string {
    return `${this.storeDirectory}/${hash}`;
  }
}
