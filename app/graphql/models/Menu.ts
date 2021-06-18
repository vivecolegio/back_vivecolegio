import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Lazy } from '../../types';
import { IModelData } from '../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../pagination/relaySpecs';
import { Module } from './Module';

@ObjectType({ description: 'The Menu model', implements: IModelData })
@Entity()
export class Menu extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sorting?: Number;

  @ManyToOne(() => Menu, (data) => data.id, { lazy: true })
  @Field(() => Menu, { nullable: true })
  parent?: Lazy<Menu>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  parentId?: string;

  @ManyToOne(() => Module, (data) => data.id, { lazy: true })
  @Field(() => Module, { nullable: true })
  module?: Lazy<Module>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  moduleId?: string;
}

@ObjectType()
export class MenuEdge extends EdgeType('Menu', Menu) {}

@ObjectType()
export class MenuConnection extends ConnectionType<MenuEdge>('Menu', MenuEdge) {}
