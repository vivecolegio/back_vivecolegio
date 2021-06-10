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

@ObjectType({ description: 'The AuditLogin model' })
@Entity()
export class AuditLogin {
  @Field(() => ID)
  @ObjectIdColumn()
  id!: string;

  @ManyToOne(() => User, (user) => user.id, { lazy: true })
  @Field(() => User, { nullable: true })
  user?: Lazy<User>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  user_id?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userIp?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userPort?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userAgent?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  auth?: Boolean;

  @Field({ nullable: false })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @Field({ nullable: false })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
