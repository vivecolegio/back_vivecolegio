import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
  AcademicGradeRepository,
  CampusRepository,
  GeneralPerformanceLevelRepository,
  PerformanceLevelRepository,
  SchoolRepository,
  UserRepository,
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { PerformanceLevelCategory } from '../../enums/PerformanceLevelCategory';
import { PerformanceLevelType } from '../../enums/PerformanceLevelType';
import { NewPerformanceLevel } from '../../inputs/SchoolAdministrator/NewPerformanceLevel';
import { IContext } from '../../interfaces/IContext';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { GeneralPerformanceLevel } from '../../models/GeneralAdministrator/GeneralPerformanceLevel';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import {
  PerformanceLevel,
  PerformanceLevelConnection,
} from '../../models/SchoolAdministrator/PerformanceLevel';
import { ConnectionArgs } from '../../pagination/relaySpecs';
import { AcademicGrade } from './../../models/SchoolAdministrator/AcademicGrade';

@Resolver(PerformanceLevel)
export class PerformanceLevelResolver {
  @InjectRepository(PerformanceLevel)
  private repository = PerformanceLevelRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(GeneralPerformanceLevel)
  private repositoryGeneralPerformanceLevel = GeneralPerformanceLevelRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(Campus)
  private repositoryCampus = CampusRepository;

  @InjectRepository(AcademicGrade)
  private repositoryAcademicGrade = AcademicGradeRepository;

  @Query(() => PerformanceLevel, { nullable: true })
  async getPerformanceLevel(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => PerformanceLevelConnection)
  async getAllPerformanceLevel(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String
  ): Promise<PerformanceLevelConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: { schoolId },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.findBy({ where: { schoolId } });
      }
    } else {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: {
            schoolId,
            active: true,
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.findBy({
          where: {
            schoolId,
            active: true,
          },
        });
      }
    }
    let resultConn = new PerformanceLevelConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => PerformanceLevel)
  async createPerformanceLevel(
    @Arg('data') data: NewPerformanceLevel,
    @Ctx() context: IContext
  ): Promise<PerformanceLevel> {
    let dataProcess: NewPerformanceLevel = removeEmptyStringElements(data);
    let createdByUserId = context?.user?.authorization?.id;
    if (dataProcess?.type == PerformanceLevelType.QUALITATIVE) {
      dataProcess.minimumScore = undefined;
      dataProcess.topScore = undefined;
    }
    if (dataProcess?.campusId && dataProcess?.campusId?.length > 0) {
      dataProcess.category = PerformanceLevelCategory.CAMPUS;
    } else {
      dataProcess.category = PerformanceLevelCategory.SCHOOL;
    }
    const model = await this.repository.create({
      ...dataProcess,
      active: true,
      version: 0,
      createdByUserId,
    });
    let result = await this.repository.save(model);
    return result;
  }

  @Mutation(() => PerformanceLevel)
  async updatePerformanceLevel(
    @Arg('data') data: NewPerformanceLevel,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<PerformanceLevel | null> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOneBy(id);
    if (dataProcess?.type == PerformanceLevelType.QUALITATIVE) {
      dataProcess.minimumScore = undefined;
      dataProcess.topScore = undefined;
    }
    if (dataProcess?.campusId && dataProcess?.campusId?.length > 0) {
      dataProcess.category = PerformanceLevelCategory.CAMPUS;
    } else {
      dataProcess.category = PerformanceLevelCategory.SCHOOL;
    }
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
  async changeActivePerformanceLevel(
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
  async deletePerformanceLevel(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: PerformanceLevel) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: PerformanceLevel) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => GeneralPerformanceLevel, { nullable: true })
  async generalPerformanceLevel(@Root() data: PerformanceLevel) {
    let id = data.generalPerformanceLevelId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGeneralPerformanceLevel.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: PerformanceLevel) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [Campus], { nullable: true })
  async campus(@Root() data: PerformanceLevel) {
    let ids = data.campusId;
    if (ids !== null && ids !== undefined) {
      let dataIds: any[] = [];
      ids.forEach(async (id: any) => {
        dataIds.push(new ObjectId(id));
      });
      const result = await this.repositoryCampus.findBy({ where: { _id: { $in: dataIds } } });
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [AcademicGrade], { nullable: true })
  async academicGrades(@Root() data: PerformanceLevel) {
    let ids = data.academicGradesId;
    if (ids !== null && ids !== undefined) {
      let dataIds: any[] = [];
      ids.forEach(async (id: any) => {
        dataIds.push(new ObjectId(id));
      });
      const result = await this.repositoryAcademicGrade.findBy({
        where: { _id: { $in: dataIds } },
      });
      return result;
    }
    return null;
  }
}
