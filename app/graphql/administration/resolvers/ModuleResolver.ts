import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Module } from '../models/Module';
import { ModuleInput } from '../types/ModuleInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from '../models/User';
import { Context } from './UserResolver';
@Resolver(Module)
export class ModuleResolver {
  @InjectRepository(Module)
  private moduleRepository = getMongoRepository(Module);

  @InjectRepository(Module)
  private userRepository = getMongoRepository(User);

  @Query(() => Module, { nullable: true })
  getModule(@Arg('id', () => String) id: number) {
    return this.moduleRepository.findOne(id);
  }

  @Query(() => [Module])
  getAllModules(): Promise<Module[]> {
    return this.moduleRepository.find();
  }

  @Mutation(() => Module)
  async createModule(
    @Arg('data') data: ModuleInput,
    @Ctx() context: Context
  ): Promise<Module> {
    let createdBy_id = context.user.authorization.id;
    const model = await this.moduleRepository.create({
      ...data,
      version: 1,
      createdBy_id,
    });
    return this.moduleRepository.save(model);
  }

  @Mutation(() => Module)
  async updateModule(
    @Arg('data') data: ModuleInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<Module | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let module = await this.moduleRepository.findOne(id);
    module = await this.moduleRepository.save({
      _id: new ObjectID(id),
      ...module,
      ...data,
      version: (module?.version as number) + 1,
      updatedBy_id,
    });
    return module;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() module: Module) {
    let data = module.createdBy_id
      ? await this.userRepository.findOne(module.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() module: Module) {
    let data = module.updatedBy_id
      ? await this.userRepository.findOne(module.updatedBy_id)
      : null;
    return data;
  }
}
