import { ReqResUser } from '@domain/entities';
import { UsersApi } from '@domain/contracts';

export class GetReqResUserUseCase {
  constructor(private usersApi: UsersApi) {}

  async execute(userId: number): Promise<ReqResUser> {
    return this.usersApi.getUserById(userId);
  }
}
