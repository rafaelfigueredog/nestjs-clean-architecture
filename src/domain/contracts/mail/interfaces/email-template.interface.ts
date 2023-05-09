export interface MailTemplateService {
  getTemplate(templateName: string): Promise<string>;
}
