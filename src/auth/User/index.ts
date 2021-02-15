import { getManager, EntityManager } from 'typeorm';

import { User } from '../../entity/User';

export interface UserStore {
  getUserbyId: (id: string) => Promise<User | null>;
  upsertUser: (user: User) => Promise<User>;
  getOne: () => Promise<User | null | undefined>;
}

export class UserRepo implements UserStore {
  private manager!: EntityManager;

  constructor(manager = getManager()) {
    this.manager = manager;
  }

  async upsertUser(user: User): Promise<User> {
    return await this.manager.save(user);
  }

  async getUserbyId(id: string): Promise<User | null> {
    return await this.manager.findOneOrFail(User, id);
  }

  async getOne(): Promise<User | null | undefined> {
    return this.manager.findOne(User, { relations: ['keys'] });
  }
}

export { User };
