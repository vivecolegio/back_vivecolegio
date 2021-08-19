import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { RoleMenu } from './RoleMenu';

@ObjectType({ description: 'The Role model', implements: IModelData })
@Entity()
export class Role extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field(() => [RoleMenu], { nullable: true })
  roleMenus?: [RoleMenu];
}

@ObjectType()
export class RoleEdge extends EdgeType('Role', Role) {}

@ObjectType()
export class RoleConnection extends ConnectionType<RoleEdge>('Role', RoleEdge) {}
