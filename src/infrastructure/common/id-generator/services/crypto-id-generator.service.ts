import { Inject, Injectable } from '@nestjs/common';
import { UniqueIDGenerator } from '@domain/contracts';
import { CryptoService } from '@infrastructure/common';

@Injectable()
export class CryptoIDGeneratorService implements UniqueIDGenerator {
  constructor(
    @Inject('CRYPTO') private readonly cryptoService: CryptoService
  ) {}

  generateUUID(): string {
    return this.cryptoService.randomUUID();
  }
}
