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

@ObjectType({ description: 'The Version model' })
@Entity()
export class Version {
  @Field(() => ID)
  @ObjectIdColumn()
  id!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  number?: Number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  active?: Boolean;
}
