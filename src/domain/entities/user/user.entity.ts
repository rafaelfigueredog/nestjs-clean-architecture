import { UserProps } from '@domain/entities';

export class User {
  public id?: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public avatar?: string;

  constructor(props: UserProps) {
    this.id = props?.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.avatar = props?.avatar;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  hasAvatar(): boolean {
    return !!this.avatar;
  }
}
