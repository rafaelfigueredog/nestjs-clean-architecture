import { EmailData } from '@app/domain/contracts';

export interface MailSenderService {
  sendMessage(emailData: EmailData): Promise<void>;
}
