import { generateKey } from '../../utils';
import { Key, Permission } from './model';

export interface KeyStore {
  getKey: (key: string) => Key | null;
  createKey: (userId: string, permissions: [Permission]) => Key;
}

type Store = { [id: string]: Key };

export class InMemoryKeyStore implements KeyStore {
  private store!: Store;

  constructor(initStore: Store = {}) {
    this.store = initStore;
  }

  getKey(key: string): Key {
    return this.store[key] ?? null;
  }

  createKey(userId: string, permissions: [Permission]): Key {
    const k = {
      key: generateKey(),
      permissions,
      userId,
    };

    this.store[k.key] = k;

    return k;
  }
}

export { Permission };
export type { Key };
