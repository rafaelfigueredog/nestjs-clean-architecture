import { Test, TestingModule } from '@nestjs/testing';
import { CryptoHashGeneratorService } from '@infrastructure/common/hashing';
import { CryptoProvider } from '@infrastructure/common/providers';

describe('HashService', () => {
  let hashService: CryptoHashGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoHashGeneratorService, CryptoProvider],
    }).compile();

    hashService = module.get<CryptoHashGeneratorService>(
      CryptoHashGeneratorService
    );
  });

  it('should be defined', () => {
    expect(hashService).toBeDefined();
  });

  describe('create', () => {
    it('should create a hash using SHA-256 algorithm and hex encoding', () => {
      const hash = hashService.generateHash('uuid');

      expect(hash).toBeTruthy();
      expect(typeof hash).toBe('string');
    });
  });
});
