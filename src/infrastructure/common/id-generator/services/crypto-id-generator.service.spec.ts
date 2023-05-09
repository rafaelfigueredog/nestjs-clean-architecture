import { CryptoIDGeneratorService } from './crypto-id-generator.service';
import * as crypto from 'crypto';

describe('CryptoIDGeneratorService', () => {
  let idGenerator: CryptoIDGeneratorService;

  beforeEach(() => {
    idGenerator = new CryptoIDGeneratorService(crypto);
  });

  describe('generateUUID', () => {
    it('should generate an uuid', () => {
      const result = idGenerator.generateUUID();

      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });
});
