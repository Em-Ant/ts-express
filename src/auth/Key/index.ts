import { generateKey, getUUID } from '../../utils';
import { Key, PermissionLevel } from './model';

export interface KeyStore {
  getKey: (key: string) => Promise<Key | null>;
  createKey: (userId: string, permissionLevel: PermissionLevel) => Promise<Key>;
}

type Store = { [id: string]: Key };

export class InMemoryKeyStore implements KeyStore {
  private store!: Store;

  constructor(initStore: Store = {}) {
    this.store = initStore;
  }

  async getKey(key: string): Promise<Key> {
    return Promise.resolve(this.store[key] ?? null);
  }

  async createKey(
    userId: string,
    permissionLevel: PermissionLevel
  ): Promise<Key> {
    const k = {
      key: generateKey(),
      permissionLevel,
      id: getUUID(),
      userId,
    };

    this.store[k.key] = k;

    return Promise.resolve(k);
  }
}

export { PermissionLevel };
export type { Key };
