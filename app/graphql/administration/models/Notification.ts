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
import { CategoryNotification } from './CategoryNotification';

@ObjectType({ description: 'The Notification model' })
@Entity()
export class Notification {
  @Field(() => ID)
  @ObjectIdColumn()
  id!: string;

  @ManyToOne(
    () => CategoryNotification,
    (categoryNotification) => categoryNotification.id,
    { lazy: true }
  )
  @Field(() => CategoryNotification, { nullable: true })
  categoryNotification?: Lazy<CategoryNotification>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  categoryNotification_id?: string;

  @ManyToOne(() => User, (user) => user.id, { lazy: true })
  @Field(() => User, { nullable: true })
  user?: Lazy<User>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  user_id?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dateSend?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dateRead?: Date;

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
