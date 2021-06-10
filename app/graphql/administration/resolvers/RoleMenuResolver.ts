import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { RoleMenu } from '../models/RoleMenu';
import { RoleMenuInput } from '../types/RoleMenuInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Role } from '../models/Role';
import { Menu } from '../models/Menu';
import { User } from '../models/User';
import { Context } from './UserResolver';

@Resolver(RoleMenu)
export class RoleMenuResolver {
  @InjectRepository(RoleMenu)
  private roleMenuRepository = getMongoRepository(RoleMenu);

  @InjectRepository(RoleMenu)
  private roleRepository = getMongoRepository(Role);

  @InjectRepository(RoleMenu)
  private menuRepository = getMongoRepository(Menu);

  @InjectRepository(RoleMenu)
  private userRepository = getMongoRepository(User);

  @Query(() => RoleMenu, { nullable: true })
  getRoleMenu(@Arg('id', () => String) id: number) {
    return this.roleMenuRepository.findOne(id);
  }

  @Query(() => [RoleMenu])
  getAllRoleMenus(): Promise<RoleMenu[]> {
    return this.roleMenuRepository.find();
  }

  @Mutation(() => RoleMenu)
  async createRoleMenu(
    @Arg('data') data: RoleMenuInput,
    @Ctx() context: Context
  ): Promise<RoleMenu> {
    let createdBy_id = context.user.authorization.id;
    let role_id = data.roleInput?.id ? data.roleInput?.id : '';
    let menu_id = data.menuInput?.id ? data.menuInput?.id : '';
    const model = await this.roleMenuRepository.create({
      ...data,
      role_id,
      menu_id,
      version: 1,
      createdBy_id,
    });
    return this.roleMenuRepository.save(model);
  }

  @Mutation(() => RoleMenu)
  async updateRoleMenu(
    @Arg('data') data: RoleMenuInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<RoleMenu | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let roleMenu = await this.roleMenuRepository.findOne(id);
    roleMenu = await this.roleMenuRepository.save({
      _id: new ObjectID(id),
      ...roleMenu,
      ...data,
      version: (roleMenu?.version as number) + 1,
      updatedBy_id,
    });
    return roleMenu;
  }

  @FieldResolver((_type) => Role, { nullable: true })
  async role(@Root() roleMenu: RoleMenu) {
    let data = roleMenu.role_id
      ? await this.roleRepository.findOne(roleMenu.role_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => Menu, { nullable: true })
  async menu(@Root() roleMenu: RoleMenu) {
    let data = roleMenu.menu_id
      ? await this.menuRepository.findOne(roleMenu.menu_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() roleMenu: RoleMenu) {
    let data = roleMenu.createdBy_id
      ? await this.userRepository.findOne(roleMenu.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() roleMenu: RoleMenu) {
    let data = roleMenu.updatedBy_id
      ? await this.userRepository.findOne(roleMenu.updatedBy_id)
      : null;
    return data;
  }
}
