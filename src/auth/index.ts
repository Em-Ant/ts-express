import { InMemoryKeyStore, PermissionLevel } from './Key';
import { InMemoryUserStore } from './User';
import { TokenService } from './Token';
import mwareFactory from './mware';

import config from '../config';

import logger from '../logger';

const userStore = new InMemoryUserStore();
const keyStore = new InMemoryKeyStore();

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
      const user = await userStore.upsertUser({
        name: 'Emant',
      });

      logger.info(`created test user: ${user.name} - ${user.id}`);

      const key = await keyStore.createKey(user.id, PermissionLevel.API_USAGE);

      logger.info(
        `created test key: ${key.key} - ${key.userId} - ${key.permissionLevel} - ${key.id}`
      );
    } catch (e) {
      logger.info(e.message);
    }
  })();
}

export default tokenService;
export const auth = mwareFactory(tokenService);
