import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailData, MailSenderService } from '@app/domain/contracts';

@Injectable()
export class MailerMailSenderService implements MailSenderService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMessage(emailData: EmailData) {
    this.mailerService.sendMail(emailData);
  }
}
