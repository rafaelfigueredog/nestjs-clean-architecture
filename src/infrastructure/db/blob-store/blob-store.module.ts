import { Global, Module } from '@nestjs/common';
import { HashingModule, IDGeneratorModule } from '@infrastructure/common';
import { FileSystemProvider } from '@infrastructure/common';
import { AppConfigModule } from '@app/infrastructure/config';
import { FileSystemDirectoryService, FileSystemStoreService } from './services';
import { FileSystemRepository } from './repositories';

@Global()
@Module({
  imports: [AppConfigModule, HashingModule, IDGeneratorModule],
  providers: [
    FileSystemProvider,
    FileSystemRepository,
    FileSystemDirectoryService,
    FileSystemStoreService,
  ],
  exports: [FileSystemRepository],
})
export class BlobStoreModule {}
