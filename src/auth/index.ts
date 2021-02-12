import { InMemoryKeyStore, Permission } from './Key';
import { InMemoryUserStore } from './User';
import { TokenService } from './Token';

import config from '../config';

import logger from '../logger';

const userStore = new InMemoryUserStore();
const keyStore = new InMemoryKeyStore();

const user = userStore.upsertUser({
  name: 'Emant',
});

logger.info(`created test user: ${user.name} - ${user.id}`);

const key = keyStore.createKey(user.id, [Permission.ADMIN]);

logger.info(
  `created test key: ${key.key} - ${key.userId} - ${key.permissions}`
);

const tokenService = new TokenService({
  userStore,
  keyStore,
  config: {
    secret: config.auth.secret,
    expiresIn: config.auth.expiresIn,
  },
});

export default tokenService;
