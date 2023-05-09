import { Connection } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule } from '@infrastructure/config';
import { MongoDbService, MongoDbModule } from '@infrastructure/db';

describe('MongoDbService', () => {
  let service: MongoDbService;
  let dbConnection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongoDbModule, AppConfigModule],
      providers: [MongoDbService],
    }).compile();

    service = module.get<MongoDbService>(MongoDbService);
    dbConnection = service.getConnection();
  });

  it('Database service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Database connection should be defined', () => {
    expect(dbConnection).toBeDefined();
  });
});
