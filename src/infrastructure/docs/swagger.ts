import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function createSwaggerDocs(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Api Docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
}

export { createSwaggerDocs };
