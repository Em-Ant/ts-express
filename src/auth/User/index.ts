import { getUUID } from '../../utils';
import { User, UserWithOtionalId } from './model';

export interface UserStore {
  getUserbyId: (id: string) => Promise<User | null>;
  upsertUser: (user: UserWithOtionalId) => Promise<User>;
}

type Store = { [id: string]: User };

export class InMemoryUserStore implements UserStore {
  private store!: Store;

  constructor(initStore: Store = {}) {
    this.store = initStore;
  }

  async upsertUser(user: UserWithOtionalId): Promise<User> {
    const _user = { ...user } as User;
    if (_user.id === undefined) {
      _user.id = getUUID();
    }
    this.store[_user.id] = _user as User;

    return Promise.resolve(this.store[_user.id]);
  }

  async getUserbyId(id: string): Promise<User | null> {
    return Promise.resolve(this.store[id] ?? null);
  }
}

export type { User, UserWithOtionalId };
