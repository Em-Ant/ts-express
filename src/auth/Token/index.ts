import jwt, { Secret } from 'jsonwebtoken';

import { KeyStore, PermissionLevel } from '../Key';
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

export interface TokenResponse {
  token: string;
}

export interface Token {
  name: string;
  keyId: string;
  permissionLevel: PermissionLevel;
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

  async getToken(key: string): Promise<TokenResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const keyData = await this.keyStore.getKey(key);

        if (!keyData) return reject(Error('invalid api key'));

        const data = {
          name: `${keyData.user?.firstName} ${keyData.user?.lastName}`,
          keyId: keyData.id,
          permissionLevel: keyData.permissionLevel,
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
      } catch (e) {
        reject(e);
      }
    });
  }

  async verify(token: string): Promise<Token> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.config.secret, (err, decoded) => {
        if (err || !decoded) return reject(err || Error('invalid token'));
        return resolve(decoded as Token);
      });
    });
  }
}
