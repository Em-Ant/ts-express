import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum PermissionLevel {
  API_USAGE,
  ADMIN_READ,
  ADMIN,
}

@Entity()
export class Key {
  @Column({
    unique: true,
  })
  @Index()
  key!: string;

  @Column({
    type: 'int',
    enum: PermissionLevel,
    default: PermissionLevel.API_USAGE,
  })
  permissionLevel!: PermissionLevel;

  @ManyToOne(() => User, (user: User) => user.keys, { onDelete: 'CASCADE' })
  user!: User;

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createDate!: Date;
}
