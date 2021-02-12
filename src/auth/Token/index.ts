import jwt, { Secret } from 'jsonwebtoken';

import { KeyStore } from '../Key';
import { UserStore } from '../User';

export interface TokenServiceConfig {
  secret: Secret;
  expiresIn: string | number;
}

export interface TokenServiceDependencies {
  userStore: UserStore;
  keyStore: KeyStore;
  config: TokenServiceConfig;
}

export interface Token {
  token: string;
}

export class TokenService {
  private userStore!: UserStore;
  private keyStore!: KeyStore;
  private config!: TokenServiceConfig;

  constructor({ userStore, keyStore, config }: TokenServiceDependencies) {
    this.userStore = userStore;
    this.keyStore = keyStore;
    this.config = config;
  }

  async getToken(key: string): Promise<Token> {
    return new Promise((resolve, reject) => {
      const keyData = this.keyStore.getKey(key);

      if (!keyData) return reject(Error('invalid api key'));

      const { userId } = keyData;
      const user = this.userStore.getUserbyId(userId);

      if (!user) return reject(Error('invalid api key'));

      const data = {
        name: user.name,
        id: user.id,
        permissions: keyData.permissions,
      };

      jwt.sign(
        data,
        this.config.secret,
        {
          expiresIn: this.config.expiresIn,
        },
        (err, token) => {
          if (err || !token)
            return reject(err || Error('error generating token'));
          resolve({ token });
        }
      );
    });
  }

  async verify(token: string): Promise<string | Record<string, unknown>> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.config.secret, (err, decoded) => {
        if (err || !decoded) return reject(err || Error('invalid token'));
        return resolve(decoded as Record<string, unknown>);
      });
    });
  }
}
