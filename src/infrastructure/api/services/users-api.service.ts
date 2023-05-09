import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '@infrastructure/config';
import { lastValueFrom, map } from 'rxjs';
import { UsersApi } from '@app/domain/contracts';
import { ReqResUser } from '@app/domain';

@Injectable()
export class UsersApiService implements UsersApi {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService
  ) {
    this.baseUrl = this.appConfigService.getUsersApiBaseUrl();
  }

  async getUserById(userId: number): Promise<ReqResUser> {
    const requestUrl = `${this.baseUrl}/users/${userId}`;

    const responseData = await lastValueFrom(
      this.httpService.get(requestUrl).pipe(map((res) => res.data))
    );

    const { data: user } = responseData;
    return new ReqResUser(user);
  }
}
