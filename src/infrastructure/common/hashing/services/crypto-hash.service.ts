import { Inject, Injectable } from '@nestjs/common';
import { HashGenerator } from '@domain/contracts';
import { CryptoService } from '@infrastructure/common';

@Injectable()
export class CryptoHashGeneratorService implements HashGenerator {
  private readonly algorithm = 'sha256';
  private readonly encoding = 'hex';

  constructor(
    @Inject('CRYPTO') private readonly cryptoService: CryptoService
  ) {}

  generateHash(uuid: string): string {
    return this.cryptoService
      .createHash(this.algorithm)
      .update(uuid)
      .digest(this.encoding);
  }
}
