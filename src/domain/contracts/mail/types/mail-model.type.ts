import { MailModelEnum } from './mail.model.enum';

export type MailModel = {
  [key in MailModelEnum]: {
    subject: string;
    templateName: string;
  };
};
