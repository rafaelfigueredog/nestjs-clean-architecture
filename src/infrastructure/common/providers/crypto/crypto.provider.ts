import { Provider } from '@nestjs/common';

import * as crypto from 'crypto';

export const CryptoProvider: Provider = {
  provide: 'CRYPTO',
  useValue: crypto,
};

export type CryptoService = typeof crypto;
