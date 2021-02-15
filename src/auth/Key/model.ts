export enum PermissionLevel {
  API_USAGE,
  ADMIN_READ,
  ADMIN,
}

export interface Key {
  key: string;
  permissionLevel: PermissionLevel;
  userId: string;
  id: string;
}
