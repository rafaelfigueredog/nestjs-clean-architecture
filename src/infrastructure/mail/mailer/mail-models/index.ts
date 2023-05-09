import { MailModel } from '@domain/contracts';

export const mailModels: MailModel = {
  WELCOME: {
    subject: "Thanks for joining us - Let's get started!",
    templateName: 'user-welcome',
  },
};
