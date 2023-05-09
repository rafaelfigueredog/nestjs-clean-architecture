import { Module } from '@nestjs/common';
import { CryptoProvider } from '@infrastructure/common/providers';
import { CryptoHashGeneratorService } from './services';

@Module({
  imports: [],
  providers: [CryptoHashGeneratorService, CryptoProvider],
  exports: [CryptoHashGeneratorService, CryptoProvider],
})
export class HashingModule {}
