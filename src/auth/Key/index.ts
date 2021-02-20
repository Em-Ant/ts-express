import { EntityRepository, EntityManager } from 'typeorm';

import { Key, PermissionLevel } from '../../entity/Key';
import { User } from '../../entity/User';
import { generateKey } from '../../utils';

@EntityRepository()
export class KeyRepository {
  private manager!: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  async getKey(key: string): Promise<Key | null> {
    return (
      (await this.manager.findOne(Key, {
        where: { key },
        relations: ['user'],
      })) ?? null
    );
  }

  async createKey(
    user: User,
    permissionLevel: PermissionLevel = PermissionLevel.API_USAGE
  ): Promise<Key> {
    const key = new Key();
    key.key = generateKey();
    key.user = user;
    key.permissionLevel = permissionLevel;

    return await this.manager.save(key);
  }
}

export { PermissionLevel };
export type { Key };
