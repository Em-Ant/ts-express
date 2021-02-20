import { EntityRepository, EntityManager } from 'typeorm';
import { User } from '../../entity/User';

@EntityRepository()
export class UserRepository {
  private manager!: EntityManager;

  constructor(manager: EntityManager) {
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
