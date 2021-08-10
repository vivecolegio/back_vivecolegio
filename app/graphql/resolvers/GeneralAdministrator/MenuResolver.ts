import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewMenu } from '../../inputs/GeneralAdministrator/NewMenu';
import { IContext } from '../../interfaces/IContext';
import { Menu, MenuConnection } from '../../models/GeneralAdministrator/Menu';
import { MenuItem } from '../../models/GeneralAdministrator/MenuItem';
import { Module } from '../../models/GeneralAdministrator/Module';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(Menu)
export class MenuResolver {
  @InjectRepository(Menu)
  private repository = getMongoRepository(Menu);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(Module)
  private repositoryModule = getMongoRepository(Module);

  @InjectRepository(MenuItem)
  private repositoryMenuItem = getMongoRepository(MenuItem);

  @Query(() => Menu, { nullable: true })
  async getMenu(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => MenuConnection)
  async getAllMenu(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<MenuConnection> {
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
    let resultConn = new MenuConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => Menu)
  async createMenu(@Arg('data') data: NewMenu, @Ctx() context: IContext): Promise<Menu> {
    let dataProcess: NewMenu = removeEmptyStringElements(data);
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

  @Mutation(() => Menu)
  async updateMenu(
    @Arg('data') data: NewMenu,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Menu | undefined> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserid = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
    result = await this.repository.save({
      _id: new ObjectId(id),
      ...result,
      ...dataProcess,
      version: (result?.version as number) + 1,
      updatedByUserid,
    });
    return result;
  }

  @Mutation(() => Boolean)
  async changeActiveMenu(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let updatedByUserid = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
    result = await this.repository.save({
      _id: new ObjectId(id),
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
  async createdByUser(@Root() data: Menu) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: Menu) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Menu, { nullable: true })
  async module(@Root() data: Menu) {
    let id = data.moduleId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryModule.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [MenuItem], { nullable: true })
  async menuItems(@Root() data: Menu) {
    let id = data.id;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryMenuItem.find({ where: { menuId: id } });
      return result;
    }
    return null;
  }
}
