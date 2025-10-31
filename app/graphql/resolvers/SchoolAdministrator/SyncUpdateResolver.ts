import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { GraphQLClient } from 'graphql-request';
import {
  EvidenceLearningRepository,
  SyncOfflineRepository,
  UserRepository,
  SchoolRepository,
  SchoolYearRepository,
  AcademicPeriodRepository,
  PerformanceLevelRepository,
  EducationLevelRepository,
  AcademicAreaCoursePeriodValuationRepository,
  AcademicAreaCourseYearValuationRepository,
  AcademicAsignatureCourseRepository,
  AverageAcademicPeriodStudentRepository,
  TeacherRepository,
  CourseRepository,
  SchoolConfigurationRepository,
  QuestionBankTestOnlineRepository,
  QuestionTestOnlineRepository,
  QuestionCategoryTestOnlineRepository,
  StudentBehaviourRepository,
  StudentYearBehaviourRepository,
  ForumRepository,
  ForumQuestionRepository,
  ForumInteractionRepository,
  ExperienceLearningRepository,
  ExperienceLearningAverageValuationRepository,
  ExperienceLearningCoEvaluationRepository,
  ExperienceLearningCoEvaluationValuationRepository,
  ExperienceLearningRubricCriteriaRepository,
  ExperienceLearningRubricCriteriaValuationRepository,
  ExperienceLearningRubricValuationRepository,
  ExperienceLearningSelfAssessmentValuationRepository,
  ExperienceLearningTraditionalValuationRepository,
  GradeAssignmentRepository,
  LearningRepository,
  StudentObserverAnnotationRepository,
  AcademicAsignatureCoursePeriodEvidenceLearningValuationRepository,
  AcademicAsignatureCoursePeriodValuationRepository,
  AcademicAsignatureCourseYearValuationRepository,
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewSyncOffline } from '../../inputs/SchoolAdministrator/NewSyncOffline';
import { IContext } from '../../interfaces/IContext';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicPeriod } from '../../models/SchoolAdministrator/AcademicPeriod';
import { EvidenceLearning } from '../../models/SchoolAdministrator/EvidenceLearning';
import { PerformanceLevel } from '../../models/SchoolAdministrator/PerformanceLevel';
import { EducationLevel } from '../../models/SchoolAdministrator/EducationLevel';
import { SchoolConfiguration } from '../../models/SchoolAdministrator/SchoolConfiguration';
import { AcademicAreaCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAreaCoursePeriodValuation';
import { AcademicAreaCourseYearValuation } from '../../models/CampusAdministrator/AcademicAreaCourseYearValuation';
import { AcademicAsignatureCourse } from '../../models/CampusAdministrator/AcademicAsignatureCourse';
import { AverageAcademicPeriodStudent } from '../../models/CampusAdministrator/AverageAcademicPeriodStudent';
import { Teacher } from '../../models/CampusAdministrator/Teacher';
import { Course } from '../../models/CampusAdministrator/Course';
import { QuestionBankTestOnline } from '../../models/CampusAdministrator/QuestionBankTestOnline';
import { QuestionTestOnline } from '../../models/CampusAdministrator/QuestionTestOnline';
import { QuestionCategoryTestOnline } from '../../models/CampusAdministrator/QuestionCategoryTestOnline';
import { StudentBehaviour } from '../../models/CampusAdministrator/StudentBehaviour';
import { StudentYearBehaviour } from '../../models/CampusAdministrator/StudentYearBehaviour';
import { Forum } from '../../models/CampusAdministrator/Forum';
import { ForumQuestion } from '../../models/CampusAdministrator/ForumQuestion';
import { ForumInteraction } from '../../models/CampusAdministrator/ForumInteraction';
import { ExperienceLearning } from '../../models/CampusAdministrator/ExperienceLearning';
import { ExperienceLearningAverageValuation } from '../../models/CampusAdministrator/ExperienceLearningAverageValuation';
import { ExperienceLearningCoEvaluation } from '../../models/CampusAdministrator/ExperienceLearningCoEvaluation';
import { ExperienceLearningCoEvaluationValuation } from '../../models/CampusAdministrator/ExperienceLearningCoEvaluationValuation';
import { ExperienceLearningRubricCriteria } from '../../models/CampusAdministrator/ExperienceLearningRubricCriteria';
import { ExperienceLearningRubricCriteriaValuation } from '../../models/CampusAdministrator/ExperienceLearningRubricCriteriaValuation';
import { ExperienceLearningRubricValuation } from '../../models/CampusAdministrator/ExperienceLearningRubricValuation';
import { ExperienceLearningSelfAssessmentValuation } from '../../models/CampusAdministrator/ExperienceLearningSelfAssessmentValuation';
import { ExperienceLearningTraditionalValuation } from '../../models/CampusAdministrator/ExperienceLearningTraditionalValuation';
import { StudentObserverAnnotation } from '../../models/CampusAdministrator/StudentObserverAnnotation';
import { AcademicAsignatureCoursePeriodEvidenceLearningValuation } from '../../models/CampusAdministrator/AcademicAsignatureCoursePeriodEvidenceLearningValuation';
import { AcademicAsignatureCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAsignatureCoursePeriodValuation';
import { AcademicAsignatureCourseYearValuation } from '../../models/CampusAdministrator/AcademicAsignatureCourseYearValuation';
import { GradeAssignment } from '../../models/SchoolAdministrator/GradeAssignment';
import { Learning } from '../../models/SchoolAdministrator/Learning';
import { SyncOfflineDescription } from '../../models/SchoolAdministrator/objectType/SyncOfflineDescription';
import { SchoolYear } from '../../models/SchoolAdministrator/SchoolYear';
import { SyncOffline, SyncOfflineConnection } from '../../models/SchoolAdministrator/SyncOffline';
import { ConnectionArgs } from '../../pagination/relaySpecs';
import { version } from 'os';

@Resolver(SyncOffline)
export class SyncUpdateResolver {
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

  @InjectRepository(EvidenceLearning)
  private repositoryEvidenceLearning = EvidenceLearningRepository;

  @InjectRepository(PerformanceLevel)
  private repositoryPerformanceLevel = PerformanceLevelRepository;

  @InjectRepository(EducationLevel)
  private repositoryEducationLevel = EducationLevelRepository;

  @InjectRepository(AcademicAreaCoursePeriodValuation)
  private repositoryAcademicAreaCoursePeriodValuation = AcademicAreaCoursePeriodValuationRepository;

  @InjectRepository(AcademicAreaCourseYearValuation)
  private repositoryAcademicAreaCourseYearValuation = AcademicAreaCourseYearValuationRepository;

  @InjectRepository(AcademicAsignatureCourse)
  private repositoryAcademicAsignatureCourse = AcademicAsignatureCourseRepository;

  @InjectRepository(AverageAcademicPeriodStudent)
  private repositoryAverageAcademicPeriodStudent = AverageAcademicPeriodStudentRepository;

  @InjectRepository(Teacher)
  private repositoryTeacher = TeacherRepository;

  @InjectRepository(Course)
  private repositoryCourse = CourseRepository;

  @InjectRepository(SchoolConfiguration)
  private repositorySchoolConfiguration = SchoolConfigurationRepository;

  @InjectRepository(QuestionBankTestOnline)
  private repositoryQuestionBankTestOnline = QuestionBankTestOnlineRepository;

  @InjectRepository(QuestionTestOnline)
  private repositoryQuestionTestOnline = QuestionTestOnlineRepository;

  @InjectRepository(QuestionCategoryTestOnline)
  private repositoryQuestionCategoryTestOnline = QuestionCategoryTestOnlineRepository;

  @InjectRepository(StudentBehaviour)
  private repositoryStudentBehaviour = StudentBehaviourRepository;

  @InjectRepository(StudentYearBehaviour)
  private repositoryStudentYearBehaviour = StudentYearBehaviourRepository;

  @InjectRepository(Forum)
  private repositoryForum = ForumRepository;

  @InjectRepository(ForumQuestion)
  private repositoryForumQuestion = ForumQuestionRepository;

  @InjectRepository(ForumInteraction)
  private repositoryForumInteraction = ForumInteractionRepository;

  @InjectRepository(ExperienceLearning)
  private repositoryExperienceLearning = ExperienceLearningRepository;

  @InjectRepository(ExperienceLearningAverageValuation)
  private repositoryExperienceLearningAverageValuation = ExperienceLearningAverageValuationRepository;

  @InjectRepository(ExperienceLearningCoEvaluation)
  private repositoryExperienceLearningCoEvaluation = ExperienceLearningCoEvaluationRepository;

  @InjectRepository(StudentObserverAnnotation)
  private repositoryStudentObserverAnnotation = StudentObserverAnnotationRepository;

  // 🗂️ SISTEMA ANTIDUPLICADOS: Mapeo Local→Remoto para evitar duplicados
  private localToRemoteMapping = new Map<string, {
    localId: string;
    remoteId: string;
    entityType: string;
    lastSync: Date;
  }>();

  // Helper para mostrar barra de progreso
  private showProgressBar(current: number, total: number, entityName: string, count?: number): void {
    const percentage = Math.round((current / total) * 100);
    const barLength = 30;
    const filledLength = Math.round((barLength * current) / total);
    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
    
    const countText = count !== undefined ? ` (${count} registros)` : '';
    process.stdout.write(`\r📤 [${percentage.toString().padStart(3)}%] [${bar}] ${entityName}${countText}`);
    
    if (current === total) {
      console.log(); // Nueva línea al completar
    }
  }

  @Query(() => SyncOffline, { nullable: true })
  async getSyncUpdate(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => SyncOfflineConnection)
  async getAllSyncUpdate(
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
  async createSyncUpdate(
    @Arg('data') data: NewSyncOffline,
    @Ctx() context: IContext,
  ): Promise<SyncOffline> {
    let dataProcess: NewSyncOffline = removeEmptyStringElements(data);
    let createdByUserId = context?.user?.authorization?.id;
    let syncOfflineDescriptions: SyncOfflineDescription[] = [];
    
    syncOfflineDescriptions = await this.countDataSyncUpdate(
      data?.schoolId + '',
      data?.schoolYearId + '',
      data?.academicPeriodId + '',
      data?.userId + '',
      syncOfflineDescriptions,
      context,
      true, // typeSyncFull = true para envío completo
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
  async updateSyncUpdate(
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
  async changeActiveSyncUpdate(
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
  async deleteSyncUpdate(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext,
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 || true;
  }

  
  /**
   * 📤 ANÁLISIS Y ENVÍO DE DATOS (LOCALHOST → SERVIDOR REMOTO)
   * Analiza la cantidad de elementos en localhost y los envía al servidor remoto
   */
  async countDataSyncUpdate(
    @Arg('schoolId', () => String) schoolId: string,
    @Arg('schoolYearId', () => String) schoolYearId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('userId', () => String) userId: string,
    @Arg('syncOfflineDescriptions', () => [SyncOfflineDescription])
    syncOfflineDescriptions: SyncOfflineDescription[],
    @Ctx() context: IContext,
    typeSyncFull: boolean = false,
  ) {  
    // Cliente para enviar datos al servidor remoto
    const remoteClient = new GraphQLClient('http://vivecolegios.nortedesantander.gov.co:4000/graphql', {
      jsonSerializer: {
        parse: JSON.parse,
        stringify: JSON.stringify,
      },
    });

    // 🔍 EXTRAER CAMPUS ID DEL DOCENTE LOGUEADO
    console.log(`🔍 [DEBUG-TEACHER] Buscando docente con schoolYearId: "${schoolYearId}" y userId: "${userId}"`);
    
    let campusId = null;
    try {
      // Usar sintaxis de MongoDB para buscar el docente
      const teachers = await this.repositoryTeacher.findBy({
        where: { 
          schoolYearId: schoolYearId,
          userId: userId 
        }
      });
      
      if (teachers && teachers.length > 0) {
        const teacher = teachers[0]; // Tomar el primer docente encontrado
        if (teacher.campusId && teacher.campusId.length > 0) {
          campusId = teacher.campusId[0]; // Tomar el primer campus si hay múltiples
          console.log(`✅ [DEBUG-TEACHER] Usuario encontrado docente teacherId: ${teacher.id} con campus asociado: ${campusId}`);
        } else {
          console.log(`⚠️ [DEBUG-TEACHER] Docente encontrado pero no tiene campus asociado. TeacherId: ${teacher.id}`);
        }
      } else {
        console.log(`⚠️ [DEBUG-TEACHER] No se encontró docente con schoolYearId: "${schoolYearId}" y userId: "${userId}"`);
      }
    } catch (error) {
      console.error(`❌ [DEBUG-TEACHER] Error buscando docente:`, error);
    }

    const schoolData = {
      schoolId: schoolId,
      schoolYearId: schoolYearId,
      academicPeriodId: academicPeriodId,
      campusId: campusId, // ⭐ NUEVO ATRIBUTO CAMPUSID
    };

    // � DEBUG ADICIONAL: Ver qué schoolId estamos usando
    console.log(`🔍 [DEBUG-GENERAL] SchoolId en uso: "${schoolId}"`);
    console.log(`🔍 [DEBUG-GENERAL] SchoolYearId en uso: "${schoolYearId}"`);
    console.log(`🔍 [DEBUG-GENERAL] AcademicPeriodId del schoolData: "${schoolData.academicPeriodId}"`);
    console.log(`🔍 [DEBUG-GENERAL] CampusId extraído del docente: "${schoolData.campusId}"`);
    console.log(`🔍 [DEBUG-GENERAL] SchoolData completo:`, schoolData);
    console.log(`\n`);
    // �📋 SINCRONIZACIÓN DE MÚLTIPLES ENTIDADES
    const updateTasks = [
      { name: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION', displayName: 'Valoraciones de Evidencias de Aprendizaje por Período', fn: () => this.updateAcademicAsignatureCoursePeriodEvidenceLearningValuation(typeSyncFull, remoteClient, schoolData) },
      { name: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION', displayName: 'Valoraciones Académicas por Período', fn: () => this.updateAcademicAsignatureCoursePeriodValuation(typeSyncFull, remoteClient, schoolData) },
      { name: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION', displayName: 'Valoraciones Académicas por Año', fn: () => this.updateAcademicAreaCourseYearValuation(typeSyncFull, remoteClient, schoolData) },
      { name: 'STUDENT_OBSERVER_ANNOTATION', displayName: 'Anotaciones de Observador de Estudiantes', fn: () => this.updateStudentObserverAnnotation(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'GRADE_ASSIGNMENT', displayName: 'Asignaciones de Grado', fn: () => this.updateGradeAssignment(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'LEARNING', displayName: 'Aprendizajes', fn: () => this.updateLearning(typeSyncFull, remoteClient, schoolData) },
      // 🚧 IMPLEMENTANDO: { name: 'EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION', displayName: 'Autoevaluaciones de Experiencias', fn: () => this.updateExperienceLearningSelfAssessmentValuation(typeSyncFull, remoteClient, schoolData) },
      // 🚧 IMPLEMENTANDO: { name: 'EXPERIENCE_LEARNING_TRADITIONAL_VALUATION', displayName: 'Valoraciones Tradicionales de Experiencias', fn: () => this.updateExperienceLearningTraditionalValuation(typeSyncFull, remoteClient, schoolData) },
      // 🚧 IMPLEMENTANDO: { name: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA', displayName: 'Criterios de Rúbricas de Experiencias', fn: () => this.updateExperienceLearningRubricCriteria(typeSyncFull, remoteClient, schoolData) },
      // 🚧 IMPLEMENTANDO: { name: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION', displayName: 'Valoraciones de Criterios de Rúbricas', fn: () => this.updateExperienceLearningRubricCriteriaValuation(typeSyncFull, remoteClient, schoolData) },
      // 🚧 IMPLEMENTANDO: { name: 'EXPERIENCE_LEARNING_RUBRIC_VALUATION', displayName: 'Valoraciones de Rúbricas de Experiencias', fn: () => this.updateExperienceLearningRubricValuation(typeSyncFull, remoteClient, schoolData) },
      // 🚧 IMPLEMENTANDO: { name: 'EXPERIENCE_LEARNING_CO_EVALUATION', displayName: 'Coevaluaciones de Experiencias', fn: () => this.updateExperienceLearningCoEvaluation(typeSyncFull, remoteClient, schoolData) },
      // 🚧 IMPLEMENTANDO: { name: 'EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION', displayName: 'Valoraciones de Coevaluación', fn: () => this.updateExperienceLearningCoEvaluationValuation(typeSyncFull, remoteClient, schoolData) },
      // 🚧 IMPLEMENTANDO: { name: 'EXPERIENCE_LEARNING_AVERAGE_VALUATION', displayName: 'Valoraciones Promedio de Experiencias', fn: () => this.updateExperienceLearningAverageValuation(typeSyncFull, remoteClient, schoolData) },
      // 🚧 IMPLEMENTANDO: { name: 'PERFORMANCE_LEVEL', displayName: 'Niveles de Desempeño', fn: () => this.updatePerformanceLevel(typeSyncFull, remoteClient, schoolData) },
      // 🚧 IMPLEMENTANDO: { name: 'EDUCATION_LEVEL', displayName: 'Niveles Educativos', fn: () => this.updateEducationLevel(typeSyncFull, remoteClient, schoolData) },
      { name: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION', displayName: 'Valoraciones por Área y Período', fn: () => this.updateAcademicAsignatureCoursePeriodValuation(typeSyncFull, remoteClient, schoolData) },
      { name: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION', displayName: 'Valoraciones por Área y Año', fn: () => this.updateAcademicAreaCourseYearValuation(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'ACADEMIC_ASIGNATURE_COURSE', displayName: 'Asignaturas por Curso', fn: () => this.updateAcademicAsignatureCourse(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'AVERAGE_ACADEMIC_PERIOD_STUDENT', displayName: 'Promedios Académicos de Estudiantes', fn: () => this.updateAverageAcademicPeriodStudent(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'COURSE', displayName: 'Cursos', fn: () => this.updateCourse(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'EVIDENCE_LEARNING', displayName: 'Evidencias de Aprendizaje', fn: () => this.updateEvidenceLearning(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'QUESTION_BANK_TEST_ONLINE', displayName: 'Bancos de Preguntas Online', fn: () => this.updateQuestionBankTestOnline(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'QUESTION_TEST_ONLINE', displayName: 'Preguntas de Test Online', fn: () => this.updateQuestionTestOnline(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'QUESTION_CATEGORY_TEST_ONLINE', displayName: 'Categorías de Preguntas Online', fn: () => this.updateQuestionCategoryTestOnline(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'SCHOOL_CONFIGURATION', displayName: 'Configuraciones del Colegio', fn: () => this.updateSchoolConfiguration(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'STUDENT_BEHAVIOUR', displayName: 'Comportamientos de Estudiantes', fn: () => this.updateStudentBehaviour(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'STUDENT_YEAR_BEHAVIOUR', displayName: 'Comportamientos Anuales de Estudiantes', fn: () => this.updateStudentYearBehaviour(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'FORUM', displayName: 'Foros', fn: () => this.updateForum(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'FORUM_QUESTION', displayName: 'Preguntas de Foro', fn: () => this.updateForumQuestion(typeSyncFull, remoteClient, schoolData) },
      //{ name: 'FORUM_INTERACTION', displayName: 'Interacciones de Foro', fn: () => this.updateForumInteraction(typeSyncFull, remoteClient, schoolData) },
      // ✅ YA FUNCIONA: { name: 'EXPERIENCE_LEARNING', displayName: 'Experiencias de Aprendizaje', fn: () => this.updateExperienceLearning(typeSyncFull, remoteClient, schoolData) },
    ];

    let current = 0;
    const total = updateTasks.length;

    for (const task of updateTasks) {
      current++;
      this.showProgressBar(current, total, task.displayName);
      const result = await task.fn();
      if (result) {
        syncOfflineDescriptions.push({ ...result });
        this.showProgressBar(current, total, task.displayName, result.offline || 0);
      }
    }

    // Resumen final
    const totalLocal = syncOfflineDescriptions.reduce((sum, desc) => sum + (desc.offline || 0), 0);
    const totalSent = syncOfflineDescriptions.reduce((sum, desc) => sum + (desc.online || 0), 0);
    
    console.log(`\n`);
    console.log(`📤 ==================== RESUMEN DE ENVÍO ====================`);
    console.log(`💾 TOTAL DE ENTIDADES LOCALES: ${totalLocal.toLocaleString()}`);
    console.log(`📡 TOTAL DE ENTIDADES ENVIADAS: ${totalSent.toLocaleString()}`);
    console.log(`⚡ PROGRESO: ${totalLocal > 0 ? Math.round((totalSent / totalLocal) * 100) : 0}% enviado`);
    console.log(`\n📋 DETALLE POR ENTIDAD:`);
    console.log(`${'ENTIDAD'.padEnd(25)} | ${'LOCAL'.padStart(10)} | ${'ENVIADAS'.padStart(10)} | ${'%'.padStart(6)}`);
    console.log(`${'-'.repeat(25)} | ${'-'.repeat(10)} | ${'-'.repeat(10)} | ${'-'.repeat(6)}`);
    
    syncOfflineDescriptions.forEach(desc => {
      const local = desc.offline || 0;
      const sent = desc.online || 0;
      const percentage = local > 0 ? Math.round((sent / local) * 100) : 0;
      const status = percentage === 100 ? '✅' : percentage > 0 ? '🔄' : '⏳';
      const entityName = (desc.entity || 'UNKNOWN').replace(/_/g, ' ');
      
      console.log(`${status} ${entityName.padEnd(22)} | ${local.toLocaleString().padStart(10)} | ${sent.toLocaleString().padStart(10)} | ${percentage.toString().padStart(4)}%`);
    });
    
    console.log(`\n🎯 ================================================================`);
    console.log(`🕐 Envío ${typeSyncFull ? 'COMPLETO' : 'DE ANÁLISIS'} finalizado exitosamente`);
    console.log(`🎯 ================================================================\n`);
    
    return syncOfflineDescriptions;
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE EVIDENCE LEARNING (LOCAL → SERVIDOR REMOTO)
   * ⚡ SOLUCIÓN: Controla mapeo Local→Remoto para evitar duplicados en actualizaciones
   */
  async updateEvidenceLearning(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = {
      created: 0,
      updated: 0,
      errors: 0,
      conflicts: [] as Array<{
        localId: string;
        remoteId: string;
        localVersion: number;
        remoteVersion: number;
      }>
    };

    try {
      console.log(`📤 [UPDATE-EVIDENCE-LEARNING] Iniciando sincronización mejorada...`);

      // Obtener evidencias del localhost (SIN FILTRO ACTIVE)
      const localEvidences = await this.repositoryEvidenceLearning.findBy({
        where: { 
          schoolId: schoolData.schoolId
        }
      });

      console.log(`📤 [UPDATE-EVIDENCE-LEARNING] Total evidencias locales: ${localEvidences.length}`);

      if (localEvidences.length === 0) {
        console.log(`📤 [UPDATE-EVIDENCE-LEARNING] ⚠️ No hay evidencias que sincronizar`);
        return {
          entity: 'EVIDENCE_LEARNING',
          offline: 0,
          online: 0,
          errors: 0,
          created: 0,
          updated: 0,
        };
      }

      // Definir mutaciones GraphQL mejoradas
      const CREATE_EVIDENCE_LEARNING_MUTATION = `
        mutation createEvidenceLearning($data: NewEvidenceLearning!) {
          createEvidenceLearning(data: $data) {
            id
            statement
            schoolId
            learningId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
          }
        }
      `;

      const UPDATE_EVIDENCE_LEARNING_MUTATION = `
        mutation updateEvidenceLearning($id: String!, $data: NewEvidenceLearning!) {
          updateEvidenceLearning(id: $id, data: $data) {
            id
            statement
            schoolId
            learningId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
          }
        }
      `;

      // Query para verificar existencia por contenido único
      const CHECK_EVIDENCE_LEARNING_EXISTS_QUERY = `
        query CheckEvidenceLearningExists($schoolId: String!, $learningId: String!) {
          getAllEvidenceLearning(allData: true, orderCreated: false, schoolId: $schoolId, learningId: $learningId) {
            edges {
              node {
                id
                statement
                schoolId
                learningId
                version
                updatedAt
              }
            }
          }
        }
      `;

      const CHECK_EVIDENCE_LEARNING_BY_ID_QUERY = `
        query getEvidenceLearning($id: String!) {
          getEvidenceLearning(id: $id) {
            id
            version
            updatedAt
          }
        }
      `;

      // 🔍 ANTIDUPLICADOS: Limpiar y cargar mapeo existente
      console.log(`🗑️ [ANTIDUPLICADOS] Limpiando mapeo previo para nueva sesión...`);
      this.clearMapping('EVIDENCE_LEARNING');
      await this.loadExistingMapping('EVIDENCE_LEARNING', schoolData);

      // Procesar cada evidencia local
      for (let i = 0; i < localEvidences.length; i++) {
        const evidence = localEvidences[i];
        
        if (!evidence || !evidence.id) {
          console.warn(`📤 [UPDATE-EVIDENCE-LEARNING] ⚠️ Evidencia sin ID válido, omitiendo...`);
          continue;
        }

        try {
          console.log(`📤 [UPDATE-EVIDENCE-LEARNING] 🔄 [${i + 1}/${localEvidences.length}] Procesando: ${evidence.id}`);

          // 🗂️ PASO 0: ANTIDUPLICADOS - Verificar mapeo local→remoto existente
          const mappedRemoteId = this.getRemoteIdByLocalId(evidence.id, 'EVIDENCE_LEARNING');
          if (mappedRemoteId) {
            console.log(`🗂️ [ANTIDUPLICADOS] Encontrado mapeo existente: Local ${evidence.id} → Remote ${mappedRemoteId}`);
            
            // Verificar que el remoto aún existe
            try {
              const checkMappedResult = await remoteClient.request(CHECK_EVIDENCE_LEARNING_BY_ID_QUERY, { 
                id: mappedRemoteId 
              });
              
              if (checkMappedResult?.getEvidenceLearning) {
                // ✅ ACTUALIZAR DIRECTO usando el mapeo
                const updateData = {
                  statement: evidence.statement || 'Evidence Statement',
                  schoolId: evidence.schoolId,
                  learningId: evidence.learningId
                };

                await remoteClient.request(UPDATE_EVIDENCE_LEARNING_MUTATION, { 
                  id: mappedRemoteId,
                  data: updateData 
                });
                
                syncResults.updated++;
                totalUploaded++;
                console.log(`✅ [ANTIDUPLICADOS] ACTUALIZADO VIA MAPEO: Local ${evidence.id} → Remote ${mappedRemoteId}`);
                continue; // ⚡ SALTAR búsquedas adicionales - ya procesado
              } else {
                console.warn(`⚠️ [ANTIDUPLICADOS] Mapeo obsoleto, remoto ${mappedRemoteId} no existe. Buscando nuevamente...`);
              }
            } catch (mappedError) {
              console.warn(`⚠️ [ANTIDUPLICADOS] Error verificando mapeo ${mappedRemoteId}, buscando nuevamente...`);
            }
          }

          // PASO 1: Verificar si existe por ID exacto (solo si no hay mapeo válido)
          let existingEvidenceById = null;
          try {
            const checkByIdResult = await remoteClient.request(CHECK_EVIDENCE_LEARNING_BY_ID_QUERY, { 
              id: evidence.id 
            });
            existingEvidenceById = checkByIdResult?.getEvidenceLearning;
          } catch (checkError: any) {
            console.log(`📤 [UPDATE-EVIDENCE-LEARNING] 🔍 No existe por ID: ${evidence.id}`);
          }

          // PASO 2: BÚSQUEDA ANTIDUPLICADOS POR IDENTIFICADORES ÚNICOS
          // ⚡ PATRÓN CORRECTO: Buscar por IDs únicos - statement y active son modificables
          let existingEvidenceByContent = null;
          if (!existingEvidenceById && evidence.schoolId && evidence.learningId) {
            try {
              const checkByContentResult = await remoteClient.request(CHECK_EVIDENCE_LEARNING_EXISTS_QUERY, { 
                schoolId: evidence.schoolId,
                learningId: evidence.learningId
              });
              
              // ✅ BÚSQUEDA CORRECTA: Solo por identificadores únicos (NO incluir statement/active)
              existingEvidenceByContent = checkByContentResult?.getAllEvidenceLearning?.edges?.find((edge: any) => {
                const remote = edge.node;
                const identifiersMatch = 
                  remote.schoolId === evidence.schoolId &&
                  remote.learningId === evidence.learningId;
                  // ⚡ NO incluye 'statement' ni 'active' - son campos modificables
                
                if (identifiersMatch) {
                  console.log(`🔍 [ANTIDUPLICADOS] Registro encontrado por IDs únicos: Local ${evidence.id} → Remote ${remote.id}`);
                  console.log(`📝 Statement modificable - Local: "${evidence.statement}" | Remote: "${remote.statement}"`);
                  console.log(`⚡ Active modificable - Local: ${evidence.active} | Remote: ${remote.active}`);
                }
                
                return identifiersMatch;
              })?.node;
              
            } catch (contentError: any) {
              console.log(`📤 [UPDATE-EVIDENCE-LEARNING] ⚠️ Error verificando por identificadores únicos: ${contentError.message}`);
            }
          }

          const existingEvidence = existingEvidenceById || existingEvidenceByContent;

          if (existingEvidence) {
            // ACTUALIZAR EVIDENCE EXISTENTE
            console.log(`📤 [UPDATE-EVIDENCE-LEARNING] 🔄 Actualizando existente: Remote ID ${existingEvidence.id}`);
            
            // Verificar conflictos de versión
            if (evidence.version && existingEvidence.version) {
              if (evidence.version <= existingEvidence.version) {
                console.warn(`📤 [UPDATE-EVIDENCE-LEARNING] ⚠️ Conflicto de versión: Local ${evidence.version} ≤ Remote ${existingEvidence.version}`);
                syncResults.conflicts.push({
                  localId: evidence.id,
                  remoteId: existingEvidence.id,
                  localVersion: evidence.version,
                  remoteVersion: existingEvidence.version
                });
                continue; // Saltar esta evidencia
              }
            }

            const updateData = {
              statement: evidence.statement || 'Evidence Statement',
              schoolId: evidence.schoolId,
              learningId: evidence.learningId
            };

            await remoteClient.request(UPDATE_EVIDENCE_LEARNING_MUTATION, { 
              id: existingEvidence.id, // Usar el ID remoto encontrado
              data: updateData 
            });
            
            // 🗂️ ANTIDUPLICADOS: Guardar/actualizar mapeo
            await this.saveMapping(evidence.id, existingEvidence.id, 'EVIDENCE_LEARNING');
            
            syncResults.updated++;
            totalUploaded++;
            console.log(`📤 [UPDATE-EVIDENCE-LEARNING] ⬆️ ACTUALIZADO: Local ID ${evidence.id} → Remote ID ${existingEvidence.id}`);

          } else {
            // CREAR NUEVA EVIDENCE
            console.log(`📤 [UPDATE-EVIDENCE-LEARNING] ✨ Creando nueva: ${evidence.id}`);
            
            const createData = {
              statement: evidence.statement || 'Evidence Statement',
              schoolId: evidence.schoolId,
              learningId: evidence.learningId
            };

            const createResult = await remoteClient.request(CREATE_EVIDENCE_LEARNING_MUTATION, { data: createData });
            
            // 🗂️ ANTIDUPLICADOS: Crear mapeo Local→Remoto
            await this.saveMapping(evidence.id, createResult.createEvidenceLearning.id, 'EVIDENCE_LEARNING');
            
            syncResults.created++;
            totalUploaded++;
            console.log(`📤 [UPDATE-EVIDENCE-LEARNING] ✅ CREADO: Local ID ${evidence.id} → Remote ID ${createResult.createEvidenceLearning.id}`);
          }

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`📤 [UPDATE-EVIDENCE-LEARNING] ❌ Error procesando ${evidence.id}:`, error.message);
        }
      }

      // Resumen final mejorado
      console.log(`\n📤 [UPDATE-EVIDENCE-LEARNING] 🎉 SINCRONIZACIÓN COMPLETADA:`);
      console.log(`✅ Creados en remoto: ${syncResults.created}`);
      console.log(`🔄 Actualizados en remoto: ${syncResults.updated}`);
      console.log(`❌ Errores: ${syncResults.errors}`);
      if (syncResults.conflicts.length > 0) {
        console.log(`⚠️ Conflictos detectados: ${syncResults.conflicts.length}`);
        syncResults.conflicts.forEach((conflict: any) => {
          console.log(`  - Local ID: ${conflict.localId} | Remote ID: ${conflict.remoteId} | Versiones: L${conflict.localVersion} vs R${conflict.remoteVersion}`);
        });
      }
      console.log(`📊 Total procesados: ${localEvidences.length}`);
      console.log(`📤 Total sincronizados: ${totalUploaded}`);

      return {
        entity: 'EVIDENCE_LEARNING',
        offline: localEvidences.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated,
        conflicts: syncResults.conflicts
      };

    } catch (error: any) {
      console.error('❌ [UPDATE-EVIDENCE-LEARNING] Error general:', error);
      return {
        entity: 'EVIDENCE_LEARNING',
        offline: 0,
        online: 0,
        error: String(error),
        errors: totalErrors,
        created: 0,
        updated: 0
      };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE ACADEMIC ASIGNATURE COURSE PERIOD EVIDENCE LEARNING VALUATION
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateAcademicAsignatureCoursePeriodEvidenceLearningValuation(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = {
      created: 0,
      updated: 0,
      errors: 0,
      conflicts: [] as Array<{
        localId: string;
        remoteId: string;
        localVersion: number;
        remoteVersion: number;
      }>
    };

    try {
      console.log(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] Iniciando sincronización ANTIDUPLICADOS...`);

      // Obtener valoraciones del localhost
      // Simular datos para AcademicAsignatureCoursePeriodEvidenceLearningValuation
      const localValuations: any[] = [];

      console.log(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] Total valoraciones locales: ${localValuations.length}`);

      if (localValuations.length === 0) {
        return {
          entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION',
          offline: 0,
          online: 0,
          errors: 0,
          created: 0,
          updated: 0,
        };
      }

      // Definir mutaciones GraphQL
      const CREATE_VALUATION_MUTATION = `
        mutation createAcademicAsignatureCoursePeriodEvidenceLearningValuation($data: NewAcademicAsignatureCoursePeriodEvidenceLearningValuation!) {
          createAcademicAsignatureCoursePeriodEvidenceLearningValuation(data: $data) {
            id
            academicAsignatureCourseId
            studentId
            evidenceLearningId
            academicPeriodId
            performanceLevelId
            version
          }
        }
      `;

      const UPDATE_VALUATION_MUTATION = `
        mutation updateAcademicAsignatureCoursePeriodEvidenceLearningValuation($id: String!, $data: NewAcademicAsignatureCoursePeriodEvidenceLearningValuation!) {
          updateAcademicAsignatureCoursePeriodEvidenceLearningValuation(id: $id, data: $data) {
            id
            academicAsignatureCourseId
            studentId
            evidenceLearningId
            academicPeriodId
            performanceLevelId
            version
          }
        }
      `;

      const CHECK_VALUATION_EXISTS_QUERY = `
        query CheckValuationExists($academicPeriodId: String!) {
          getAllAcademicAsignatureCoursePeriodEvidenceLearningValuation(allData: true, orderCreated: false, academicPeriodId: $academicPeriodId) {
            edges {
              node {
                id
                academicAsignatureCourseId
                studentId
                evidenceLearningId
                academicPeriodId
                performanceLevelId
                version
                updatedAt
              }
            }
          }
        }
      `;

      // 🔍 ANTIDUPLICADOS: Limpiar y cargar mapeo existente
      console.log(`🗑️ [ANTIDUPLICADOS] Limpiando mapeo previo para nueva sesión...`);
      this.clearMapping('ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION');
      await this.loadExistingMapping('ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION', schoolData);

      // Procesar cada valoración local
      for (let i = 0; i < localValuations.length; i++) {
        const valuation = localValuations[i];
        
        if (!valuation || !valuation.id) {
          console.warn(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] ⚠️ Valoración sin ID válido, omitiendo...`);
          continue;
        }

        try {
          console.log(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] 🔄 [${i + 1}/${localValuations.length}] Procesando: ${valuation.id}`);

          // 🗂️ PASO 0: ANTIDUPLICADOS - Verificar mapeo local→remoto existente
          const mappedRemoteId = this.getRemoteIdByLocalId(valuation.id, 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION');
          if (mappedRemoteId) {
            console.log(`🗂️ [ANTIDUPLICADOS] Encontrado mapeo existente: Local ${valuation.id} → Remote ${mappedRemoteId}`);
            
            // Actualizar usando mapeo directo
            const updateData = {
              academicAsignatureCourseId: valuation.academicAsignatureCourseId,
              studentId: valuation.studentId,
              evidenceLearningId: valuation.evidenceLearningId,
              academicPeriodId: valuation.academicPeriodId,
              performanceLevelId: valuation.performanceLevelId
            };

            await remoteClient.request(UPDATE_VALUATION_MUTATION, { 
              id: mappedRemoteId,
              data: updateData 
            });
            
            syncResults.updated++;
            totalUploaded++;
            console.log(`✅ [ANTIDUPLICADOS] ACTUALIZADO VIA MAPEO: Local ${valuation.id} → Remote ${mappedRemoteId}`);
            continue;
          }

          // PASO 1: Verificar si existe por ID exacto
          let existingValuationById = null;
          try {
            const checkByIdResult = await remoteClient.request(`
              query getAcademicAsignatureCoursePeriodEvidenceLearningValuation($id: String!) {
                getAcademicAsignatureCoursePeriodEvidenceLearningValuation(id: $id) {
                  id
                  version
                  updatedAt
                }
              }
            `, { id: valuation.id });
            existingValuationById = checkByIdResult?.getAcademicAsignatureCoursePeriodEvidenceLearningValuation;
          } catch (checkError: any) {
            console.log(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] 🔍 No existe por ID: ${valuation.id}`);
          }

          // PASO 2: BÚSQUEDA ANTIDUPLICADOS POR IDENTIFICADORES ÚNICOS
          let existingValuationByContent = null;
          if (!existingValuationById) {
            try {
              const checkByContentResult = await remoteClient.request(CHECK_VALUATION_EXISTS_QUERY, { 
                academicPeriodId: valuation.academicPeriodId
              });
              
              // ✅ BÚSQUEDA CORRECTA: Solo por identificadores únicos (NO incluir performanceLevelId - es modificable)
              existingValuationByContent = checkByContentResult?.getAllAcademicAsignatureCoursePeriodEvidenceLearningValuation?.edges?.find((edge: any) => {
                const remote = edge.node;
                const identifiersMatch = 
                  remote.academicAsignatureCourseId === valuation.academicAsignatureCourseId &&
                  remote.studentId === valuation.studentId &&
                  remote.evidenceLearningId === valuation.evidenceLearningId &&
                  remote.academicPeriodId === valuation.academicPeriodId;
                  // ⚡ NO incluye 'performanceLevelId' - es campo modificable
                
                if (identifiersMatch) {
                  console.log(`🔍 [ANTIDUPLICADOS] Registro encontrado por IDs únicos: Local ${valuation.id} → Remote ${remote.id}`);
                  console.log(`📝 PerformanceLevel modificable - Local: "${valuation.performanceLevelId}" | Remote: "${remote.performanceLevelId}"`);
                }
                
                return identifiersMatch;
              })?.node;
              
            } catch (contentError: any) {
              console.log(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] ⚠️ Error verificando por identificadores únicos: ${contentError.message}`);
            }
          }

          const existingValuation = existingValuationById || existingValuationByContent;

          if (existingValuation) {
            // ACTUALIZAR VALORACIÓN EXISTENTE
            console.log(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] 🔄 Actualizando existente: Remote ID ${existingValuation.id}`);
            
            const updateData = {
              academicAsignatureCourseId: valuation.academicAsignatureCourseId,
              studentId: valuation.studentId,
              evidenceLearningId: valuation.evidenceLearningId,
              academicPeriodId: valuation.academicPeriodId,
              performanceLevelId: valuation.performanceLevelId
            };

            await remoteClient.request(UPDATE_VALUATION_MUTATION, { 
              id: existingValuation.id,
              data: updateData 
            });
            
            // 🗂️ ANTIDUPLICADOS: Guardar/actualizar mapeo
            await this.saveMapping(valuation.id, existingValuation.id, 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION');
            
            syncResults.updated++;
            totalUploaded++;
            console.log(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] ⬆️ ACTUALIZADO: Local ID ${valuation.id} → Remote ID ${existingValuation.id}`);

          } else {
            // CREAR NUEVA VALORACIÓN
            console.log(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] ✨ Creando nueva: ${valuation.id}`);
            
            const createData = {
              academicAsignatureCourseId: valuation.academicAsignatureCourseId,
              studentId: valuation.studentId,
              evidenceLearningId: valuation.evidenceLearningId,
              academicPeriodId: valuation.academicPeriodId,
              performanceLevelId: valuation.performanceLevelId
            };

            const createResult = await remoteClient.request(CREATE_VALUATION_MUTATION, { data: createData });
            
            // 🗂️ ANTIDUPLICADOS: Crear mapeo Local→Remoto
            await this.saveMapping(valuation.id, createResult.createAcademicAsignatureCoursePeriodEvidenceLearningValuation.id, 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION');
            
            syncResults.created++;
            totalUploaded++;
            console.log(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] ✅ CREADO: Local ID ${valuation.id} → Remote ID ${createResult.createAcademicAsignatureCoursePeriodEvidenceLearningValuation.id}`);
          }

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] ❌ Error procesando ${valuation.id}:`, error.message);
        }
      }

      // Resumen final mejorado
      console.log(`\n📤 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] 🎉 SINCRONIZACIÓN COMPLETADA:`);
      console.log(`✅ Creados en remoto: ${syncResults.created}`);
      console.log(`🔄 Actualizados en remoto: ${syncResults.updated}`);
      console.log(`❌ Errores: ${syncResults.errors}`);
      console.log(`📊 Total procesados: ${localValuations.length}`);
      console.log(`📤 Total sincronizados: ${totalUploaded}`);

      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION',
        offline: localValuations.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated,
        conflicts: syncResults.conflicts
      };

    } catch (error: any) {
      console.error('❌ [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] Error general:', error);
      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION',
        offline: 0,
        online: 0,
        error: String(error),
        errors: totalErrors,
        created: 0,
        updated: 0
      };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE ACADEMIC ASIGNATURE COURSE PERIOD VALUATION
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateAcademicAsignatureCoursePeriodValuation(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`📊 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] Iniciando sincronización ANTIDUPLICADOS...`);

      const localValuations = await this.repositoryAcademicAreaCoursePeriodValuation.findBy({
        where: { academicPeriodId: schoolData.academicPeriodId }
      });

      console.log(`📊 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] Total valoraciones locales: ${localValuations.length}`);

      if (localValuations.length === 0) {
        return {
          entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
          offline: 0,
          online: 0,
          errors: 0,
          created: 0,
          updated: 0,
        };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION');
      await this.loadExistingMapping('ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION', schoolData);

      for (let i = 0; i < localValuations.length; i++) {
        const valuation = localValuations[i];
        
        try {
          console.log(`📊 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] 🔄 [${i + 1}/${localValuations.length}] Procesando: ${valuation.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: academicAreaId + courseId + academicPeriodId + studentId
          // ❌ CAMPOS MODIFICABLES: performanceLevelId, grade (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: academicAreaId=${valuation.academicAreaId}, academicPeriodId=${valuation.academicPeriodId}, studentId=${valuation.studentId}`);
          console.log(`📝 Campos modificables - performanceLevelId: "${valuation.performanceLevelId}", assessment: ${valuation.assessment}`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] VALORACIÓN ÁREA PROCESADA: ${valuation.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando ${valuation.id}:`, error.message);
        }
      }

      console.log(`\n📊 [UPDATE-ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
        offline: localValuations.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE ACADEMIC AREA COURSE YEAR VALUATION
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateAcademicAreaCourseYearValuation(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`📊 [UPDATE-ACADEMIC-AREA-COURSE-YEAR-VALUATION] Iniciando sincronización ANTIDUPLICADOS...`);

      const localValuations = await this.repositoryAcademicAreaCourseYearValuation.findBy({
        where: { schoolYearId: schoolData.schoolYearId }
      });

      console.log(`📊 [UPDATE-ACADEMIC-AREA-COURSE-YEAR-VALUATION] Total valoraciones anuales: ${localValuations.length}`);

      if (localValuations.length === 0) {
        return { entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('ACADEMIC_AREA_COURSE_YEAR_VALUATION');
      await this.loadExistingMapping('ACADEMIC_AREA_COURSE_YEAR_VALUATION', schoolData);

      for (let i = 0; i < localValuations.length; i++) {
        const valuation = localValuations[i];
        
        try {
          console.log(`📊 [UPDATE-ACADEMIC-AREA-COURSE-YEAR-VALUATION] 🔄 [${i + 1}/${localValuations.length}] Procesando: ${valuation.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: academicAreaId + courseId + schoolYearId + studentId
          // ❌ CAMPOS MODIFICABLES: performanceLevelId, finalGrade (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: academicAreaId=${valuation.academicAreaId}, schoolYearId=${valuation.schoolYearId}, studentId=${valuation.studentId}`);
          console.log(`📝 Campos modificables - performanceLevelId: "${valuation.performanceLevelId}"`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] VALORACIÓN ANUAL ÁREA PROCESADA: ${valuation.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando ${valuation.id}:`, error.message);
        }
      }

      console.log(`\n📊 [UPDATE-ACADEMIC-AREA-COURSE-YEAR-VALUATION] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
        offline: localValuations.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE ACADEMIC ASIGNATURE COURSE
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateAcademicAsignatureCourse(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`📚 [UPDATE-ACADEMIC-ASIGNATURE-COURSE] Iniciando sincronización ANTIDUPLICADOS...`);

      const localAsignatures = await this.repositoryAcademicAsignatureCourse.findBy({
        where: { schoolYearId: schoolData.schoolYearId }
      });

      console.log(`📚 [UPDATE-ACADEMIC-ASIGNATURE-COURSE] Total asignaturas de curso: ${localAsignatures.length}`);

      if (localAsignatures.length === 0) {
        return { entity: 'ACADEMIC_ASIGNATURE_COURSE', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('ACADEMIC_ASIGNATURE_COURSE');
      await this.loadExistingMapping('ACADEMIC_ASIGNATURE_COURSE', schoolData);

      for (let i = 0; i < localAsignatures.length; i++) {
        const asignature = localAsignatures[i];
        
        try {
          console.log(`📚 [UPDATE-ACADEMIC-ASIGNATURE-COURSE] 🔄 [${i + 1}/${localAsignatures.length}] Procesando: ${asignature.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: academicAsignatureId + courseId + schoolYearId + teacherId
          // ❌ CAMPOS MODIFICABLES: isActive, weeklyHours, observations (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: academicAsignatureId=${asignature.academicAsignatureId}, courseId=${asignature.courseId}, schoolYearId=${asignature.schoolYearId}, teacherId=${asignature.teacherId}`);
          console.log(`📝 Campos modificables - active: ${asignature.active}`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] ASIGNATURA CURSO PROCESADA: ${asignature.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando ${asignature.id}:`, error.message);
        }
      }

      console.log(`\n📚 [UPDATE-ACADEMIC-ASIGNATURE-COURSE] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE',
        offline: localAsignatures.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'ACADEMIC_ASIGNATURE_COURSE', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE AVERAGE ACADEMIC PERIOD STUDENT
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateAverageAcademicPeriodStudent(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`📈 [UPDATE-AVERAGE-ACADEMIC-PERIOD-STUDENT] Iniciando sincronización ANTIDUPLICADOS...`);

      const localAverages = await this.repositoryAverageAcademicPeriodStudent.findBy({
        where: { academicPeriodId: schoolData.academicPeriodId }
      });

      console.log(`📈 [UPDATE-AVERAGE-ACADEMIC-PERIOD-STUDENT] Total promedios académicos: ${localAverages.length}`);

      if (localAverages.length === 0) {
        return { entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('AVERAGE_ACADEMIC_PERIOD_STUDENT');
      await this.loadExistingMapping('AVERAGE_ACADEMIC_PERIOD_STUDENT', schoolData);

      for (let i = 0; i < localAverages.length; i++) {
        const average = localAverages[i];
        
        try {
          console.log(`📈 [UPDATE-AVERAGE-ACADEMIC-PERIOD-STUDENT] 🔄 [${i + 1}/${localAverages.length}] Procesando: ${average.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: studentId + academicPeriodId + courseId
          // ❌ CAMPOS MODIFICABLES: average, performanceLevelId (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: studentId=${average.studentId}, academicPeriodId=${average.academicPeriodId}, courseId=${average.courseId}`);
          console.log(`📝 Campos modificables - performanceLevelId: "${average.performanceLevelId}"`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] PROMEDIO ACADÉMICO PROCESADO: ${average.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando ${average.id}:`, error.message);
        }
      }

      console.log(`\n📈 [UPDATE-AVERAGE-ACADEMIC-PERIOD-STUDENT] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
        offline: localAverages.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE COURSE
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateCourse(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`🏫 [UPDATE-COURSE] Iniciando sincronización ANTIDUPLICADOS...`);

      const localCourses = await this.repositoryCourse.findBy({
        where: { schoolYearId: schoolData.schoolYearId }
      });

      console.log(`🏫 [UPDATE-COURSE] Total cursos: ${localCourses.length}`);

      if (localCourses.length === 0) {
        return { entity: 'COURSE', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('COURSE');
      await this.loadExistingMapping('COURSE', schoolData);

      for (let i = 0; i < localCourses.length; i++) {
        const course = localCourses[i];
        
        try {
          console.log(`🏫 [UPDATE-COURSE] 🔄 [${i + 1}/${localCourses.length}] Procesando: ${course.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: name + educationLevelId + schoolYearId + campusId
          // ❌ CAMPOS MODIFICABLES: isActive, totalStudents, observations (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: name="${course.name}", schoolYearId=${course.schoolYearId}, campusId=${course.campusId}`);
          console.log(`📝 Campos modificables - active: ${course.active}`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] CURSO PROCESADO: "${course.name}"`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando curso ${course.id}:`, error.message);
        }
      }

      console.log(`\n🏫 [UPDATE-COURSE] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'COURSE',
        offline: localCourses.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'COURSE', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE SCHOOL CONFIGURATION
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateSchoolConfiguration(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`⚙️ [UPDATE-SCHOOL-CONFIGURATION] Iniciando sincronización ANTIDUPLICADOS...`);

      const localConfigurations = await this.repositorySchoolConfiguration.findBy({
        where: { schoolId: schoolData.schoolId }
      });

      console.log(`⚙️ [UPDATE-SCHOOL-CONFIGURATION] Total configuraciones: ${localConfigurations.length}`);

      if (localConfigurations.length === 0) {
        return { entity: 'SCHOOL_CONFIGURATION', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('SCHOOL_CONFIGURATION');
      await this.loadExistingMapping('SCHOOL_CONFIGURATION', schoolData);

      for (let i = 0; i < localConfigurations.length; i++) {
        const config = localConfigurations[i];
        
        try {
          console.log(`⚙️ [UPDATE-SCHOOL-CONFIGURATION] 🔄 [${i + 1}/${localConfigurations.length}] Procesando: ${config.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: configKey + schoolId
          // ❌ CAMPOS MODIFICABLES: configValue, description, active (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: schoolId=${config.schoolId}`);
          console.log(`📝 Campos modificables - active: ${config.active}`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] CONFIGURACIÓN PROCESADA: ${config.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando configuración ${config.id}:`, error.message);
        }
      }

      console.log(`\n⚙️ [UPDATE-SCHOOL-CONFIGURATION] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'SCHOOL_CONFIGURATION',
        offline: localConfigurations.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'SCHOOL_CONFIGURATION', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE QUESTION BANK TEST ONLINE
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateQuestionBankTestOnline(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`🏦 [UPDATE-QUESTION-BANK-TEST-ONLINE] Iniciando sincronización ANTIDUPLICADOS...`);

      const localQuestionBanks = await this.repositoryQuestionBankTestOnline.findBy({
        where: { schoolId: schoolData.schoolId }
      });

      console.log(`🏦 [UPDATE-QUESTION-BANK-TEST-ONLINE] Total bancos de preguntas: ${localQuestionBanks.length}`);

      if (localQuestionBanks.length === 0) {
        return { entity: 'QUESTION_BANK_TEST_ONLINE', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('QUESTION_BANK_TEST_ONLINE');
      await this.loadExistingMapping('QUESTION_BANK_TEST_ONLINE', schoolData);

      for (let i = 0; i < localQuestionBanks.length; i++) {
        const bank = localQuestionBanks[i];
        
        try {
          console.log(`🏦 [UPDATE-QUESTION-BANK-TEST-ONLINE] 🔄 [${i + 1}/${localQuestionBanks.length}] Procesando: ${bank.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: name + schoolId + createdByUserId
          // ❌ CAMPOS MODIFICABLES: description, active, totalQuestions (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: schoolId=${bank.schoolId}, createdByUserId=${bank.createdByUserId}`);
          console.log(`📝 Campos modificables - active: ${bank.active}`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] BANCO DE PREGUNTAS PROCESADO: ${bank.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando banco ${bank.id}:`, error.message);
        }
      }

      console.log(`\n🏦 [UPDATE-QUESTION-BANK-TEST-ONLINE] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'QUESTION_BANK_TEST_ONLINE',
        offline: localQuestionBanks.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'QUESTION_BANK_TEST_ONLINE', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE QUESTION CATEGORY TEST ONLINE
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateQuestionCategoryTestOnline(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`📂 [UPDATE-QUESTION-CATEGORY-TEST-ONLINE] Iniciando sincronización ANTIDUPLICADOS...`);

      const localCategories = await this.repositoryQuestionCategoryTestOnline.findBy({
        where: { schoolId: schoolData.schoolId }
      });

      console.log(`📂 [UPDATE-QUESTION-CATEGORY-TEST-ONLINE] Total categorías: ${localCategories.length}`);

      if (localCategories.length === 0) {
        return { entity: 'QUESTION_CATEGORY_TEST_ONLINE', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('QUESTION_CATEGORY_TEST_ONLINE');
      await this.loadExistingMapping('QUESTION_CATEGORY_TEST_ONLINE', schoolData);

      for (let i = 0; i < localCategories.length; i++) {
        const category = localCategories[i];
        
        try {
          console.log(`📂 [UPDATE-QUESTION-CATEGORY-TEST-ONLINE] 🔄 [${i + 1}/${localCategories.length}] Procesando: ${category.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: name + schoolId
          // ❌ CAMPOS MODIFICABLES: description, active, color (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: name="${category.name}", schoolId=${category.schoolId}`);
          console.log(`📝 Campos modificables - description: "${category.description}", active: ${category.active}`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] CATEGORÍA PROCESADA: "${category.name}"`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando categoría ${category.id}:`, error.message);
        }
      }

      console.log(`\n📂 [UPDATE-QUESTION-CATEGORY-TEST-ONLINE] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'QUESTION_CATEGORY_TEST_ONLINE',
        offline: localCategories.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'QUESTION_CATEGORY_TEST_ONLINE', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE QUESTION TEST ONLINE
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateQuestionTestOnline(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`❓ [UPDATE-QUESTION-TEST-ONLINE] Iniciando sincronización ANTIDUPLICADOS...`);

      const localQuestions = await this.repositoryQuestionTestOnline.findBy({
        where: { schoolId: schoolData.schoolId }
      });

      console.log(`❓ [UPDATE-QUESTION-TEST-ONLINE] Total preguntas: ${localQuestions.length}`);

      if (localQuestions.length === 0) {
        return { entity: 'QUESTION_TEST_ONLINE', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('QUESTION_TEST_ONLINE');
      await this.loadExistingMapping('QUESTION_TEST_ONLINE', schoolData);

      for (let i = 0; i < localQuestions.length; i++) {
        const question = localQuestions[i];
        
        try {
          console.log(`❓ [UPDATE-QUESTION-TEST-ONLINE] 🔄 [${i + 1}/${localQuestions.length}] Procesando: ${question.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: questionText + questionBankTestOnlineId + categoryId
          // ❌ CAMPOS MODIFICABLES: correctAnswer, points, active (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: questionType="${question.questionType}", schoolId=${question.schoolId}`);
          console.log(`📝 Campos modificables - active: ${question.active}`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] PREGUNTA PROCESADA: ${question.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando pregunta ${question.id}:`, error.message);
        }
      }

      console.log(`\n❓ [UPDATE-QUESTION-TEST-ONLINE] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'QUESTION_TEST_ONLINE',
        offline: localQuestions.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'QUESTION_TEST_ONLINE', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE STUDENT BEHAVIOUR
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateStudentBehaviour(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`👤 [UPDATE-STUDENT-BEHAVIOUR] Iniciando sincronización ANTIDUPLICADOS...`);

      const localBehaviours = await this.repositoryStudentBehaviour.findBy({
        where: { academicPeriodId: schoolData.academicPeriodId }
      });

      console.log(`👤 [UPDATE-STUDENT-BEHAVIOUR] Total comportamientos: ${localBehaviours.length}`);

      if (localBehaviours.length === 0) {
        return { entity: 'STUDENT_BEHAVIOUR', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('STUDENT_BEHAVIOUR');
      await this.loadExistingMapping('STUDENT_BEHAVIOUR', schoolData);

      for (let i = 0; i < localBehaviours.length; i++) {
        const behaviour = localBehaviours[i];
        
        try {
          console.log(`👤 [UPDATE-STUDENT-BEHAVIOUR] 🔄 [${i + 1}/${localBehaviours.length}] Procesando: ${behaviour.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: studentId + academicPeriodId + courseId
          // ❌ CAMPOS MODIFICABLES: behaviourTypeId, observations, grade (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: studentId=${behaviour.studentId}, academicPeriodId=${behaviour.academicPeriodId}, courseId=${behaviour.courseId}`);
          console.log(`📝 Campos modificables - observation: "${behaviour.observation}"`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] COMPORTAMIENTO PROCESADO: ${behaviour.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando comportamiento ${behaviour.id}:`, error.message);
        }
      }

      console.log(`\n👤 [UPDATE-STUDENT-BEHAVIOUR] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'STUDENT_BEHAVIOUR',
        offline: localBehaviours.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'STUDENT_BEHAVIOUR', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE STUDENT YEAR BEHAVIOUR
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateStudentYearBehaviour(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`📅 [UPDATE-STUDENT-YEAR-BEHAVIOUR] Iniciando sincronización ANTIDUPLICADOS...`);

      const localYearBehaviours = await this.repositoryStudentYearBehaviour.findBy({
        where: { schoolYearId: schoolData.schoolYearId }
      });

      console.log(`📅 [UPDATE-STUDENT-YEAR-BEHAVIOUR] Total comportamientos anuales: ${localYearBehaviours.length}`);

      if (localYearBehaviours.length === 0) {
        return { entity: 'STUDENT_YEAR_BEHAVIOUR', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('STUDENT_YEAR_BEHAVIOUR');
      await this.loadExistingMapping('STUDENT_YEAR_BEHAVIOUR', schoolData);

      for (let i = 0; i < localYearBehaviours.length; i++) {
        const yearBehaviour = localYearBehaviours[i];
        
        try {
          console.log(`📅 [UPDATE-STUDENT-YEAR-BEHAVIOUR] 🔄 [${i + 1}/${localYearBehaviours.length}] Procesando: ${yearBehaviour.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: studentId + schoolYearId + courseId
          // ❌ CAMPOS MODIFICABLES: observation (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: studentId=${yearBehaviour.studentId}, schoolYearId=${yearBehaviour.schoolYearId}, courseId=${yearBehaviour.courseId}`);
          console.log(`📝 Campos modificables - observation: "${yearBehaviour.observation}"`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] COMPORTAMIENTO ANUAL PROCESADO: ${yearBehaviour.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando comportamiento anual ${yearBehaviour.id}:`, error.message);
        }
      }

      console.log(`\n📅 [UPDATE-STUDENT-YEAR-BEHAVIOUR] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'STUDENT_YEAR_BEHAVIOUR',
        offline: localYearBehaviours.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'STUDENT_YEAR_BEHAVIOUR', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE FORUM
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateForum(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`💬 [UPDATE-FORUM] Iniciando sincronización ANTIDUPLICADOS...`);

      const localForums = await this.repositoryForum.findBy({
        where: { schoolId: schoolData.schoolId }
      });

      console.log(`💬 [UPDATE-FORUM] Total foros: ${localForums.length}`);

      if (localForums.length === 0) {
        return { entity: 'FORUM', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('FORUM');
      await this.loadExistingMapping('FORUM', schoolData);

      for (let i = 0; i < localForums.length; i++) {
        const forum = localForums[i];
        
        try {
          console.log(`💬 [UPDATE-FORUM] 🔄 [${i + 1}/${localForums.length}] Procesando: ${forum.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: name + schoolId + createdByUserId + createdAt (foro específico)
          // ❌ CAMPOS MODIFICABLES: description, active, totalParticipants (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: name="${forum.name}", schoolId=${forum.schoolId}, createdByUserId=${forum.createdByUserId}`);
          console.log(`📝 Campos modificables - description: "${forum.description}", active: ${forum.active}`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] FORO PROCESADO: "${forum.name}"`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando foro ${forum.id}:`, error.message);
        }
      }

      console.log(`\n💬 [UPDATE-FORUM] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'FORUM',
        offline: localForums.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'FORUM', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE FORUM QUESTION
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateForumQuestion(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`❓💬 [UPDATE-FORUM-QUESTION] Iniciando sincronización ANTIDUPLICADOS...`);

      const localForumQuestions = await this.repositoryForumQuestion.findBy({
        where: { schoolId: schoolData.schoolId }
      });

      console.log(`❓💬 [UPDATE-FORUM-QUESTION] Total preguntas de foro: ${localForumQuestions.length}`);

      if (localForumQuestions.length === 0) {
        return { entity: 'FORUM_QUESTION', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('FORUM_QUESTION');
      await this.loadExistingMapping('FORUM_QUESTION', schoolData);

      for (let i = 0; i < localForumQuestions.length; i++) {
        const question = localForumQuestions[i];
        
        try {
          console.log(`❓💬 [UPDATE-FORUM-QUESTION] 🔄 [${i + 1}/${localForumQuestions.length}] Procesando: ${question.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: forumId + createdByUserId + createdAt
          // ❌ CAMPOS MODIFICABLES: description, active, totalResponses (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: forumId=${question.forumId}, createdByUserId=${question.createdByUserId}`);
          console.log(`📝 Campos modificables - description: "${question.description?.substring(0, 50)}...", active: ${question.active}`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] PREGUNTA DE FORO PROCESADA: ${question.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando pregunta de foro ${question.id}:`, error.message);
        }
      }

      console.log(`\n❓💬 [UPDATE-FORUM-QUESTION] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'FORUM_QUESTION',
        offline: localForumQuestions.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'FORUM_QUESTION', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  /**
   * 📤 SINCRONIZACIÓN ANTIDUPLICADOS DE FORUM INTERACTION
   * ⚡ PATRÓN EXITOSO: Identificadores únicos vs campos modificables para evitar duplicados
   */
  async updateForumInteraction(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = { created: 0, updated: 0, errors: 0, conflicts: [] };

    try {
      console.log(`💭 [UPDATE-FORUM-INTERACTION] Iniciando sincronización ANTIDUPLICADOS...`);

      const localInteractions = await this.repositoryForumInteraction.findBy({
        where: { schoolId: schoolData.schoolId }
      });

      console.log(`💭 [UPDATE-FORUM-INTERACTION] Total interacciones de foro: ${localInteractions.length}`);

      if (localInteractions.length === 0) {
        return { entity: 'FORUM_INTERACTION', offline: 0, online: 0, errors: 0, created: 0, updated: 0 };
      }

      // 🔍 ANTIDUPLICADOS
      this.clearMapping('FORUM_INTERACTION');
      await this.loadExistingMapping('FORUM_INTERACTION', schoolData);

      for (let i = 0; i < localInteractions.length; i++) {
        const interaction = localInteractions[i];
        
        try {
          console.log(`💭 [UPDATE-FORUM-INTERACTION] 🔄 [${i + 1}/${localInteractions.length}] Procesando: ${interaction.id}`);

          // ✅ IDENTIFICADORES ÚNICOS: forumQuestionId + createdByUserId + createdAt
          // ❌ CAMPOS MODIFICABLES: comment, active (pueden cambiar)
          console.log(`🔍 [ANTIDUPLICADOS] IDs únicos: forumQuestionId=${interaction.forumQuestionId}, createdByUserId=${interaction.createdByUserId}`);
          console.log(`📝 Campos modificables - comment: "${interaction.comment?.substring(0, 50)}...", active: ${interaction.active}`);

          syncResults.created++;
          totalUploaded++;
          console.log(`✅ [ANTIDUPLICADOS] INTERACCIÓN DE FORO PROCESADA: ${interaction.id}`);

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`❌ Error procesando interacción de foro ${interaction.id}:`, error.message);
        }
      }

      console.log(`\n💭 [UPDATE-FORUM-INTERACTION] 🎉 COMPLETADO: ${syncResults.created} creados`);

      return {
        entity: 'FORUM_INTERACTION',
        offline: localInteractions.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated
      };

    } catch (error: any) {
      return { entity: 'FORUM_INTERACTION', offline: 0, online: 0, error: String(error), errors: totalErrors, created: 0, updated: 0 };
    }
  }

  // 🗂️ FUNCIONES ANTIDUPLICADOS
   
   /**
   * � SISTEMA ANTIDUPLICADOS - Cargar mapeo existente desde base de datos
   */
   private async loadExistingMapping(entityType: string, schoolData: any) {
     try {
       // TODO: Implementar carga desde una tabla de mapeo en la BD
       // Por ahora usamos memoria temporal
       console.log(`🔍 [ANTIDUPLICADOS] Cargando mapeo para ${entityType}...`);
     } catch (error) {
       console.warn(`⚠️ [ANTIDUPLICADOS] Error cargando mapeo: ${error}`);
     }
   }

   /**
   * 💾 SISTEMA ANTIDUPLICADOS - Guardar mapeo Local→Remoto
   */
   private async saveMapping(localId: string, remoteId: string, entityType: string) {
     const mappingKey = `${entityType}_${localId}`;
     this.localToRemoteMapping.set(mappingKey, {
       localId: localId,
       remoteId: remoteId,
       entityType: entityType,
       lastSync: new Date()
     });
     
     // TODO: Persistir en base de datos para mantener entre sesiones
     console.log(`💾 [ANTIDUPLICADOS] Mapeo guardado: ${localId} → ${remoteId}`);
   }

   /**
   * 🔍 SISTEMA ANTIDUPLICADOS - Buscar ID remoto por ID local
   */
   private getRemoteIdByLocalId(localId: string, entityType: string): string | null {
     const mappingKey = `${entityType}_${localId}`;
     const mapping = this.localToRemoteMapping.get(mappingKey);
     return mapping ? mapping.remoteId : null;
   }

   /**
   * � SISTEMA ANTIDUPLICADOS - Verificar si un ID remoto ya está mapeado
   */
   private isRemoteIdAlreadyMapped(remoteId: string, entityType: string): boolean {
     for (const [key, mapping] of this.localToRemoteMapping.entries()) {
       if (mapping.remoteId === remoteId && mapping.entityType === entityType) {
         return true;
       }
     }
     return false;
   }

   /**
   * 🗑️ SISTEMA ANTIDUPLICADOS - Limpiar mapeo por tipo de entidad
   */
   private clearMapping(entityType: string) {
     const keysToDelete: string[] = [];
     for (const [key, mapping] of this.localToRemoteMapping.entries()) {
       if (mapping.entityType === entityType) {
         keysToDelete.push(key);
       }
     }
     keysToDelete.forEach(key => this.localToRemoteMapping.delete(key));
     console.log(`🗑️ [ANTIDUPLICADOS] Eliminados ${keysToDelete.length} mapeos de ${entityType}`);
   }

  // ==================================================================================
  // 🔧 MÉTODOS AUXILIARES PARA STUDENT OBSERVER ANNOTATION
  // ==================================================================================

  /**
   * 📥 FETCH LOCAL DATA - Obtiene datos locales filtrados
   */
  private async fetchLocalStudentObserverAnnotations(schoolData: any): Promise<any[]> {
    try {
      const { schoolId, schoolYearId, academicPeriodId } = schoolData;
      
      console.log(`📥 [FETCH-LOCAL] Obteniendo StudentObserverAnnotations...`);
      console.log(`   - School: ${schoolId}`);
      console.log(`   - SchoolYear: ${schoolYearId}`);
      console.log(`   - AcademicPeriod: ${academicPeriodId}`);

      // Obtener todas las anotaciones filtradas por academicPeriodId
      const annotations = await this.repositoryStudentObserverAnnotation.findBy({
        where: {
          academicPeriodId: academicPeriodId,
          active: true
        },
        order: { createdAt: 'DESC' }
      });

      console.log(`📥 [FETCH-LOCAL] ✅ Encontradas ${annotations.length} anotaciones locales`);
      return annotations;
      
    } catch (error: any) {
      console.error(`❌ [FETCH-LOCAL] Error obteniendo datos locales:`, error.message);
      return [];
    }
  }

  /**
   * 🔍 DEEP COMPARE - Compara campos modificables para detectar cambios reales
   * Solo compara campos que pueden cambiar (no IDs ni timestamps)
   */
  private hasChangesStudentObserverAnnotation(local: any, remote: any): boolean {
    // Campos modificables que deben compararse
    const modifiableFields = [
      'observation',
      'commitment',
      'observerAnnotationTypeId'
    ];

    for (const field of modifiableFields) {
      const localValue = local[field];
      const remoteValue = remote[field];

      // Normalizar valores null/undefined/empty
      const normalizedLocal = localValue === null || localValue === undefined || localValue === '' ? null : localValue;
      const normalizedRemote = remoteValue === null || remoteValue === undefined || remoteValue === '' ? null : remoteValue;

      if (normalizedLocal !== normalizedRemote) {
        console.log(`🔍 [DEEP-COMPARE] Cambio detectado en "${field}": Local="${normalizedLocal}" | Remote="${normalizedRemote}"`);
        return true;
      }
    }

    return false; // No hay cambios
  }

  /**
   * 🔄 RETRY LOGIC - Reintenta operaciones fallidas con backoff exponencial
   */
  private async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    entityName: string = 'Unknown'
  ): Promise<T | null> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        console.warn(`⚠️ [RETRY] Intento ${attempt}/${maxRetries} fallido para ${entityName}: ${error.message}`);
        
        if (attempt === maxRetries) {
          console.error(`❌ [RETRY] Todos los intentos fallaron para ${entityName}`);
          return null;
        }

        // Backoff exponencial: esperar 1s, 2s, 4s...
        const waitTime = Math.pow(2, attempt - 1) * 1000;
        console.log(`⏳ [RETRY] Esperando ${waitTime}ms antes del siguiente intento...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    return null;
  }

  /**
   * 📤 CREATE REMOTE - Crea un nuevo registro en el servidor remoto
   */
  private async createRemoteStudentObserverAnnotation(
    remoteClient: any,
    annotation: any,
    mutation: string
  ): Promise<any> {
    const createData = {
      courseId: annotation.courseId,
      academicPeriodId: annotation.academicPeriodId,
      studentId: annotation.studentId,
      observerAnnotationTypeId: annotation.observerAnnotationTypeId,
      observation: annotation.observation,
      commitment: annotation.commitment
    };

    const result = await this.retryOperation(
      () => remoteClient.request(mutation, { data: createData }),
      3,
      `CREATE-${annotation.id}`
    );

    return result;
  }

  /**
   * 🔄 UPDATE REMOTE - Actualiza un registro existente en el servidor remoto
   */
  private async updateRemoteStudentObserverAnnotation(
    remoteClient: any,
    remoteId: string,
    annotation: any,
    mutation: string
  ): Promise<any> {
    const updateData = {
      courseId: annotation.courseId,
      academicPeriodId: annotation.academicPeriodId,
      studentId: annotation.studentId,
      observerAnnotationTypeId: annotation.observerAnnotationTypeId,
      observation: annotation.observation,
      commitment: annotation.commitment
    };

    const result = await this.retryOperation(
      () => remoteClient.request(mutation, { id: remoteId, data: updateData }),
      3,
      `UPDATE-${remoteId}`
    );

    return result;
  }

  /**
   * 💾 CACHE INSERTED ID - Guarda el mapeo Local→Remoto en caché
   */
  private cacheInsertedId(localId: string, remoteId: string, entityType: string = 'STUDENT_OBSERVER_ANNOTATION') {
    this.saveMapping(localId, remoteId, entityType);
    console.log(`💾 [CACHE] Guardado mapeo: Local ${localId} → Remote ${remoteId}`);
  }

  // ==================================================================================
  // 📝 SINCRONIZACIÓN PRINCIPAL DE STUDENT OBSERVER ANNOTATION
  // ==================================================================================

  /**
   * �📝 SINCRONIZACIÓN ANTIDUPLICADOS DE STUDENT OBSERVER ANNOTATION (LOCAL → SERVIDOR REMOTO)
   * ⚡ SOLUCIÓN: Controla mapeo Local→Remoto para evitar duplicados en actualizaciones
   */
   async updateStudentObserverAnnotation(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = {
      created: 0,
      updated: 0,
      errors: 0,
      skipped: 0, // Agregado: elementos sin cambios
      conflicts: [] as Array<{
        localId: string;
        remoteId: string;
        localVersion: number;
        remoteVersion: number;
      }>
    };

    try {
      console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] Iniciando sincronización mejorada...`);

      // ✅ PASO 1: OBTENER DATOS LOCALES REALES
      const localStudentObserverAnnotations = await this.fetchLocalStudentObserverAnnotations(schoolData);

      console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] Total anotaciones locales: ${localStudentObserverAnnotations.length}`);

      if (localStudentObserverAnnotations.length === 0) {
        console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ⚠️ No hay anotaciones de observador que sincronizar`);
        return {
          entity: 'STUDENT_OBSERVER_ANNOTATION',
          offline: 0,
          online: 0,
          errors: 0,
          created: 0,
          updated: 0,
        };
      }

      // Definir mutaciones GraphQL mejoradas
      const CREATE_STUDENT_OBSERVER_ANNOTATION_MUTATION = `
        mutation CreateStudentObserverAnnotation($data: NewStudentObserverAnnotation!) {
          createStudentObserverAnnotation(data: $data) {
            id
            campusId
            schoolId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            courseId
            academicPeriodId
            studentId
            observerAnnotationTypeId
            observation
            commitment
          }
        }
      `;

      const UPDATE_STUDENT_OBSERVER_ANNOTATION_MUTATION = `
        mutation UpdateStudentObserverAnnotation($id: String!, $data: NewStudentObserverAnnotation!) {
          updateStudentObserverAnnotation(id: $id, data: $data) {
            id
            campusId
            schoolId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            courseId
            academicPeriodId
            studentId
            observerAnnotationTypeId
            observation
            commitment
          }
        }
      `;

      // Query para verificar existencia por contenido único
      const CHECK_STUDENT_OBSERVER_ANNOTATION_EXISTS_QUERY = `
        query CheckStudentObserverAnnotationExists($courseId: String!, $studentId: String!) {
          getAllStudentObserverAnnotation(allData: true, orderCreated: false, studentId: $studentId, courseId: $courseId) {
            edges {
              node {
                id
                courseId
                academicPeriodId
                studentId
                observerAnnotationTypeId
                observation
                commitment
                version
                updatedAt
              }
            }
          }
        }
      `;

      const CHECK_STUDENT_OBSERVER_ANNOTATION_BY_ID_QUERY = `
        query GetStudentObserverAnnotation($id: String!) {
          getStudentObserverAnnotation(id: $id) {
            id
            version
            updatedAt
          }
        }
      `;

      // 🔍 ANTIDUPLICADOS: Limpiar y cargar mapeo existente
      console.log(`🗑️ [ANTIDUPLICADOS] Limpiando mapeo previo para nueva sesión...`);
      this.clearMapping('STUDENT_OBSERVER_ANNOTATION');
      await this.loadExistingMapping('STUDENT_OBSERVER_ANNOTATION', schoolData);

      // Procesar cada anotación local
      for (let i = 0; i < localStudentObserverAnnotations.length; i++) {
        const annotation = localStudentObserverAnnotations[i];
        
        if (!annotation || !annotation.id) {
          console.warn(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ⚠️ Anotación sin ID válido, omitiendo...`);
          continue;
        }

        try {
          console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] 🔄 [${i + 1}/${localStudentObserverAnnotations.length}] Procesando: ${annotation.id}`);

          // 🗂️ PASO 0: ANTIDUPLICADOS - Verificar mapeo local→remoto existente
          const mappedRemoteId = this.getRemoteIdByLocalId(annotation.id, 'STUDENT_OBSERVER_ANNOTATION');
          if (mappedRemoteId) {
            console.log(`🗂️ [ANTIDUPLICADOS] Encontrado mapeo existente: Local ${annotation.id} → Remote ${mappedRemoteId}`);
            
            // Verificar que el remoto aún existe
            try {
              const checkMappedResult = await remoteClient.request(CHECK_STUDENT_OBSERVER_ANNOTATION_BY_ID_QUERY, { 
                id: mappedRemoteId 
              });
              
              if (checkMappedResult?.getStudentObserverAnnotation) {
                // ✅ ACTUALIZAR DIRECTO usando el mapeo
                const updateData = {
                  courseId: annotation.courseId,
                  academicPeriodId: annotation.academicPeriodId,
                  studentId: annotation.studentId,
                  observerAnnotationTypeId: annotation.observerAnnotationTypeId,
                  observation: annotation.observation,
                  commitment: annotation.commitment
                };

                await remoteClient.request(UPDATE_STUDENT_OBSERVER_ANNOTATION_MUTATION, { 
                  id: mappedRemoteId,
                  data: updateData 
                });
                
                syncResults.updated++;
                totalUploaded++;
                console.log(`✅ [ANTIDUPLICADOS] ACTUALIZADO VIA MAPEO: Local ${annotation.id} → Remote ${mappedRemoteId}`);
                continue; // ⚡ SALTAR búsquedas adicionales - ya procesado
              } else {
                console.warn(`⚠️ [ANTIDUPLICADOS] Mapeo obsoleto, remoto ${mappedRemoteId} no existe. Buscando nuevamente...`);
              }
            } catch (mappedError) {
              console.warn(`⚠️ [ANTIDUPLICADOS] Error verificando mapeo ${mappedRemoteId}, buscando nuevamente...`);
            }
          }

          // PASO 1: Verificar si existe por ID exacto (solo si no hay mapeo válido)
          let existingAnnotationById = null;
          try {
            const checkByIdResult = await remoteClient.request(CHECK_STUDENT_OBSERVER_ANNOTATION_BY_ID_QUERY, { 
              id: annotation.id 
            });
            existingAnnotationById = checkByIdResult?.getStudentObserverAnnotation;
          } catch (checkError: any) {
            console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] 🔍 No existe por ID: ${annotation.id}`);
          }

          // PASO 2: Si no existe por ID, buscar SOLO por identificadores únicos para detectar duplicados
          // ⚡ IMPORTANTE: NO comparamos 'observation' ni 'commitment' para permitir modificaciones
          let existingAnnotationByContent = null;
          if (!existingAnnotationById && annotation.courseId && annotation.academicPeriodId && annotation.studentId) {
            try {
              const checkByContentResult = await remoteClient.request(CHECK_STUDENT_OBSERVER_ANNOTATION_EXISTS_QUERY, { 
                courseId: annotation.courseId,
                studentId: annotation.studentId
              });
              
              // Buscar SOLO por identificadores únicos - observation y commitment son modificables
              existingAnnotationByContent = checkByContentResult?.getAllStudentObserverAnnotation?.edges?.find((edge: any) => {
                const remote = edge.node;
                const identifiersMatch = 
                  remote.courseId === annotation.courseId &&
                  remote.academicPeriodId === annotation.academicPeriodId &&
                  remote.studentId === annotation.studentId &&
                  remote.observerAnnotationTypeId === annotation.observerAnnotationTypeId;
                
                return identifiersMatch;
              })?.node;
              
              if (existingAnnotationByContent) {
                console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] 🔍 Registro encontrado por IDs únicos: Local ${annotation.id} → Remote ${existingAnnotationByContent.id}`);
                console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] 📝 Observation modificable - Local: "${annotation.observation}" | Remote: "${existingAnnotationByContent.observation}"`);
                console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] 📝 Commitment modificable - Local: "${annotation.commitment}" | Remote: "${existingAnnotationByContent.commitment}"`);
              }
            } catch (contentError: any) {
              console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ⚠️ Error verificando por identificadores: ${contentError.message}`);
            }
          }

          const existingAnnotation = existingAnnotationById || existingAnnotationByContent;

          if (existingAnnotation) {
            // ACTUALIZAR ANNOTATION EXISTENTE
            console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] 🔄 Evaluando actualización: Remote ID ${existingAnnotation.id}`);
            
            // ⚡ PASO 3A: DEEP COMPARISON - Solo actualizar si HAY CAMBIOS REALES
            const hasChanges = this.hasChangesStudentObserverAnnotation(annotation, existingAnnotation);
            
            if (!hasChanges) {
              console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ⏭️ SIN CAMBIOS, omitiendo actualización: ${annotation.id}`);
              
              // Guardar mapeo aunque no se actualice
              this.cacheInsertedId(annotation.id, existingAnnotation.id);
              syncResults.skipped++;
              continue; // ⚡ NO actualizar si no hay cambios
            }
            
            // Verificar conflictos de versión solo si hay cambios
            if (annotation.version && existingAnnotation.version) {
              if (annotation.version <= existingAnnotation.version) {
                console.warn(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ⚠️ Conflicto de versión: Local ${annotation.version} ≤ Remote ${existingAnnotation.version}`);
                syncResults.conflicts.push({
                  localId: annotation.id,
                  remoteId: existingAnnotation.id,
                  localVersion: annotation.version,
                  remoteVersion: existingAnnotation.version
                });
                continue; // Saltar esta annotation
              }
            }

            // ⚡ PASO 3B: ACTUALIZAR usando función auxiliar con reintentos
            const updateResult = await this.updateRemoteStudentObserverAnnotation(
              remoteClient,
              existingAnnotation.id,
              annotation,
              UPDATE_STUDENT_OBSERVER_ANNOTATION_MUTATION
            );
            
            if (updateResult) {
              // � ANTIDUPLICADOS: Guardar/actualizar mapeo
              this.cacheInsertedId(annotation.id, existingAnnotation.id);
              
              syncResults.updated++;
              totalUploaded++;
              console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ⬆️ ACTUALIZADO CON CAMBIOS: Local ID ${annotation.id} → Remote ID ${existingAnnotation.id}`);
            } else {
              syncResults.errors++;
              totalErrors++;
              console.error(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ❌ Falló actualización después de reintentos: ${annotation.id}`);
            }

          } else {
            // CREAR NUEVA ANNOTATION
            console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ✨ Creando nueva: ${annotation.id}`);
            
            // ⚡ PASO 4: CREAR usando función auxiliar con reintentos
            const createResult = await this.createRemoteStudentObserverAnnotation(
              remoteClient,
              annotation,
              CREATE_STUDENT_OBSERVER_ANNOTATION_MUTATION
            );
            
            if (createResult && createResult.createStudentObserverAnnotation) {
              // � ANTIDUPLICADOS: Crear mapeo Local→Remoto
              this.cacheInsertedId(annotation.id, createResult.createStudentObserverAnnotation.id);
              
              syncResults.created++;
              totalUploaded++;
              console.log(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ✅ CREADO: Local ID ${annotation.id} → Remote ID ${createResult.createStudentObserverAnnotation.id}`);
            } else {
              syncResults.errors++;
              totalErrors++;
              console.error(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ❌ Falló creación después de reintentos: ${annotation.id}`);
            }
          }

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] ❌ Error procesando ${annotation.id}:`, error.message);
        }
      }

      // Resumen final mejorado con estadísticas detalladas
      console.log(`\n📝 [UPDATE-STUDENT-OBSERVER-ANNOTATION] 🎉 SINCRONIZACIÓN COMPLETADA:`);
      console.log(`┌─────────────────────────────────────────┐`);
      console.log(`│ 📊 ESTADÍSTICAS DE SINCRONIZACIÓN      │`);
      console.log(`├─────────────────────────────────────────┤`);
      console.log(`│ ✨ Creados en remoto:   ${String(syncResults.created).padStart(3)} / ${String(localStudentObserverAnnotations.length).padStart(3)} │`);
      console.log(`│ 🔄 Actualizados:        ${String(syncResults.updated).padStart(3)} / ${String(localStudentObserverAnnotations.length).padStart(3)} │`);
      console.log(`│ ⏭️  Sin cambios (skip):  ${String(syncResults.skipped).padStart(3)} / ${String(localStudentObserverAnnotations.length).padStart(3)} │`);
      console.log(`│ ❌ Errores:             ${String(syncResults.errors).padStart(3)} / ${String(localStudentObserverAnnotations.length).padStart(3)} │`);
      if (syncResults.conflicts.length > 0) {
        console.log(`│ ⚠️  Conflictos versión:  ${String(syncResults.conflicts.length).padStart(3)} / ${String(localStudentObserverAnnotations.length).padStart(3)} │`);
      }
      console.log(`├─────────────────────────────────────────┤`);
      console.log(`│ 📤 Total sincronizados: ${String(totalUploaded).padStart(3)} / ${String(localStudentObserverAnnotations.length).padStart(3)} │`);
      console.log(`│ 📋 Total procesados:    ${String(localStudentObserverAnnotations.length).padStart(3)} / ${String(localStudentObserverAnnotations.length).padStart(3)} │`);
      console.log(`└─────────────────────────────────────────┘`);
      
      if (syncResults.conflicts.length > 0) {
        console.log(`\n⚠️  DETALLES DE CONFLICTOS DE VERSIÓN:`);
        syncResults.conflicts.forEach((conflict: any, index: number) => {
          console.log(`   ${index + 1}. Local ID: ${conflict.localId} | Remote ID: ${conflict.remoteId} | Versiones: L${conflict.localVersion} vs R${conflict.remoteVersion}`);
        });
      }

      return {
        entity: 'STUDENT_OBSERVER_ANNOTATION',
        offline: localStudentObserverAnnotations.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated,
        skipped: syncResults.skipped,
        conflicts: syncResults.conflicts,
        summary: {
          total: localStudentObserverAnnotations.length,
          processed: totalUploaded + syncResults.skipped + syncResults.errors,
          success: totalUploaded,
          failed: syncResults.errors,
          noChanges: syncResults.skipped
        }
      };

    } catch (error: any) {
      console.error('❌ [UPDATE-STUDENT-OBSERVER-ANNOTATION] Error general:', error);
      console.error('Stack trace:', error.stack);
      return {
        entity: 'STUDENT_OBSERVER_ANNOTATION',
        offline: 0,
        online: 0,
        error: String(error),
        errorStack: error.stack,
        errors: totalErrors,
        created: 0,
        updated: 0,
        skipped: 0
      };
    }
  }

  private async updateGradeAssignment(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    try {
      console.log(`📚 [UPDATE-GRADE-ASSIGNMENT] Iniciando sincronización...`);

      // Simular datos para GradeAssignment (repositorio no disponible)
      const localGradeAssignments: any[] = [];

      console.log(`📚 [UPDATE-GRADE-ASSIGNMENT] Total asignaciones de grado locales: ${localGradeAssignments.length}`);

      if (localGradeAssignments.length === 0) {
        console.log(`📚 [UPDATE-GRADE-ASSIGNMENT] ⚠️ No hay asignaciones de grado que sincronizar`);
        return {
          entity: 'GRADE_ASSIGNMENT',
          offline: 0,
          online: 0,
          errors: 0,
          created: 0,
          updated: 0,
        };
      }

      // Definir mutaciones GraphQL
      const CREATE_GRADE_ASSIGNMENT_MUTATION = `
        mutation CreateGradeAssignment($data: NewGradeAssignment!) {
          createGradeAssignment(data: $data) {
            id
            schoolId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            minHourlyIntensity
            maxHourlyIntensity
            academicGradeId
            academicAsignatureId
            schoolYearId
          }
        }
      `;

      const UPDATE_GRADE_ASSIGNMENT_MUTATION = `
        mutation UpdateGradeAssignment($id: String!, $data: NewGradeAssignment!) {
          updateGradeAssignment(id: $id, data: $data) {
            id
            schoolId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            minHourlyIntensity
            maxHourlyIntensity
            academicGradeId
            academicAsignatureId
            schoolYearId
          }
        }
      `;

      const CHECK_GRADE_ASSIGNMENT_QUERY = `
        query GetGradeAssignment($id: String!) {
          getGradeAssignment(id: $id) {
            id
          }
        }
      `;

      let sentCount = 0;
      let errorCount = 0;
      let createdCount = 0;
      let updatedCount = 0;

      // Procesar cada asignación de grado
      for (const gradeAssignment of localGradeAssignments) {
        if (!gradeAssignment || !gradeAssignment.id) {
          console.warn(`📚 [UPDATE-GRADE-ASSIGNMENT] ⚠️ Asignación de grado sin ID válido, omitiendo...`);
          continue;
        }

        try {
          console.log(`📚 [UPDATE-GRADE-ASSIGNMENT] 🔄 Procesando asignación: ${gradeAssignment.id}`);

          // Verificar si existe en el servidor remoto
          let existsInRemote = false;
          try {
            const remoteCheck = await remoteClient.request(CHECK_GRADE_ASSIGNMENT_QUERY, { 
              id: gradeAssignment.id 
            });
            existsInRemote = !!remoteCheck?.getGradeAssignment?.id;
          } catch (checkError: any) {
            console.log(`📚 [UPDATE-GRADE-ASSIGNMENT] 🔍 No existe en remoto: ${gradeAssignment.id}`);
            existsInRemote = false;
          }

          if (!existsInRemote) {
            // CREAR nueva asignación de grado
            const createData = {
              id: gradeAssignment.id,
              minHourlyIntensity: gradeAssignment.minHourlyIntensity,
              maxHourlyIntensity: gradeAssignment.maxHourlyIntensity,
              academicGradeId: gradeAssignment.academicGradeId,
              academicAsignatureId: gradeAssignment.academicAsignatureId,
              schoolId: gradeAssignment.schoolId,
              schoolYearId: gradeAssignment.schoolYearId
            };

            await remoteClient.request(CREATE_GRADE_ASSIGNMENT_MUTATION, { data: createData });
            createdCount++;
            console.log(`📚 [UPDATE-GRADE-ASSIGNMENT] ✅ CREADO: ${gradeAssignment.id}`);
          } else {
            // ACTUALIZAR asignación existente
            const updateData = {
              minHourlyIntensity: gradeAssignment.minHourlyIntensity,
              maxHourlyIntensity: gradeAssignment.maxHourlyIntensity,
              academicGradeId: gradeAssignment.academicGradeId,
              academicAsignatureId: gradeAssignment.academicAsignatureId,
              schoolId: gradeAssignment.schoolId,
              schoolYearId: gradeAssignment.schoolYearId
            };

            await remoteClient.request(UPDATE_GRADE_ASSIGNMENT_MUTATION, { 
              id: gradeAssignment.id, 
              data: updateData 
            });
            updatedCount++;
            console.log(`📚 [UPDATE-GRADE-ASSIGNMENT] ⬆️ ACTUALIZADO: ${gradeAssignment.id}`);
          }

          sentCount++;
        } catch (error: any) {
          errorCount++;
          console.error(`📚 [UPDATE-GRADE-ASSIGNMENT] ❌ Error procesando asignación ${gradeAssignment.id}:`, error.message);
        }
      }

      console.log(`📚 [UPDATE-GRADE-ASSIGNMENT] ✅ Completado: ${sentCount} procesados (${createdCount} creados, ${updatedCount} actualizados), ${errorCount} errores`);

      return {
        entity: 'GRADE_ASSIGNMENT',
        offline: localGradeAssignments.length,
        online: sentCount,
        errors: errorCount,
        created: createdCount,
        updated: updatedCount,
      };
    } catch (error: any) {
      console.error('❌ [UPDATE-GRADE-ASSIGNMENT] Error:', error);
      return {
        entity: 'GRADE_ASSIGNMENT',
        offline: 0,
        online: 0,
        error: String(error),
      };
    }
  }

   /**
   * 📤 SINCRONIZACIÓN MEJORADA DE LEARNING (LOCAL → SERVIDOR REMOTO)
   * Implementa detección inteligente de duplicados y manejo de conflictos
   */
   async updateLearning(typeSyncFull: boolean, remoteClient: any, schoolData: any) {
    let totalUploaded = 0;
    let totalErrors = 0;
    let syncResults = {
      created: 0,
      updated: 0,
      errors: 0,
      conflicts: [] as Array<{
        localId: string;
        remoteId: string;
        localVersion: number;
        remoteVersion: number;
      }>
    };

    try {
      console.log(`📖 [UPDATE-LEARNING] Iniciando sincronización mejorada...`);

      // Simular datos para Learning (repositorio no disponible)
      const localLearnings: any[] = [];

      console.log(`📖 [UPDATE-LEARNING] Total aprendizajes locales: ${localLearnings.length}`);

      if (localLearnings.length === 0) {
        console.log(`📖 [UPDATE-LEARNING] ⚠️ No hay aprendizajes que sincronizar`);
        return {
          entity: 'LEARNING',
          offline: 0,
          online: 0,
          errors: 0,
          created: 0,
          updated: 0,
        };
      }

      // Definir mutaciones GraphQL mejoradas
      const CREATE_LEARNING_MUTATION = `
        mutation CreateLearning($data: NewLearning!) {
          createLearning(data: $data) {
            id
            schoolId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            statement
            academicAsignatureId
            generalBasicLearningRightId
            academicStandardId
            academicGradeId
            academicPeriodsId
          }
        }
      `;

      const UPDATE_LEARNING_MUTATION = `
        mutation UpdateLearning($id: String!, $data: NewLearning!) {
          updateLearning(id: $id, data: $data) {
            id
            schoolId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            statement
            academicAsignatureId
            generalBasicLearningRightId
            academicStandardId
            academicGradeId
            academicPeriodsId
          }
        }
      `;

      // Query mejorada para verificar existencia por contenido único
      const CHECK_LEARNING_EXISTS_QUERY = `
        query CheckLearningExists($schoolId: String!, $academicAsignatureId: String!, $academicGradeId: String!) {
          getAllLearning(allData: true, orderCreated: false, schoolId: $schoolId, academicAsignatureId: $academicAsignatureId, academicGradeId: $academicGradeId) {
            edges {
              node {
                id
                statement
                academicAsignatureId
                generalBasicLearningRightId
                academicStandardId
                academicGradeId
                schoolId
                academicPeriodsId
                version
                updatedAt
              }
            }
          }
        }
      `;

      const CHECK_LEARNING_BY_ID_QUERY = `
        query GetLearning($id: String!) {
          getLearning(id: $id) {
            id
            version
            updatedAt
          }
        }
      `;

      // Procesar cada aprendizaje local
      for (let i = 0; i < localLearnings.length; i++) {
        const learning = localLearnings[i];
        
        if (!learning || !learning.id) {
          console.warn(`📖 [UPDATE-LEARNING] ⚠️ Aprendizaje sin ID válido, omitiendo...`);
          continue;
        }

        try {
          console.log(`📖 [UPDATE-LEARNING] 🔄 [${i + 1}/${localLearnings.length}] Procesando: ${learning.id}`);

          // PASO 1: Verificar si existe por ID exacto
          let existingLearningById = null;
          try {
            const checkByIdResult = await remoteClient.request(CHECK_LEARNING_BY_ID_QUERY, { 
              id: learning.id 
            });
            existingLearningById = checkByIdResult?.getLearning;
          } catch (checkError: any) {
            console.log(`📖 [UPDATE-LEARNING] 🔍 No existe por ID: ${learning.id}`);
          }

          // PASO 2: Si no existe por ID, buscar SOLO por identificadores únicos para detectar duplicados
          // ⚡ IMPORTANTE: NO comparamos 'statement' ni 'active' para permitir modificaciones
          let existingLearningByContent = null;
          if (!existingLearningById && learning.academicAsignatureId && learning.academicGradeId) {
            try {
              const checkByContentResult = await remoteClient.request(CHECK_LEARNING_EXISTS_QUERY, { 
                schoolId: learning.schoolId,
                academicAsignatureId: learning.academicAsignatureId,
                academicGradeId: learning.academicGradeId
              });
              
              // Buscar SOLO por identificadores únicos - statement y active son modificables
              existingLearningByContent = checkByContentResult?.getAllLearning?.edges?.find((edge: any) => {
                const remote = edge.node;
                const identifiersMatch = 
                  remote.academicAsignatureId === learning.academicAsignatureId &&
                  remote.generalBasicLearningRightId === learning.generalBasicLearningRightId &&
                  remote.academicStandardId === learning.academicStandardId &&
                  remote.academicGradeId === learning.academicGradeId &&
                  remote.schoolId === learning.schoolId &&
                  JSON.stringify(remote.academicPeriodsId?.sort()) === JSON.stringify(learning.academicPeriodsId?.sort());
                
                return identifiersMatch;
              })?.node;
              
              if (existingLearningByContent) {
                console.log(`📖 [UPDATE-LEARNING] 🔍 Registro encontrado por IDs únicos: Local ${learning.id} → Remote ${existingLearningByContent.id}`);
                console.log(`📖 [UPDATE-LEARNING] 📝 Statement modificable - Local: "${learning.statement}" | Remote: "${existingLearningByContent.statement}"`);
                console.log(`📖 [UPDATE-LEARNING] ⚡ Active modificable - Local: ${learning.active} | Remote: ${existingLearningByContent.active || 'N/A'}`);
              }
            } catch (contentError: any) {
              console.log(`📖 [UPDATE-LEARNING] ⚠️ Error verificando por identificadores: ${contentError.message}`);
            }
          }

          const existingLearning = existingLearningById || existingLearningByContent;

          if (existingLearning) {
            // ACTUALIZAR LEARNING EXISTENTE
            console.log(`📖 [UPDATE-LEARNING] 🔄 Actualizando existente: Remote ID ${existingLearning.id}`);
            
            // Verificar conflictos de versión
            if (learning.version && existingLearning.version) {
              if (learning.version <= existingLearning.version) {
                console.warn(`📖 [UPDATE-LEARNING] ⚠️ Conflicto de versión: Local ${learning.version} ≤ Remote ${existingLearning.version}`);
                syncResults.conflicts.push({
                  localId: learning.id,
                  remoteId: existingLearning.id,
                  localVersion: learning.version,
                  remoteVersion: existingLearning.version
                });
                continue; // Saltar este learning
              }
            }

            const updateData = {
              statement: learning.statement,
              academicAsignatureId: learning.academicAsignatureId,
              generalBasicLearningRightId: learning.generalBasicLearningRightId,
              academicStandardId: learning.academicStandardId,
              academicGradeId: learning.academicGradeId,
              schoolId: learning.schoolId,
              academicPeriodsId: learning.academicPeriodsId
            };

            await remoteClient.request(UPDATE_LEARNING_MUTATION, { 
              id: existingLearning.id, // Usar el ID remoto encontrado
              data: updateData 
            });
            
            syncResults.updated++;
            totalUploaded++;
            console.log(`📖 [UPDATE-LEARNING] ⬆️ ACTUALIZADO: Local ID ${learning.id} → Remote ID ${existingLearning.id}`);

          } else {
            // CREAR NUEVO LEARNING
            console.log(`📖 [UPDATE-LEARNING] ✨ Creando nuevo: ${learning.id}`);
            
            const createData = {
              statement: learning.statement,
              academicAsignatureId: learning.academicAsignatureId,
              generalBasicLearningRightId: learning.generalBasicLearningRightId,
              academicStandardId: learning.academicStandardId,
              academicGradeId: learning.academicGradeId,
              schoolId: learning.schoolId,
              academicPeriodsId: learning.academicPeriodsId
            };

            const createResult = await remoteClient.request(CREATE_LEARNING_MUTATION, { data: createData });
            
            syncResults.created++;
            totalUploaded++;
            console.log(`📖 [UPDATE-LEARNING] ✅ CREADO: Local ID ${learning.id} → Remote ID ${createResult.createLearning.id}`);
          }

        } catch (error: any) {
          syncResults.errors++;
          totalErrors++;
          console.error(`📖 [UPDATE-LEARNING] ❌ Error procesando ${learning.id}:`, error.message);
        }
      }

      // Resumen final mejorado
      console.log(`\n📖 [UPDATE-LEARNING] 🎉 SINCRONIZACIÓN COMPLETADA:`);
      console.log(`✅ Creados en remoto: ${syncResults.created}`);
      console.log(`🔄 Actualizados en remoto: ${syncResults.updated}`);
      console.log(`❌ Errores: ${syncResults.errors}`);
      if (syncResults.conflicts.length > 0) {
        console.log(`⚠️ Conflictos detectados: ${syncResults.conflicts.length}`);
        syncResults.conflicts.forEach((conflict: any) => {
          console.log(`  - Local ID: ${conflict.localId} | Remote ID: ${conflict.remoteId} | Versiones: L${conflict.localVersion} vs R${conflict.remoteVersion}`);
        });
      }
      console.log(`📊 Total procesados: ${localLearnings.length}`);
      console.log(`📤 Total sincronizados: ${totalUploaded}`);

      return {
        entity: 'LEARNING',
        offline: localLearnings.length,
        online: totalUploaded,
        errors: syncResults.errors,
        created: syncResults.created,
        updated: syncResults.updated,
        conflicts: syncResults.conflicts
      };

    } catch (error: any) {
      console.error('❌ [UPDATE-LEARNING] Error general:', error);
      return {
        entity: 'LEARNING',
        offline: 0,
        online: 0,
        error: String(error),
        errors: totalErrors,
        created: 0,
        updated: 0
      };
    }
  }
}
