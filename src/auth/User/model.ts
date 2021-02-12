export interface User {
  id: string;
  name: string;
  keys?: [string];
}

export type UserWithOtionalId = Omit<User, 'id'> & { id?: string };
