import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewAcademicIndicator } from '../../inputs/SchoolAdministrator/NewAcademicIndicator';
import { IContext } from '../../interfaces/IContext';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../../models/SchoolAdministrator/AcademicGrade';
import {
  AcademicIndicator,
  AcademicIndicatorConnection,
} from '../../models/SchoolAdministrator/AcademicIndicator';
import { AcademicStandard } from '../../models/SchoolAdministrator/AcademicStandard';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AcademicIndicator)
export class AcademicIndicatorResolver {
  @InjectRepository(AcademicIndicator)
  private repository = getMongoRepository(AcademicIndicator);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(AcademicStandard)
  private repositoryAcademicStandard = getMongoRepository(AcademicStandard);

  @InjectRepository(AcademicAsignature)
  private repositoryAcademicAsignature = getMongoRepository(AcademicAsignature);

  @InjectRepository(AcademicGrade)
  private repositoryAcademicGrade = getMongoRepository(AcademicGrade);

  @InjectRepository(School)
  private repositorySchool = getMongoRepository(School);

  @Query(() => AcademicIndicator, { nullable: true })
  async getAcademicIndicator(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => AcademicIndicatorConnection)
  async getAllAcademicIndicator(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<AcademicIndicatorConnection> {
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
    let resultConn = new AcademicIndicatorConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => AcademicIndicator)
  async createAcademicIndicator(
    @Arg('data') data: NewAcademicIndicator,
    @Ctx() context: IContext
  ): Promise<AcademicIndicator> {
    let dataProcess: NewAcademicIndicator = removeEmptyStringElements(data);
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

  @Mutation(() => AcademicIndicator)
  async updateAcademicIndicator(
    @Arg('data') data: NewAcademicIndicator,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<AcademicIndicator | undefined> {
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
  async changeActiveAcademicIndicator(
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
  async createdByUser(@Root() data: AcademicIndicator) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: AcademicIndicator) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicStandard, { nullable: true })
  async academicStandard(@Root() data: AcademicIndicator) {
    let id = data.academicStandardId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicStandard.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicAsignature, { nullable: true })
  async academicAsignature(@Root() data: AcademicIndicator) {
    let id = data.academicAsignatureId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicAsignature.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicGrade, { nullable: true })
  async academicGrade(@Root() data: AcademicIndicator) {
    let id = data.academicGradeId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicGrade.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: AcademicIndicator) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOne(id);
      return result;
    }
    return null;
  }
}
