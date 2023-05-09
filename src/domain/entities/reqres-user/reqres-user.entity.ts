import { ReqResUserProps } from './reqres-user.props';

export class ReqResUser {
  public id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public avatar: string;

  constructor(props: ReqResUserProps) {
    this.id = props.id;
    this.first_name = props.first_name;
    this.last_name = props.last_name;
    this.email = props.email;
    this.avatar = props.avatar;
  }
}
