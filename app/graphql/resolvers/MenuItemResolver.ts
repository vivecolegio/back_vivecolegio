import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectID } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../types';
import { NewMenuItem } from '../inputs/NewMenuItem';
import { IContext } from '../interfaces/IContext';
import { Menu } from '../models/Menu';
import { MenuItem, MenuItemConnection } from '../models/MenuItem';
import { Module } from '../models/Module';
import { User } from '../models/User';
import { ConnectionArgs } from '../pagination/relaySpecs';

@Resolver(MenuItem)
export class MenuItemResolver {
  @InjectRepository(MenuItem)
  private repository = getMongoRepository(MenuItem);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(Module)
  private repositoryModule = getMongoRepository(Module);

  @InjectRepository(Menu)
  private repositoryMenu = getMongoRepository(Menu);

  @Query(() => MenuItem, { nullable: true })
  async getMenuItem(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => MenuItemConnection)
  async getAllMenuItem(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<MenuItemConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.find({
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find();
      }
    } else {
      if (orderCreated) {
        result = await this.repository.find({
          where: {
            active: true,
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find({
          where: {
            active: true,
          },
        });
      }
    }
    let resultConn = new MenuItemConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => MenuItem)
  async createMenuItem(
    @Arg('data') data: NewMenuItem,
    @Ctx() context: IContext
  ): Promise<MenuItem> {
    let dataProcess: NewMenuItem = removeEmptyStringElements(data);
    let createdByUserId = context?.user?.authorization?.id;
    const model = await this.repository.create({
      ...dataProcess,
      active: true,
      version: 0,
      createdByUserId,
    });
    let result = await this.repository.save(model);
    return result;
  }

  @Mutation(() => MenuItem)
  async updateMenuItem(
    @Arg('data') data: NewMenuItem,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<MenuItem | undefined> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserid = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
    result = await this.repository.save({
      _id: new ObjectID(id),
      ...result,
      ...dataProcess,
      version: (result?.version as number) + 1,
      updatedByUserid,
    });
    return result;
  }

  @Mutation(() => Boolean)
  async changeActiveMenuItem(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let updatedByUserid = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
    result = await this.repository.save({
      _id: new ObjectID(id),
      ...result,
      active: active,
      version: (result?.version as number) + 1,
      updatedByUserid,
    });
    if (result.id) {
      return true;
    } else {
      return false;
    }
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: MenuItem) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: MenuItem) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Menu, { nullable: true })
  async menu(@Root() data: MenuItem) {
    let id = data.menuId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryMenu.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Module, { nullable: true })
  async module(@Root() data: MenuItem) {
    let id = data.moduleId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryModule.findOne(id);
      return result;
    }
    return null;
  }
}
