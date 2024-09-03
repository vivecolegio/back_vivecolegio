import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { GraphQLClient } from 'graphql-request';
import {
  AcademicPeriodRepository,
  SchoolRepository,
  SchoolYearRepository,
  SyncOfflineRepository,
  UserRepository,
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewSyncOffline } from '../../inputs/SchoolAdministrator/NewSyncOffline';
import { IContext } from '../../interfaces/IContext';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicPeriod } from '../../models/SchoolAdministrator/AcademicPeriod';
import { SyncOfflineDescription } from '../../models/SchoolAdministrator/objectType/SyncOfflineDescription';
import { SchoolYear } from '../../models/SchoolAdministrator/SchoolYear';
import { SyncOffline, SyncOfflineConnection } from '../../models/SchoolAdministrator/SyncOffline';
import { ConnectionArgs } from '../../pagination/relaySpecs';
import {
  QUERT_GET_TOTAL_COUNT___,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_GRADE,
  QUERT_GET_TOTAL_COUNT_COURSE,
  QUERT_GET_TOTAL_COUNT_EDUCATION_LEVEL,
  QUERT_GET_TOTAL_COUNT_EVALUATIVE_COMPONENT,
  QUERT_GET_TOTAL_COUNT_MODALITY,
  QUERT_GET_TOTAL_COUNT_PERFORMANCE_LEVEL,
  QUERT_GET_TOTAL_COUNT_SPECIALITY,
  QUERT_GET_TOTAL_COUNT_STUDENT,
  QUERT_GET_TOTAL_COUNT_TEACHER,
} from '../../queries/queries';
import { SpecialtyResolver } from './SpecialtyResolver';

@Resolver(SyncOffline)
export class SyncOfflineResolver {
  @InjectRepository(SyncOffline)
  private repository = SyncOfflineRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(SchoolYear)
  private repositorySchoolYear = SchoolYearRepository;

  @InjectRepository(AcademicPeriod)
  private repositoryAcademicPeriod = AcademicPeriodRepository;

  private specialityResolver = new SpecialtyResolver();

  @Query(() => SyncOffline, { nullable: true })
  async getSyncOffline(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => SyncOfflineConnection)
  async getAllSyncOffline(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String,
    @Arg('schoolYearId', () => String, { nullable: true }) schoolYearId: String,
  ): Promise<SyncOfflineConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: { schoolId, schoolYearId },
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
    let resultConn = new SyncOfflineConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => SyncOffline)
  async createSyncOffline(
    @Arg('data') data: NewSyncOffline,
    @Ctx() context: IContext,
  ): Promise<SyncOffline> {
    let dataProcess: NewSyncOffline = removeEmptyStringElements(data);
    let createdByUserId = context?.user?.authorization?.id;
    let syncOfflineDescriptions: SyncOfflineDescription[] = [];
    syncOfflineDescriptions = await this.countDataSync(
      data?.schoolId + '',
      data?.schoolYearId + '',
      syncOfflineDescriptions,
      context,
    );
    const model = await this.repository.create({
      ...dataProcess,
      syncOfflineDescriptions: syncOfflineDescriptions,
      startDate: new Date(),
      active: true,
      version: 0,
      createdByUserId,
    });
    let result = await this.repository.save(model);
    return result;
  }

  @Mutation(() => SyncOffline)
  async updateSyncOffline(
    @Arg('data') data: NewSyncOffline,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext,
  ): Promise<SyncOffline | null> {
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
  async changeActiveSyncOffline(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext,
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
  async deleteSyncOffline(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext,
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  async countDataSync(
    @Arg('schoolId', () => String) schoolId: string,
    @Arg('schoolYearId', () => String) schoolYearId: string,
    @Arg('syncOfflineDescriptions', () => [SyncOfflineDescription])
    syncOfflineDescriptions: SyncOfflineDescription[],
    @Ctx() context: IContext,
  ) {
    const client = new GraphQLClient('http://vivecolegios.nortedesantander.gov.co:4000/graphql', {
      jsonSerializer: {
        parse: JSON.parse,
        stringify: JSON.stringify,
      },
    });

    let dataPerformanceLevel: any = null;
    let dataEvaluativeComponent: any = null;
    let dataModality: any = null;
    let dataSpecialty: any = null;
    let dataAcademicArea: any = null;
    let dataAcademicAsignature: any = null;
    let dataAcademicGrade: any = null;
    let dataCourse: any = null;
    let dataTeacher: any = null;
    let dataStudent: any = null;

    const schoolData = {
      schoolId: schoolId,
      schoolYearId: schoolYearId,
    };

    syncOfflineDescriptions.push({ ...(await this.syncEducationLevel(false, client, schoolData)) });

    ///continuar aca

    let dataAcademicAsignatureCourse: any = null;
    let dataSchoolConfiguration: any = null;
    let dataCampus: any = null;

    await client.request(QUERT_GET_TOTAL_COUNT___, schoolData).then(async (result: any) => {
      dataAcademicAsignatureCourse = result.data;
      dataSchoolConfiguration = result.data;
      dataCampus = result.data;
    });

    syncOfflineDescriptions.push({
      entity: 'ACADEMIC_ASIGNATURE_COURSE',
      online: dataAcademicAsignatureCourse?.totalCount,
    });
    syncOfflineDescriptions.push({
      entity: 'SCHOOL_CONFIGURATION',
      online: dataSchoolConfiguration?.totalCount,
    });
    syncOfflineDescriptions.push({ entity: 'CAMPUS', online: dataCampus?.totalCount });

    return syncOfflineDescriptions;
  }

  async syncEducationLevel(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client
        .request(QUERT_GET_TOTAL_COUNT_EDUCATION_LEVEL, schoolData)
        .then(async (result: any) => {
          data = result.data;
        });
      return {
        entity: 'EDUCATION_LEVEL',
        online: data?.totalCount,
      };
    }
  }

  async syncPerformanceLevel(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client
        .request(QUERT_GET_TOTAL_COUNT_PERFORMANCE_LEVEL, schoolData)
        .then(async (result: any) => {
          data = result.data;
        });
      return {
        entity: 'PERFORMANCE_LEVEL',
        online: data?.totalCount,
      };
    }
  }

  async syncEvaluativeComponent(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client
        .request(QUERT_GET_TOTAL_COUNT_EVALUATIVE_COMPONENT, schoolData)
        .then(async (result: any) => {
          data = result.data;
        });
      return {
        entity: 'EVALUATIVE_COMPONENT',
        online: data?.totalCount,
      };
    }
  }

  async syncModality(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client.request(QUERT_GET_TOTAL_COUNT_MODALITY, schoolData).then(async (result: any) => {
        data = result.data;
      });
      return {
        entity: 'MODALITY',
        online: data?.totalCount,
      };
    }
  }

  async syncSpeciality(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client
        .request(QUERT_GET_TOTAL_COUNT_SPECIALITY, schoolData)
        .then(async (result: any) => {
          data = result.data;
        });
      return {
        entity: 'SPECIALITY',
        online: data?.totalCount,
      };
    }
  }

  async syncAcademicArea(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client
        .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA, schoolData)
        .then(async (result: any) => {
          data = result.data;
        });
      return {
        entity: 'ACADEMIC_AREA',
        online: data?.totalCount,
      };
    }
  }

  async syncAcademicAsignature(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client
        .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE, schoolData)
        .then(async (result: any) => {
          data = result.data;
        });
      return {
        entity: 'ACADEMIC_ASIGNATURE',
        online: data?.totalCount,
      };
    }
  }

  async syncAcademicGrade(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client
        .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_GRADE, schoolData)
        .then(async (result: any) => {
          data = result.data;
        });
      return {
        entity: 'ACADEMIC_GRADE',
        online: data?.totalCount,
      };
    }
  }

  async syncCourse(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client.request(QUERT_GET_TOTAL_COUNT_COURSE, schoolData).then(async (result: any) => {
        data = result.data;
      });
      return {
        entity: 'COURSE',
        online: data?.totalCount,
      };
    }
  }

  async syncTeacher(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client.request(QUERT_GET_TOTAL_COUNT_TEACHER, schoolData).then(async (result: any) => {
        data = result.data;
      });
      return {
        entity: 'TEACHER',
        online: data?.totalCount,
      };
    }
  }

  async syncStudent(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    if (typeSyncFull) {
    } else {
      await client.request(QUERT_GET_TOTAL_COUNT_STUDENT, schoolData).then(async (result: any) => {
        data = result.data;
      });
      return {
        entity: 'STUDENT',
        online: data?.totalCount,
      };
    }
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: SyncOffline) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: SyncOffline) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: SyncOffline) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => SchoolYear, { nullable: true })
  async schoolYear(@Root() data: SyncOffline) {
    let id = data.schoolYearId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchoolYear.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicPeriod, { nullable: true })
  async academicPeriod(@Root() data: SyncOffline) {
    let id = data.academicPeriodId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicPeriod.findOneBy(id);
      return result;
    }
    return null;
  }
}
