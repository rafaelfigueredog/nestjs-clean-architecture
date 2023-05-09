import { User } from '@domain/entities';
import { Mapper } from '@app/domain/contracts';
import { UserDto } from '../dtos';

export class UserMapper implements Mapper<User, UserDto> {
  public toEntity(userDto: UserDto): User {
    return new User({
      email: userDto.email,
      firstName: userDto.first_name,
      lastName: userDto.last_name,
      avatar: userDto.avatar,
    });
  }

  public toDto(entity: User): UserDto {
    return {
      id: entity.id,
      email: entity.email,
      first_name: entity.firstName,
      last_name: entity.lastName,
      avatar: entity.avatar ? entity.avatar : null,
    };
  }
}
