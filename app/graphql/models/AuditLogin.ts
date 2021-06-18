import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Lazy } from '../../types';
import { IModelData } from '../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../pagination/relaySpecs';
import { User } from './User';

@ObjectType({ description: 'The AuditLogin model', implements: IModelData })
@Entity()
export class AuditLogin extends IModelData {
  @ManyToOne(() => User, (data) => data.id, { lazy: true })
  @Field(() => User, { nullable: true })
  user?: Lazy<User>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId?: string;

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
}

@ObjectType()
export class AuditLoginEdge extends EdgeType('AuditLogin', AuditLogin) {}

@ObjectType()
export class AuditLoginConnection extends ConnectionType<AuditLoginEdge>(
  'AuditLogin',
  AuditLoginEdge
) {}
