import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Lazy } from '../../types';
import { IModelData } from '../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../pagination/relaySpecs';
import { Menu } from './Menu';
import { Module } from './Module';

@ObjectType({ description: 'The MenuItem model', implements: IModelData })
@Entity()
export class MenuItem extends IModelData {
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
  menu?: Lazy<Menu>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  menuId?: string;

  @ManyToOne(() => Module, (data) => data.id, { lazy: true })
  @Field(() => Module, { nullable: true })
  module?: Lazy<Module>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  moduleId?: string;
}

@ObjectType()
export class MenuItemEdge extends EdgeType('MenuItem', MenuItem) {}

@ObjectType()
export class MenuItemConnection extends ConnectionType<MenuItemEdge>('MenuItem', MenuItemEdge) {}
