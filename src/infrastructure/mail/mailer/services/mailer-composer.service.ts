import { User } from '@app/domain';
import { Injectable } from '@nestjs/common';
import { mailModels } from '../mail-models';
import { MailerTemplateService } from './mailer-template.service';
import { EmailData, MailConstructor, MailModelEnum } from '@domain/contracts';

@Injectable()
export class MailerConstructorService implements MailConstructor {
  constructor(private readonly mailTemplateService: MailerTemplateService) {}

  async constructMail(
    user: User,
    mailModel: MailModelEnum
  ): Promise<EmailData> {
    const { email, firstName } = user;
    const { subject, templateName } = mailModels[mailModel];

    const template = await this.mailTemplateService.getTemplate(templateName);
    const emailBody = template({ firstName });

    return {
      to: email,
      subject: subject,
      html: emailBody,
    };
  }
}
