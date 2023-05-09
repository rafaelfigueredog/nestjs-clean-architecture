import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AvatarApi } from '@domain/contracts';
import { UsersApiService } from './users-api.service';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AvatarApiService implements AvatarApi {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersApi: UsersApiService
  ) {}

  async getAvatarByUserId(userId: number): Promise<ArrayBuffer> {
    const user = await this.usersApi.getUserById(userId);

    const { avatar: avatarUrl } = user;

    const responseData = await lastValueFrom(
      this.httpService
        .get(avatarUrl, { responseType: 'arraybuffer' })
        .pipe(map((res) => res.data))
    );

    return responseData;
  }
}
