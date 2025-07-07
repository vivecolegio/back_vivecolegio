import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { GraphQLClient } from 'graphql-request';
import {
  AcademicAreaRepository,
  AcademicAsignatureCourseRepository,
  AcademicAsignatureRepository,
  AcademicGradeRepository,
  AcademicPeriodRepository,
  CampusRepository,
  CourseRepository,
  EducationLevelRepository,
  EvaluativeComponentRepository,
  ModalityRepository,
  PerformanceLevelRepository,
  SchoolConfigurationRepository,
  SchoolRepository,
  SchoolYearRepository,
  SpecialtyRepository,
  StudentRepository,
  SyncOfflineRepository,
  TeacherRepository,
  UserRepository,
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewSyncOffline } from '../../inputs/SchoolAdministrator/NewSyncOffline';
import { IContext } from '../../interfaces/IContext';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { AcademicPeriod } from '../../models/SchoolAdministrator/AcademicPeriod';
import { SchoolConfiguration } from '../../models/SchoolAdministrator/SchoolConfiguration';
import { Specialty } from '../../models/SchoolAdministrator/Specialty';
import { Teacher } from '../../models/CampusAdministrator/Teacher';
import { SyncOfflineDescription } from '../../models/SchoolAdministrator/objectType/SyncOfflineDescription';
import { SchoolYear } from '../../models/SchoolAdministrator/SchoolYear';
import { SyncOffline, SyncOfflineConnection } from '../../models/SchoolAdministrator/SyncOffline';
import { ConnectionArgs } from '../../pagination/relaySpecs';
import {
  QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_GRADE,
  QUERT_GET_TOTAL_COUNT_CAMPUS,
  QUERT_GET_TOTAL_COUNT_COURSE,
  QUERT_GET_TOTAL_COUNT_EDUCATION_LEVEL,
  QUERT_GET_TOTAL_COUNT_EVALUATIVE_COMPONENT,
  QUERT_GET_TOTAL_COUNT_MODALITY,
  QUERT_GET_TOTAL_COUNT_PERFORMANCE_LEVEL,
  QUERT_GET_TOTAL_COUNT_SCHOOL_CONFIGURATION,
  QUERT_GET_TOTAL_COUNT_SPECIALITY,
  QUERT_GET_TOTAL_COUNT_STUDENT,
  QUERT_GET_TOTAL_COUNT_TEACHER,
  QUERY_GET_ALL_CAMPUS,
  QUERY_GET_ALL_SCHOOL_CONFIGURATION,
  QUERY_GET_ALL_TEACHER,
  QUERY_GET_CAMPUS,
  QUERY_GET_TEACHER,
  QUERY_GET_ALL_STUDENT,
  QUERY_GET_STUDENT,
  QUERY_GET_ALL_SPECIALTY,
  QUERY_GET_SPECIALTY,
  QUERY_GET_ALL_EDUCATION_LEVEL,
  QUERY_GET_EDUCATION_LEVEL,
  QUERY_GET_ALL_COURSE,
  QUERY_GET_COURSE,
  QUERY_GET_ALL_MODALITY,
  QUERY_GET_MODALITY,
  QUERY_GET_ALL_PERFORMANCE_LEVEL,
  QUERY_GET_PERFORMANCE_LEVEL,
  QUERY_GET_ALL_ACADEMIC_AREA_SYNC_OFFLINE,
  QUERY_GET_ALL_ACADEMIC_ASIGNATURE_SYNC_OFFLINE,
  QUERY_GET_ALL_ACADEMIC_GRADE_SYNC_OFFLINE,
  QUERY_GET_ALL_EVALUATIVE_COMPONENT_SYNC_OFFLINE,
} from '../../queries/queries';
import { SpecialtyResolver } from './SpecialtyResolver';
import { Student } from '../../models/GeneralAdministrator/Student';
import { EducationLevel } from '../../models/SchoolAdministrator/EducationLevel';
import { Course } from '../../models/CampusAdministrator/Course';
import { Modality } from '../../models/SchoolAdministrator/Modality';
import { PerformanceLevel } from '../../models/SchoolAdministrator/PerformanceLevel';
import { AcademicArea } from '../../models/SchoolAdministrator/AcademicArea';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../../models/SchoolAdministrator/AcademicGrade';
import { AcademicAsignatureCourse } from '../../models/CampusAdministrator/AcademicAsignatureCourse';
import { EvaluativeComponent } from '../../models/SchoolAdministrator/EvaluativeComponent';

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

  @InjectRepository(Campus)
  private repositoryCampus = CampusRepository;

  @InjectRepository(SchoolConfiguration)
  private repositorySchoolConfiguration = SchoolConfigurationRepository;

  @InjectRepository(Specialty)
  private repositorySpecialty = SpecialtyRepository;

  @InjectRepository(Teacher)
  private repositoryTeacher = TeacherRepository;

  @InjectRepository(Student)
  private repositoryStudent = StudentRepository;

  @InjectRepository(EducationLevel)
  private repositoryEducationLevel = EducationLevelRepository;

  @InjectRepository(Course)
  private repositoryCourse = CourseRepository;

  @InjectRepository(Modality)
  private repositoryModality = ModalityRepository;

  @InjectRepository(PerformanceLevel)
  private repositoryPerformanceLevel = PerformanceLevelRepository;

  @InjectRepository(AcademicArea)
  private repositoryAcademicArea = AcademicAreaRepository;

  @InjectRepository(AcademicAsignature)
  private repositoryAcademicAsignature = AcademicAsignatureRepository;

  @InjectRepository(AcademicGrade)
  private repositoryAcademicGrade = AcademicGradeRepository;

  @InjectRepository(AcademicAsignatureCourse)
  private repositoryAcademicAsignatureCourse = AcademicAsignatureCourseRepository;

  @InjectRepository(EvaluativeComponent)
  private repositoryEvaluativeComponent = EvaluativeComponentRepository;

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
      true, // typeSyncFull = true para llenar datos
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
    
    const totalEntities = syncOfflineDescriptions.reduce((sum, desc) => sum + (desc.online || 0), 0);
    console.log(`🚀 [SYNC-COMPLETE] ===== RESUMEN DE SINCRONIZACIÓN COMPLETA =====`);
    console.log(`📊 [SYNC-COMPLETE] Total entidades sincronizadas: ${totalEntities}`);
    console.log(`📋 [SYNC-COMPLETE] Detalle por entidad:`);
    syncOfflineDescriptions.forEach(desc => {
      console.log(`   • ${desc.entity}: ${desc.online || 0} entidades`);
    });
    console.log(`🎯 [SYNC-COMPLETE] ============================================`);
    
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

  @Mutation(() => SyncOffline)
  async createSyncOfflineCountOnly(
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
      false, // typeSyncFull = false para solo conteo
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
    
    const totalEntities = syncOfflineDescriptions.reduce((sum, desc) => sum + (desc.online || 0), 0);
    console.log(`📊 [COUNT-SYNC] ===== RESUMEN DE CONTEO DE SINCRONIZACIÓN =====`);
    console.log(`📊 [COUNT-SYNC] Total entidades disponibles: ${totalEntities}`);
    console.log(`📋 [COUNT-SYNC] Detalle por entidad:`);
    syncOfflineDescriptions.forEach(desc => {
      console.log(`   • ${desc.entity}: ${desc.online || 0} entidades disponibles`);
    });
    console.log(`🎯 [COUNT-SYNC] ============================================`);
    
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
    return result?.result?.ok === 1 || true;
  }

  async countDataSync(
    @Arg('schoolId', () => String) schoolId: string,
    @Arg('schoolYearId', () => String) schoolYearId: string,
    @Arg('syncOfflineDescriptions', () => [SyncOfflineDescription])
    syncOfflineDescriptions: SyncOfflineDescription[],
    @Ctx() context: IContext,
    typeSyncFull: boolean = false, // Nuevo parámetro para indicar si ejecutar sync completo
  ) {
    const client = new GraphQLClient('http://vivecolegios.nortedesantander.gov.co:5000/graphql', {
      jsonSerializer: {
        parse: JSON.parse,
        stringify: JSON.stringify,
      },
    });

    const schoolData = {
      schoolId: schoolId,
      schoolYearId: schoolYearId,
    };

    console.log(`[COUNT-DATA-SYNC] Starting ${typeSyncFull ? 'FULL' : 'COUNT'} synchronization...`);

    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de EDUCATION_LEVEL...`);
    syncOfflineDescriptions.push({ ...(await this.syncEducationLevel(typeSyncFull, client, schoolData)) });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de PERFORMANCE_LEVEL...`);
    syncOfflineDescriptions.push({
      ...(await this.syncPerformanceLevel(typeSyncFull, client, schoolData)),
    });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de EVALUATIVE_COMPONENT...`);
    syncOfflineDescriptions.push({
      ...(await this.syncEvaluativeComponent(typeSyncFull, client, schoolData)),
    });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de MODALITY...`);
    syncOfflineDescriptions.push({ ...(await this.syncModality(typeSyncFull, client, schoolData)) });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de SPECIALTY...`);
    syncOfflineDescriptions.push({ ...(await this.syncSpecialty(typeSyncFull, client, schoolData)) });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de ACADEMIC_AREA...`);
    syncOfflineDescriptions.push({ ...(await this.syncAcademicArea(typeSyncFull, client, schoolData)) });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de ACADEMIC_ASIGNATURE...`);
    syncOfflineDescriptions.push({
      ...(await this.syncAcademicAsignature(typeSyncFull, client, schoolData)),
    });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de ACADEMIC_GRADE...`);
    syncOfflineDescriptions.push({ ...(await this.syncAcademicGrade(typeSyncFull, client, schoolData)) });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de COURSE...`);
    syncOfflineDescriptions.push({ ...(await this.syncCourse(typeSyncFull, client, schoolData)) });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de TEACHER...`);
    syncOfflineDescriptions.push({ ...(await this.syncTeacher(typeSyncFull, client, schoolData)) });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de STUDENT...`);
    syncOfflineDescriptions.push({ ...(await this.syncStudent(typeSyncFull, client, schoolData)) });
    
    // Sincronización de Campus y SchoolConfiguration
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de CAMPUS...`);
    syncOfflineDescriptions.push({ ...(await this.syncCampus(typeSyncFull, client, schoolData)) });
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de SCHOOL_CONFIGURATION...`);
    syncOfflineDescriptions.push({ ...(await this.syncSchoolConfiguration(typeSyncFull, client, schoolData)) });

    // Sincronización de AcademicAsignatureCourse
    console.log(`[COUNT-DATA-SYNC] 📝 Iniciando sincronización de ACADEMIC_ASIGNATURE_COURSE...`);
    syncOfflineDescriptions.push({ ...(await this.syncAcademicAsignatureCourse(typeSyncFull, client, schoolData)) });
    
    // Log de resumen detallado por entidad
    console.log(`[COUNT-DATA-SYNC] 📊 RESUMEN DETALLADO DE SINCRONIZACIÓN:`);
    syncOfflineDescriptions.forEach((desc, index) => {
      console.log(`   ${index + 1}. ${desc.entity}: ${desc.online || 0} entidades`);
    });
    
    return syncOfflineDescriptions;
  }

  async syncEducationLevel(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_EDUCATION_LEVEL, schoolData)
          .then(async (result: any) => {
            data = result.data;
            
            if (data?.edges?.length > 0) {
              for (const edge of data.edges) {
                const educationLevel = edge.node;
                
                try {
                  const existingEducationLevel = await this.repositoryEducationLevel.findOne({
                    where: { id: educationLevel.id },
                  });

                  if (existingEducationLevel) {
                    console.log(`[SYNC] Update EDUCATION_LEVEL ${educationLevel.id}`);
                    await this.repositoryEducationLevel.updateOne(
                      { id: educationLevel.id },
                      { $set: { ...educationLevel } }
                    );
                  } else {
                    console.log(`[SYNC] Add EDUCATION_LEVEL ${educationLevel.id}`);
                    await this.repositoryEducationLevel.save(educationLevel);
                  }
                } catch (dbError) {
                  console.error(`[SYNC-ERROR] EDUCATION_LEVEL ${educationLevel.id}:`, dbError);
                }
              }
            }
          });
          
        return {
          entity: 'EDUCATION_LEVEL',
          online: data?.totalCount || 0,
          synced: data?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_EDUCATION_LEVEL, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });
        return {
          entity: 'EDUCATION_LEVEL',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-ERROR] EDUCATION_LEVEL failed:', error);
      return {
        entity: 'EDUCATION_LEVEL',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncPerformanceLevel(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_PERFORMANCE_LEVEL, { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          for (let performanceLevelEdge of data.data.edges) {
            let performanceLevelId = performanceLevelEdge.node.id?.toString();
            let performanceLevelDetails = { ...performanceLevelEdge.node };
            
            delete performanceLevelDetails.id;
            
            let existingPerformanceLevel = await this.repositoryPerformanceLevel.findOneBy(performanceLevelId);
            
            if (existingPerformanceLevel == null) {
              console.log(`[SYNC-PERFORMANCE-LEVEL] Add: ${performanceLevelDetails.name}`);
              await this.repositoryPerformanceLevel.save({
                _id: new ObjectId(performanceLevelId),
                ...performanceLevelDetails,
              });
            } else {
              console.log(`[SYNC-PERFORMANCE-LEVEL] Update: ${performanceLevelDetails.name}`);
              await this.repositoryPerformanceLevel.update(
                { id: performanceLevelId },
                performanceLevelDetails,
              );
            }
          }
        }
        
        return {
          entity: 'PERFORMANCE_LEVEL',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_PERFORMANCE_LEVEL, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });
        
        return {
          entity: 'PERFORMANCE_LEVEL',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error(`[SYNC-PERFORMANCE-LEVEL] ERROR:`, error);
      return {
        entity: 'PERFORMANCE_LEVEL',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncEvaluativeComponent(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_EVALUATIVE_COMPONENT_SYNC_OFFLINE, { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.getAllEvaluativeComponentSyncOffline?.edges && data.getAllEvaluativeComponentSyncOffline.edges.length > 0) {
          for (let evaluativeComponentEdge of data.getAllEvaluativeComponentSyncOffline.edges) {
            let evaluativeComponentId = evaluativeComponentEdge.node.id?.toString();
            let evaluativeComponentDetails = { ...evaluativeComponentEdge.node };
            
            delete evaluativeComponentDetails.id;
            delete evaluativeComponentDetails.school;
            delete evaluativeComponentDetails.academicAsignatures;
            delete evaluativeComponentDetails.academicAreas;
            delete evaluativeComponentDetails.schoolYear;
            delete evaluativeComponentDetails.createdByUser;
            delete evaluativeComponentDetails.updatedByUser;
            
            let existingEvaluativeComponent = await this.repositoryEvaluativeComponent.findOneBy(evaluativeComponentId);
            
            if (existingEvaluativeComponent == null) {
              console.log(`[SYNC-EVALUATIVE-COMPONENT] Add: ${evaluativeComponentDetails.name}`);
              await this.repositoryEvaluativeComponent.save({
                _id: new ObjectId(evaluativeComponentId),
                ...evaluativeComponentDetails,
              });
            } else {
              console.log(`[SYNC-EVALUATIVE-COMPONENT] Update: ${evaluativeComponentDetails.name}`);
              await this.repositoryEvaluativeComponent.update(
                { id: evaluativeComponentId },
                evaluativeComponentDetails,
              );
            }
          }
        }
        
        return {
          entity: 'EVALUATIVE_COMPONENT',
          online: data?.getAllEvaluativeComponentSyncOffline?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_EVALUATIVE_COMPONENT, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });
        
        return {
          entity: 'EVALUATIVE_COMPONENT',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-EVALUATIVE-COMPONENT] ERROR:', error);
      return {
        entity: 'EVALUATIVE_COMPONENT',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncModality(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_MODALITY, schoolData)
          .then(async (result: any) => {
            data = result.data;
            
            if (data?.edges?.length > 0) {
              for (const edge of data.edges) {
                const modality = edge.node;
                
                try {
                  const existingModality = await this.repositoryModality.findOne({
                    where: { id: modality.id },
                  });

                  if (existingModality) {
                    console.log(`[SYNC-MODALITY] Update: ${modality.name}`);
                    await this.repositoryModality.updateOne(
                      { id: modality.id },
                      { $set: { ...modality } }
                    );
                  } else {
                    console.log(`[SYNC-MODALITY] Add: ${modality.name}`);
                    await this.repositoryModality.save(modality);
                  }
                } catch (dbError) {
                  console.error(`[SYNC-MODALITY] Error processing modality ${modality.id}:`, dbError);
                }
              }
            }
          });
          
        return {
          entity: 'MODALITY',
          online: data?.totalCount || 0,
          synced: data?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_MODALITY, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });
        return {
          entity: 'MODALITY',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-MODALITY] ERROR:', error);
      return {
        entity: 'MODALITY',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncSpeciality(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        // This entity is deprecated, using SPECIALTY instead
        return {
          entity: 'SPECIALITY',
          online: 0,
          deprecated: true,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_SPECIALITY, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });
        
        return {
          entity: 'SPECIALITY',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-SPECIALITY] ERROR:', error);
      return {
        entity: 'SPECIALITY',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncSpecialty(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_SPECIALTY, { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          for (let specialtyEdge of data.data.edges) {
            let specialtyId = specialtyEdge.node.id?.toString();
            let specialtyDetails = { ...specialtyEdge.node };
            
            delete specialtyDetails.id;
            
            let existingSpecialty = await this.repositorySpecialty.findOneBy(specialtyId);
            
            if (existingSpecialty == null) {
              console.log(`[SYNC-SPECIALTY] Add: ${specialtyDetails.name || 'No name'}`);
              await this.repositorySpecialty.save({
                _id: new ObjectId(specialtyId),
                ...specialtyDetails,
              });
            } else {
              console.log(`[SYNC-SPECIALTY] Update: ${specialtyDetails.name || 'No name'}`);
              await this.repositorySpecialty.update(
                { id: specialtyId },
                specialtyDetails,
              );
            }
          }
        }
        
        return {
          entity: 'SPECIALTY',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_SPECIALITY, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });
        
        return {
          entity: 'SPECIALTY',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-SPECIALTY] ERROR:', error);
      return {
        entity: 'SPECIALTY',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncAcademicArea(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_ACADEMIC_AREA_SYNC_OFFLINE, { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.getAllAcademicAreaSyncOffline?.edges && data.getAllAcademicAreaSyncOffline.edges.length > 0) {
          for (let academicAreaEdge of data.getAllAcademicAreaSyncOffline.edges) {
            let academicAreaId = academicAreaEdge.node.id?.toString();
            let academicAreaDetails = { ...academicAreaEdge.node };
            
            delete academicAreaDetails.id;
            delete academicAreaDetails.school;
            delete academicAreaDetails.generalAcademicArea;
            delete academicAreaDetails.academicGrade;
            delete academicAreaDetails.schoolYear;
            delete academicAreaDetails.createdByUser;
            delete academicAreaDetails.updatedByUser;
            
            let existingAcademicArea = await this.repositoryAcademicArea.findOneBy(academicAreaId);
            
            if (existingAcademicArea == null) {
              console.log(`[SYNC-ACADEMIC-AREA] Add: ${academicAreaDetails.name}`);
              await this.repositoryAcademicArea.save({
                _id: new ObjectId(academicAreaId),
                ...academicAreaDetails,
              });
            } else {
              console.log(`[SYNC-ACADEMIC-AREA] Update: ${academicAreaDetails.name}`);
              await this.repositoryAcademicArea.update(
                { id: academicAreaId },
                academicAreaDetails,
              );
            }
          }
        }
        
        return {
          entity: 'ACADEMIC_AREA',
          online: data?.getAllAcademicAreaSyncOffline?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });
        
        return {
          entity: 'ACADEMIC_AREA',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-ACADEMIC-AREA] ERROR:', error);
      return {
        entity: 'ACADEMIC_AREA',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncAcademicAsignature(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_SYNC_OFFLINE, { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.getAllAcademicAsignatureSyncOffline?.edges && data.getAllAcademicAsignatureSyncOffline.edges.length > 0) {
          for (let academicAsignatureEdge of data.getAllAcademicAsignatureSyncOffline.edges) {
            let academicAsignatureId = academicAsignatureEdge.node.id?.toString();
            let academicAsignatureDetails = { ...academicAsignatureEdge.node };
            
            delete academicAsignatureDetails.id;
            delete academicAsignatureDetails.school;
            delete academicAsignatureDetails.academicArea;
            delete academicAsignatureDetails.academicGrade;
            delete academicAsignatureDetails.generalAcademicAsignature;
            delete academicAsignatureDetails.schoolYear;
            delete academicAsignatureDetails.createdByUser;
            delete academicAsignatureDetails.updatedByUser;
            
            let existingAcademicAsignature = await this.repositoryAcademicAsignature.findOneBy(academicAsignatureId);
            
            if (existingAcademicAsignature == null) {
              console.log(`[SYNC-ACADEMIC-ASIGNATURE] Add: ${academicAsignatureDetails.name}`);
              await this.repositoryAcademicAsignature.save({
                _id: new ObjectId(academicAsignatureId),
                ...academicAsignatureDetails,
              });
            } else {
              console.log(`[SYNC-ACADEMIC-ASIGNATURE] Update: ${academicAsignatureDetails.name}`);
              await this.repositoryAcademicAsignature.update(
                { id: academicAsignatureId },
                academicAsignatureDetails,
              );
            }
          }
        }
        
        return {
          entity: 'ACADEMIC_ASIGNATURE',
          online: data?.getAllAcademicAsignatureSyncOffline?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });
        
        return {
          entity: 'ACADEMIC_ASIGNATURE',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-ACADEMIC-ASIGNATURE] ERROR:', error);
      return {
        entity: 'ACADEMIC_ASIGNATURE',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncAcademicGrade(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_ACADEMIC_GRADE_SYNC_OFFLINE, { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.getAllAcademicGradeSyncOffline?.edges && data.getAllAcademicGradeSyncOffline.edges.length > 0) {
          for (let academicGradeEdge of data.getAllAcademicGradeSyncOffline.edges) {
            let academicGradeId = academicGradeEdge.node.id?.toString();
            let academicGradeDetails = { ...academicGradeEdge.node };
            
            delete academicGradeDetails.id;
            delete academicGradeDetails.school;
            delete academicGradeDetails.educationLevel;
            delete academicGradeDetails.specialty;
            delete academicGradeDetails.generalAcademicCycle;
            delete academicGradeDetails.generalAcademicGrade;
            delete academicGradeDetails.schoolYear;
            delete academicGradeDetails.createdByUser;
            delete academicGradeDetails.updatedByUser;
            
            let existingAcademicGrade = await this.repositoryAcademicGrade.findOneBy(academicGradeId);
            
            if (existingAcademicGrade == null) {
              console.log(`[SYNC-ACADEMIC-GRADE] Add: ${academicGradeDetails.name}`);
              await this.repositoryAcademicGrade.save({
                _id: new ObjectId(academicGradeId),
                ...academicGradeDetails,
              });
            } else {
              console.log(`[SYNC-ACADEMIC-GRADE] Update: ${academicGradeDetails.name}`);
              await this.repositoryAcademicGrade.update(
                { id: academicGradeId },
                academicGradeDetails,
              );
            }
          }
        }
        
        return {
          entity: 'ACADEMIC_GRADE',
          online: data?.getAllAcademicGradeSyncOffline?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_GRADE, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });
        
        return {
          entity: 'ACADEMIC_GRADE',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-ACADEMIC-GRADE] ERROR:', error);
      return {
        entity: 'ACADEMIC_GRADE',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncCourse(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_COURSE, schoolData)
          .then(async (result: any) => {
            data = result.data;
            
            if (data?.edges?.length > 0) {
              for (const edge of data.edges) {
                const course = edge.node;
                
                try {
                  const existingCourse = await this.repositoryCourse.findOne({
                    where: { id: course.id },
                  });

                  if (existingCourse) {
                    console.log(`[SYNC-COURSE] Update: ${course.name}`);
                    await this.repositoryCourse.updateOne(
                      { id: course.id },
                      { $set: { ...course } }
                    );
                  } else {
                    console.log(`[SYNC-COURSE] Add: ${course.name}`);
                    await this.repositoryCourse.save(course);
                  }
                } catch (dbError) {
                  console.error(`[SYNC-COURSE] Error processing course ${course.id}:`, dbError);
                }
              }
            }
          });
          
        return {
          entity: 'COURSE',
          online: data?.totalCount || 0,
          synced: data?.edges?.length || 0,
        };
      } else {
        await client.request(QUERT_GET_TOTAL_COUNT_COURSE, schoolData).then(async (result: any) => {
          data = result.data;
        });
        return {
          entity: 'COURSE',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-COURSE] ERROR:', error);
      return {
        entity: 'COURSE',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncTeacher(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_TEACHER, { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          for (let teacherEdge of data.data.edges) {
            let teacherId = teacherEdge.node.id?.toString();
            let teacherDetails = { ...teacherEdge.node };
            let userDetails = teacherDetails.user ? { ...teacherDetails.user } : null;
            
            delete teacherDetails.id;
            delete teacherDetails.user;
            
            // 1. Sincronizar el Usuario si existe
            if (userDetails) {
              let userId = userDetails.id?.toString();
              delete userDetails.id;
              
              let existingUser = await this.repositoryUser.findOneBy(userId);
              
              if (existingUser == null) {
                console.log(`[SYNC-TEACHER] Add User: ${userDetails.name} ${userDetails.lastName}`);
                await this.repositoryUser.save({
                  _id: new ObjectId(userId),
                  ...userDetails,
                });
              } else {
                console.log(`[SYNC-TEACHER] Update User: ${userDetails.name} ${userDetails.lastName}`);
                await this.repositoryUser.update(
                  { id: userId },
                  userDetails,
                );
              }
            }
            
            // 2. Sincronizar el Teacher
            let existingTeacher = await this.repositoryTeacher.findOneBy(teacherId);
            
            if (existingTeacher == null) {
              console.log(`[SYNC-TEACHER] Add Teacher: ${teacherDetails.code || teacherId}`);
              await this.repositoryTeacher.save({
                _id: new ObjectId(teacherId),
                ...teacherDetails,
              });
            } else {
              console.log(`[SYNC-TEACHER] Update Teacher: ${teacherDetails.code || teacherId}`);
              await this.repositoryTeacher.update(
                { id: teacherId },
                teacherDetails,
              );
            }
          }
        }
        
        return {
          entity: 'TEACHER',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_TEACHER, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });

        return {
          entity: 'TEACHER',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-TEACHER] ERROR:', error);
      return {
        entity: 'TEACHER',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncStudent(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_STUDENT, { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          for (let studentEdge of data.data.edges) {
            let studentId = studentEdge.node.id?.toString();
            let studentDetails = { ...studentEdge.node };
            let userDetails = studentDetails.user ? { ...studentDetails.user } : null;
            
            delete studentDetails.id;
            delete studentDetails.user;
            
            // 1. Sincronizar el Usuario si existe
            if (userDetails) {
              let userId = userDetails.id?.toString();
              delete userDetails.id;
              
              let existingUser = await this.repositoryUser.findOneBy(userId);
              
              if (existingUser == null) {
                console.log(`[SYNC-STUDENT] Add User: ${userDetails.name} ${userDetails.lastName}`);
                await this.repositoryUser.save({
                  _id: new ObjectId(userId),
                  ...userDetails,
                });
              } else {
                console.log(`[SYNC-STUDENT] Update User: ${userDetails.name} ${userDetails.lastName}`);
                await this.repositoryUser.update(
                  { id: userId },
                  userDetails,
                );
              }
            }
            
            // 2. Sincronizar el Student
            let existingStudent = await this.repositoryStudent.findOneBy(studentId);
            
            if (existingStudent == null) {
              console.log(`[SYNC-STUDENT] Add Student: ${studentDetails.code || studentId}`);
              await this.repositoryStudent.save({
                _id: new ObjectId(studentId),
                ...studentDetails,
              });
            } else {
              console.log(`[SYNC-STUDENT] Update Student: ${studentDetails.code || studentId}`);
              await this.repositoryStudent.update(
                { id: studentId },
                studentDetails,
              );
            }
          }
        }
        
        return {
          entity: 'STUDENT',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERT_GET_TOTAL_COUNT_STUDENT, schoolData)
          .then(async (result: any) => {
            data = result.data;
          });
        
        return {
          entity: 'STUDENT',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error('[SYNC-STUDENT] ERROR:', error);
      return {
        entity: 'STUDENT',
        online: 0,
        error: String(error),
      };
    }
  }

  async syncCampus(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_CAMPUS, { schoolId: schoolData.schoolId })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          for (let campusEdge of data.data.edges) {
            let id = campusEdge.node.id?.toString();
            let campusDetails = { ...campusEdge.node };
            delete campusDetails.id;
            
            let existingCampus = await this.repositoryCampus.findOneBy(id);
            
            if (existingCampus == null) {
              await this.repositoryCampus.save({
                _id: new ObjectId(id),
                ...campusDetails,
              });
            } else {
              await this.repositoryCampus.update(
                { id: id },
                campusDetails,
              );
            }
          }
        }

        return {
          entity: 'CAMPUS',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERY_GET_ALL_CAMPUS, { schoolId: schoolData.schoolId })
          .then(async (result: any) => {
            data = result;
          });

        return {
          entity: 'CAMPUS',
          online: data?.data?.edges?.length || 0,
        };
      }
    } catch (error) {
      return {
        entity: 'CAMPUS',
        online: 0,
      };
    }
  }

  async syncSchoolConfiguration(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_SCHOOL_CONFIGURATION, { schoolId: schoolData.schoolId })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          for (let configEdge of data.data.edges) {
            let id = configEdge.node.id?.toString();
            let configDetails = { ...configEdge.node };
            delete configDetails.id;
            
            let existingConfig = await this.repositorySchoolConfiguration.findOneBy(id);
            
            if (existingConfig == null) {
              await this.repositorySchoolConfiguration.save({
                _id: new ObjectId(id),
                ...configDetails,
              });
            } else {
              await this.repositorySchoolConfiguration.update(
                { id: id },
                configDetails,
              );
            }
          }
        }

        return {
          entity: 'SCHOOL_CONFIGURATION',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        await client
          .request(QUERY_GET_ALL_SCHOOL_CONFIGURATION, { schoolId: schoolData.schoolId })
          .then(async (result: any) => {
            data = result;
          });

        return {
          entity: 'SCHOOL_CONFIGURATION',
          online: data?.data?.edges?.length || 0,
        };
      }
    } catch (error) {
      return {
        entity: 'SCHOOL_CONFIGURATION',
        online: 0,
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

  /**
   * Sincroniza Campus por ID específicos.
   * Toma una lista de IDs de Campus y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  async syncCampusByIds(campusIds: string[], client: GraphQLClient): Promise<void> {
    for (let campusId of campusIds) {
      try {
        let campusData: any = null;
        campusData = await client.request(QUERY_GET_CAMPUS, { id: campusId });
        
        if (campusData?.data) {
          let id = campusData.data.id?.toString();
          let campusDetails = { ...campusData.data };
          delete campusDetails.id;
          
          let existingCampus = await this.repositoryCampus.findOneBy(id);
          
          if (existingCampus == null) {
            await this.repositoryCampus.save({
              _id: new ObjectId(id),
              ...campusDetails,
            });
          } else {
            await this.repositoryCampus.update(
              { id: id },
              campusDetails,
            );
          }
        }
      } catch (error) {
        // Error silencioso
      }
    }
  }

  /**
   * Sincroniza SchoolConfiguration por ID específicos.
   * Toma una lista de IDs de SchoolConfiguration y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  async syncSchoolConfigurationByIds(configIds: string[], client: GraphQLClient, schoolId: string): Promise<void> {
    try {
      let schoolConfigData: any = null;
      schoolConfigData = await client.request(QUERY_GET_ALL_SCHOOL_CONFIGURATION, { schoolId: schoolId });
      
      if (schoolConfigData?.data?.edges) {
        const filteredConfigs = schoolConfigData.data.edges.filter((config: any) => 
          configIds.includes(config.node.id)
        );
        
        for (let configEdge of filteredConfigs) {
          let id = configEdge.node.id?.toString();
          let configDetails = { ...configEdge.node };
          delete configDetails.id;
          
          let existingConfig = await this.repositorySchoolConfiguration.findOneBy(id);
          
          if (existingConfig == null) {
            await this.repositorySchoolConfiguration.save({
              _id: new ObjectId(id),
              ...configDetails,
            });
          } else {
            await this.repositorySchoolConfiguration.update(
              { id: id },
              configDetails,
            );
          }
        }
      }
    } catch (error) {
      // Error silencioso
    }
  }

  /**
   * Sincroniza Teachers por ID específicos.
   * Toma una lista de IDs de Teachers y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local junto con sus usuarios asociados.
   */
  async syncTeachersByIds(teacherIds: string[], client: GraphQLClient): Promise<void> {
    for (let teacherId of teacherIds) {
      try {
        let teacherData: any = null;
        teacherData = await client.request(QUERY_GET_TEACHER, { id: teacherId });
        
        if (teacherData?.data) {
          let id = teacherData.data.id?.toString();
          let teacherDetails = { ...teacherData.data };
          let userDetails = teacherDetails.user ? { ...teacherDetails.user } : null;
          
          // Eliminar campos que no se deben insertar directamente
          delete teacherDetails.id;
          delete teacherDetails.user;
          
          // 1. Primero sincronizar el Usuario si existe
          if (userDetails) {
            let userId = userDetails.id?.toString();
            delete userDetails.id;
            
            let existingUser = await this.repositoryUser.findOneBy(userId);
            
            if (existingUser == null) {
              await this.repositoryUser.save({
                _id: new ObjectId(userId),
                ...userDetails,
              });
            } else {
              await this.repositoryUser.update(
                { id: userId },
                userDetails,
              );
            }
          }
          
          // 2. Luego sincronizar el Teacher
          let existingTeacher = await this.repositoryTeacher.findOneBy(id);
          
          if (existingTeacher == null) {
            await this.repositoryTeacher.save({
              _id: new ObjectId(id),
              ...teacherDetails,
            });
          } else {
            await this.repositoryTeacher.update(
              { id: id },
              teacherDetails,
            );
          }
        }
      } catch (error) {
        // Error silencioso
      }
    }
  }

  /**
   * Sincroniza Students por ID específicos.
   * Toma una lista de IDs de Students y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local junto con sus usuarios asociados.
   */
  async syncStudentsByIds(studentIds: string[], client: GraphQLClient): Promise<void> {
    console.log(`🎓 [SYNC-STUDENTS-BY-IDS] Sincronizando ${studentIds.length} estudiantes específicos...`);
    
    for (let studentId of studentIds) {
      try {
        console.log(`🎓 [SYNC-STUDENTS-BY-IDS] 🔍 Buscando estudiante ID: ${studentId}`);
        let studentData: any = null;
        studentData = await client.request(QUERY_GET_STUDENT, { id: studentId });
        
        if (studentData?.data) {
          let id = studentData.data.id?.toString();
          let studentDetails = { ...studentData.data };
          let userDetails = studentDetails.user ? { ...studentDetails.user } : null;
          
          // Eliminar campos que no se deben insertar directamente
          delete studentDetails.id;
          delete studentDetails.user;
          
          // 1. Primero sincronizar el Usuario si existe
          if (userDetails) {
            let userId = userDetails.id?.toString();
            delete userDetails.id;
            
            let existingUser = await this.repositoryUser.findOneBy(userId);
            
            if (existingUser == null) {
              console.log(`🎓 [SYNC-STUDENTS-BY-IDS] 👤 Creando usuario para estudiante: ${userId}`);
              await this.repositoryUser.save({
                _id: new ObjectId(userId),
                ...userDetails,
              });
            } else {
              console.log(`🎓 [SYNC-STUDENTS-BY-IDS] 👤 Actualizando usuario para estudiante: ${userId}`);
              await this.repositoryUser.update(
                { id: userId },
                userDetails,
              );
            }
          }
          
          // 2. Luego sincronizar el Student
          let existingStudent = await this.repositoryStudent.findOneBy(id);
          
          if (existingStudent == null) {
            console.log(`🎓 [SYNC-STUDENTS-BY-IDS] 🆕 Creando estudiante: ${id}`);
            await this.repositoryStudent.save({
              _id: new ObjectId(id),
              ...studentDetails,
            });
          } else {
            console.log(`🎓 [SYNC-STUDENTS-BY-IDS] 🔄 Actualizando estudiante: ${id}`);
            await this.repositoryStudent.update(
              { id: id },
              studentDetails,
            );
          }
        }
      } catch (error) {
        console.log(`🎓 [SYNC-STUDENTS-BY-IDS] ❌ Error procesando estudiante ${studentId}:`, error);
        // Error silencioso para continuar con los demás
      }
    }
    
    console.log(`🎓 [SYNC-STUDENTS-BY-IDS] ✅ Sincronización por IDs completada`);
  }

  /**
   * Sincroniza Specialties por ID específicos.
   * Toma una lista de IDs de Specialties y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  async syncSpecialtyByIds(specialtyIds: string[], client: GraphQLClient): Promise<void> {
    console.log(`🏅 [SYNC-SPECIALTY-BY-IDS] Sincronizando ${specialtyIds.length} especialidades específicas...`);
    
    for (let specialtyId of specialtyIds) {
      try {
        console.log(`🏅 [SYNC-SPECIALTY-BY-IDS] 🔍 Buscando especialidad ID: ${specialtyId}`);
        let specialtyData: any = null;
        specialtyData = await client.request(QUERY_GET_SPECIALTY, { id: specialtyId });
        
        if (specialtyData?.data) {
          let id = specialtyData.data.id?.toString();
          let specialtyDetails = { ...specialtyData.data };
          
          // Eliminar campos que no se deben insertar directamente
          delete specialtyDetails.id;
          
          // Sincronizar la Specialty
          let existingSpecialty = await this.repositorySpecialty.findOneBy(id);
          
          if (existingSpecialty == null) {
            console.log(`🏅 [SYNC-SPECIALTY-BY-IDS] 🆕 Creando especialidad: ${id} - ${specialtyDetails.name || 'Sin nombre'}`);
            await this.repositorySpecialty.save({
              _id: new ObjectId(id),
              ...specialtyDetails,
            });
          } else {
            console.log(`🏅 [SYNC-SPECIALTY-BY-IDS] 🔄 Actualizando especialidad: ${id} - ${specialtyDetails.name || 'Sin nombre'}`);
            await this.repositorySpecialty.update(
              { id: id },
              specialtyDetails,
            );
          }
        }
      } catch (error) {
        console.log(`🏅 [SYNC-SPECIALTY-BY-IDS] ❌ Error procesando especialidad ${specialtyId}:`, error);
        // Error silencioso para continuar con los demás
      }
    }
    
    console.log(`🏅 [SYNC-SPECIALTY-BY-IDS] ✅ Sincronización por IDs completada`);
  }

  /**
   * Sincroniza EducationLevels por ID específicos.
   * Toma una lista de IDs de EducationLevels y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  async syncEducationLevelByIds(educationLevelIds: string[], client: GraphQLClient): Promise<void> {
    console.log(`🎓 [SYNC-EDUCATION-LEVEL-BY-IDS] Sincronizando ${educationLevelIds.length} niveles de educación específicos...`);
    
    for (let educationLevelId of educationLevelIds) {
      try {
        console.log(`🎓 [SYNC-EDUCATION-LEVEL-BY-IDS] 🔍 Buscando nivel de educación ID: ${educationLevelId}`);
        let educationLevelData: any = null;
        educationLevelData = await client.request(QUERY_GET_EDUCATION_LEVEL, { id: educationLevelId });
        
        if (educationLevelData?.data) {
          let id = educationLevelData.data.id?.toString();
          let educationLevelDetails = { ...educationLevelData.data };
          
          // Eliminar campos que no se deben insertar directamente
          delete educationLevelDetails.id;
          
          // Sincronizar el EducationLevel
          let existingEducationLevel = await this.repositoryEducationLevel.findOneBy(id);
          
          if (existingEducationLevel == null) {
            console.log(`🎓 [SYNC-EDUCATION-LEVEL-BY-IDS] 🆕 Creando nivel de educación: ${id} - ${educationLevelDetails.name || 'Sin nombre'}`);
            await this.repositoryEducationLevel.save({
              _id: new ObjectId(id),
              ...educationLevelDetails,
            });
          } else {
            console.log(`🎓 [SYNC-EDUCATION-LEVEL-BY-IDS] 🔄 Actualizando nivel de educación: ${id} - ${educationLevelDetails.name || 'Sin nombre'}`);
            await this.repositoryEducationLevel.update(
              { id: id },
              educationLevelDetails,
            );
          }
        }
      } catch (error) {
        console.log(`🎓 [SYNC-EDUCATION-LEVEL-BY-IDS] ❌ Error procesando nivel de educación ${educationLevelId}:`, error);
        // Error silencioso para continuar con los demás
      }
    }
    
    console.log(`🎓 [SYNC-EDUCATION-LEVEL-BY-IDS] ✅ Sincronización por IDs completada`);
  }

  /**
   * Sincroniza Courses por ID específicos.
   * Toma una lista de IDs de Courses y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  async syncCourseByIds(courseIds: string[], client: GraphQLClient): Promise<void> {
    console.log(`📚 [SYNC-COURSE-BY-IDS] Sincronizando ${courseIds.length} cursos específicos...`);
    
    for (let courseId of courseIds) {
      try {
        console.log(`📚 [SYNC-COURSE-BY-IDS] 🔍 Buscando curso ID: ${courseId}`);
        let courseData: any = null;
        courseData = await client.request(QUERY_GET_COURSE, { id: courseId });
        
        if (courseData?.data) {
          let id = courseData.data.id?.toString();
          let courseDetails = { ...courseData.data };
          
          // Eliminar campos que no se deben insertar directamente
          delete courseDetails.id;
          
          // Sincronizar el Course
          let existingCourse = await this.repositoryCourse.findOneBy(id);
          
          if (existingCourse == null) {
            console.log(`📚 [SYNC-COURSE-BY-IDS] 🆕 Creando curso: ${id} - ${courseDetails.name || 'Sin nombre'}`);
            await this.repositoryCourse.save({
              _id: new ObjectId(id),
              ...courseDetails,
            });
          } else {
            console.log(`📚 [SYNC-COURSE-BY-IDS] 🔄 Actualizando curso: ${id} - ${courseDetails.name || 'Sin nombre'}`);
            await this.repositoryCourse.update(
              { id: id },
              courseDetails,
            );
          }
        }
      } catch (error) {
        console.log(`📚 [SYNC-COURSE-BY-IDS] ❌ Error procesando curso ${courseId}:`, error);
        // Error silencioso para continuar con los demás
      }
    }
    
    console.log(`📚 [SYNC-COURSE-BY-IDS] ✅ Sincronización por IDs completada`);
  }

  /**
   * Sincroniza Modalities por ID específicos.
   * Toma una lista de IDs de Modalities y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  async syncModalityByIds(modalityIds: string[], client: GraphQLClient): Promise<void> {
    console.log(`🔄 [SYNC-MODALITY-BY-IDS] Sincronizando ${modalityIds.length} modalidades específicas...`);
    
    for (let modalityId of modalityIds) {
      try {
        console.log(`🔄 [SYNC-MODALITY-BY-IDS] 🔍 Buscando modalidad ID: ${modalityId}`);
        let modalityData: any = null;
        modalityData = await client.request(QUERY_GET_MODALITY, { id: modalityId });
        
        if (modalityData?.data) {
          let id = modalityData.data.id?.toString();
          let modalityDetails = { ...modalityData.data };
          
          // Eliminar campos que no se deben insertar directamente
          delete modalityDetails.id;
          
          // Sincronizar la Modality
          let existingModality = await this.repositoryModality.findOneBy(id);
          
          if (existingModality == null) {
            console.log(`🔄 [SYNC-MODALITY-BY-IDS] 🆕 Creando modalidad: ${id} - ${modalityDetails.name || 'Sin nombre'}`);
            await this.repositoryModality.save({
              _id: new ObjectId(id),
              ...modalityDetails,
            });
          } else {
            console.log(`🔄 [SYNC-MODALITY-BY-IDS] 🔄 Actualizando modalidad: ${id} - ${modalityDetails.name || 'Sin nombre'}`);
            await this.repositoryModality.update(
              { id: id },
              modalityDetails,
            );
          }
        }
      } catch (error) {
        console.log(`🔄 [SYNC-MODALITY-BY-IDS] ❌ Error procesando modalidad ${modalityId}:`, error);
        // Error silencioso para continuar con los demás
      }
    }
    
    console.log(`🔄 [SYNC-MODALITY-BY-IDS] ✅ Sincronización por IDs completada`);
  }

  /**
   * Sincroniza PerformanceLevels por ID específicos.
   * Toma una lista de IDs de PerformanceLevels y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  async syncPerformanceLevelByIds(performanceLevelIds: string[], client: GraphQLClient): Promise<void> {
    console.log(`🎯 [SYNC-PERFORMANCE-LEVEL-BY-IDS] Sincronizando ${performanceLevelIds.length} niveles de desempeño específicos...`);
    
    for (let performanceLevelId of performanceLevelIds) {
      try {
        console.log(`🎯 [SYNC-PERFORMANCE-LEVEL-BY-IDS] 🔍 Buscando ID: ${performanceLevelId}`);
        let performanceLevelData: any = null;
        performanceLevelData = await client.request(QUERY_GET_PERFORMANCE_LEVEL, { id: performanceLevelId });
        
        if (performanceLevelData?.data) {
          let performanceLevelDetails = { ...performanceLevelData.data };
          console.log(`🎯 [SYNC-PERFORMANCE-LEVEL-BY-IDS] 📝 Procesando: ${performanceLevelDetails.name}`);
          
          delete performanceLevelDetails.id;
          
          let existingPerformanceLevel = await this.repositoryPerformanceLevel.findOneBy(performanceLevelId);
          
          if (existingPerformanceLevel == null) {
            console.log(`🎯 [SYNC-PERFORMANCE-LEVEL-BY-IDS] 🆕 Creando: ${performanceLevelDetails.name}`);
            await this.repositoryPerformanceLevel.save({
              _id: new ObjectId(performanceLevelId),
              ...performanceLevelDetails,
            });
          } else {
            console.log(`🎯 [SYNC-PERFORMANCE-LEVEL-BY-IDS] 🔄 Actualizando: ${performanceLevelDetails.name}`);
            await this.repositoryPerformanceLevel.update(
              { id: performanceLevelId },
              performanceLevelDetails,
            );
          }
        }
      } catch (error) {
        console.log(`🎯 [SYNC-PERFORMANCE-LEVEL-BY-IDS] ❌ Error procesando ${performanceLevelId}:`, error);
      }
    }
    
    console.log(`🎯 [SYNC-PERFORMANCE-LEVEL-BY-IDS] ✅ Sincronización por IDs completada`);
  }

  /**
   * Mutation para ejecutar la sincronización por ID de entidades específicas.
   * Toma un SyncOffline existente, extrae los IDs de las entidades desde sus descripciones,
   * y ejecuta la sincronización específica para esas entidades.
   */
  @Mutation(() => Boolean)
  async executeSyncOfflineByIds(
    @Arg('syncOfflineId', () => String) syncOfflineId: string,
    @Arg('schoolId', () => String) schoolId: string,
    @Ctx() context: IContext,
  ): Promise<Boolean> {
    try {
      const syncOfflineRecord = await this.repository.findOneBy(syncOfflineId);
      if (!syncOfflineRecord) {
        return false;
      }

      const client = new GraphQLClient('http://vivecolegios.nortedesantander.gov.co:5000/graphql', {
        jsonSerializer: {
          parse: JSON.parse,
          stringify: JSON.stringify,
        },
      });

      for (let description of syncOfflineRecord.syncOfflineDescriptions || []) {
        if (description.entity === 'CAMPUS' && description.entityIds && description.entityIds.length > 0) {
          await this.syncCampusByIds(description.entityIds, client);
        } else if (description.entity === 'SCHOOL_CONFIGURATION' && description.entityIds && description.entityIds.length > 0) {
          await this.syncSchoolConfigurationByIds(description.entityIds, client, schoolId);
        } else if (description.entity === 'TEACHER' && description.entityIds && description.entityIds.length > 0) {
          await this.syncTeachersByIds(description.entityIds, client);
        } else if (description.entity === 'STUDENT' && description.entityIds && description.entityIds.length > 0) {
          await this.syncStudentsByIds(description.entityIds, client);
        } else if (description.entity === 'SPECIALTY' && description.entityIds && description.entityIds.length > 0) {
          await this.syncSpecialtyByIds(description.entityIds, client);
        } else if (description.entity === 'EDUCATION_LEVEL' && description.entityIds && description.entityIds.length > 0) {
          await this.syncEducationLevelByIds(description.entityIds, client);
        } else if (description.entity === 'COURSE' && description.entityIds && description.entityIds.length > 0) {
          await this.syncCourseByIds(description.entityIds, client);
        } else if (description.entity === 'MODALITY' && description.entityIds && description.entityIds.length > 0) {
          await this.syncModalityByIds(description.entityIds, client);
        } else if (description.entity === 'PERFORMANCE_LEVEL' && description.entityIds && description.entityIds.length > 0) {
          await this.syncPerformanceLevelByIds(description.entityIds, client);
        }
      }

      return true;

    } catch (error) {
      return false;
    }
  }

  async syncAcademicAsignatureCourse(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    console.log(`[SYNC-ACADEMIC-ASIGNATURE-COURSE] Pending implementation - requires Campus ID`);
    
    try {
      // This entity requires Campus ID for proper synchronization
      // Implementation pending until campus-specific logic is defined
      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE',
        online: 0,
        pending: true,
      };
    } catch (error) {
      console.error('[SYNC-ACADEMIC-ASIGNATURE-COURSE] ERROR:', error);
      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE',
        online: 0,
        error: String(error),
      };
    }
  }
}
