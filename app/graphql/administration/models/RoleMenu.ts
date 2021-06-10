import { ObjectType, Field, ID } from 'type-graphql';
import {
  Column,
  Entity,
  ObjectIdColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Lazy } from '../../../types';
import { User } from './User';
import { Role } from './Role';
import { Menu } from './Menu';

@ObjectType({ description: 'The RoleMenu model' })
@Entity()
export class RoleMenu {
  @Field(() => ID)
  @ObjectIdColumn()
  id!: string;

  @ManyToOne(() => Role, (role) => role.id, { lazy: true })
  @Field(() => Role, { nullable: true })
  role?: Lazy<Role>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  role_id?: string;

  @ManyToOne(() => Menu, (menu) => menu.id, { lazy: true })
  @Field(() => Menu, { nullable: true })
  menu?: Lazy<Menu>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  menu_id?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  createAction?: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  deleteAction?: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  updateAction?: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  readAction?: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fullAccess?: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  activateAction?: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  inactiveAction?: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  auditAction?: Boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  active?: Boolean;

  @Field({ nullable: false })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @Field({ nullable: false })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @Field({ nullable: false })
  @Column({ default: 1 })
  version?: number;

  @ManyToOne(() => User, (user) => user.createdBy, { lazy: true })
  @Field(() => User, { nullable: true })
  createdBy?: Lazy<User>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  createdBy_id?: string;

  @ManyToOne(() => User, (user) => user.updatedBy, { lazy: true })
  @Field(() => User, { nullable: true })
  updatedBy?: Lazy<User>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  updatedBy_id?: string;
}
