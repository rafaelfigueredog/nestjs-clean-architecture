import { Avatar } from '@domain/entities';
import { Repository } from '@domain/contracts';

export interface AvatarRepository extends Repository<Avatar | null> {
  findOneByUserId(userId: number): Promise<Avatar | null>;
}
