import { AvatarProps } from './avatar.type';

export class Avatar {
  id?: string;
  userId: string | number;
  hash: string;

  constructor(props: AvatarProps) {
    this.id = props.id;
    this.hash = props.hash;
    this.userId = props.userId;
  }
}
