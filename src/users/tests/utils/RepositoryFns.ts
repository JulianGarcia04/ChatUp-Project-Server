import type { User } from 'src/users/domain/interfaces';

class UserRepository {
  users: User[] = [];

  constructor(initialUsers: User[]) {
    this.users = initialUsers;
  }

  async findById(id: string | number): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    return user != null ? user : null;
  }

  async findOne(prop: User): Promise<User | null> {
    const propKeys = Object.keys(prop);
    const condition = propKeys.reduce((acc, key, idx, arr) => {
      const hasNextKey = arr[idx + 1];
      if (hasNextKey != null) {
        return acc + `user.${key} === prop.${key} &&`;
      }
      return acc + `user.${key} === prop.${key}`;
    }, '');

    const user = this.users.find(user => eval(condition));

    return user != null ? user : null;
  }
}

export default UserRepository;
