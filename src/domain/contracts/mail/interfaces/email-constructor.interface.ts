import { User } from '@app/domain';
import { EmailData, MailModelEnum } from '@app/domain/contracts';

export interface MailConstructor {
  constructMail(user: User, mailModel: MailModelEnum): Promise<EmailData>;
}
