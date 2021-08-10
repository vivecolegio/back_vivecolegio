import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewGeneralPerformanceLevel } from '../../inputs/GeneralAdministrator/NewGeneralPerformanceLevel';
import { IContext } from '../../interfaces/IContext';
import {
  GeneralPerformanceLevel,
  GeneralPerformanceLevelConnection,
} from '../../models/GeneralAdministrator/GeneralPerformanceLevel';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(GeneralPerformanceLevel)
export class GeneralPerformanceLevelResolver {
  @InjectRepository(GeneralPerformanceLevel)
  private repository = getMongoRepository(GeneralPerformanceLevel);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @Query(() => GeneralPerformanceLevel, { nullable: true })
  async getGeneralPerformanceLevel(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => GeneralPerformanceLevelConnection)
  async getAllGeneralPerformanceLevel(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<GeneralPerformanceLevelConnection> {
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
    let resultConn = new GeneralPerformanceLevelConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => GeneralPerformanceLevel)
  async createGeneralPerformanceLevel(
    @Arg('data') data: NewGeneralPerformanceLevel,
    @Ctx() context: IContext
  ): Promise<GeneralPerformanceLevel> {
    let dataProcess: NewGeneralPerformanceLevel = removeEmptyStringElements(data);
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

  @Mutation(() => GeneralPerformanceLevel)
  async updateGeneralPerformanceLevel(
    @Arg('data') data: NewGeneralPerformanceLevel,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<GeneralPerformanceLevel | undefined> {
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
  async changeActiveGeneralPerformanceLevel(
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
  async createdByUser(@Root() data: GeneralPerformanceLevel) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: GeneralPerformanceLevel) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }
}
