import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Lazy } from '../../types';
import { IModelData } from '../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../pagination/relaySpecs';
import { Menu } from './Menu';
import { Role } from './Role';

@ObjectType({ description: 'The RoleMenu model', implements: IModelData })
@Entity()
export class RoleMenu extends IModelData {
  @ManyToOne(() => Role, (data) => data.id, { lazy: true })
  @Field(() => Role, { nullable: true })
  role?: Lazy<Role>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  roleId?: string;

  @ManyToOne(() => Menu, (data) => data.id, { lazy: true })
  @Field(() => Menu, { nullable: true })
  menu?: Lazy<Menu>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  menuId?: string;

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
}

@ObjectType()
export class RoleMenuEdge extends EdgeType('RoleMenu', RoleMenu) {}

@ObjectType()
export class RoleMenuConnection extends ConnectionType<RoleMenuEdge>('RoleMenu', RoleMenuEdge) {}
