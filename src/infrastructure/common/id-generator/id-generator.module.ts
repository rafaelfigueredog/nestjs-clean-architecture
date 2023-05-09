import { Module } from '@nestjs/common';
import { CryptoProvider } from '@infrastructure/common';
import { CryptoIDGeneratorService } from './services';

@Module({
  imports: [],
  providers: [CryptoIDGeneratorService, CryptoProvider],
  exports: [CryptoIDGeneratorService],
})
export class IDGeneratorModule {}
