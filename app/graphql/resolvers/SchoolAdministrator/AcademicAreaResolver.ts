import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { AcademicAreaRepository, AcademicAsignatureRepository, GeneralAcademicAreaRepository, SchoolRepository, SchoolYearRepository, UserRepository } from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewAcademicArea } from '../../inputs/SchoolAdministrator/NewAcademicArea';
import { IContext } from '../../interfaces/IContext';
import { GeneralAcademicArea } from '../../models/GeneralAdministrator/GeneralAcademicArea';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicArea, AcademicAreaConnection } from '../../models/SchoolAdministrator/AcademicArea';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import { SchoolYear } from '../../models/SchoolAdministrator/SchoolYear';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AcademicArea)
export class AcademicAreaResolver {
  @InjectRepository(AcademicArea)
  private repository = AcademicAreaRepository;

  @InjectRepository(AcademicAsignature)
  private repositoryAcademicAsignature = AcademicAsignatureRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(GeneralAcademicArea)
  private repositoryGeneralAcademicArea = GeneralAcademicAreaRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(SchoolYear)
  private repositorySchoolYear = SchoolYearRepository;

  @Query(() => AcademicArea, { nullable: true })
  async getAcademicArea(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => AcademicAreaConnection)
  async getAllAcademicArea(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String,
    @Arg('schoolYearId', () => String, { nullable: true }) schoolYearId: String
  ): Promise<AcademicAreaConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: {
            schoolId,
            schoolYearId
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.findBy({ where: { schoolId, schoolYearId } });
      }
    } else {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: {
            schoolId,
            schoolYearId,
            active: true,
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.findBy({
          where: {
            schoolId,
            schoolYearId,
            active: true,
          },
        });
      }
    }
    let resultConn = new AcademicAreaConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => AcademicArea)
  async createAcademicArea(
    @Arg('data') data: NewAcademicArea,
    @Ctx() context: IContext
  ): Promise<AcademicArea> {
    let dataProcess: NewAcademicArea = removeEmptyStringElements(data);
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

  @Mutation(() => AcademicArea)
  async updateAcademicArea(
    @Arg('data') data: NewAcademicArea,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<AcademicArea | null> {
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
  async changeActiveAcademicArea(
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
  async deleteAcademicArea(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @Mutation(() => Boolean)
  async updateAcademicAreaAcademicAsignatureSchoolYearId(@Arg('schoolId', () => String) schoolId: String, @Arg('schoolYearId', () => String) schoolYearId: String) {
    let results = await this.repository.findBy({ where: { schoolId, schoolYearId } });
    for (let result of results) {
      let datas = await this.repositoryAcademicAsignature.findBy({ where: { academicAreaId: result?.id?.toString() } });
      for (let data of datas) {
        result = await this.repositoryAcademicAsignature.save({
          _id: new ObjectId(data.id.toString()),
          ...data,
          version: (data?.version as number) + 1,
          schoolYearId: schoolYearId.toString()
        });
      }
    }
    return true;
  }

  @Mutation(() => Boolean)
  async importAcademicAreaSchoolYearId(@Arg('schoolId', () => String) schoolId: String, @Arg('oldSchoolYearId', () => String) oldSchoolYearId: String, @Arg('newSchoolYearId', () => String) newSchoolYearId: String) {
    let results = await this.repository.findBy({ where: { schoolId, schoolYearId: oldSchoolYearId } });
    for (let result of results) {
      let datas = await this.repositoryAcademicAsignature.findBy({ where: { academicAreaId: result?.id?.toString() } });
      const model = await this.repository.create({
        generalAcademicAreaId: result.generalAcademicAreaId,
        name: result.name,
        schoolId: result.schoolId,
        abbreviation: result.abbreviation,
        isAverage: result.isAverage,
        order: result.order,
        active: true,
        version: 0,
        schoolYearId: newSchoolYearId.toString()
      });
      let resultSave = await this.repository.save(model);
      if (resultSave) {
        for (let data of datas) {
          let model2 = await this.repositoryAcademicAsignature.create({
            name: data.name,
            abbreviation: data.abbreviation,
            schoolId: resultSave.schoolId,
            generalAcademicAsignatureId: data.generalAcademicAsignatureId,
            order: data.order,
            active: true,
            version: 0,
            academicAreaId: resultSave.id.toString(),
            schoolYearId: newSchoolYearId.toString()
          });
          let resultSave2 = await this.repositoryAcademicAsignature.save(model2);
        }
      }
    }
    return true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: AcademicArea) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: AcademicArea) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => GeneralAcademicArea, { nullable: true })
  async generalAcademicArea(@Root() data: AcademicArea) {
    let id = data.generalAcademicAreaId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGeneralAcademicArea.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: AcademicArea) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => SchoolYear, { nullable: true })
  async schoolYear(@Root() data: AcademicArea) {
    let id = data.schoolYearId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchoolYear.findOneBy(id);
      return result;
    }
    return null;
  }
}
