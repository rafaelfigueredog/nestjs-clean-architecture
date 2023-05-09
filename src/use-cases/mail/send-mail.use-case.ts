import { User } from '@domain/entities';

import {
  MailConstructor,
  MailModelEnum,
  MailSenderService,
} from '@domain/contracts';

export class SendMailUseCase {
  constructor(
    private mailConstructor: MailConstructor,
    private mailSenderService: MailSenderService
  ) {}

  async execute(user: User): Promise<void> {
    const model = MailModelEnum.WELCOME;
    const emailData = await this.mailConstructor.constructMail(user, model);
    return this.mailSenderService.sendMessage(emailData);
  }
}
