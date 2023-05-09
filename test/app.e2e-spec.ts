import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@app/app.module';
import { Connection } from 'mongoose';
import { MongoDbService } from '@infrastructure/db/mongo';
import { CreateUserDto } from '@infrastructure/modules/users/dtos';
import { useContainer } from 'class-validator';

import * as pactum from 'pactum';

import {
  AxiosExceptionFilter,
  MongoExceptionFilter,
} from '@infrastructure/common';

const apiBaseUrl = process.env.API_URL;
const apiPort = process.env.API_PORT;

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let userDto: CreateUserDto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [MongoDbService],
    }).compile();

    app = moduleFixture.createNestApplication({
      logger: false,
    });

    app.setGlobalPrefix('api');
    app.useGlobalFilters(new MongoExceptionFilter());
    app.useGlobalFilters(new AxiosExceptionFilter());

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();
    await app.listen(apiPort);

    // get database service
    const mongoDbService = moduleFixture.get<MongoDbService>(MongoDbService);

    // get db connection
    dbConnection = mongoDbService.getConnection();

    // drop database before start the tests.
    await dbConnection.db.dropDatabase();

    // set base url of api for requests.
    pactum.request.setBaseUrl(apiBaseUrl);
  });

  afterAll(() => {
    app.close();
  });

  describe('Users Controller', () => {
    it('should create a user', () => {
      userDto = {
        first_name: 'Gaby',
        last_name: 'Dowell',
        email: 'gdowell@mailinator.com',
        avatar: null,
      };

      return pactum
        .spec()
        .post('/api/users')
        .withBody(userDto)
        .expectStatus(201);
    });

    it('should throw BadRequestException when creating a user with a duplicated email', () => {
      return pactum
        .spec()
        .post('/api/users')
        .withBody(userDto)
        .expectStatus(400);
    });

    it('should retrieve a user', () => {
      const userId = 1;

      return pactum
        .spec()
        .get(`/api/user/${userId}`)
        .expectStatus(200)
        .expectHeader('content-type', 'application/json; charset=utf-8');
    });

    it('should retrieve a user avatar', () => {
      const userId = 1;

      return pactum.spec().get(`/api/user/${userId}/avatar`).expectStatus(200);
    });

    it('should remove a user avatar', () => {
      const userId = 1;

      return pactum
        .spec()
        .delete(`/api/user/${userId}/avatar`)
        .expectStatus(200);
    });
  });
});
