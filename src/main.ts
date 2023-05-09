import { AppModule } from '@app/app.module';
import { useContainer } from 'class-validator';
import { NestFactory } from '@nestjs/core';
import { createSwaggerDocs } from '@infrastructure/docs';
import { AppConfigService } from '@infrastructure/config';

import {
  AxiosExceptionFilter,
  MongoExceptionFilter,
} from '@infrastructure/common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<AppConfigService>(AppConfigService);
  const apiPrefix = 'api';

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalFilters(new AxiosExceptionFilter());

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  createSwaggerDocs(app);

  const apiPort = appConfig.getApiPort();
  await app.listen(apiPort);
}

bootstrap();
