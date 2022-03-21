import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewGeneralAcademicStandard } from '../../inputs/GeneralAdministrator/NewGeneralAcademicStandard';
import { IContext } from '../../interfaces/IContext';
import { GeneralAcademicAsignature } from '../../models/GeneralAdministrator/GeneralAcademicAsignature';
import { GeneralAcademicCycle } from '../../models/GeneralAdministrator/GeneralAcademicCycle';
import {
  GeneralAcademicStandard,
  GeneralAcademicStandardConnection
} from '../../models/GeneralAdministrator/GeneralAcademicStandard';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(GeneralAcademicStandard)
export class GeneralAcademicStandardResolver {
  @InjectRepository(GeneralAcademicStandard)
  private repository = getMongoRepository(GeneralAcademicStandard);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(GeneralAcademicAsignature)
  private repositoryGeneralAcademicAsignature = getMongoRepository(GeneralAcademicAsignature);

  @InjectRepository(GeneralAcademicCycle)
  private repositoryGeneralAcademicCycle = getMongoRepository(GeneralAcademicCycle);

  @Query(() => GeneralAcademicStandard, { nullable: true })
  async getGeneralAcademicStandard(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => GeneralAcademicStandardConnection)
  async getAllGeneralAcademicStandard(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<GeneralAcademicStandardConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.findBy({
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find();
      }
    } else {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: {
            active: true,
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.findBy({
          where: {
            active: true,
          },
        });
      }
    }
    let resultConn = new GeneralAcademicStandardConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => GeneralAcademicStandard)
  async createGeneralAcademicStandard(
    @Arg('data') data: NewGeneralAcademicStandard,
    @Ctx() context: IContext
  ): Promise<GeneralAcademicStandard> {
    let dataProcess: NewGeneralAcademicStandard = removeEmptyStringElements(data);
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

  @Mutation(() => GeneralAcademicStandard)
  async updateGeneralAcademicStandard(
    @Arg('data') data: NewGeneralAcademicStandard,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<GeneralAcademicStandard | null> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOneBy(id);
    result = await this.repository.save({
      _id: new ObjectId(id),
      ...result,
      ...dataProcess,
      version: (result?.version as number) + 1,
      updatedByUserId,
    });
    return result;
  }

  @Mutation(() => Boolean)
  async changeActiveGeneralAcademicStandard(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOneBy(id);
    result = await this.repository.save({
      _id: new ObjectId(id),
      ...result,
      active: active,
      version: (result?.version as number) + 1,
      updatedByUserId,
    });
    if (result.id) {
      return true;
    } else {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteGeneralAcademicStandard(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: GeneralAcademicStandard) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: GeneralAcademicStandard) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => GeneralAcademicAsignature, { nullable: true })
  async generalAcademicAsignature(@Root() data: GeneralAcademicStandard) {
    let id = data.generalAcademicAsignatureId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGeneralAcademicAsignature.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => GeneralAcademicCycle, { nullable: true })
  async generalAcademicCycle(@Root() data: GeneralAcademicStandard) {
    let id = data.generalAcademicCycleId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGeneralAcademicCycle.findOneBy(id);
      return result;
    }
    return null;
  }
}
