import { Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/contracts';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'UniqueEmail', async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async validate(email: string) {
    const exists = await this.userRepository.existsByEmail(email);
    return !exists;
  }

  defaultMessage() {
    return 'The provided email address already exists in our records';
  }
}
