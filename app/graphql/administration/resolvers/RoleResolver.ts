import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Role } from '../models/Role';
import { RoleInput } from '../types/RoleInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from '../models/User';
import { Context } from './UserResolver';

@Resolver(Role)
export class RoleResolver {
  @InjectRepository(Role)
  private roleRepository = getMongoRepository(Role);

  @InjectRepository(Role)
  private userRepository = getMongoRepository(User);

  @Query(() => Role, { nullable: true })
  getRole(@Arg('id', () => String) id: number) {
    return this.roleRepository.findOne(id);
  }

  @Query(() => [Role])
  getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  @Mutation(() => Role)
  async createRole(
    @Arg('data') data: RoleInput,
    @Ctx() context: Context
  ): Promise<Role> {
    let createdBy_id = context.user.authorization.id;
    const model = await this.roleRepository.create({
      ...data,
    });
    return this.roleRepository.save(model);
  }

  @Mutation(() => Role)
  async updateRole(
    @Arg('data') data: RoleInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<Role | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let role = await this.roleRepository.findOne(id);
    role = await this.roleRepository.save({
      _id: new ObjectID(id),
      ...role,
      ...data,
      updatedBy_id,
    });
    return role;
  }

}
