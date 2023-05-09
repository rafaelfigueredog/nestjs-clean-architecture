import { ReqResUserProps, ReqResUser } from '@domain/entities';

describe('ReqResUser', () => {
  const props: ReqResUserProps = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  };

  describe('constructor', () => {
    it('should create a new user object with given props', () => {
      const user = new ReqResUser(props);

      expect(user.id).toBe(1);
      expect(user.first_name).toBe('John');
      expect(user.last_name).toBe('Doe');
      expect(user.email).toBe('johndoe@example.com');
      expect(user.avatar).toBe('https://reqres.in/img/faces/1-image.jpg');
    });
  });
});
