import { KeyRepo, PermissionLevel } from './Key';
import { User, UserRepo } from './User';
import { TokenService } from './Token';
import mwareFactory from './mware';

import config from '../config';

import logger from '../logger';

const userStore = new UserRepo();
const keyStore = new KeyRepo();

const tokenService = new TokenService({
  userStore,
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
        logger.info(`found: ${testUser.firstName} ${testUser.lastName}, keys:`);
        testUser.keys.forEach((k) =>
          logger.info(` -- ${k.key} , level: ${k.permissionLevel}`)
        );

        return;
      }

      const u = new User();
      u.firstName = 'John';
      u.lastName = 'Doe';
      const user = await userStore.upsertUser(u);

      logger.info(
        `created test user: ${user.firstName} ${user.lastName} - ${user.id}`
      );

      const key = await keyStore.createKey(u, PermissionLevel.ADMIN);

      logger.info(
        `created test key: ${key.key} - u: ${key.user.id} - l: ${key.permissionLevel} - k: ${key.id}`
      );
    } catch (e) {
      logger.info(e.message);
    }
  })();
}

export default tokenService;
export const auth = mwareFactory(tokenService);
