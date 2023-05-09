import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

import * as Handlebars from 'handlebars';
import * as fs from 'fs-extra';

@Injectable()
export class MailerTemplateService {
  async getTemplate(templateName: string) {
    const templateString = await fs.readFile(
      resolve(__dirname, '..', 'templates', `${templateName}.hbs`),
      'utf8'
    );

    return Handlebars.compile(templateString, { noEscape: true });
  }
}
