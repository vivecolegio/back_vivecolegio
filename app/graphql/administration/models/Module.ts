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

@ObjectType({ description: 'The Module model' })
@Entity()
export class Module {
  @Field(() => ID)
  @ObjectIdColumn()
  id!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url?: string;

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
