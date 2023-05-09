import { Avatar, AvatarProps } from '@domain/entities/avatar';

describe('Avatar', () => {
  const props: AvatarProps = {
    id: '1',
    userId: 2,
    hash: 'abc123',
  };

  it('should create an Avatar object with given props', () => {
    const avatar = new Avatar(props);

    expect(avatar.id).toBe('1');
    expect(avatar.userId).toBe(2);
    expect(avatar.hash).toBe('abc123');
  });

  it('should create an Avatar object without id when id is not provided', () => {
    const avatar = new Avatar({ hash: 'hash', userId: 1 });

    expect(avatar.id).toBeUndefined();
    expect(avatar.userId).toBe(1);
    expect(avatar.hash).toBe('hash');
  });
});
