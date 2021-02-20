import { getCustomRepository } from 'typeorm';

import { KeyRepository, PermissionLevel } from './Key';
import { User, UserRepository } from './User';
import { TokenService } from './Token';
import mwareFactory from './mware';

import config from '../config';

import logger from '../logger';

const userStore = getCustomRepository(UserRepository);
const keyStore = getCustomRepository(KeyRepository);

const tokenService = new TokenService({
  keyStore,
  config: {
    secret: config.auth.secret,
    expiresIn: config.auth.expiresIn,
  },
});

if (config.db.seed) {
  (async () => {
    try {
      const testUser = await userStore.getOne();
      if (testUser) {
        logger.info(
          `found  user: ${testUser.firstName} ${testUser.lastName} - keys:`
        );
        testUser.keys.forEach((k) =>
          logger.info(`-- ${k.key} , level: ${k.permissionLevel}`)
        );

        return;
      }

      const u = new User();
      u.firstName = 'Em';
      u.lastName = 'Ant';
      const user = await userStore.upsertUser(u);

      logger.info(
        `created test user: ${user.firstName} ${user.lastName} - ${user.id}`
      );

      const key = await keyStore.createKey(u, PermissionLevel.ADMIN);

      logger.info(
        `created test key 1: ${key.key} - u: ${key.user.id} - l: ${key.permissionLevel} - k: ${key.id}`
      );

      const key_2 = await keyStore.createKey(u);

      logger.info(
        `created test key 2: ${key_2.key} - u: ${key_2.user.id} - l: ${key_2.permissionLevel} - k: ${key_2.id}`
      );
    } catch (e) {
      logger.info(e.message);
    }
  })();
}

export default tokenService;
export const auth = mwareFactory(tokenService);
