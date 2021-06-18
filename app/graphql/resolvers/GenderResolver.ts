import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectID } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../types';
import { NewGender } from '../inputs/NewGender';
import { IContext } from '../interfaces/IContext';
import { Gender, GenderConnection } from '../models/Gender';
import { User } from '../models/User';
import { ConnectionArgs } from '../pagination/relaySpecs';

@Resolver(Gender)
export class GenderResolver {
  @InjectRepository(Gender)
  private repository = getMongoRepository(Gender);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @Query(() => Gender, { nullable: true })
  async getGender(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => GenderConnection)
  async getAllGender(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<GenderConnection> {
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
    let resultConn = new GenderConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => Gender)
  async createGender(@Arg('data') data: NewGender, @Ctx() context: IContext): Promise<Gender> {
    let dataProcess: NewGender = removeEmptyStringElements(data);
    let createdByUserId = context.user.authorization.id;
    const model = await this.repository.create({
      ...dataProcess,
      active: true,
      version: 0,
      createdByUserId,
    });
    let result = await this.repository.save(model);
    return result;
  }

  @Mutation(() => Gender)
  async updateGender(
    @Arg('data') data: NewGender,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Gender | undefined> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserid = context.user.authorization.id;
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
  async changeActiveGender(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let updatedByUserid = context.user.authorization.id;
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
  async createdByUser(@Root() data: Gender) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: Gender) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }
}
