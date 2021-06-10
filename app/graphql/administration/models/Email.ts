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
import { CategoryEmail } from './CategoryEmail';

@ObjectType({ description: 'The Email model' })
@Entity()
export class Email {
  @Field(() => ID)
  @ObjectIdColumn()
  id!: string;

  @ManyToOne(() => CategoryEmail, (categoryEmail) => categoryEmail.id, {
    lazy: true,
  })
  @Field(() => CategoryEmail, { nullable: true })
  categoryEmail?: Lazy<CategoryEmail>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  categoryEmail_id?: string;

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
