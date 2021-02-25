import jwt, { Secret } from 'jsonwebtoken';

import { KeyRepository, PermissionLevel } from '../Key';

export interface TokenServiceConfig {
  secret: Secret;
  expiresIn: string | number;
}

export interface TokenServiceDependencies {
  keyStore: KeyRepository;
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
  private keyStore!: KeyRepository;
  private config!: TokenServiceConfig;

  constructor({ keyStore, config }: TokenServiceDependencies) {
    this.keyStore = keyStore;
    this.config = config;
  }

  async getToken(key: string): Promise<TokenResponse> {
    const keyData = await this.keyStore.getKey(key);

    if (!keyData) throw Error('invalid api key');

    const data = {
      name: `${keyData.user?.firstName} ${keyData.user?.lastName}`,
      keyId: keyData.id,
      permissionLevel: keyData.permissionLevel,
    };

    const token = jwt.sign(data, this.config.secret, {
      expiresIn: this.config.expiresIn,
    });
    return { token };
  }

  verify(token: string): Token {
    const decoded = jwt.verify(token, this.config.secret) as Token;
    if (!decoded) throw Error('invalid token');
    return decoded;
  }
}
