import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewAcademicStandard } from '../../inputs/SchoolAdministrator/NewAcademicStandard';
import { IContext } from '../../interfaces/IContext';
import { GeneralAcademicCycle } from '../../models/GeneralAdministrator/GeneralAcademicCycle';
import { GeneralAcademicStandard } from '../../models/GeneralAdministrator/GeneralAcademicStandard';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import {
  AcademicStandard,
  AcademicStandardConnection
} from '../../models/SchoolAdministrator/AcademicStandard';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AcademicStandard)
export class AcademicStandardResolver {
  @InjectRepository(AcademicStandard)
  private repository = getMongoRepository(AcademicStandard);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(GeneralAcademicStandard)
  private repositoryGeneralAcademicStandard = getMongoRepository(GeneralAcademicStandard);

  @InjectRepository(AcademicAsignature)
  private repositoryAcademicAsignature = getMongoRepository(AcademicAsignature);

  @InjectRepository(GeneralAcademicCycle)
  private repositoryGeneralAcademicCycle = getMongoRepository(GeneralAcademicCycle);

  @InjectRepository(School)
  private repositorySchool = getMongoRepository(School);

  @Query(() => AcademicStandard, { nullable: true })
  async getAcademicStandard(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => AcademicStandardConnection)
  async getAllAcademicStandard(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String,
  ): Promise<AcademicStandardConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.find({
          where: { schoolId },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find({ where: { schoolId } });
      }
    } else {
      if (orderCreated) {
        result = await this.repository.find({
          where: {
            schoolId,
            active: true,
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find({
          where: {
            schoolId,
            active: true,
          },
        });
      }
    }
    let resultConn = new AcademicStandardConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => AcademicStandard)
  async createAcademicStandard(
    @Arg('data') data: NewAcademicStandard,
    @Ctx() context: IContext
  ): Promise<AcademicStandard> {
    let dataProcess: NewAcademicStandard = removeEmptyStringElements(data);
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

  @Mutation(() => AcademicStandard)
  async updateAcademicStandard(
    @Arg('data') data: NewAcademicStandard,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<AcademicStandard | undefined> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
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
  async changeActiveAcademicStandard(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
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
  async deleteAcademicStandard(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let data = await this.repository.findOne(id);
    let result = await this.repository.deleteOne({ _id: ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: AcademicStandard) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: AcademicStandard) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => GeneralAcademicStandard, { nullable: true })
  async generalAcademicStandard(@Root() data: AcademicStandard) {
    let id = data.generalAcademicStandardId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGeneralAcademicStandard.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicAsignature, { nullable: true })
  async academicAsignature(@Root() data: AcademicStandard) {
    let id = data.academicAsignatureId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicAsignature.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => GeneralAcademicCycle, { nullable: true })
  async generalAcademicCycle(@Root() data: AcademicStandard) {
    let id = data.generalAcademicCycleId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGeneralAcademicCycle.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: AcademicStandard) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOne(id);
      return result;
    }
    return null;
  }
}
