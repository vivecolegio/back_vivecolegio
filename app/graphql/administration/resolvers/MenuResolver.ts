import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { Menu } from '../models/Menu';
import { MenuInput } from '../types/MenuInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Module } from '../models/Module';
import { User } from '../models/User';
import { Context } from './UserResolver';
@Resolver(Menu)
export class MenuResolver {
  @InjectRepository(Menu)
  private menuRepository = getMongoRepository(Menu);

  @InjectRepository(Menu)
  private moduleRepository = getMongoRepository(Module);

  @InjectRepository(Menu)
  private userRepository = getMongoRepository(User);

  @Query(() => Menu, { nullable: true })
  getMenu(@Arg('id', () => String) id: number) {
    return this.menuRepository.findOne(id);
  }

  @Query(() => [Menu])
  getAllMenus(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  @Mutation(() => Menu)
  async createMenu(
    @Arg('data') data: MenuInput,
    @Ctx() context: Context
  ): Promise<Menu> {
    let createdBy_id = context.user.authorization.id;
    let parent_id = data.parentInput?.id ? data.parentInput?.id : '';
    let module_id = data.moduleInput?.id ? data.moduleInput?.id : '';
    const model = await this.menuRepository.create({
      ...data,
      parent_id,
      module_id,
      version: 1,
      createdBy_id,
    });
    return this.menuRepository.save(model);
  }

  @Mutation(() => Menu)
  async updateMenu(
    @Arg('data') data: MenuInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<Menu | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let menu = await this.menuRepository.findOne(id);
    menu = await this.menuRepository.save({
      _id: new ObjectID(id),
      ...menu,
      ...data,
      version: (menu?.version as number) + 1,
      updatedBy_id,
    });
    return menu;
  }

  @FieldResolver((_type) => Menu, { nullable: true })
  async menu(@Root() menu: Menu) {
    let data = menu.parent_id
      ? await this.menuRepository.findOne(menu.parent_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => Module, { nullable: true })
  async module(@Root() menu: Menu) {
    let data = menu.module_id
      ? await this.moduleRepository.findOne(menu.module_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() menu: Menu) {
    let data = menu.createdBy_id
      ? await this.userRepository.findOne(menu.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() menu: Menu) {
    let data = menu.updatedBy_id
      ? await this.userRepository.findOne(menu.updatedBy_id)
      : null;
    return data;
  }
}
