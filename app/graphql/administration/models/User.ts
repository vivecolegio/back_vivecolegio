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
import { Role } from './Role';
import { Gender, DocumentType } from '../enumTypes/UserEnumTypes';
@ObjectType({ description: 'The User model' })
@Entity()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  username?: string;

  @Field((_type) => Gender, { nullable: true })
  @Column({ nullable: true })
  gender?: string;

  @Field((_type) => DocumentType, { nullable: true })
  @Column({ nullable: true })
  documentType?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  documentNumber?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthdate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  active?: Boolean;

  @ManyToOne(() => Role, (role) => role.id, { lazy: true })
  @Field(() => Role, { nullable: true })
  role?: Lazy<Role>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  role_id?: string;

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
