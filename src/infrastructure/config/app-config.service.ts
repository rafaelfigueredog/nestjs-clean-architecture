import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AppConfigService {
  private defaultApiPort = 3000;

  constructor(private readonly configService: ConfigService) {}

  getStoreDirectory(): string {
    return this.configService.get<string>('IMAGE_STORE_DIRECTORY');
  }

  getApiPort(): number {
    return this.configService.get<number>('API_PORT') || this.defaultApiPort;
  }

  getMongoDbUri(): string {
    return this.configService.get<string>('MONGO_URL');
  }

  getUsersApiBaseUrl(): string {
    return this.configService.get<string>('USERS_API_URL');
  }

  getRabbitMqUser(): string {
    return this.configService.get<string>('RABBITMQ_USER');
  }

  getRabbitMqPwd() {
    return this.configService.get<string>('RABBITMQ_PWD');
  }

  getRabbitMqHost() {
    return this.configService.get<string>('RABBITMQ_HOST');
  }

  getRabbitMqQueue() {
    return this.configService.get<string>('RABBITMQ_QUEUE');
  }

  getSmtpHost() {
    return this.configService.get<string>('SMTP_HOST');
  }

  getSmtpUser() {
    return this.configService.get<string>('SMTP_USER');
  }

  getSmtpPwd() {
    return this.configService.get<string>('SMTP_PASS');
  }
}
