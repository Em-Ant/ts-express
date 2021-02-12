export enum Permission {
  API_USAGE = 'API_USAGE',
  ADMIN_READ = 'ADMIN_READ',
  ADMIN = 'ADMIN',
}

export interface Key {
  key: string;
  permissions: [Permission];
  userId: string;
}
