import { UserProps, User } from '@domain/entities';

describe('User', () => {
  const props: UserProps = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    avatar: 'https://example.com/avatar.jpg',
  };

  describe('constructor', () => {
    it('should create a new user object with given props', () => {
      const user = new User(props);

      expect(user.id).toBe('1');
      expect(user.firstName).toBe('John');
      expect(user.lastName).toBe('Doe');
      expect(user.email).toBe('johndoe@example.com');
      expect(user.avatar).toBe('https://example.com/avatar.jpg');
    });

    it('should create a new user object without id and avatar when they are not provided', () => {
      const propsWithoutIdAndAvatar = { ...props };
      delete propsWithoutIdAndAvatar.id;
      delete propsWithoutIdAndAvatar.avatar;

      const user = new User(propsWithoutIdAndAvatar);

      expect(user.id).toBeUndefined();
      expect(user.firstName).toBe('John');
      expect(user.lastName).toBe('Doe');
      expect(user.email).toBe('johndoe@example.com');
      expect(user.avatar).toBeUndefined();
    });
  });

  describe('getFullName', () => {
    it('should return the full name of the user', () => {
      const user = new User(props);

      expect(user.getFullName()).toBe('John Doe');
    });
  });

  describe('hasAvatar', () => {
    it('should return true if user has an avatar', () => {
      const user = new User(props);
      expect(user.hasAvatar()).toBe(true);
    });

    it('should return false if user does not have an avatar', () => {
      const propsWithoutAvatar = { ...props };
      delete propsWithoutAvatar.avatar;

      const user = new User(propsWithoutAvatar);
      expect(user.hasAvatar()).toBe(false);
    });
  });
});
