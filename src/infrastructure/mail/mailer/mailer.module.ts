import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppConfigService } from '@infrastructure/config';
import { AppConfigModule } from '@app/infrastructure';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';

import {
  MailerConstructorService,
  MailerMailSenderService,
  MailerTemplateService,
} from './services';
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) => {
        const host = configService.getSmtpHost();
        const user = configService.getSmtpUser();
        const pass = configService.getSmtpPwd();

        return {
          transport: {
            host,
            auth: {
              user,
              pass,
            },
            defaults: {
              from: user,
            },
            template: {
              dir: join(__dirname, '/templates'),
              adapter: new HandlebarsAdapter(),
              options: {
                strict: true,
              },
            },
          },
        };
      },
    }),
  ],
  providers: [
    MailerMailSenderService,
    MailerTemplateService,
    MailerConstructorService,
  ],
  exports: [
    MailerMailSenderService,
    MailerTemplateService,
    MailerConstructorService,
  ],
})
export class MailerMailModule {}
