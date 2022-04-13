import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AcademicPeriodRepository, SchoolRepository, SchoolYearRepository, UserRepository } from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewAcademicPeriod } from '../../inputs/SchoolAdministrator/NewAcademicPeriod';
import { IContext } from '../../interfaces/IContext';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import {
  AcademicPeriod,
  AcademicPeriodConnection
} from '../../models/SchoolAdministrator/AcademicPeriod';
import { SchoolYear } from '../../models/SchoolAdministrator/SchoolYear';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AcademicPeriod)
export class AcademicPeriodResolver {
  @InjectRepository(AcademicPeriod)
  private repository = AcademicPeriodRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(SchoolYear)
  private repositorySchoolYear = SchoolYearRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @Query(() => AcademicPeriod, { nullable: true })
  async getAcademicPeriod(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => AcademicPeriodConnection)
  async getAllAcademicPeriod(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String,
    @Arg('orderCustom', () => Boolean, { nullable: true }) orderCustom: Boolean,
  ): Promise<AcademicPeriodConnection> {
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
      if (orderCustom) {
        result = await this.repository.findBy({
          where: { schoolId },
          order: { order: 1 },
        });
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
      if (orderCustom) {
        result = await this.repository.findBy({
          where: {
            schoolId,
            active: true,
          },
          order: { order: 1 }
        });
      }
    }
    let resultConn = new AcademicPeriodConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => AcademicPeriod)
  async createAcademicPeriod(
    @Arg('data') data: NewAcademicPeriod,
    @Ctx() context: IContext
  ): Promise<AcademicPeriod> {
    let dataProcess: NewAcademicPeriod = removeEmptyStringElements(data);
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

  @Mutation(() => AcademicPeriod)
  async updateAcademicPeriod(
    @Arg('data') data: NewAcademicPeriod,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<AcademicPeriod | null> {
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
  async changeActiveAcademicPeriod(
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
  async deleteAcademicPeriod(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: AcademicPeriod) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: AcademicPeriod) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => SchoolYear, { nullable: true })
  async schoolYear(@Root() data: AcademicPeriod) {
    let id = data.schoolYearId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchoolYear.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: AcademicPeriod) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOneBy(id);
      return result;
    }
    return null;
  }
}
