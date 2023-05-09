import { User, UserSchema } from './user.schema';
import { Avatar, AvatarSchema } from './avatar.schema';

export const schemas = [
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: Avatar.name,
    schema: AvatarSchema,
  },
];
