import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewGeneralAcademicAsignature } from '../../inputs/GeneralAdministrator/NewGeneralAcademicAsignature';
import { IContext } from '../../interfaces/IContext';
import { GeneralAcademicArea } from '../../models/GeneralAdministrator/GeneralAcademicArea';
import {
  GeneralAcademicAsignature,
  GeneralAcademicAsignatureConnection,
} from '../../models/GeneralAdministrator/GeneralAcademicAsignature';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(GeneralAcademicAsignature)
export class GeneralAcademicAsignatureResolver {
  @InjectRepository(GeneralAcademicAsignature)
  private repository = getMongoRepository(GeneralAcademicAsignature);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(GeneralAcademicArea)
  private repositoryGeneralAcademicArea = getMongoRepository(GeneralAcademicArea);

  @Query(() => GeneralAcademicAsignature, { nullable: true })
  async getGeneralAcademicAsignature(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => GeneralAcademicAsignatureConnection)
  async getAllGeneralAcademicAsignature(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<GeneralAcademicAsignatureConnection> {
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
    let resultConn = new GeneralAcademicAsignatureConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => GeneralAcademicAsignature)
  async createGeneralAcademicAsignature(
    @Arg('data') data: NewGeneralAcademicAsignature,
    @Ctx() context: IContext
  ): Promise<GeneralAcademicAsignature> {
    let dataProcess: NewGeneralAcademicAsignature = removeEmptyStringElements(data);
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

  @Mutation(() => GeneralAcademicAsignature)
  async updateGeneralAcademicAsignature(
    @Arg('data') data: NewGeneralAcademicAsignature,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<GeneralAcademicAsignature | undefined> {
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
  async changeActiveGeneralAcademicAsignature(
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
  async createdByUser(@Root() data: GeneralAcademicAsignature) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: GeneralAcademicAsignature) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => GeneralAcademicArea, { nullable: true })
  async generalAcademicArea(@Root() data: GeneralAcademicAsignature) {
    let id = data.generalAcademicAreaId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGeneralAcademicArea.findOne(id);
      return result;
    }
    return null;
  }
}
