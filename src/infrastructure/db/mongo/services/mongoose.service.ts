import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@infrastructure/config';

import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseService implements MongooseOptionsFactory {
  constructor(private appConfigService: AppConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const uri = this.appConfigService.getMongoDbUri();
    return { uri };
  }
}
