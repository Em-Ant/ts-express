import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Key } from './Key';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @OneToMany(() => Key, (key) => key.user)
  keys!: [Key];
}
