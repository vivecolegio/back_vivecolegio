import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../types';
import { NewGeneralAcademicArea } from '../inputs/NewGeneralAcademicArea';
import { IContext } from '../interfaces/IContext';
import { GeneralAcademicArea, GeneralAcademicAreaConnection } from '../models/GeneralAcademicArea';
import { User } from '../models/User';
import { ConnectionArgs } from '../pagination/relaySpecs';

@Resolver(GeneralAcademicArea)
export class GeneralAcademicAreaResolver {
  @InjectRepository(GeneralAcademicArea)
  private repository = getMongoRepository(GeneralAcademicArea);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @Query(() => GeneralAcademicArea, { nullable: true })
  async getGeneralAcademicArea(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => GeneralAcademicAreaConnection)
  async getAllGeneralAcademicArea(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<GeneralAcademicAreaConnection> {
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
    let resultConn = new GeneralAcademicAreaConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => GeneralAcademicArea)
  async createGeneralAcademicArea(
    @Arg('data') data: NewGeneralAcademicArea,
    @Ctx() context: IContext
  ): Promise<GeneralAcademicArea> {
    let dataProcess: NewGeneralAcademicArea = removeEmptyStringElements(data);
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

  @Mutation(() => GeneralAcademicArea)
  async updateGeneralAcademicArea(
    @Arg('data') data: NewGeneralAcademicArea,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<GeneralAcademicArea | undefined> {
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
  async changeActiveGeneralAcademicArea(
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
  async createdByUser(@Root() data: GeneralAcademicArea) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: GeneralAcademicArea) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }
}
