import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMqService } from '@infrastructure/messaging/rabbitmq';
import { RabbitMqModule } from '@infrastructure/messaging';
import { AppConfigModule } from '@app/infrastructure/config';

describe('RabbitMqService', () => {
  let service: RabbitMqService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppConfigModule, RabbitMqModule],
      providers: [RabbitMqService],
    }).compile();

    service = module.get<RabbitMqService>(RabbitMqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send message', async () => {
    const user = {
      id: '6431cbbffc13ae012e69e59a',
      first_name: 'Gaby',
      last_name: 'Dowell',
      email: 'gdowell9@google.nl',
    };

    await expect(service.emitToQueue('Message test', user)).resolves;
  });
});
