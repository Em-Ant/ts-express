import { getUUID } from '../../utils';
import { User, UserWithOtionalId } from './model';

export interface UserStore {
  getUserbyId: (id: string) => User | null;
  upsertUser: (user: UserWithOtionalId) => User;
}

type Store = { [id: string]: User };

export class InMemoryUserStore implements UserStore {
  private store!: Store;

  constructor(initStore: Store = {}) {
    this.store = initStore;
  }

  upsertUser(user: UserWithOtionalId): User {
    const _user = { ...user } as User;
    if (_user.id === undefined) {
      _user.id = getUUID();
    }
    this.store[_user.id] = _user as User;

    return this.store[_user.id];
  }

  getUserbyId(id: string): User | null {
    return this.store[id] ?? null;
  }
}

export type { User, UserWithOtionalId };
