import { User } from '@domain/entities';
import { Repository } from '@domain/contracts';

export interface UserRepository extends Repository<User> {
  existsByEmail(email: string): Promise<boolean>;
}
