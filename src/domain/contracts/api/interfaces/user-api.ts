import { ReqResUser } from '@app/domain';

export interface UsersApi {
  getUserById(userId: number): Promise<ReqResUser>;
}
