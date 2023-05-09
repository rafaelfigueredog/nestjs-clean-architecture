import { Provider } from '@nestjs/common';
import { SendMailUseCase } from '@use-cases/mail';
import { MailConstructor, MailSenderService } from '@app/domain/contracts';

import {
  MailerConstructorService,
  MailerMailSenderService,
} from '@infrastructure/mail';

export const SendMailUseCaseProvider: Provider = {
  provide: SendMailUseCase,
  useFactory: (
    mailConstructor: MailConstructor,
    mailSender: MailSenderService
  ) => {
    return new SendMailUseCase(mailConstructor, mailSender);
  },
  inject: [MailerConstructorService, MailerMailSenderService],
};
