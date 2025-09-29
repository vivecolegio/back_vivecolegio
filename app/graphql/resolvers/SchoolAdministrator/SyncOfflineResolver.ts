import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { GraphQLClient } from 'graphql-request';
import {
  AcademicAreaCoursePeriodValuationRepository,
  AcademicAreaCourseYearValuationRepository,
  AcademicAreaRepository,
  AcademicAsignatureCoursePeriodEvidenceLearningValuationRepository,
  AcademicAsignatureCoursePeriodValuationRepository,
  AcademicAsignatureCourseRepository,
  AcademicAsignatureCourseYearValuationRepository,
  AcademicAsignatureRepository,
  AcademicDayRepository,
  AcademicGradeRepository,
  AcademicHourRepository,
  AcademicPeriodRepository,
  AcademicStandardRepository,
  AverageAcademicPeriodStudentRepository,

  AverageAcademicYearCourseRepository,
  AverageAcademicYearStudentRepository,
  CampusAdministratorRepository,
  CampusCoordinatorRepository,
  CampusRepository,
  ClassroomPlanRepository,
  CourseRepository,
  EducationLevelRepository,
  EvaluativeComponentRepository,
  EvidenceLearningRepository,
  ExperienceLearningAverageValuationRepository,
  ExperienceLearningCoEvaluationRepository,
  ExperienceLearningCoEvaluationValuationRepository,
  ExperienceLearningRepository,
  ExperienceLearningRubricCriteriaRepository,
  ExperienceLearningRubricCriteriaValuationRepository,
  ExperienceLearningRubricValuationRepository,
  ExperienceLearningSelfAssessmentValuationRepository,
  ExperienceLearningTraditionalValuationRepository,
  ForumInteractionRepository,
  ForumQuestionRepository,
  ForumRepository,
  GradeAssignmentRepository,
  InboxRepository,
  LearningRepository,
  ModalityRepository,
  NotificationRepository,
  PerformanceLevelRepository,
  QuestionBankTestOnlineRepository,
  QuestionCategoryTestOnlineRepository,
  QuestionTestOnlineRepository,
  SchoolAdministrativeRepository,
  SchoolAdministratorRepository,
  SchoolConfigurationRepository,
  SchoolRepository,
  SchoolYearRepository,
  SpecialtyRepository,
  StudentAttendanceRepository,
  StudentBehaviourRepository,
  StudentObserverAnnotationRepository,
  StudentRepository,
  StudentYearBehaviourRepository,
  SyncOfflineRepository,
  TeacherRepository,
  UserRepository,
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewSyncOffline } from '../../inputs/SchoolAdministrator/NewSyncOffline';
import { IContext } from '../../interfaces/IContext';
import { AcademicAreaCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAreaCoursePeriodValuation';
import { AcademicAreaCourseYearValuation } from '../../models/CampusAdministrator/AcademicAreaCourseYearValuation';
import { AcademicAsignatureCourse } from '../../models/CampusAdministrator/AcademicAsignatureCourse';
import { AcademicAsignatureCoursePeriodEvidenceLearningValuation } from '../../models/CampusAdministrator/AcademicAsignatureCoursePeriodEvidenceLearningValuation';
import { AcademicAsignatureCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAsignatureCoursePeriodValuation';
import { AcademicAsignatureCourseYearValuation } from '../../models/CampusAdministrator/AcademicAsignatureCourseYearValuation';
import { AcademicDay } from '../../models/CampusAdministrator/AcademicDay';
import { AcademicHour } from '../../models/CampusAdministrator/AcademicHour';
import { AverageAcademicPeriodStudent } from '../../models/CampusAdministrator/AverageAcademicPeriodStudent';
import { AverageAcademicYearCourse } from '../../models/CampusAdministrator/AverageAcademicYearCourse';
import { AverageAcademicYearStudent } from '../../models/CampusAdministrator/AverageAcademicYearStudent';
import { ClassroomPlan } from '../../models/CampusAdministrator/ClassroomPlan';
import { Course } from '../../models/CampusAdministrator/Course';
import { ExperienceLearning } from '../../models/CampusAdministrator/ExperienceLearning';
import { ExperienceLearningAverageValuation } from '../../models/CampusAdministrator/ExperienceLearningAverageValuation';
import { ExperienceLearningCoEvaluation } from '../../models/CampusAdministrator/ExperienceLearningCoEvaluation';
import { ExperienceLearningCoEvaluationValuation } from '../../models/CampusAdministrator/ExperienceLearningCoEvaluationValuation';
import { ExperienceLearningRubricCriteria } from '../../models/CampusAdministrator/ExperienceLearningRubricCriteria';
import { ExperienceLearningRubricCriteriaValuation } from '../../models/CampusAdministrator/ExperienceLearningRubricCriteriaValuation';
import { ExperienceLearningRubricValuation } from '../../models/CampusAdministrator/ExperienceLearningRubricValuation';
import { ExperienceLearningSelfAssessmentValuation } from '../../models/CampusAdministrator/ExperienceLearningSelfAssessmentValuation';
import { ExperienceLearningTraditionalValuation } from '../../models/CampusAdministrator/ExperienceLearningTraditionalValuation';
import { Forum } from '../../models/CampusAdministrator/Forum';
import { ForumInteraction } from '../../models/CampusAdministrator/ForumInteraction';
import { ForumQuestion } from '../../models/CampusAdministrator/ForumQuestion';
import { QuestionBankTestOnline } from '../../models/CampusAdministrator/QuestionBankTestOnline';
import { QuestionCategoryTestOnline } from '../../models/CampusAdministrator/QuestionCategoryTestOnline';
import { QuestionTestOnline } from '../../models/CampusAdministrator/QuestionTestOnline';
import { StudentAttendance } from '../../models/CampusAdministrator/StudentAttendance';
import { StudentBehaviour } from '../../models/CampusAdministrator/StudentBehaviour';
import { StudentObserverAnnotation } from '../../models/CampusAdministrator/StudentObserverAnnotation';
import { StudentYearBehaviour } from '../../models/CampusAdministrator/StudentYearBehaviour';
import { Teacher } from '../../models/CampusAdministrator/Teacher';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { Inbox } from '../../models/GeneralAdministrator/Inbox';
import { Notification } from '../../models/GeneralAdministrator/Notification';
import { School } from '../../models/GeneralAdministrator/School';
import { SchoolAdministrative } from '../../models/GeneralAdministrator/SchoolAdministrative';
import { SchoolAdministrator } from '../../models/GeneralAdministrator/SchoolAdministrator';
import { Student } from '../../models/GeneralAdministrator/Student';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicArea } from '../../models/SchoolAdministrator/AcademicArea';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../../models/SchoolAdministrator/AcademicGrade';
import { AcademicPeriod } from '../../models/SchoolAdministrator/AcademicPeriod';
import { AcademicStandard } from '../../models/SchoolAdministrator/AcademicStandard';
import { CampusAdministrator } from '../../models/SchoolAdministrator/CampusAdministrator';
import { CampusCoordinator } from '../../models/SchoolAdministrator/CampusCoordinator';
import { EducationLevel } from '../../models/SchoolAdministrator/EducationLevel';
import { EvaluativeComponent } from '../../models/SchoolAdministrator/EvaluativeComponent';
import { EvidenceLearning } from '../../models/SchoolAdministrator/EvidenceLearning';
import { GradeAssignment } from '../../models/SchoolAdministrator/GradeAssignment';
import { Learning } from '../../models/SchoolAdministrator/Learning';
import { Modality } from '../../models/SchoolAdministrator/Modality';
import { SyncOfflineDescription } from '../../models/SchoolAdministrator/objectType/SyncOfflineDescription';
import { PerformanceLevel } from '../../models/SchoolAdministrator/PerformanceLevel';
import { SchoolConfiguration } from '../../models/SchoolAdministrator/SchoolConfiguration';
import { SchoolYear } from '../../models/SchoolAdministrator/SchoolYear';
import { Specialty } from '../../models/SchoolAdministrator/Specialty';
import { SyncOffline, SyncOfflineConnection } from '../../models/SchoolAdministrator/SyncOffline';
import { ConnectionArgs } from '../../pagination/relaySpecs';
import {
  QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_PERIOD_VALUATION,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_YEAR_VALUATION,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE_COURSE,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_GRADE,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_PERIOD,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_STANDARD,
  QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_PERIOD_STUDENT,
  QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_YEAR_COURSE,
  QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_YEAR_STUDENT,
  QUERT_GET_TOTAL_COUNT_CAMPUS,
  QUERT_GET_TOTAL_COUNT_CLASSROOM_PLAN,
  QUERT_GET_TOTAL_COUNT_COURSE,
  QUERT_GET_TOTAL_COUNT_EDUCATION_LEVEL,
  //QUERY_GET_ALL_EVALUATIVE_COMPONENT,
  QUERT_GET_TOTAL_COUNT_EVALUATIVE_COMPONENT,
  QUERT_GET_TOTAL_COUNT_EVIDENCE_LEARNING,
  QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING,
  QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_AVERAGE_VALUATION,
  QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_CO_EVALUATION,
  QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION,
  QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_RUBRIC_CRITERIA,
  QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION,
  QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_RUBRIC_VALUATION,
  QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION,
  QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_TRADITIONAL_VALUATION,
  QUERT_GET_TOTAL_COUNT_FORUM,
  QUERT_GET_TOTAL_COUNT_FORUM_INTERACTION,
  QUERT_GET_TOTAL_COUNT_FORUM_QUESTION,
  QUERT_GET_TOTAL_COUNT_GRADE_ASSIGNMENT,
  QUERT_GET_TOTAL_COUNT_LEARNING,
  QUERT_GET_TOTAL_COUNT_MODALITY,
  QUERT_GET_TOTAL_COUNT_PERFORMANCE_LEVEL,
  QUERT_GET_TOTAL_COUNT_QUESTION_BANK_TEST_ONLINE,
  QUERT_GET_TOTAL_COUNT_QUESTION_CATEGORY_TEST_ONLINE,
  QUERT_GET_TOTAL_COUNT_QUESTION_TEST_ONLINE,
  QUERT_GET_TOTAL_COUNT_SPECIALITY,
  QUERT_GET_TOTAL_COUNT_STUDENT,
  QUERT_GET_TOTAL_COUNT_STUDENT_BEHAVIOUR,
  QUERT_GET_TOTAL_COUNT_STUDENT_OBSERVER_ANNOTATION,
  QUERT_GET_TOTAL_COUNT_STUDENT_YEAR_BEHAVIOUR,
  QUERT_GET_TOTAL_COUNT_TEACHER,
  QUERY_GET_ACADEMIC_DAY,
  QUERY_GET_ALL_ACADEMIC_AREA,
  QUERY_GET_ALL_ACADEMIC_AREA_COURSE_PERIOD_VALUATION,
  QUERY_GET_ALL_ACADEMIC_AREA_COURSE_YEAR_VALUATION,
  QUERY_GET_ALL_ACADEMIC_ASIGNATURE,
  QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE,
  QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION,
  QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION_OPTIONAL_STUDENT,
  QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION,
  QUERY_GET_ALL_ACADEMIC_DAY_FOR_SYNC,
  QUERY_GET_ALL_ACADEMIC_GRADE,
  QUERY_GET_ALL_ACADEMIC_PERIOD,
  QUERY_GET_ALL_ACADEMIC_STANDARD,
  QUERY_GET_ALL_AVERAGE_ACADEMIC_PERIOD_STUDENT,
  QUERY_GET_ALL_AVERAGE_ACADEMIC_YEAR_COURSE,
  QUERY_GET_ALL_AVERAGE_ACADEMIC_YEAR_STUDENT,
  QUERY_GET_ALL_CAMPUS,
  QUERY_GET_ALL_CAMPUS_ADMINISTRATOR,
  QUERY_GET_ALL_CAMPUS_COORDINATOR,
  QUERY_GET_ALL_CLASSROOM_PLAN,
  QUERY_GET_ALL_COURSE,
  QUERY_GET_ALL_EDUCATION_LEVEL,
  QUERY_GET_ALL_EVALUATIVE_COMPONENT_SYNC_OFFLINE,
  QUERY_GET_ALL_EVIDENCE_LEARNING,
  QUERY_GET_ALL_EXPERIENCE_LEARNING,
  QUERY_GET_ALL_EXPERIENCE_LEARNING_AVERAGE_VALUATION,
  QUERY_GET_ALL_EXPERIENCE_LEARNING_CO_EVALUATION,
  QUERY_GET_ALL_EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION,
  QUERY_GET_ALL_EXPERIENCE_LEARNING_RUBRIC_CRITERIA,
  QUERY_GET_ALL_EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION,
  QUERY_GET_ALL_EXPERIENCE_LEARNING_RUBRIC_VALUATION,
  QUERY_GET_ALL_EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION,
  QUERY_GET_ALL_EXPERIENCE_LEARNING_TRADITIONAL_VALUATION,
  QUERY_GET_ALL_FORUM,
  QUERY_GET_ALL_FORUM_INTERACTION,
  QUERY_GET_ALL_FORUM_QUESTION,
  QUERY_GET_ALL_GRADE_ASSIGNMENT,
  QUERY_GET_ALL_INBOX_FOR_SYNC,
  QUERY_GET_ALL_LEARNING,
  QUERY_GET_ALL_MODALITY,
  QUERY_GET_ALL_NOTIFICATION_FOR_SYNC,
  QUERY_GET_ALL_PERFORMANCE_LEVEL,
  QUERY_GET_ALL_QUESTION_BANK_TEST_ONLINE,
  QUERY_GET_ALL_QUESTION_CATEGORY_TEST_ONLINE,
  QUERY_GET_ALL_QUESTION_TEST_ONLINE,
  QUERY_GET_ALL_SCHOOL_ADMINISTRATIVE,
  QUERY_GET_ALL_SCHOOL_ADMINISTRATOR,
  QUERY_GET_ALL_SCHOOL_CONFIGURATION,
  QUERY_GET_ALL_SPECIALTY,
  QUERY_GET_ALL_STUDENT,
  QUERY_GET_ALL_STUDENT_ATTENDANCE,
  QUERY_GET_ALL_STUDENT_BEHAVIOUR,
  QUERY_GET_ALL_STUDENT_OBSERVER_ANNOTATION,
  QUERY_GET_ALL_STUDENT_YEAR_BEHAVIOUR,
  QUERY_GET_ALL_TEACHER,
  QUERY_GET_CAMPUS,
  QUERY_GET_MODALITY,
  QUERY_GET_SPECIALTY,
  QUERY_GET_STUDENT,
  QUERY_GET_TEACHER,
  QUERY_GET_ALL_ACADEMIC_DAY,
  QUERY_GET_TOTAL_COUNT_ACADEMIC_DAY,
  QUERY_GET_TOTAL_COUNT_CAMPUS_ADMINISTRATOR,
  QUERY_GET_TOTAL_COUNT_CAMPUS_COORDINATOR,
  QUERY_GET_TOTAL_COUNT_INBOX,
  QUERY_GET_TOTAL_COUNT_NOTIFICATION,
  QUERY_GET_TOTAL_COUNT_SCHOOL_ADMINISTRATIVE,
  QUERY_GET_TOTAL_COUNT_SCHOOL_ADMINISTRATOR,
  QUERY_GET_ALL_ACADEMIC_HOUR,
  QUERT_GET_TOTAL_COUNT_ACADEMIC_HOUR,
} from '../../queries/queries';
import { SpecialtyResolver } from './SpecialtyResolver';

@Resolver(SyncOffline)
export class SyncOfflineResolver {
  @InjectRepository(SyncOffline)
  private repository = SyncOfflineRepository;

  // Helper para mostrar barra de progreso
  private showProgressBar(current: number, total: number, entityName: string, count?: number): void {
    const percentage = Math.round((current / total) * 100);
    const barLength = 30;
    const filledLength = Math.round((barLength * current) / total);
    const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);

    const countText = count !== undefined ? ` (${count} registros)` : '';
    process.stdout.write(`\r🔄 [${percentage.toString().padStart(3)}%] [${bar}] ${entityName}${countText}`);

    if (current === total) {
      console.log(); // Nueva línea al completar
    }
  }

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

  @InjectRepository(StudentYearBehaviour)
  private repositoryStudentYearBehaviour = StudentYearBehaviourRepository;

  @InjectRepository(StudentBehaviour)
  private repositoryStudentBehaviour = StudentBehaviourRepository;

  @InjectRepository(StudentObserverAnnotation)
  private repositoryStudentObserverAnnotation = StudentObserverAnnotationRepository;

  @InjectRepository(EducationLevel)
  private repositoryEducationLevel = EducationLevelRepository;

  @InjectRepository(Course)
  private repositoryCourse = CourseRepository;

  @InjectRepository(GradeAssignment)
  private repositoryGradeAssignment = GradeAssignmentRepository;

  @InjectRepository(AcademicAreaCoursePeriodValuation)
  private repositoryAcademicAreaCoursePeriodValuation = AcademicAreaCoursePeriodValuationRepository;

  @InjectRepository(AcademicAreaCourseYearValuation)
  private repositoryAcademicAreaCourseYearValuation = AcademicAreaCourseYearValuationRepository;

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

  @InjectRepository(Notification)
  private repositoryNotification = NotificationRepository;

  @InjectRepository(Inbox)
  private repositoryInbox = InboxRepository;

  @InjectRepository(AcademicDay)
  private repositoryAcademicDay = AcademicDayRepository;

  @InjectRepository(AcademicHour)
  private repositoryAcademicHour = AcademicHourRepository;

  @InjectRepository(AcademicStandard)
  private repositoryAcademicStandard = AcademicStandardRepository;

  @InjectRepository(QuestionBankTestOnline)
  private repositoryQuestionBankTestOnline = QuestionBankTestOnlineRepository;

  @InjectRepository(Learning)
  private repositoryLearning = LearningRepository;

  @InjectRepository(AcademicAsignatureCoursePeriodValuation)
  private repositoryAcademicAsignatureCoursePeriodValuation = AcademicAsignatureCoursePeriodValuationRepository;

  @InjectRepository(AcademicAsignatureCourseYearValuation)
  private repositoryAcademicAsignatureCourseYearValuation = AcademicAsignatureCourseYearValuationRepository;

  @InjectRepository(EvidenceLearning)
  private repositoryEvidenceLearning = EvidenceLearningRepository;

  @InjectRepository(StudentAttendance)
  private repositoryStudentAttendance = StudentAttendanceRepository;

  @InjectRepository(CampusAdministrator)
  private repositoryCampusAdministrator = CampusAdministratorRepository;

  @InjectRepository(CampusCoordinator)
  private repositoryCampusCoordinator = CampusCoordinatorRepository;

  @InjectRepository(SchoolAdministrator)
  private repositorySchoolAdministrator = SchoolAdministratorRepository;

  @InjectRepository(SchoolAdministrative)
  private repositorySchoolAdministrative = SchoolAdministrativeRepository;

  @InjectRepository(Specialty)
  private specialityResolver = new SpecialtyResolver();

  @InjectRepository(AverageAcademicPeriodStudent)
  private repositoryAverageAcademicPeriodStudent = AverageAcademicPeriodStudentRepository;

  @InjectRepository(AverageAcademicYearCourse)
  private repositoryAverageAcademicYearCourse = AverageAcademicYearCourseRepository;

  @InjectRepository(AverageAcademicYearStudent)
  private repositoryAverageAcademicYearStudent = AverageAcademicYearStudentRepository;

  @InjectRepository(Forum)
  private repositoryForum = ForumRepository;

  @InjectRepository(QuestionCategoryTestOnline)
  private repositoryQuestionCategoryTestOnline = QuestionCategoryTestOnlineRepository;

  @InjectRepository(ClassroomPlan)
  private repositoryClassroomPlan = ClassroomPlanRepository;

  @InjectRepository(ForumQuestion)
  private repositoryForumQuestion = ForumQuestionRepository;

  @InjectRepository(QuestionTestOnline)
  private repositoryQuestionTestOnline = QuestionTestOnlineRepository;

  @InjectRepository(AcademicAsignatureCoursePeriodEvidenceLearningValuation)
  private repositoryAcademicAsignatureCoursePeriodEvidenceLearningValuation = AcademicAsignatureCoursePeriodEvidenceLearningValuationRepository;

  @InjectRepository(ExperienceLearning)
  private repositoryExperienceLearning = ExperienceLearningRepository;

  @InjectRepository(ExperienceLearningAverageValuation)
  private repositoryExperienceLearningAverageValuation = ExperienceLearningAverageValuationRepository;

  @InjectRepository(ForumInteraction)
  private repositoryForumInteraction = ForumInteractionRepository;

  @InjectRepository(ExperienceLearningCoEvaluation)
  private repositoryExperienceLearningCoEvaluation = ExperienceLearningCoEvaluationRepository;

  @InjectRepository(ExperienceLearningCoEvaluationValuation)
  private repositoryExperienceLearningCoEvaluationValuation = ExperienceLearningCoEvaluationValuationRepository;

  @InjectRepository(ExperienceLearningRubricCriteria)
  private repositoryExperienceLearningRubricCriteria = ExperienceLearningRubricCriteriaRepository;

  @InjectRepository(ExperienceLearningRubricValuation)
  private repositoryExperienceLearningRubricValuation = ExperienceLearningRubricValuationRepository;

  @InjectRepository(ExperienceLearningSelfAssessmentValuation)
  private repositoryExperienceLearningSelfAssessmentValuation = ExperienceLearningSelfAssessmentValuationRepository;

  @InjectRepository(ExperienceLearningTraditionalValuation)
  private repositoryExperienceLearningTraditionalValuation = ExperienceLearningTraditionalValuationRepository;

  @InjectRepository(ExperienceLearningRubricCriteriaValuation)
  private repositoryExperienceLearningRubricCriteriaValuation = ExperienceLearningRubricCriteriaValuationRepository;

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
      data?.campusId + '',
      data?.academicPeriodId + '',
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
      data?.campusId + '',
      data?.academicPeriodId + '',
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
    @Arg('campusId', () => String) campusId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('syncOfflineDescriptions', () => [SyncOfflineDescription])
    syncOfflineDescriptions: SyncOfflineDescription[],
    @Ctx() context: IContext,
    typeSyncFull: boolean = false,
  ) {
    const client = new GraphQLClient('http://vivecolegios.nortedesantander.gov.co:4000/graphql', {
      jsonSerializer: {
        parse: JSON.parse,
        stringify: JSON.stringify,
      },
    });

    const schoolData = {
      schoolId: schoolId,
      schoolYearId: schoolYearId,
      campusId: campusId,
      academicPeriodId: academicPeriodId,
    };

    console.log('Comenzando sincronización de datos...', schoolData);

    // Lista de entidades a sincronizar
        const syncTasks = [
      /* { name: 'CAMPUS', displayName: 'Campus', fn: () => this.syncCampus(typeSyncFull, client, schoolData) }, */
      { name: 'INBOX', displayName: 'Bandeja Entrada', fn: () => this.syncInbox(typeSyncFull, client, schoolData, context) },
      { name: 'NOTIFICATIONS', displayName: 'Notificaciones', fn: () => this.syncNotifications(typeSyncFull, client, schoolData, context) },
      { name: 'MODALITY', displayName: 'Modalidades', fn: () => this.syncModality(typeSyncFull, client, schoolData) },
      { name: 'SPECIALTY', displayName: 'Especialidades', fn: () => this.syncSpecialty(typeSyncFull, client, schoolData) },
      { name: 'EDUCATION_LEVEL', displayName: 'Niveles Educativos', fn: () => this.syncEducationLevel(typeSyncFull, client, schoolData) },
      { name: 'ACADEMIC_DAY', displayName: 'Días Académicos', fn: () => this.syncAcademicDay(typeSyncFull, client, schoolData, context) },
      { name: 'ACADEMIC_GRADE', displayName: 'Grados Académicos', fn: () => this.syncAcademicGrade(typeSyncFull, client, schoolData) },
      { name: 'COURSE', displayName: 'Cursos', fn: () => this.syncCourse(typeSyncFull, client, schoolData) },
      { name: 'SCHOOL_CONFIGURATION', displayName: 'Configuraciones', fn: () => this.syncSchoolConfiguration(typeSyncFull, client, schoolData) },
      { name: 'SCHOOL_ADMINISTRATOR', displayName: 'Admin. Colegio', fn: () => this.syncSchoolAdministrator(typeSyncFull, client, schoolData) },
      { name: 'SCHOOL_ADMINISTRATIVE', displayName: 'Admin. Escolar', fn: () => this.syncSchoolAdministrative(typeSyncFull, client, schoolData) },
      { name: 'CAMPUS_ADMINISTRATOR', displayName: 'Admin. Campus', fn: () => this.syncCampusAdministrator(typeSyncFull, client, schoolData) },
      { name: 'CAMPUS_COORDINATOR', displayName: 'Coord. Campus', fn: () => this.syncCampusCoordinator(typeSyncFull, client, schoolData) },
      { name: 'PERFORMANCE_LEVEL', displayName: 'Niveles de Desempeño', fn: () => this.syncPerformanceLevel(typeSyncFull, client, schoolData) },
      { name: 'ACADEMIC_HOUR', displayName: 'Horas Académicos', fn: () => this.syncAcademicHourMainSync(typeSyncFull, client, schoolData) },
      { name: 'ACADEMIC_AREA', displayName: 'Áreas Académicas', fn: () => this.syncAcademicArea(typeSyncFull, client, schoolData) },
      { name: 'ACADEMIC_PERIOD', displayName: 'Períodos Académicos', fn: () => this.syncAcademicPeriod(typeSyncFull, client, schoolData) },
      { name: 'STUDENT', displayName: 'Estudiantes', fn: () => this.syncStudent(typeSyncFull, client, schoolData) },
      { name: 'ACADEMIC_ASIGNATURE', displayName: 'Asignaturas', fn: () => this.syncAcademicAsignature(typeSyncFull, client, schoolData) },
      // { name: 'AVERAGE_ACADEMIC_PERIOD_STUDENT', displayName: 'Promedios Académicos', fn: () => this.syncAverageAcademicPeriodStudent(typeSyncFull, client, schoolData) },
      // { name: 'AVERAGE_ACADEMIC_YEAR_STUDENT', displayName: 'Promedios Anuales por Estudiante', fn: () => this.syncAverageAcademicYearStudent(typeSyncFull, client, schoolData) },
      // { name: 'AVERAGE_ACADEMIC_YEAR_COURSE', displayName: 'Promedios Anuales por Curso', fn: () => this.syncAverageAcademicYearCourse(typeSyncFull, client, schoolData) },
      // { name: 'STUDENT_OBSERVER_ANNOTATION', displayName: 'Anotaciones del Observador', fn: () => this.syncStudentObserverAnnotation(typeSyncFull, client, schoolData) },
      // { name: 'STUDENT_BEHAVIOUR', displayName: 'Comportamientos por Período', fn: () => this.syncStudentBehaviour(typeSyncFull, client, schoolData) },
      // { name: 'STUDENT_YEAR_BEHAVIOUR', displayName: 'Comportamientos Anuales', fn: () => this.syncStudentYearBehaviour(typeSyncFull, client, schoolData) },
      // { name: 'GRADE_ASSIGNMENT', displayName: 'Asignación de Grados', fn: () => this.syncGradeAssignment(typeSyncFull, client, schoolData) },
      { name: 'TEACHER', displayName: 'Profesores', fn: () => this.syncTeacher(typeSyncFull, client, schoolData) },
      // { name: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION', displayName: 'Valoraciones por Área y Período', fn: () => this.syncAcademicAreaCoursePeriodValuation(typeSyncFull, client, schoolData) },
      // { name: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION', displayName: 'Valoraciones por Área y Año', fn: () => this.syncAcademicAreaCourseYearValuation(typeSyncFull, client, schoolData) },
      { name: 'ACADEMIC_ASIGNATURE_COURSE', displayName: 'Asig. por Curso', fn: () => this.syncAcademicAsignatureCourse(typeSyncFull, client, schoolData) },
      { name: 'ACADEMIC_STANDARD', displayName: 'Estándares Académicos', fn: () => this.syncAcademicStandard(typeSyncFull, client, schoolData) },
      /* { name: 'QUESTION_BANK_TEST_ONLINE', displayName: 'Bancos de Preguntas Online', fn: () => this.syncQuestionBankTestOnline(typeSyncFull, client, schoolData) }, */
      { name: 'STUDENT_ATTENDANCE', displayName: 'Asistencias de Estudiantes', fn: () => this.syncStudentAttendance(typeSyncFull, client, schoolData) },
      { name: 'FORUM', displayName: 'Foros', fn: () => this.syncForum(typeSyncFull, client, schoolData) },
      { name: 'QUESTION_CATEGORY_TEST_ONLINE', displayName: 'Categorías de Preguntas Online', fn: () => this.syncQuestionCategoryTestOnline(typeSyncFull, client, schoolData) },
      // { name: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION', displayName: 'Valoraciones por Asignatura y Período', fn: () => this.syncAcademicAsignatureCoursePeriodValuation(typeSyncFull, client, schoolData) },
      // { name: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION', displayName: 'Valoraciones por Asignatura y Año', fn: () => this.syncAcademicAsignatureCourseYearValuation(typeSyncFull, client, schoolData) },
      { name: 'LEARNING', displayName: 'Aprendizajes', fn: () => this.syncLearning(typeSyncFull, client, schoolData) },
      { name: 'EVALUATIVE_COMPONENT', displayName: 'Componentes Evaluativos', fn: () => this.syncEvaluativeComponent(typeSyncFull, client, schoolData) },
      { name: 'CLASSROOM_PLAN', displayName: 'Planes de Aula', fn: () => this.syncClassroomPlan(typeSyncFull, client, schoolData) },
      /* { name: 'FORUM_QUESTION', displayName: 'Preguntas de Foros', fn: () => this.syncForumQuestion(typeSyncFull, client, schoolData) }, */
      // { name: 'QUESTION_TEST_ONLINE', displayName: 'Preguntas Online', fn: () => this.syncQuestionTestOnline(typeSyncFull, client, schoolData) },
      // { name: 'EVIDENCE_LEARNING', displayName: 'Evidencias de Aprendizaje', fn: () => this.syncEvidenceLearning(typeSyncFull, client, schoolData) },
      // { name: 'FORUM_INTERACTION', displayName: 'Interacciones en Foros', fn: () => this.syncForumInteraction(typeSyncFull, client, schoolData) },
      // { name: 'EXPERIENCE_LEARNING', displayName: 'Experiencias de Aprendizaje', fn: () => this.syncExperienceLearning(typeSyncFull, client, schoolData) },
      /* { name: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION', displayName: 'Valoraciones de Evidencias por Asignatura y Período', fn: () => this.syncAcademicAsignatureCoursePeriodEvidenceLearningValuation(typeSyncFull, client, schoolData) }, */
      // { name: 'EXPERIENCE_LEARNING_AVERAGE_VALUATION', displayName: 'Valoraciones Promedio de Experiencias de Aprendizaje', fn: () => this.syncExperienceLearningAverageValuation(typeSyncFull, client, schoolData) },
      // { name: 'EXPERIENCE_LEARNING_CO_EVALUATION', displayName: 'Co-evaluaciones de Experiencias de Aprendizaje', fn: () => this.syncExperienceLearningCoEvaluation(typeSyncFull, client, schoolData) },
      // { name: 'EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION', displayName: 'Valoraciones de Co-evaluación de Experiencias de Aprendizaje', fn: () => this.syncExperienceLearningCoEvaluationValuation(typeSyncFull, client, schoolData) },
      // { name: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA', displayName: 'Criterios de Rúbrica de Experiencias de Aprendizaje', fn: () => this.syncExperienceLearningRubricCriteria(typeSyncFull, client, schoolData) },
      // { name: 'EXPERIENCE_LEARNING_RUBRIC_VALUATION', displayName: 'Valoraciones de Rúbrica de Experiencias de Aprendizaje', fn: () => this.syncExperienceLearningRubricValuation(typeSyncFull, client, schoolData) },
      // { name: 'EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION', displayName: 'Autoevaluaciones de Experiencias de Aprendizaje', fn: () => this.syncExperienceLearningSelfAssessmentValuation(typeSyncFull, client, schoolData) },
      // { name: 'EXPERIENCE_LEARNING_TRADITIONAL_VALUATION', displayName: 'Valoraciones Tradicionales de Experiencias de Aprendizaje', fn: () => this.syncExperienceLearningTraditionalValuation(typeSyncFull, client, schoolData) },
      // { name: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION', displayName: 'Valoraciones de Criterios de Rúbrica de Experiencias de Aprendizaje', fn: () => this.syncExperienceLearningRubricCriteriaValuation(typeSyncFull, client, schoolData) },
    ];

    let current = 0;
    const total = syncTasks.length + 1; // +1 para AcademicDay

    let syncedAcademicAsignatureCourseIds: string[] = []; // 🎯 GUARDAR IDs ENTRE MÓDULOS

    for (const task of syncTasks) {
      current++;
      this.showProgressBar(current, total, task.displayName);

      let result: any;

      // 🎯 LÓGICA ESPECIAL PARA MÓDULOS SECUENCIALES
      if (task.name === 'ACADEMIC_ASIGNATURE_COURSE') {
        // ✅ EJECUTAR PRIMER MÓDULO Y GUARDAR IDs
        result = await this.syncAcademicAsignatureCourse(typeSyncFull, client, schoolData);
        if (typeSyncFull && result.syncedIds && Array.isArray(result.syncedIds)) {
          syncedAcademicAsignatureCourseIds = result.syncedIds;
          console.log(`🔗 [SYNC-ORCHESTRATOR] Guardados ${syncedAcademicAsignatureCourseIds.length} IDs para próximo módulo`);
        }
      } else if (task.name === 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION') {
        // ✅ EJECUTAR SEGUNDO MÓDULO CON IDs DEL ANTERIOR
        result = await this.syncAcademicAsignatureCoursePeriodValuation(typeSyncFull, client, schoolData, syncedAcademicAsignatureCourseIds);
        console.log(`🔗 [SYNC-ORCHESTRATOR] Usando ${syncedAcademicAsignatureCourseIds.length} IDs del módulo anterior`);
      } else {
        // 🔄 EJECUTAR MÉTODOS NORMALES
        result = await task.fn();
      }

      syncOfflineDescriptions.push({ ...result });
      this.showProgressBar(current, total, task.displayName, result.online);
    }

    // Sincronización especial de AcademicDay
    /* current++;
    this.showProgressBar(current, total, 'Jornadas Académicas');
    const academicDayResult = await this.syncAcademicDay(typeSyncFull, client, schoolData, context);
    syncOfflineDescriptions.push({
      entity: academicDayResult.entity,
      online: academicDayResult.online,
      offline: academicDayResult.synced || 0
    });
    this.showProgressBar(current, total, 'Jornadas Académicas', academicDayResult.online); */

    // Sincronización de AcademicHour si hay datos de AcademicDay
    /* if (typeSyncFull && 'academicDayIds' in academicDayResult && academicDayResult.academicDayIds && academicDayResult.academicDayIds.length > 0) {
      const academicHourResult = await this.syncAcademicHour(academicDayResult.academicDayIds, client);
      syncOfflineDescriptions.push({
        entity: academicHourResult.entity,
        online: academicHourResult.online,
        offline: academicHourResult.synced || 0
      });
    } */

    // Resumen final
    const totalEntities = syncOfflineDescriptions.reduce((sum, desc) => sum + (desc.online || 0), 0);
    const totalSynced = syncOfflineDescriptions.reduce((sum, desc) => sum + (desc.offline || 0), 0);

    console.log(`\n`);
    console.log(`🎉 ==================== RESUMEN DE SINCRONIZACIÓN ====================`);
    console.log(`📊 TOTAL DE ENTIDADES EN LÍNEA: ${totalEntities.toLocaleString()}`);
    console.log(`💾 TOTAL DE ENTIDADES SINCRONIZADAS: ${totalSynced.toLocaleString()}`);
    console.log(`⚡ PROGRESO: ${totalEntities > 0 ? Math.round((totalSynced / totalEntities) * 100) : 0}% completado`);
    console.log(`\n📋 DETALLE POR ENTIDAD:`);
    console.log(`${'ENTIDAD'.padEnd(25)} | ${'EN LÍNEA'.padStart(10)} | ${'SINCRONIZ.'.padStart(10)} | ${'%'.padStart(6)}`);
    console.log(`${'-'.repeat(25)} | ${'-'.repeat(10)} | ${'-'.repeat(10)} | ${'-'.repeat(6)}`);

    syncOfflineDescriptions.forEach(desc => {
      const online = desc.online || 0;
      const synced = desc.offline || 0;
      const percentage = online > 0 ? Math.round((synced / online) * 100) : 0;
      const status = percentage === 100 ? '✅' : percentage > 0 ? '🔄' : '⏳';
      const entityName = (desc.entity || 'UNKNOWN').replace(/_/g, ' ');

      console.log(`${status} ${entityName.padEnd(22)} | ${online.toLocaleString().padStart(10)} | ${synced.toLocaleString().padStart(10)} | ${percentage.toString().padStart(4)}%`);
    });

    console.log(`\n🎯 ================================================================`);
    console.log(`🕐 Sincronización ${typeSyncFull ? 'COMPLETA' : 'DE CONTEO'} finalizada exitosamente`);
    console.log(`🎯 ================================================================\n`);

    return syncOfflineDescriptions;
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
              await this.repositorySpecialty.save({
                _id: new ObjectId(specialtyId),
                ...specialtyDetails,
              });
            } else {
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

  // Añadir el FieldResolver para campus
  @FieldResolver((_type) => Campus, { nullable: true })
  async campus(@Root() data: SyncOffline) {
    let id = data.campusId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCampus.findOneBy(id);
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
    for (let studentId of studentIds) {
      try {
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

          // 2. Luego sincronizar el Student
          let existingStudent = await this.repositoryStudent.findOneBy(id);

          if (existingStudent == null) {
            await this.repositoryStudent.save({
              _id: new ObjectId(id),
              ...studentDetails,
            });
          } else {
            await this.repositoryStudent.update(
              { id: id },
              studentDetails,
            );
          }
        }
      } catch (error) {
        // Error silencioso para continuar con los demás
      }
    }
  }

  /**
   * Sincroniza Specialties por ID específicos.
   * Toma una lista de IDs de Specialties y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  async syncSpecialtyByIds(specialtyIds: string[], client: GraphQLClient): Promise<void> {
    for (let specialtyId of specialtyIds) {
      try {
        let specialtyData: any = null;
        specialtyData = await client.request(QUERY_GET_SPECIALTY, { id: specialtyId });

        if (specialtyData?.data) {
          let id = specialtyData.data.id?.toString();
          let specialtyDetails = { ...specialtyData.data };
          delete specialtyDetails.id;

          let existingSpecialty = await this.repositorySpecialty.findOneBy(id);

          if (existingSpecialty == null) {
            await this.repositorySpecialty.save({
              _id: new ObjectId(id),
              ...specialtyDetails,
            });
          } else {
            await this.repositorySpecialty.update(
              { id: id },
              specialtyDetails,
            );
          }
        }
      } catch (error) {
        // Error silencioso para continuar con los demás
      }
    }
  }

  /**
   * Sincroniza EducationLevels por ID específicos.
   * Toma una lista de IDs de EducationLevels y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  /* async syncEducationLevelByIds(educationLevelIds: string[], client: GraphQLClient): Promise<void> {
    for (let educationLevelId of educationLevelIds) {
      try {
        let educationLevelData: any = null;
        educationLevelData = await client.request(QUERY_GET_EDUCATION_LEVEL, { id: educationLevelId });
        
        if (educationLevelData?.data) {
          let id = educationLevelData.data.id?.toString();
          let educationLevelDetails = { ...educationLevelData.data };
          delete educationLevelDetails.id;
          
          let existingEducationLevel = await this.repositoryEducationLevel.findOneBy(id);
          
          if (existingEducationLevel == null) {
            await this.repositoryEducationLevel.save({
              _id: new ObjectId(id),
              ...educationLevelDetails,
            });
          } else {
            await this.repositoryEducationLevel.update(
              { id: id },
              educationLevelDetails,
            );
          }
        }
      } catch (error) {
        // Error silencioso para continuar con los demás
      }
    }
  } */

  /**
   * Sincroniza Courses por ID específicos.
   * Toma una lista de IDs de Courses y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  /* async syncCourseByIds(courseIds: string[], client: GraphQLClient): Promise<void> {
    for (let courseId of courseIds) {
      try {
        let courseData: any = null;
        courseData = await client.request(QUERY_GET_COURSE, { id: courseId });
        
        if (courseData?.data) {
          let id = courseData.data.id?.toString();
          let courseDetails = { ...courseData.data };
          delete courseDetails.id;
          
          let existingCourse = await this.repositoryCourse.findOneBy(id);
          
          if (existingCourse == null) {
            await this.repositoryCourse.save({
              _id: new ObjectId(id),
              ...courseDetails,
            });
          } else {
            await this.repositoryCourse.update(
              { id: id },
              courseDetails,
            );
          }
        }
      } catch (error) {
        // Error silencioso para continuar con los demás
      }
    }
  } */

  /**
   * Sincroniza Modalities por ID específicos.
   * Toma una lista de IDs de Modalities y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  async syncModalityByIds(modalityIds: string[], client: GraphQLClient): Promise<void> {
    for (let modalityId of modalityIds) {
      try {
        let modalityData: any = null;
        modalityData = await client.request(QUERY_GET_MODALITY, { id: modalityId });

        if (modalityData?.data) {
          let id = modalityData.data.id?.toString();
          let modalityDetails = { ...modalityData.data };
          delete modalityDetails.id;

          let existingModality = await this.repositoryModality.findOneBy(id);

          if (existingModality == null) {
            await this.repositoryModality.save({
              _id: new ObjectId(id),
              ...modalityDetails,
            });
          } else {
            await this.repositoryModality.update(
              { id: id },
              modalityDetails,
            );
          }
        }
      } catch (error) {
        // Error silencioso para continuar con los demás
      }
    }
  }

  /**
   * Sincroniza PerformanceLevels por ID específicos.
   * Toma una lista de IDs de PerformanceLevels y va a buscar cada uno individualmente al servidor remoto,
   * luego los actualiza/inserta en la base de datos local.
   */
  /* async syncPerformanceLevelByIds(performanceLevelIds: string[], client: GraphQLClient): Promise<void> {
    for (let performanceLevelId of performanceLevelIds) {
      try {
        let performanceLevelData: any = null;
        performanceLevelData = await client.request(QUERY_GET_PERFORMANCE_LEVEL, { id: performanceLevelId });
        
        if (performanceLevelData?.data) {
          let performanceLevelDetails = { ...performanceLevelData.data };
          delete performanceLevelDetails.id;
          
          let existingPerformanceLevel = await this.repositoryPerformanceLevel.findOneBy(performanceLevelId);
          
          if (existingPerformanceLevel == null) {
            await this.repositoryPerformanceLevel.save({
              _id: new ObjectId(performanceLevelId),
              ...performanceLevelDetails,
            });
          } else {
            await this.repositoryPerformanceLevel.update(
              { id: performanceLevelId },
              performanceLevelDetails,
            );
          }
        }
      } catch (error) {
        // Error silencioso para continuar con los demás
      }
    }
  } */

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
        } /* else if (description.entity === 'EDUCATION_LEVEL' && description.entityIds && description.entityIds.length > 0) {
          await this.syncEducationLevelByIds(description.entityIds, client);
        } */ /* else if (description.entity === 'COURSE' && description.entityIds && description.entityIds.length > 0) {
          await this.syncCourseByIds(description.entityIds, client);
        } */ else if (description.entity === 'MODALITY' && description.entityIds && description.entityIds.length > 0) {
          await this.syncModalityByIds(description.entityIds, client);
        }/*  else if (description.entity === 'PERFORMANCE_LEVEL' && description.entityIds && description.entityIds.length > 0) {
          await this.syncPerformanceLevelByIds(description.entityIds, client);
        } */
      }

      return true;

    } catch (error) {
      return false;
    }
  }

  /**
   * 🎯 MÓDULO 1: SINCRONIZACIÓN DE ACADEMIC ASIGNATURE COURSE
   * 
   * Sincroniza las asignaturas de los cursos por campus del colegio desde la API.
   * 
   * ✨ CARACTERÍSTICAS:
   *   - Obtiene todos los Campus del colegio primero
   *   - Para cada Campus obtiene sus AcademicAsignatureCourse
   *   - Maneja ObjectId para nuevos registros y actualizaciones
   *   - Barra de progreso en tiempo real
   * 
   * @param typeSyncFull - Tipo de sincronización (full o incremental)
   * @param client - Cliente GraphQL para consultas
   * @param schoolData - Datos del colegio
   * @returns Resultado de la sincronización
   */
  /* async syncAcademicAsignatureCourse(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    console.log('🎯 ==================== INICIANDO SINCRONIZACIÓN ACADEMIC ASIGNATURE COURSE ====================');
    
    try {
      let totalSynced = 0;
      let totalOnline = 0;

      // 🔍 VALIDAR SCHOOL DATA
      if (!schoolData?.schoolId) {
        console.error('❌ schoolData.schoolId es requerido para Academic Asignature Course');
        return { entity: 'ACADEMIC_ASIGNATURE_COURSE', online: 0, error: 'schoolData.schoolId es requerido' };
      }

      // 🎯 PASO 1: OBTENER TODOS LOS CAMPUS DEL COLEGIO
      console.log('🏢 PASO 1: Obteniendo todos los Campus del colegio...');
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      const campuses = campusResponse?.data?.edges || [];
      console.log(`🏢 Campus obtenidos: ${campuses.length}`);

      if (campuses.length === 0) {
        console.log('⚠️  No hay Campus para obtener Academic Asignature Course');
        return { entity: 'ACADEMIC_ASIGNATURE_COURSE', online: 0, synced: 0 };
      }

      // 🎯 PASO 2: PARA CADA CAMPUS, SINCRONIZAR SUS ACADEMIC ASIGNATURE COURSE
      for (let campusIndex = 0; campusIndex < campuses.length; campusIndex++) {
        const campus = campuses[campusIndex]?.node;
        
        if (!campus?.id) {
          console.log(`⚠️  Campus ${campusIndex + 1} sin ID válido, saltando...`);
          continue;
        }

        console.log(`🏢 PASO 2.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

        try {
          // 🎯 PASO 2A: CONTAR TOTAL EN LÍNEA PARA ESTE CAMPUS
          const countResponse: any = await client.request(QUERY_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE_COURSE, {
            orderCreated: true,
            allData: true
          });
          const campusOnlineCount = countResponse?.data?.totalCount || 0;
          
          console.log(`📊 Academic Asignature Course en Campus ${campus.name}: ${campusOnlineCount}`);

          // 🎯 PASO 2B: OBTENER ACADEMIC ASIGNATURE COURSE DEL CAMPUS
          const academicAsignatureCourseResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
            orderCreated: true,
            allData: true,
            campusId: campus.id
          });

          const academicAsignatureCourses = academicAsignatureCourseResponse?.data?.edges || [];
          console.log(`📊 Academic Asignature Course obtenidos de Campus ${campus.name}: ${academicAsignatureCourses.length}`);
          
          totalOnline += academicAsignatureCourses.length;

          // 🎯 PASO 2C: SINCRONIZAR CADA ACADEMIC ASIGNATURE COURSE DEL CAMPUS
          for (let i = 0; i < academicAsignatureCourses.length; i++) {
            const academicAsignatureCourseData = academicAsignatureCourses[i]?.node;
            
            if (!academicAsignatureCourseData?.id) {
              console.log(`⚠️  Academic Asignature Course ${i + 1} sin ID válido, saltando...`);
              continue;
            }

            try {
              // 📊 PASO 2C1: ACTUALIZAR BARRA DE PROGRESO
              this.showProgressBar(
                totalSynced + 1,
                totalOnline,
                `Asig. Campus ${campus.name} ${i + 1}/${academicAsignatureCourses.length}`
              );

              // 🔍 PASO 2C2: BUSCAR SI EXISTE EN LOCAL
              const existingAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOne({
                where: { entityBaseId: academicAsignatureCourseData.id }
              });

              if (existingAcademicAsignatureCourse) {
                // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                await this.repositoryAcademicAsignatureCourse.updateOne(
                  { _id: new ObjectId(existingAcademicAsignatureCourse.id) },
                  { $set: { ...academicAsignatureCourseData, entityBaseId: academicAsignatureCourseData.id } }
                );
              } else {
                // 🆕 CREAR NUEVO REGISTRO CON EL ID DE LA NUBE
                const academicAsignatureCourseId = academicAsignatureCourseData.id?.toString();
                const academicAsignatureCourseDetails = { ...academicAsignatureCourseData };
                delete academicAsignatureCourseDetails.id;
                
                await this.repositoryAcademicAsignatureCourse.save({
                  _id: new ObjectId(academicAsignatureCourseId),
                  ...academicAsignatureCourseDetails,
                  entityBaseId: academicAsignatureCourseId
                });
              }

              totalSynced++;

            } catch (error) {
              console.error(`❌ Error sincronizando Academic Asignature Course ${academicAsignatureCourseData.id}:`, error);
            }
          }

        } catch (error) {
          console.error(`❌ Error procesando Campus ${campus.id}:`, error);
        }
      }

      // 📊 Barra de progreso final
      this.showProgressBar(totalOnline, totalOnline, 'Academic Asignature Course', totalSynced);

      console.log(`✅ SINCRONIZACIÓN ACADEMIC ASIGNATURE COURSE COMPLETADA:`);
      console.log(`   🏢 Total de Campus procesados: ${campuses.length}`);
      console.log(`   📊 Total en línea: ${totalOnline}`);
      console.log(`   💾 Total sincronizado: ${totalSynced}`);
      console.log('🎯 ================================================================');

      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE',
        online: totalOnline,
        synced: totalSynced,
      };

    } catch (error) {
      console.error('❌ Error en sincronización de Academic Asignature Course:', error);
      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE',
        online: 0,
        error: String(error),
      };
    }
  } */

  /**
   * Sincroniza AcademicDay usando los IDs de campus previamente sincronizados
   * Obtiene jornadas académicas de todos los campus de la escuela
   */
  /* async syncAcademicDay(typeSyncFull: boolean, client: GraphQLClient, schoolData: any, context: IContext) {
    let totalAcademicDays = 0;
    let syncedAcademicDays = 0;
    let academicDayIds: string[] = []; // Array para almacenar los IDs
    try {
      if (typeSyncFull) {
        // Obtener todos los campus de la escuela
        const allCampus = await this.repositoryCampus.find({
          where: { schoolId: schoolData.schoolId },
          select: ['id', 'name'],
        });

        const campusIds = allCampus.map(campus => campus.id).filter(id => id);

        if (campusIds.length === 0) {
          return {
            entity: 'ACADEMIC_DAY',
            online: 0,
            synced: 0,
          };
        }

        // Obtener jornadas académicas para cada campus individualmente
        for (const campusId of campusIds) {
          const campusInfo = allCampus.find(c => c.id === campusId);
          try {
            await client
              .request(QUERY_GET_ALL_ACADEMIC_DAY_FOR_SYNC, {
                campusId: campusId,
                schoolId: schoolData.schoolId,
                schoolYearId: schoolData.schoolYearId
              })
              .then(async (result: any) => {

                const data = result.data;

                if (data?.edges?.length > 0) {
                  totalAcademicDays += data.totalCount || 0;


                  for (const edge of data.edges) {
                    const academicDay = edge.node;


                    try {
                      const existingAcademicDay = await this.repositoryAcademicDay.findOne({
                        where: { _id: academicDay.id },
                      });

                      if (existingAcademicDay) {

                        await this.repositoryAcademicDay.updateOne(
                          { _id: academicDay.id },
                          { $set: { ...academicDay } }
                        );
                      } else {

                        // Usar el id original como _id de MongoDB
                        const academicDayToSave = { ...academicDay, _id: academicDay.id };
                        delete academicDayToSave.id; // Remover el campo id duplicado
                        await this.repositoryAcademicDay.save(academicDayToSave);
                      }
                      syncedAcademicDays++;
                      academicDayIds.push(academicDay.id); // Almacenar el ID
                    } catch (dbError) {
                      console.error(`[SYNC-ACADEMIC-DAY] Error processing academic day ${academicDay.id}:`, dbError);
                    }
                  }
                } else {

                }
              });
          } catch (campusError) {
            console.error(`[SYNC-ACADEMIC-DAY] Error fetching academic days for campus ${campusId}:`, campusError);
          }
        }

        return {
          entity: 'ACADEMIC_DAY',
          online: totalAcademicDays,
          synced: syncedAcademicDays,
          academicDayIds: academicDayIds, // Incluir los IDs en el resultado
        };
      } else {
        // Para conteo, obtener el primer campus y contar
        const firstCampus = await this.repositoryCampus.findOne({
          where: { schoolId: schoolData.schoolId },
          select: ['id'],
        });

        if (firstCampus?.id) {
          await client
            .request(QUERY_GET_TOTAL_COUNT_ACADEMIC_DAY, {
              campusId: firstCampus.id,
              schoolId: schoolData.schoolId,
              schoolYearId: schoolData.schoolYearId
            })
            .then(async (result: any) => {
              totalAcademicDays = result.data?.totalCount || 0;
            });
        }

        return {
          entity: 'ACADEMIC_DAY',
          online: totalAcademicDays,
        };
      }
    } catch (error) {
      console.error('[SYNC-ACADEMIC-DAY] ERROR:', error);
      return {
        entity: 'ACADEMIC_DAY',
        online: 0,
        error: String(error),
      };
    }
  } */

/*   async syncAcademicDayByIds(academicDayIds: string[], client: GraphQLClient) {
    let synced = 0;
    try {
      for (const academicDayId of academicDayIds) {
        await client
          .request(QUERY_GET_ACADEMIC_DAY, { id: academicDayId })
          .then(async (result: any) => {
            const academicDay = result.data;

            if (academicDay) {
              try {
                const existingAcademicDay = await this.repositoryAcademicDay.findOne({
                  where: { _id: academicDay.id },
                });

                if (existingAcademicDay) {

                  await this.repositoryAcademicDay.updateOne(
                    { _id: academicDay.id },
                    { $set: { ...academicDay } }
                  );
                } else {

                  const academicDayToSave = { ...academicDay, _id: academicDay.id };
                  delete academicDayToSave.id;
                  await this.repositoryAcademicDay.save(academicDayToSave);
                }
                synced++;
              } catch (dbError) {
                console.error(`[SYNC-ACADEMIC-DAY-BY-IDS] Error processing academic day ${academicDay.id}:`, dbError);
              }
            }
          });
      }

      return {
        entity: 'ACADEMIC_DAY',
        synced,
      };
    } catch (error) {
      console.error('[SYNC-ACADEMIC-DAY-BY-IDS] ERROR:', error);
      return {
        entity: 'ACADEMIC_DAY',
        synced: 0,
        error: String(error),
      };
    }
  } */
/* async syncAcademicDay(typeSyncFull: boolean, client: GraphQLClient, schoolData: any, context: IContext) {
  let totalAcademicDays = 0;
  let syncedAcademicDays = 0;
  let academicDayIds: string[] = [];
  
  try {
    if (typeSyncFull) {
      // Obtener todos los campus de la escuela
      const allCampus = await this.repositoryCampus.find({
        where: { schoolId: schoolData.schoolId },
        select: ['id', 'name'],
      });

      const campusIds = allCampus.map(campus => campus.id).filter(id => id);

      if (campusIds.length === 0) {
        return {
          entity: 'ACADEMIC_DAY',
          online: 0,
          synced: 0,
        };
      }

      // Obtener jornadas académicas para cada campus individualmente
      for (const campusId of campusIds) {
        const campusInfo = allCampus.find(c => c.id === campusId);
        
        try {
          await client
            .request(QUERY_GET_ALL_ACADEMIC_DAY_FOR_SYNC, {
              campusId: campusId,
              schoolId: schoolData.schoolId,
              schoolYearId: schoolData.schoolYearId
            })
            .then(async (result: any) => {
              const data = result.data;

              if (data?.edges?.length > 0) {
                totalAcademicDays += data.totalCount || 0;

                for (const edge of data.edges) {
                  const academicDay = edge.node;

                  try {
                    // 🔍 CORRECCIÓN: Buscar por el ID como string, no como objeto
                    const existingAcademicDay = await this.repositoryAcademicDay.findOne({
                      where: { id: academicDay.id }, // ✅ Buscar por campo 'id' string
                    });

                    if (existingAcademicDay) {
                      // ✅ Solo actualizar los campos, sin tocar el _id
                      const updateData = { ...academicDay };
                      delete updateData.id; // Remover el id del update
                      
                      await this.repositoryAcademicDay.update(
                        { id: academicDay.id }, // Condición de búsqueda por 'id' string
                        updateData
                      );
                      console.log(`[SYNC-ACADEMIC-DAY] Actualizado academic day ${academicDay.id}`);
                    } else {
                      // ✅ CREAR NUEVO: Usar ObjectId para _id
                      await this.repositoryAcademicDay.save({
                        _id: new ObjectId(academicDay.id), // Crear ObjectId para MongoDB
                        ...academicDay,
                        id: academicDay.id // Mantener también el id como string
                      });
                      console.log(`[SYNC-ACADEMIC-DAY] Creado academic day ${academicDay.id}`);
                    }
                    
                    syncedAcademicDays++;
                    academicDayIds.push(academicDay.id);
                    
                  } catch (dbError) {
                    console.error(`[SYNC-ACADEMIC-DAY] Error processing academic day ${academicDay.id}:`, dbError);
                  }
                }
              }
            });
        } catch (campusError) {
          console.error(`[SYNC-ACADEMIC-DAY] Error fetching academic days for campus ${campusId}:`, campusError);
        }
      }

      return {
        entity: 'ACADEMIC_DAY',
        online: totalAcademicDays,
        synced: syncedAcademicDays,
        academicDayIds: academicDayIds,
      };
    } else {
      // Para conteo, obtener el primer campus y contar
      const firstCampus = await this.repositoryCampus.findOne({
        where: { schoolId: schoolData.schoolId },
        select: ['id'],
      });

      if (firstCampus?.id) {
        await client
          .request(QUERY_GET_TOTAL_COUNT_ACADEMIC_DAY, {
            campusId: firstCampus.id,
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId
          })
          .then(async (result: any) => {
            totalAcademicDays = result.data?.totalCount || 0;
          });
      }

      return {
        entity: 'ACADEMIC_DAY',
        online: totalAcademicDays,
      };
    }
  } catch (error) {
    console.error('[SYNC-ACADEMIC-DAY] ERROR:', error);
    return {
      entity: 'ACADEMIC_DAY',
      online: 0,
      error: String(error),
    };
  }
} */
/* async syncAcademicDayByIds(academicDayIds: string[], client: GraphQLClient) {
    let synced = 0;
    try {
      for (const academicDayId of academicDayIds) {
        await client
          .request(QUERY_GET_ACADEMIC_DAY, { id: academicDayId })
          .then(async (result: any) => {
            const academicDay = result.data;

            if (academicDay) {
              try {
                const existingAcademicDay = await this.repositoryAcademicDay.findOne({
                  where: { _id: academicDay.id },
                });

                if (existingAcademicDay) {
                  // Si existe, solo actualizar los campos (sin tocar el _id)
                  const academicDayToUpdate = { ...academicDay };
                  delete academicDayToUpdate.id; // Remover el campo id
                  await this.repositoryAcademicDay.updateOne(
                    { _id: academicDay.id },
                    { $set: academicDayToUpdate }
                  );
                } else {
                  // Si es nuevo, crear con _id como ObjectId
                  const academicDayToSave = { ...academicDay, _id: new ObjectId(academicDay.id) };
                  delete academicDayToSave.id;
                  await this.repositoryAcademicDay.save(academicDayToSave);
                }
                synced++;
              } catch (dbError) {
                console.error(`[SYNC-ACADEMIC-DAY-BY-IDS] Error processing academic day ${academicDay.id}:`, dbError);
              }
            }
          });
      }

      return {
        entity: 'ACADEMIC_DAY',
        synced,
      };
    } catch (error) {
      console.error('[SYNC-ACADEMIC-DAY-BY-IDS] ERROR:', error);
      return {
        entity: 'ACADEMIC_DAY',
        synced: 0,
        error: String(error),
      };
    }
  } */
  // Sync AcademicHour after AcademicDay
/*   async syncAcademicHour(academicDayIds: string[], client: GraphQLClient): Promise<any> {
    let totalProcessed = 0;
    let totalSaved = 0;
    let totalErrors = 0;

    for (let i = 0; i < academicDayIds.length; i++) {
      const academicDayId = academicDayIds[i];

      try {
        await client
          .request(QUERY_GET_ALL_ACADEMIC_HOUR, { academicDayId })
          .then(async (result: any) => {
            const data = result.data;
            const academicHours = data?.edges || [];

            let processedForThisDay = 0;
            let savedForThisDay = 0;

            if (academicHours.length > 0) {
              totalProcessed += data.totalCount || 0;

              for (const edge of academicHours) {
                try {
                  const academicHour = edge.node;

                  // Buscar si ya existe usando el repositorio
                  const existingAcademicHour = await this.repositoryAcademicHour.findOne({
                    where: { _id: academicHour.id },
                  });

                  if (existingAcademicHour) {

                    await this.repositoryAcademicHour.updateOne(
                      { _id: academicHour.id },
                      { $set: { ...academicHour } }
                    );
                  } else {

                    // Usar el id original como _id de MongoDB
                    const academicHourToSave = { ...academicHour, _id: academicHour.id };
                    delete academicHourToSave.id; // Remover el campo id duplicado
                    await this.repositoryAcademicHour.save(academicHourToSave);
                  }

                  processedForThisDay++;
                  savedForThisDay++;

                } catch (academicHourError) {
                  console.error(`❌ Error procesando Academic Hour individual:`, academicHourError);
                  totalErrors++;
                }
              }
            } else {
            }
            totalSaved += savedForThisDay;
          });

      } catch (error) {
        console.error(`❌ Error procesando Academic Day ${academicDayId}:`, error);
        totalErrors++;
      }
    }
    return {
      entity: 'ACADEMIC_HOUR',
      online: totalProcessed,
      synced: totalSaved,
    };
  } */
/* async syncAcademicHourMainSync(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    try {
      if (!typeSyncFull) {
        // Para conteo, retornamos 0 ya que este sync depende de Academic Days
        return {
          entity: 'ACADEMIC_HOUR',
          online: 0,
          message: 'Academic Hour sync requires Academic Day sync to be enabled',
        };
      }

      // Obtener todos los Academic Day IDs de la base de datos local
      const academicDays = await this.repositoryAcademicDay.find({
        where: { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId },
        select: ['id'],
      });

      const academicDayIds = academicDays.map(day => day.id.toString());

      if (academicDayIds.length === 0) {
        return {
          entity: 'ACADEMIC_HOUR',
          online: 0,
          message: 'No Academic Days found for sync',
        };
      }

      // Llamar al método existente de sync de Academic Hour
      return await this.syncAcademicHour(academicDayIds, client);
      
    } catch (error) {
      console.error('[SYNC-ACADEMIC-HOUR-MAIN] ERROR:', error);
      return {
        entity: 'ACADEMIC_HOUR',
        online: 0,
        error: String(error),
      };
    }
  } */
  // Sync AcademicHour after AcademicDay
  /* async syncAcademicHour(academicDayIds: string[], client: GraphQLClient) {
    let totalProcessed = 0;
    let totalSaved = 0;
    let totalErrors = 0;

    for (let i = 0; i < academicDayIds.length; i++) {
      const academicDayId = academicDayIds[i];

      try {
        await client
          .request(QUERY_GET_ALL_ACADEMIC_HOUR, { academicDayId })
          .then(async (result: any) => {
            const data = result.data;
            const academicHours = data?.edges || [];

            let processedForThisDay = 0;
            let savedForThisDay = 0;

            if (academicHours.length > 0) {
              totalProcessed += data.totalCount || 0;

              for (const edge of academicHours) {
                try {
                  const academicHour = edge.node;

                  // Buscar si ya existe usando el repositorio
                  const existingAcademicHour = await this.repositoryAcademicHour.findOne({
                    where: { _id: new ObjectId(academicHour.id) },
                  });

                  if (existingAcademicHour) {
                    // Si existe, solo actualizar los campos (sin tocar el _id)
                    const academicHourToUpdate = { ...academicHour };
                    delete academicHourToUpdate.id; // Remover el campo id
                    await this.repositoryAcademicHour.update(
                      academicHour.id,
                      academicHourToUpdate
                    );
                  } else {
                    // Si es nuevo, crear con _id como ObjectId
                    const academicHourToSave = { ...academicHour };
                    delete academicHourToSave.id; // Remover el campo id duplicado
                    await this.repositoryAcademicHour.save({
                      _id: new ObjectId(academicHour.id),
                      ...academicHourToSave,
                    });
                  }

                  processedForThisDay++;
                  savedForThisDay++;

                } catch (academicHourError) {
                  console.error(`❌ Error procesando Academic Hour individual:`, academicHourError);
                  totalErrors++;
                }
              }
            } else {
            }
            totalSaved += savedForThisDay;
          });

      } catch (error) {
        console.error(`❌ Error procesando Academic Day ${academicDayId}:`, error);
        totalErrors++;
      }
    }
    return {
      entity: 'ACADEMIC_HOUR',
      online: totalProcessed,
      synced: totalSaved,
    };
  } */

  /**
 * 📖 ACADEMIC DAYS & HOURS
 */

  async syncAcademicDayByIds(academicDayIds: string[], client: GraphQLClient) {
    let synced = 0;
    try {
      for (const academicDayId of academicDayIds) {
        await client
          .request(QUERY_GET_ACADEMIC_DAY, { id: academicDayId })
          .then(async (result: any) => {
            const academicDay = result.data;

            if (academicDay) {
              try {
                const existingAcademicDay = await this.repositoryAcademicDay.findOne({
                  where: { _id: academicDay.id },
                });

                if (existingAcademicDay) {

                  await this.repositoryAcademicDay.updateOne(
                    { _id: academicDay.id },
                    { $set: { ...academicDay } }
                  );
                } else {

                  const academicDayToSave = { ...academicDay, _id: academicDay.id };
                  delete academicDayToSave.id;
                  await this.repositoryAcademicDay.save(academicDayToSave);
                }
                synced++;
              } catch (dbError) {
                console.error(`[SYNC-ACADEMIC-DAY-BY-IDS] Error processing academic day ${academicDay.id}:`, dbError);
              }
            }
          });
      }

      return {
        entity: 'ACADEMIC_DAY',
        synced,
      };
    } catch (error) {
      console.error('[SYNC-ACADEMIC-DAY-BY-IDS] ERROR:', error);
      return {
        entity: 'ACADEMIC_DAY',
        synced: 0,
        error: String(error),
      };
    }
  }

async syncAcademicDay(typeSyncFull: boolean, client: GraphQLClient, schoolData: any, context: IContext) {
  console.log(`🎯 [ACADEMIC-DAY] Iniciando sincronización...`);
  
  let totalAcademicDays = 0;
  let syncedAcademicDays = 0;
  let academicDayIds: string[] = [];
  // 🆕 ALMACENAR IDS CON INFORMACIÓN DE SEDE
  let syncedAcademicDayDetails: Array<{
    academicDayId: string;
    campusId: string;
    campusName: string;
    schoolId: string;
    schoolYearId: string;
  }> = [];
  
  try {
    if (typeSyncFull) {
      // Obtener todos los campus de la escuela
      const allCampus = await this.repositoryCampus.find({
        where: { schoolId: schoolData.schoolId },
        select: ['id', 'name'],
      });

      const campusIds = allCampus.map(campus => campus.id).filter(id => id);
      console.log(`🏢 [ACADEMIC-DAY] Procesando ${campusIds.length} campus`);

      if (campusIds.length === 0) {
        console.log(`⚠️ [ACADEMIC-DAY] No se encontraron campus`);
        return {
          entity: 'ACADEMIC_DAY',
          online: 0,
          synced: 0,
        };
      }

      // Obtener jornadas académicas para cada campus individualmente
      for (let i = 0; i < campusIds.length; i++) {
        const campusId = campusIds[i];
        const campusInfo = allCampus.find(c => c.id === campusId);
        
        console.log(`🏢 [ACADEMIC-DAY] Campus ${i+1}/${campusIds.length}: ${campusInfo?.name || campusId}`);
        
        try {
          await client
            .request(QUERY_GET_ALL_ACADEMIC_DAY_FOR_SYNC, {
              campusId: campusId,
              schoolId: schoolData.schoolId,
              schoolYearId: schoolData.schoolYearId
            })
            .then(async (result: any) => {
              const data = result.data;
              const academicDays = data?.edges || [];

              if (academicDays.length > 0) {
                console.log(`📅 [ACADEMIC-DAY] Encontrados ${academicDays.length} días académicos en campus ${campusInfo?.name}`);
                totalAcademicDays += academicDays.length;

                for (const edge of academicDays) {
                  const academicDay = edge.node;

                  // Validar datos esenciales
                  if (!academicDay?.id) {
                    console.warn(`⚠️ [ACADEMIC-DAY] Día académico sin ID válido, saltando...`);
                    continue;
                  }

                  try {
                    // 🔍 Buscar por el ID como string
                    const existingAcademicDay = await this.repositoryAcademicDay.findOne({
                      where: { id: academicDay.id },
                    });

                    if (existingAcademicDay) {
                      // ✅ Solo actualizar los campos, sin tocar el _id
                      const updateData = { ...academicDay };
                      delete updateData.id; // Remover el id del update
                      
                      await this.repositoryAcademicDay.update(
                        { id: academicDay.id }, // Condición de búsqueda por 'id' string
                        updateData
                      );
                      console.log(`🔄 [ACADEMIC-DAY] Actualizado academic day ${academicDay.id}`);
                    } else {
                      // ✅ CREAR NUEVO: Usar ObjectId para _id y mantener id como string
                      const academicDayToSave = { ...academicDay };
                      delete academicDayToSave.id; // Evitar duplicación
                      
                      await this.repositoryAcademicDay.save({
                        _id: new ObjectId(academicDay.id), // Crear ObjectId para MongoDB
                        id: academicDay.id, // Campo de búsqueda
                        ...academicDayToSave
                      });
                      console.log(`🆕 [ACADEMIC-DAY] Creado academic day ${academicDay.id}`);
                    }
                    
                    syncedAcademicDays++;
                    academicDayIds.push(academicDay.id);
                    
                    // 🆕 ALMACENAR DETALLES COMPLETOS DEL ACADEMIC DAY SINCRONIZADO
                    syncedAcademicDayDetails.push({
                      academicDayId: academicDay.id,
                      campusId: campusId,
                      campusName: campusInfo?.name || 'Sin nombre',
                      schoolId: schoolData.schoolId,
                      schoolYearId: schoolData.schoolYearId
                    });
                    
                    // Progreso cada 5 registros
                    if (syncedAcademicDays % 5 === 0) {
                      this.showProgressBar(syncedAcademicDays, totalAcademicDays, `Academic Days - Campus: ${campusInfo?.name}`);
                    }
                    
                  } catch (dbError) {
                    console.error(`❌ [ACADEMIC-DAY] Error procesando día ${academicDay.id}:`, dbError);
                  }
                }
              } else {
                console.log(`⚪ [ACADEMIC-DAY] No hay días académicos en campus ${campusInfo?.name}`);
              }
            });
        } catch (campusError) {
          console.error(`❌ [ACADEMIC-DAY] Error en campus ${campusId}:`, campusError);
        }
      }

      // Progreso final
      this.showProgressBar(totalAcademicDays, totalAcademicDays, 'Academic Days', syncedAcademicDays);

      console.log(`✅ [ACADEMIC-DAY] Sincronización completa: ${syncedAcademicDays}/${totalAcademicDays}`);
      console.log(`📋 [ACADEMIC-DAY] IDs sincronizados: [${academicDayIds.slice(0, 3).join(', ')}${academicDayIds.length > 3 ? '...' : ''}]`);

      return {
        entity: 'ACADEMIC_DAY',
        online: totalAcademicDays,
        synced: syncedAcademicDays,
        academicDayIds: academicDayIds,
        syncedAcademicDayDetails: syncedAcademicDayDetails, // 🆕 INCLUIR DETALLES COMPLETOS
      };
    } else {
      // Para conteo, obtener el primer campus y contar
      console.log(`📊 [ACADEMIC-DAY] Modo conteo: obteniendo total de días académicos`);
      const firstCampus = await this.repositoryCampus.findOne({
        where: { schoolId: schoolData.schoolId },
        select: ['id', 'name'],
      });

      if (firstCampus?.id) {
        console.log(`🏢 [ACADEMIC-DAY] Contando desde campus: ${firstCampus.name || firstCampus.id}`);
        await client
          .request(QUERY_GET_TOTAL_COUNT_ACADEMIC_DAY, {
            campusId: firstCampus.id,
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId
          })
          .then(async (result: any) => {
            totalAcademicDays = result.data?.totalCount || 0;
            console.log(`📊 [ACADEMIC-DAY] Total contado: ${totalAcademicDays} días académicos`);
          });
      }

      return {
        entity: 'ACADEMIC_DAY',
        online: totalAcademicDays,
      };
    }
  } catch (error) {
    console.error('[SYNC-ACADEMIC-DAY] ERROR:', error);
    return {
      entity: 'ACADEMIC_DAY',
      online: 0,
      error: String(error),
    };
  }
}

  async syncAcademicDayAndHour(typeSyncFull: boolean, client: GraphQLClient, schoolData: any, context: IContext) {
    console.log(`🎯 [ACADEMIC-DAY-HOUR] Iniciando sincronización coordinada...`);
    
    try {
      // 🎯 PASO 1: SINCRONIZAR ACADEMIC DAYS
      console.log(`📅 [ACADEMIC-DAY-HOUR] Paso 1: Sincronizando Academic Days...`);
      const academicDayResult = await this.syncAcademicDay(typeSyncFull, client, schoolData, context);
      
      let academicHourResult = {
        entity: 'ACADEMIC_HOUR',
        online: 0,
        synced: 0,
        message: 'No se ejecutó por falta de Academic Days'
      };

      // 🎯 PASO 2: SINCRONIZAR ACADEMIC HOURS SI HAY DATOS DE ACADEMIC DAYS
      if (typeSyncFull && academicDayResult.syncedAcademicDayDetails && academicDayResult.syncedAcademicDayDetails.length > 0) {
        console.log(`🕐 [ACADEMIC-DAY-HOUR] Paso 2: Sincronizando Academic Hours para ${academicDayResult.syncedAcademicDayDetails.length} Academic Days...`);
        
        // Convertir los detalles al formato requerido por syncAcademicHour
        const academicDayDetails = academicDayResult.syncedAcademicDayDetails.map(detail => ({
          academicDayId: detail.academicDayId,
          campusId: detail.campusId,
          dayName: `${detail.campusName} - ${detail.academicDayId.slice(-6)}` // Mostrar sede y últimos 6 chars del ID
        }));

        academicHourResult = await this.syncAcademicHour(academicDayDetails, client);
      } else {
        console.log(`⚪ [ACADEMIC-DAY-HOUR] No hay Academic Days sincronizados para procesar Academic Hours`);
      }

      // 🎯 RETORNAR RESULTADO COMBINADO
      const combinedResult = {
        entity: 'ACADEMIC_DAY_AND_HOUR',
        academicDay: {
          online: academicDayResult.online || 0,
          synced: academicDayResult.synced || 0,
          error: academicDayResult.error
        },
        academicHour: {
          online: academicHourResult.online || 0,
          synced: academicHourResult.synced || 0,
          message: academicHourResult.message
        },
        totalOnline: (academicDayResult.online || 0) + (academicHourResult.online || 0),
        totalSynced: (academicDayResult.synced || 0) + (academicHourResult.synced || 0)
      };

      console.log(`🎉 [ACADEMIC-DAY-HOUR] Sincronización coordinada completada:`);
      console.log(`   📅 Academic Days: ${combinedResult.academicDay.synced}/${combinedResult.academicDay.online}`);
      console.log(`   🕐 Academic Hours: ${combinedResult.academicHour.synced}/${combinedResult.academicHour.online}`);
      console.log(`   📊 Total: ${combinedResult.totalSynced}/${combinedResult.totalOnline}`);

      return combinedResult;

    } catch (error) {
      console.error('❌ [SYNC-ACADEMIC-DAY-HOUR] ERROR:', error);
      return {
        entity: 'ACADEMIC_DAY_AND_HOUR',
        error: String(error),
        totalOnline: 0,
        totalSynced: 0
      };
    }
  }

  async syncAcademicHour(
    academicDayDetails: Array<{
      academicDayId: string;
      campusId: string;
      dayName: string;
    }>, 
    client: GraphQLClient
  ): Promise<any> {
    console.log(`🕐 [ACADEMIC-HOUR] Iniciando sincronización de ${academicDayDetails.length} Academic Days`);
    
    let totalOnline = 0;
    let totalSynced = 0;
    let totalErrors = 0;

    for (let i = 0; i < academicDayDetails.length; i++) {
      const dayDetail = academicDayDetails[i];
      const { academicDayId, campusId, dayName } = dayDetail;

      console.log(`🕐 [ACADEMIC-HOUR] Procesando día ${i+1}/${academicDayDetails.length}: ${dayName} (ID: ${academicDayId})`);

      try {
        // 🎯 USAR LA QUERY CORRECTA CON PARÁMETROS OBLIGATORIOS
        const result: any = await client.request(QUERY_GET_ALL_ACADEMIC_HOUR, {
          academicDayId: academicDayId,
          allData: true,
          orderCreated: true
        });

        const data = result.data;
        const academicHours = data?.edges || [];
        const totalCountForThisDay = data?.totalCount || academicHours.length;

        if (academicHours.length > 0) {
          console.log(`✅ [ACADEMIC-HOUR] Encontradas ${academicHours.length} horas académicas para el día ${dayName}`);
          totalOnline += academicHours.length;

          // 📊 Actualizar progreso
          this.showProgressBar(
            i + 1,
            academicDayDetails.length,
            `Horas Académicas - Día: ${dayName} (${academicHours.length} horas)`
          );

          // 🔄 PROCESAR CADA HORA ACADÉMICA
          for (let j = 0; j < academicHours.length; j++) {
            const edge = academicHours[j];
            const academicHour = edge.node;

            if (!academicHour?.id) {
              console.warn(`⚠️ [ACADEMIC-HOUR] Hora académica ${j+1} sin ID válido, saltando...`);
              continue;
            }

            try {
              // 🔍 BUSCAR SI EXISTE EN LA BASE DE DATOS LOCAL
              const existingAcademicHour = await this.repositoryAcademicHour.findOne({
                where: { id: academicHour.id }, // Buscar por campo 'id' string
              });

              if (existingAcademicHour) {
                // ✅ ACTUALIZAR REGISTRO EXISTENTE
                const updateData = { ...academicHour };
                delete updateData.id; // Remover id para evitar conflictos
                // Remover relaciones anidadas
                delete updateData.campus;
                delete updateData.school;
                delete updateData.academicDay;
                delete updateData.schoolYear;
                
                await this.repositoryAcademicHour.update(
                  { id: academicHour.id },
                  updateData
                );
                console.log(`🔄 [ACADEMIC-HOUR] Actualizada hora académica ${academicHour.id}`);
              } else {
                // ✅ CREAR NUEVO REGISTRO
                const academicHourToSave = { ...academicHour };
                delete academicHourToSave.id; // Evitar duplicación
                // Remover relaciones anidadas
                delete academicHourToSave.campus;
                delete academicHourToSave.school;
                delete academicHourToSave.academicDay;
                delete academicHourToSave.schoolYear;
                
                await this.repositoryAcademicHour.save({
                  _id: new ObjectId(academicHour.id), // Usar ObjectId para MongoDB
                  id: academicHour.id, // Mantener id como string para búsquedas
                  ...academicHourToSave
                });
                console.log(`🆕 [ACADEMIC-HOUR] Creada hora académica ${academicHour.id}`);
              }

              totalSynced++;

            } catch (hourError) {
              console.error(`❌ [ACADEMIC-HOUR] Error procesando hora académica ${academicHour.id}:`, hourError);
              totalErrors++;
            }
          }
        } else {
          console.log(`⚪ [ACADEMIC-HOUR] No hay horas académicas para el día ${dayName}`);
        }

      } catch (dayError) {
        console.error(`❌ [ACADEMIC-HOUR] Error procesando Academic Day ${academicDayId}:`, dayError);
        totalErrors++;
      }
    }

    // 📊 Progreso final
    this.showProgressBar(academicDayDetails.length, academicDayDetails.length, 'Horas Académicas', totalSynced);

    console.log(`🎉 [ACADEMIC-HOUR] Sincronización completada:`);
    console.log(`   📅 Academic Days procesados: ${academicDayDetails.length}`);
    console.log(`   📊 Total horas académicas en línea: ${totalOnline}`);
    console.log(`   💾 Total horas académicas sincronizadas: ${totalSynced}`);
    console.log(`   ❌ Errores encontrados: ${totalErrors}`);

    return {
      entity: 'ACADEMIC_HOUR',
      online: totalOnline,
      synced: totalSynced,
      errors: totalErrors,
    };
  }

async syncAcademicHourMainSync(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    console.log(`🕐 [ACADEMIC-HOUR] Iniciando sincronización...`);
    
    try {
      if (!typeSyncFull) {
        console.log(`📊 [ACADEMIC-HOUR] Modo conteo: Academic Hour sync requiere Academic Day sync habilitado`);
        return {
          entity: 'ACADEMIC_HOUR',
          online: 0,
          message: 'Academic Hour sync requires Academic Day sync to be enabled',
        };
      }

      // 🎯 OBTENER ACADEMIC DAYS DESDE LA BASE DE DATOS LOCAL FILTRADOS POR SEDE
      console.log(`📅 [ACADEMIC-HOUR] Obteniendo Academic Days locales...`);
      let whereCondition: any = {
        schoolId: schoolData.schoolId,
        schoolYearId: schoolData.schoolYearId
      };

      // Si hay filtro por campus específico, aplicarlo
      if (schoolData.campusId) {
        whereCondition.campusId = schoolData.campusId;
        console.log(`🏢 [ACADEMIC-HOUR] Filtrado por campus específico: ${schoolData.campusId}`);
      }

      const academicDays = await this.repositoryAcademicDay.find({
        where: whereCondition,
        select: ['id', 'campusId', 'name'],
      });

      const academicDayDetails = academicDays.map(day => ({
        academicDayId: day.id.toString(),
        campusId: day.campusId || '',
        dayName: day.name || day.id.toString()
      }));

      console.log(`📅 [ACADEMIC-HOUR] Encontrados ${academicDayDetails.length} Academic Days para sincronizar`);

      if (academicDayDetails.length === 0) {
        console.log(`⚠️ [ACADEMIC-HOUR] No se encontraron Academic Days para sincronizar`);
        return {
          entity: 'ACADEMIC_HOUR',
          online: 0,
          synced: 0,
          message: 'No Academic Days found for sync',
        };
      }

      // 🚀 LLAMAR AL MÉTODO MEJORADO DE SYNC DE ACADEMIC HOUR
      return await this.syncAcademicHour(academicDayDetails, client);
      
    } catch (error) {
      console.error('❌ [SYNC-ACADEMIC-HOUR-MAIN] ERROR:', error);
      return {
        entity: 'ACADEMIC_HOUR',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 MODALIDAD
 */
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
                const modalityId = modality.id?.toString();

                try {
                  const existingModality = await this.repositoryModality.findOne({
                    where: { _id: new ObjectId(modalityId) },
                  });

                  if (existingModality) {
                    const modalityDetails = { ...modality };
                    delete modalityDetails.id;
                    
                    await this.repositoryModality.update(
                      modalityId,
                      modalityDetails
                    );
                  } else {
                    const modalityDetails = { ...modality };
                    delete modalityDetails.id;
                    
                    await this.repositoryModality.save({
                      _id: new ObjectId(modalityId),
                      ...modalityDetails,
                    });
                  }
                } catch (dbError) {
                  console.error(`[SYNC-MODALITY] Error processing modality ${modalityId}:`, dbError);
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

  /**
 * 📖 SINCRONIZACIÓN DE SPECIALTY
 */
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

  /**
 * 📖 SINCRONIZACIÓN DE INBOX
 */
  async syncInbox(typeSyncFull: boolean, client: GraphQLClient, schoolData: any, context: IContext) {
    let totalInboxMessages = 0;
    let syncedInboxMessages = 0;
    try {
      if (typeSyncFull) {
        // Obtener todos los userId de estudiantes y docentes
        const studentUserIds = await this.repositoryStudent.find({
          where: { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId },
          select: ['userId'],
        }).then(students => students.map(student => student.userId).filter(id => id));

        const teacherUserIds = await this.repositoryTeacher.find({
          where: { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId },
          select: ['userId'],
        }).then(teachers => teachers.map(teacher => teacher.userId).filter(id => id));

        const allUserIds = [...studentUserIds, ...teacherUserIds];

        if (allUserIds.length === 0) {
          return {
            entity: 'INBOX',
            online: 0,
            synced: 0,
          };
        }

        // Obtener mensajes de inbox para cada usuario individualmente
        for (const userId of allUserIds) {
          try {

            await client
              .request(QUERY_GET_ALL_INBOX_FOR_SYNC, { userId })
              .then(async (result: any) => {

                const data = result.data;

                if (data?.edges?.length > 0) {
                  totalInboxMessages += data.totalCount || 0;


                  for (const edge of data.edges) {
                    const inboxMessage = edge.node;

                    try {
                      const existingInboxMessage = await this.repositoryInbox.findOne({
                        where: { _id: inboxMessage.id },
                      });

                      if (existingInboxMessage) {

                        await this.repositoryInbox.updateOne(
                          { _id: inboxMessage.id },
                          { $set: { ...inboxMessage } }
                        );
                      } else {

                        // Usar el id original como _id de MongoDB
                        const inboxToSave = { ...inboxMessage, _id: inboxMessage.id };
                        delete inboxToSave.id; // Remover el campo id duplicado
                        await this.repositoryInbox.save(inboxToSave);
                      }
                      syncedInboxMessages++;
                    } catch (dbError) {
                      console.error(`[SYNC-INBOX] Error processing inbox message ${inboxMessage.id}:`, dbError);
                    }
                  }
                } else {

                }
              });
          } catch (userError) {
            console.error(`[SYNC-INBOX] Error fetching inbox messages for user ${userId}:`, userError);
          }
        }

        return {
          entity: 'INBOX',
          online: totalInboxMessages,
          synced: syncedInboxMessages,
        };
      } else {
        // Para conteo, obtener el primer usuario y contar
        const firstUser = await this.repositoryStudent.findOne({
          where: { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId },
          select: ['userId'],
        });

        if (firstUser?.userId) {
          await client
            .request(QUERY_GET_TOTAL_COUNT_INBOX, { userId: firstUser.userId })
            .then(async (result: any) => {
              totalInboxMessages = result.data?.totalCount || 0;
            });
        }

        return {
          entity: 'INBOX',
          online: totalInboxMessages,
        };
      }
    } catch (error) {
      console.error('[SYNC-INBOX] ERROR:', error);
      return {
        entity: 'INBOX',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE NOTIFICATIONS
 */
  async syncNotifications(typeSyncFull: boolean, client: GraphQLClient, schoolData: any, context: IContext) {
    let totalNotifications = 0;
    let syncedNotifications = 0;
    try {
      if (typeSyncFull) {
        // Obtener todos los userId de estudiantes y docentes
        const studentUserIds = await this.repositoryStudent.find({
          where: { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId },
          select: ['userId'],
        }).then(students => students.map(student => student.userId).filter(id => id));

        const teacherUserIds = await this.repositoryTeacher.find({
          where: { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId },
          select: ['userId'],
        }).then(teachers => teachers.map(teacher => teacher.userId).filter(id => id));

        const allUserIds = [...studentUserIds, ...teacherUserIds];
        if (allUserIds.length === 0) {
          return {
            entity: 'NOTIFICATIONS',
            online: 0,
            synced: 0,
          };
        }

        // Obtener notificaciones para cada usuario individualmente
        for (const userId of allUserIds) {
          try {

            await client
              .request(QUERY_GET_ALL_NOTIFICATION_FOR_SYNC, { userId })
              .then(async (result: any) => {

                const data = result.data;

                if (data?.edges?.length > 0) {
                  totalNotifications += data.totalCount || 0;


                  for (const edge of data.edges) {
                    const notification = edge.node;
                    console.log(`[SYNC-NOTIFICATIONS] 📝 Processing notification:`, {
                      id: notification.id,
                      title: notification.title,
                      userId: notification.userId,
                      dateSend: notification.dateSend
                    });

                    try {
                      const existingNotification = await this.repositoryNotification.findOne({
                        where: { _id: notification.id },
                      });

                      if (existingNotification) {

                        await this.repositoryNotification.updateOne(
                          { _id: notification.id },
                          { $set: { ...notification } }
                        );
                      } else {

                        // Usar el id original como _id de MongoDB
                        const notificationToSave = { ...notification, _id: notification.id };
                        delete notificationToSave.id; // Remover el campo id duplicado
                        await this.repositoryNotification.save(notificationToSave);
                      }
                      syncedNotifications++;
                    } catch (dbError) {
                      console.error(`[SYNC-NOTIFICATIONS] Error processing notification ${notification.id}:`, dbError);
                    }
                  }
                } else {

                }
              });
          } catch (userError) {
            console.error(`[SYNC-NOTIFICATIONS] Error fetching notifications for user ${userId}:`, userError);
          }
        }

        return {
          entity: 'NOTIFICATIONS',
          online: totalNotifications,
          synced: syncedNotifications,
        };
      } else {
        // Para conteo, obtener el primer usuario y contar
        const firstUser = await this.repositoryStudent.findOne({
          where: { schoolId: schoolData.schoolId, schoolYearId: schoolData.schoolYearId },
          select: ['userId'],
        });

        if (firstUser?.userId) {
          await client
            .request(QUERY_GET_TOTAL_COUNT_NOTIFICATION, { userId: firstUser.userId })
            .then(async (result: any) => {
              totalNotifications = result.data?.totalCount || 0;
            });
        }

        return {
          entity: 'NOTIFICATIONS',
          online: totalNotifications,
        };
      }
    } catch (error) {
      console.error('[SYNC-NOTIFICATIONS] ERROR:', error);
      return {
        entity: 'NOTIFICATIONS',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE CAMPUS
 */
  async syncCampus(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Campus');
          return {
            entity: 'CAMPUS',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`📖 [SYNC-CAMPUS] Sincronizando para schoolId: ${schoolData.schoolId}`);

        await client
          .request(QUERY_GET_ALL_CAMPUS, {
            schoolId: schoolData.schoolId          // ✅ Obligatorio
          })
          .then(async (result: any) => {
            data = result;

            if (data?.data?.edges && data.data.edges.length > 0) {
              let insertedCount = 0;
              let updatedCount = 0;

              for (let i = 0; i < data.data.edges.length; i++) {
                const campusEdge = data.data.edges[i];
                const campus = campusEdge.node;
                const campusId = campus.id;

                try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  const campusDetails = { ...campus };
                  delete campusDetails.id;
                  delete campusDetails.school;

                  // 🔍 BUSCAR SI EXISTE EN LOCAL
                  const existingCampus = await this.repositoryCampus.findOneBy(campusId);

                  if (existingCampus == null) {
                    // ✅ CREAR NUEVO REGISTRO
                    await this.repositoryCampus.save({
                      _id: new ObjectId(campusId),
                      ...campusDetails,
                    });
                    insertedCount++;
                  } else {
                    // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                    await this.repositoryCampus.update(
                      { id: campusId },
                      campusDetails,
                    );
                    updatedCount++;
                  }
                } catch (campusError) {
                  console.error(`❌ [SYNC-CAMPUS] Error procesando campus ${campusId}:`, campusError);
                }
              }

              console.log(`📖 [SYNC-CAMPUS] ✅ Completado: ${insertedCount} creados, ${updatedCount} actualizados`);
            }
          });

        return {
          entity: 'CAMPUS',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        // 📊 SOLO CONTEO - VALIDAR PARÁMETROS OBLIGATORIOS TAMBIÉN
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Campus count');
          return {
            entity: 'CAMPUS',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        await client
          .request(QUERT_GET_TOTAL_COUNT_CAMPUS, {
            schoolId: schoolData.schoolId          // ✅ Obligatorio
          })
          .then(async (result: any) => {
            data = result;
          });

        return {
          entity: 'CAMPUS',
          online: data?.data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error(`[SYNC-CAMPUS] ERROR:`, error);
      return {
        entity: 'CAMPUS',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE EDUCATION LEVEL
 */
  async syncEducationLevel(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Education Level');
          return {
            entity: 'EDUCATION_LEVEL',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`📖 [SYNC-EDUCATION-LEVEL] Sincronizando para schoolId: ${schoolData.schoolId}, schoolYearId: ${schoolData.schoolYearId || 'null'}`);

        await client
          .request(QUERY_GET_ALL_EDUCATION_LEVEL, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId    // ✅ Opcional (puede ser null/undefined)
          })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          console.log(`📖 [SYNC-EDUCATION-LEVEL] Procesando ${data.data.edges.length} niveles educativos...`);

          for (let educationLevelEdge of data.data.edges) {
            let educationLevelId = educationLevelEdge.node.id?.toString();
            let educationLevelDetails = { ...educationLevelEdge.node };

            // 🧹 LIMPIAR CAMPOS DE RELACIONES
            delete educationLevelDetails.id;
            delete educationLevelDetails.school;
            delete educationLevelDetails.schoolYear;

            let existingEducationLevel = await this.repositoryEducationLevel.findOneBy(educationLevelId);

            if (existingEducationLevel == null) {
              // ✅ CREAR NUEVO REGISTRO
              await this.repositoryEducationLevel.save({
                _id: new ObjectId(educationLevelId),
                ...educationLevelDetails,
              });
            } else {
              // 🔄 ACTUALIZAR REGISTRO EXISTENTE
              await this.repositoryEducationLevel.update(
                { id: educationLevelId },
                educationLevelDetails,
              );
            }
          }
        }

        return {
          entity: 'EDUCATION_LEVEL',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        // 📊 SOLO CONTEO - VALIDAR PARÁMETROS OBLIGATORIOS TAMBIÉN
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Education Level count');
          return {
            entity: 'EDUCATION_LEVEL',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        await client
          .request(QUERT_GET_TOTAL_COUNT_EDUCATION_LEVEL, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId    // ✅ Opcional
          })
          .then(async (result: any) => {
            data = result.data;
          });

        return {
          entity: 'EDUCATION_LEVEL',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error(`[SYNC-EDUCATION-LEVEL] ERROR:`, error);
      return {
        entity: 'EDUCATION_LEVEL',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC GRADE
  */
  async syncAcademicGrade(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Grade');
          return {
            entity: 'ACADEMIC_GRADE',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`📖 [SYNC-ACADEMIC-GRADE] Sincronizando para schoolId: ${schoolData.schoolId}, schoolYearId: ${schoolData.schoolYearId || 'null'}`);

        await client
          .request(QUERY_GET_ALL_ACADEMIC_GRADE, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId    // ✅ Opcional (puede ser null/undefined)
          })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          console.log(`📖 [SYNC-ACADEMIC-GRADE] Procesando ${data.data.edges.length} grados académicos...`);

          for (let academicGradeEdge of data.data.edges) {
            let academicGradeId = academicGradeEdge.node.id?.toString();
            let academicGradeDetails = { ...academicGradeEdge.node };

            // 🧹 LIMPIAR CAMPOS DE RELACIONES
            delete academicGradeDetails.id;
            delete academicGradeDetails.school;
            delete academicGradeDetails.educationLevel;
            delete academicGradeDetails.specialty;
            delete academicGradeDetails.generalAcademicCycle;
            delete academicGradeDetails.generalAcademicGrade;
            delete academicGradeDetails.schoolYear;

            let existingAcademicGrade = await this.repositoryAcademicGrade.findOneBy(academicGradeId);

            if (existingAcademicGrade == null) {
              // ✅ CREAR NUEVO REGISTRO
              await this.repositoryAcademicGrade.save({
                _id: new ObjectId(academicGradeId),
                ...academicGradeDetails,
              });
            } else {
              // 🔄 ACTUALIZAR REGISTRO EXISTENTE
              await this.repositoryAcademicGrade.update(
                { id: academicGradeId },
                academicGradeDetails,
              );
            }
          }
        }

        return {
          entity: 'ACADEMIC_GRADE',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        // 📊 SOLO CONTEO - VALIDAR PARÁMETROS OBLIGATORIOS TAMBIÉN
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Grade count');
          return {
            entity: 'ACADEMIC_GRADE',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        await client
          .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_GRADE, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId    // ✅ Opcional
          })
          .then(async (result: any) => {
            data = result.data;
          });

        return {
          entity: 'ACADEMIC_GRADE',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error(`[SYNC-ACADEMIC-GRADE] ERROR:`, error);
      return {
        entity: 'ACADEMIC_GRADE',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE COURSE
 */
async syncCourse(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  let totalOnline = 0;
  let totalSynced = 0;

  try {
    if (typeSyncFull) {
      // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
      if (!schoolData?.schoolId) {
        console.error('❌ schoolData.schoolId es requerido para Course');
        return {
          entity: 'COURSE',
          online: 0,
          error: 'schoolData.schoolId es requerido'
        };
      }

      console.log(`\n🎯 [COURSE] ⚡ MÓDULO INICIANDO...`);
      console.log(`📊 [COURSE] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}`);

      // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
      let campusesToProcess: any[] = [];

      if (schoolData.campusId) {
        // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
        console.log(`\n🏫 [COURSE] Obteniendo información de la sede específica: ${schoolData.campusId}`);
        
        try {
          const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
            schoolId: schoolData.schoolId
          });

          // Filtrar solo el campus específico
          const allCampuses = specificCampusResponse?.data?.edges || [];
          const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

          if (specificCampus) {
            campusesToProcess = [specificCampus];
            console.log(`✅ [COURSE] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
          } else {
            console.log(`⚪ [COURSE] No se encontró la sede especificada: ${schoolData.campusId}`);
            return {
              entity: 'COURSE',
              online: 0,
              synced: 0,
            };
          }
        } catch (campusError) {
          console.error(`❌ [COURSE] Error obteniendo sede específica:`, campusError);
          return {
            entity: 'COURSE',
            online: 0,
            error: 'Error obteniendo sede específica'
          };
        }
      } else {
        // 🌐 MODO GLOBAL (TODAS LAS SEDES)
        console.log(`\n🌐 [COURSE] Sincronización global (todas las sedes)`);
        
        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        campusesToProcess = campusResponse?.data?.edges || [];
        console.log(`✅ [COURSE] ${campusesToProcess.length} sedes encontradas para sincronización global`);
      }

      if (campusesToProcess.length === 0) {
        console.log(`⚠️ [COURSE] No se encontraron sedes para sincronizar`);
        return {
          entity: 'COURSE',
          online: 0,
          synced: 0,
        };
      }

      // 🎯 PASO 2: CALCULAR TOTAL DE CONSULTAS
      let currentCampusIndex = 0;
      let totalEstimatedConsultas = campusesToProcess.length;

      console.log(`🔢 [COURSE] Total consultas estimadas: ${totalEstimatedConsultas} (${campusesToProcess.length} campus)`);

      // 🔄 PASO 3: ITERAR TODAS LAS SEDES SELECCIONADAS
      for (const campusEdge of campusesToProcess) {
        const campus = campusEdge.node;
        const campusId = campus.id;
        const campusName = campus.name || campusId;

        currentCampusIndex++;

        console.log(`\n🏢 [COURSE] Procesando Campus ${currentCampusIndex}/${campusesToProcess.length}: ${campusName} (${campusId})`);

        try {
          // 📊 Actualizar barra de progreso CON INFORMACIÓN DE FILTRO
          this.showProgressBar(
            currentCampusIndex,
            totalEstimatedConsultas,
            `${schoolData.campusId ? `Sede: ${campusName}` : 'Global'} - Campus: ${campusName}`
          );

          // 🎯 PASO 3A: CONSULTA INDIVIDUAL POR CAMPUS
          console.log(`\n🔍 [COURSE] Consultando cursos del campus: ${campusName}`);

          let courseData: any = null;
          await client
            .request(QUERY_GET_ALL_COURSE, {
              schoolId: schoolData.schoolId,        // ✅ Obligatorio
              campusId: campusId,                   // ✅ Obligatorio (de la iteración)
              academicGradeId: null                 // ✅ Opcional (null para obtener todos)
            })
            .then(async (result: any) => {
              courseData = result;
            });

          // 🎯 PASO 3B: PROCESAR RESULTADOS SI EXISTEN
          if (courseData?.data?.edges?.length > 0) {
            console.log(`✅ [COURSE] Encontrados ${courseData.data.edges.length} cursos en campus ${campusName}`);

            totalOnline += courseData.data.edges.length;

            for (const courseEdge of courseData.data.edges) {
              const course = courseEdge.node;
              const courseId = course.id;

              try {
                // 🧹 LIMPIAR CAMPOS DE RELACIONES
                const courseDetails = { ...course };
                delete courseDetails.id;
                delete courseDetails.campus;
                delete courseDetails.school;
                delete courseDetails.academicGrade;
                delete courseDetails.academicDay;
                delete courseDetails.teacher;
                delete courseDetails.schoolYear;
                delete courseDetails.students;

                // 🔍 BUSCAR SI EXISTE EN LOCAL
                const existingCourse = await this.repositoryCourse.findOneBy(courseId);

                if (existingCourse == null) {
                  // ✅ CREAR NUEVO REGISTRO
                  await this.repositoryCourse.save({
                    _id: new ObjectId(courseId),
                    ...courseDetails,
                  });
                } else {
                  // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                  await this.repositoryCourse.update(
                    { id: courseId },
                    courseDetails,
                  );
                }

                totalSynced++;

              } catch (courseError) {
                console.error(`❌ [COURSE] Error procesando Course ${courseId}:`, courseError);
              }
            }
          } else {
            console.log(`⚠️ [COURSE] No hay cursos en el campus ${campusName}`);
          }

        } catch (campusError) {
          console.error(`❌ [COURSE] Error en campus ${campusId}:`, campusError);
        }
      }

      // 📊 Barra de progreso final
      this.showProgressBar(totalEstimatedConsultas, totalEstimatedConsultas, 'Cursos', totalSynced);

      console.log(`\n🎉 [COURSE] ⚡ SINCRONIZACIÓN COMPLETADA:`);
      console.log(`📊 Total campus procesados: ${campusesToProcess.length}`);
      console.log(`📊 Total cursos en línea: ${totalOnline}`);
      console.log(`💾 Total cursos sincronizados: ${totalSynced}`);
      console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);

      return {
        entity: 'COURSE',
        online: totalOnline,
        synced: totalSynced,
      };
    } else {
      // 📊 Solo conteo - APLICAR MISMO FILTRO PARA CONTEO
      if (!schoolData?.schoolId) {
        console.error('❌ schoolData.schoolId es requerido para Course count');
        return {
          entity: 'COURSE',
          online: 0,
          error: 'schoolData.schoolId es requerido'
        };
      }

      try {
        if (schoolData.campusId) {
          // 🏫 CONTEO FILTRADO POR SEDE ESPECÍFICA
          console.log(`📊 [COURSE] Contando registros para sede: ${schoolData.campusId}`);
          
          await client
            .request(QUERT_GET_TOTAL_COUNT_COURSE, {
              schoolId: schoolData.schoolId,
              campusId: schoolData.campusId,
              academicGradeId: null
            })
            .then(async (result: any) => {
              totalOnline = result.data?.totalCount || 0;
            });
        } else {
          // 🌐 CONTEO GLOBAL - USAR LA LÓGICA ORIGINAL
          let campusData: any = null;
          await client
            .request(QUERY_GET_ALL_CAMPUS, {
              schoolId: schoolData.schoolId
            })
            .then(async (result: any) => {
              campusData = result;
            });

          if (campusData?.data?.edges?.length > 0) {
            // Contar cursos de todos los campus
            for (const campusEdge of campusData.data.edges) {
              const campusId = campusEdge.node.id;

              await client
                .request(QUERT_GET_TOTAL_COUNT_COURSE, {
                  schoolId: schoolData.schoolId,
                  campusId: campusId,
                  academicGradeId: null
                })
                .then(async (result: any) => {
                  totalOnline += result.data?.totalCount || 0;
                });
            }
          }
        }
      } catch (countError) {
        console.warn(`⚠️ Error en conteo de cursos:`, countError);
      }

      return {
        entity: 'COURSE',
        online: totalOnline,
      };
    }
  } catch (error) {
    console.error(`❌ [SYNC-COURSE] ERROR GENERAL:`, error);
    return {
      entity: 'COURSE',
      online: 0,
      error: String(error),
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC AREA
  */
  async syncAcademicArea(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Area');
          return {
            entity: 'ACADEMIC_AREA',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`📖 [SYNC-ACADEMIC-AREA] Sincronizando para schoolId: ${schoolData.schoolId}, schoolYearId: ${schoolData.schoolYearId || 'null'}`);

        await client
          .request(QUERY_GET_ALL_ACADEMIC_AREA, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId    // ✅ Opcional (puede ser null/undefined)
          })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          console.log(`📖 [SYNC-ACADEMIC-AREA] Procesando ${data.data.edges.length} áreas académicas...`);

          for (let academicAreaEdge of data.data.edges) {
            let academicAreaId = academicAreaEdge.node.id?.toString();
            let academicAreaDetails = { ...academicAreaEdge.node };

            // 🧹 LIMPIAR CAMPOS DE RELACIONES
            delete academicAreaDetails.id;
            delete academicAreaDetails.school;
            delete academicAreaDetails.generalAcademicArea;
            delete academicAreaDetails.academicGrade;
            delete academicAreaDetails.schoolYear;

            let existingAcademicArea = await this.repositoryAcademicArea.findOneBy(academicAreaId);

            if (existingAcademicArea == null) {
              // ✅ CREAR NUEVO REGISTRO
              await this.repositoryAcademicArea.save({
                _id: new ObjectId(academicAreaId),
                ...academicAreaDetails,
              });
            } else {
              // 🔄 ACTUALIZAR REGISTRO EXISTENTE
              await this.repositoryAcademicArea.update(
                { id: academicAreaId },
                academicAreaDetails,
              );
            }
          }
        }

        return {
          entity: 'ACADEMIC_AREA',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        // 📊 SOLO CONTEO - VALIDAR PARÁMETROS OBLIGATORIOS TAMBIÉN
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Area count');
          return {
            entity: 'ACADEMIC_AREA',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        await client
          .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId    // ✅ Opcional
          })
          .then(async (result: any) => {
            data = result.data;
          });

        return {
          entity: 'ACADEMIC_AREA',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error(`[SYNC-ACADEMIC-AREA] ERROR:`, error);
      return {
        entity: 'ACADEMIC_AREA',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC PERIOD
 */
  async syncAcademicPeriod(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Period');
          return {
            entity: 'ACADEMIC_PERIOD',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`📖 [SYNC-ACADEMIC-PERIOD] Sincronizando para schoolId: ${schoolData.schoolId}, schoolYearId: ${schoolData.schoolYearId || 'null'}`);

        await client
          .request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,          // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId,  // ✅ Opcional 
            orderCustom: false                      // ✅ Obligatorio
          })
          .then(async (result: any) => {
            data = result;

            if (data?.data?.edges && data.data.edges.length > 0) {
              let insertedCount = 0;
              let updatedCount = 0;

              for (let i = 0; i < data.data.edges.length; i++) {
                const periodEdge = data.data.edges[i];
                const period = periodEdge.node;
                const periodId = period.id;

                try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  const periodDetails = { ...period };
                  delete periodDetails.id;
                  delete periodDetails.school;
                  delete periodDetails.schoolYear;

                  // 🔍 BUSCAR SI EXISTE EN LOCAL
                  const existingPeriod = await this.repositoryAcademicPeriod.findOneBy(periodId);

                  if (existingPeriod == null) {
                    // ✅ CREAR NUEVO REGISTRO
                    await this.repositoryAcademicPeriod.save({
                      _id: new ObjectId(periodId),
                      ...periodDetails,
                    });
                    insertedCount++;
                  } else {
                    // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                    await this.repositoryAcademicPeriod.update(
                      { id: periodId },
                      periodDetails,
                    );
                    updatedCount++;
                  }
                } catch (periodError) {
                  console.error(`❌ [SYNC-ACADEMIC-PERIOD] Error procesando período ${periodId}:`, periodError);
                }
              }

              console.log(`📖 [SYNC-ACADEMIC-PERIOD] ✅ Completado: ${insertedCount} creados, ${updatedCount} actualizados`);
            }
          });

        return {
          entity: 'ACADEMIC_PERIOD',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        // 📊 SOLO CONTEO - VALIDAR PARÁMETROS OBLIGATORIOS TAMBIÉN
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Period count');
          return {
            entity: 'ACADEMIC_PERIOD',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        await client
          .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,          // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId,  // ✅ Opcional
            orderCustom: false                      // ✅ Obligatorio
          })
          .then(async (result: any) => {
            data = result;
          });

        return {
          entity: 'ACADEMIC_PERIOD',
          online: data?.data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error(`[SYNC-ACADEMIC-PERIOD] ERROR:`, error);
      return {
        entity: 'ACADEMIC_PERIOD',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE STUDENT
 */
  async syncStudent(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Student');
          return {
            entity: 'STUDENT',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`📖 [SYNC-STUDENT] Sincronizando para schoolId: ${schoolData.schoolId}, schoolYearId: ${schoolData.schoolYearId || 'null'}, campusId: null`);

        await client
          .request(QUERY_GET_ALL_STUDENT, {
            schoolId: schoolData.schoolId,          // ✅ Opcional pero lo enviamos siempre
            schoolYearId: schoolData.schoolYearId,  // ✅ Opcional (puede ser null)
            campusId: null                          // ✅ Opcional (null para traer todos)
          })
          .then(async (result: any) => {
            data = result;

            if (data?.data?.edges && data.data.edges.length > 0) {
              let insertedCount = 0;
              let updatedCount = 0;

              for (let i = 0; i < data.data.edges.length; i++) {
                const studentEdge = data.data.edges[i];
                const student = studentEdge.node;
                const studentId = student.id;

                try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES Y PREPARAR DATOS
                  const studentDetails = { ...student };
                  const userDetails = studentDetails.user ? { ...studentDetails.user } : null;

                  delete studentDetails.id;
                  delete studentDetails.user;
                  delete studentDetails.school;
                  delete studentDetails.campus;
                  delete studentDetails.academicGrade;
                  delete studentDetails.course;
                  delete studentDetails.schoolYear;

                  // 🔍 SINCRONIZAR USUARIO PRIMERO (SI EXISTE)
                  if (userDetails) {
                    const userId = userDetails.id?.toString();
                    delete userDetails.id;

                    const existingUser = await this.repositoryUser.findOneBy(userId);

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

                  // 🔍 BUSCAR SI EXISTE EL ESTUDIANTE EN LOCAL
                  const existingStudent = await this.repositoryStudent.findOneBy(studentId);

                  if (existingStudent == null) {
                    // ✅ CREAR NUEVO REGISTRO
                    await this.repositoryStudent.save({
                      _id: new ObjectId(studentId),
                      ...studentDetails,
                    });
                    insertedCount++;
                  } else {
                    // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                    await this.repositoryStudent.update(
                      { id: studentId },
                      studentDetails,
                    );
                    updatedCount++;
                  }
                } catch (studentError) {
                  console.error(`❌ [SYNC-STUDENT] Error procesando estudiante ${studentId}:`, studentError);
                }
              }

              console.log(`📖 [SYNC-STUDENT] ✅ Completado: ${insertedCount} creados, ${updatedCount} actualizados`);
            }
          });

        return {
          entity: 'STUDENT',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        // 📊 SOLO CONTEO - VALIDAR PARÁMETROS OBLIGATORIOS TAMBIÉN
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Student count');
          return {
            entity: 'STUDENT',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        await client
          .request(QUERT_GET_TOTAL_COUNT_STUDENT, {
            schoolId: schoolData.schoolId,          // ✅ Opcional pero lo enviamos siempre
            schoolYearId: schoolData.schoolYearId,  // ✅ Opcional (puede ser null)
            campusId: null                          // ✅ Opcional (null para contar todos)
          })
          .then(async (result: any) => {
            data = result;
          });

        return {
          entity: 'STUDENT',
          online: data?.data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error(`[SYNC-STUDENT] ERROR:`, error);
      return {
        entity: 'STUDENT',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE PERFORMANCE LEVEL
 */
  async syncPerformanceLevel(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Performance Level');
          return {
            entity: 'PERFORMANCE_LEVEL',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`📖 [SYNC-PERFORMANCE-LEVEL] Sincronizando para schoolId: ${schoolData.schoolId}, schoolYearId: ${schoolData.schoolYearId || 'null'}`);

        await client
          .request(QUERY_GET_ALL_PERFORMANCE_LEVEL, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId    // ✅ Opcional (puede ser null/undefined)
          })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          console.log(`📖 [SYNC-PERFORMANCE-LEVEL] Procesando ${data.data.edges.length} niveles de desempeño...`);

          for (let performanceLevelEdge of data.data.edges) {
            let performanceLevelId = performanceLevelEdge.node.id?.toString();
            let performanceLevelDetails = { ...performanceLevelEdge.node };

            // 🧹 LIMPIAR CAMPOS DE RELACIONES
            delete performanceLevelDetails.id;
            delete performanceLevelDetails.school;
            delete performanceLevelDetails.generalPerformanceLevel;
            delete performanceLevelDetails.campus;
            delete performanceLevelDetails.academicGrades;
            delete performanceLevelDetails.schoolYear;

            let existingPerformanceLevel = await this.repositoryPerformanceLevel.findOneBy(performanceLevelId);

            if (existingPerformanceLevel == null) {
              // ✅ CREAR NUEVO REGISTRO
              await this.repositoryPerformanceLevel.save({
                _id: new ObjectId(performanceLevelId),
                ...performanceLevelDetails,
              });
            } else {
              // 🔄 ACTUALIZAR REGISTRO EXISTENTE
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
        // 📊 SOLO CONTEO - VALIDAR PARÁMETROS OBLIGATORIOS TAMBIÉN
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Performance Level count');
          return {
            entity: 'PERFORMANCE_LEVEL',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        await client
          .request(QUERT_GET_TOTAL_COUNT_PERFORMANCE_LEVEL, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId    // ✅ Opcional
          })
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

  /**
 * 📖 SINCRONIZACIÓN DE CAMPUS ADMINISTRATOR
 */
  async syncCampusAdministrator(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    let totalProcessed = 0;
    let totalSaved = 0;
    let totalErrors = 0;

    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_CAMPUS_ADMINISTRATOR, schoolData)
          .then(async (result: any) => {
            data = result.data;
            const campusAdministrators = data?.edges || [];
            totalProcessed = data?.totalCount || 0;

            if (campusAdministrators.length > 0) {
              for (const edge of campusAdministrators) {
                try {
                  const campusAdmin = edge.node;
                  // 🌟 PASO 1: Crear/actualizar User primero (NO PODEMOS DEJARLO VACIO)
                  if (campusAdmin.user) {
                    const userObjectId = new ObjectId(campusAdmin.user.id);
                    const existingUser = await this.repositoryUser.findOne({
                      where: { _id: userObjectId },
                    });

                    if (existingUser) {
                      await this.repositoryUser.updateOne(
                        { _id: userObjectId },
                        { $set: { ...campusAdmin.user } }
                      );
                    } else {

                      const userToSave = {
                        ...campusAdmin.user,
                        _id: userObjectId  // Usar ObjectId explícito
                      };
                      delete userToSave.id; // Remover id para evitar conflictos
                      await this.repositoryUser.save(userToSave);
                    }
                  }

                  // 🌟 PASO 2: Crear/actualizar CampusAdministrator con userId correcto
                  const existingCampusAdmin = await this.repositoryCampusAdministrator.findOne({
                    where: { _id: new ObjectId(campusAdmin.id) },
                  });

                  if (existingCampusAdmin) {
                    const campusAdminUpdate = { ...campusAdmin };
                    // Asegurar que userId apunte al _id correcto del User (MISMO OBJECTID!)
                    campusAdminUpdate.userId = campusAdmin.user?.id || campusAdmin.userId;
                    delete campusAdminUpdate.user; // Remover objeto user anidado
                    delete campusAdminUpdate.campus; // Remover objeto campus anidado  
                    delete campusAdminUpdate.school; // Remover objeto school anidado
                    await this.repositoryCampusAdministrator.updateOne(
                      { _id: new ObjectId(campusAdmin.id) },
                      { $set: campusAdminUpdate }
                    );
                  } else {

                    const campusAdminToSave = {
                      ...campusAdmin,
                      _id: new ObjectId(campusAdmin.id)
                    };
                    // Asegurar que userId apunte al _id correcto del User (MISMO OBJECTID!)
                    campusAdminToSave.userId = campusAdmin.user?.id || campusAdmin.userId;
                    delete campusAdminToSave.id;
                    delete campusAdminToSave.user; // Remover objeto user anidado
                    delete campusAdminToSave.campus; // Remover objeto campus anidado
                    delete campusAdminToSave.school; // Remover objeto school anidado
                    await this.repositoryCampusAdministrator.save(campusAdminToSave);
                  }
                  totalSaved++;

                } catch (campusAdminError) {
                  console.error(`❌ Error procesando CampusAdministrator individual:`, campusAdminError);
                  totalErrors++;
                }
              }
            }
          });
      } else {

        await client
          .request(QUERY_GET_TOTAL_COUNT_CAMPUS_ADMINISTRATOR, schoolData)
          .then((result: any) => {
            data = result.data;
            totalProcessed = data?.totalCount || 0;

          });
      }
    } catch (error) {
      console.error(`❌ Error sincronizando CampusAdministrator:`, error);
      totalErrors++;
    }

    return {
      entity: 'CAMPUS_ADMINISTRATOR',
      online: totalProcessed,
      synced: totalSaved,
    };
  }

  /**
 * 📖 SINCRONIZACIÓN DE CAMPUS COORDINATOR
 */
  async syncCampusCoordinator(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    let totalProcessed = 0;
    let totalSaved = 0;
    let totalErrors = 0;

    try {
      if (typeSyncFull) {
        await client
          .request(QUERY_GET_ALL_CAMPUS_COORDINATOR, schoolData)
          .then(async (result: any) => {
            data = result.data;
            const campusCoordinators = data?.edges || [];
            totalProcessed = data?.totalCount || 0;

            if (campusCoordinators.length > 0) {
              for (const edge of campusCoordinators) {
                try {
                  const campusCoord = edge.node;

                  // 🌟 PASO 1: Crear/actualizar User primero (NO PODEMOS DEJARLO VACIO)
                  if (campusCoord.user) {
                    const userObjectId = new ObjectId(campusCoord.user.id);
                    const existingUser = await this.repositoryUser.findOne({
                      where: { _id: userObjectId },
                    });

                    if (existingUser) {
                      await this.repositoryUser.updateOne(
                        { _id: userObjectId },
                        { $set: { ...campusCoord.user } }
                      );
                    } else {

                      const userToSave = {
                        ...campusCoord.user,
                        _id: userObjectId  // Usar ObjectId explícito
                      };
                      delete userToSave.id; // Remover id para evitar conflictos
                      await this.repositoryUser.save(userToSave);
                    }
                  }

                  // 🌟 PASO 2: Crear/actualizar CampusCoordinator con userId correcto
                  const existingCampusCoord = await this.repositoryCampusCoordinator.findOne({
                    where: { _id: new ObjectId(campusCoord.id) },
                  });

                  if (existingCampusCoord) {
                    const campusCoordUpdate = { ...campusCoord };
                    // Asegurar que userId apunte al _id correcto del User (MISMO OBJECTID!)
                    campusCoordUpdate.userId = campusCoord.user?.id || campusCoord.userId;
                    delete campusCoordUpdate.user; // Remover objeto user anidado
                    delete campusCoordUpdate.campus; // Remover objeto campus anidado  
                    delete campusCoordUpdate.school; // Remover objeto school anidado
                    
                    await this.repositoryCampusCoordinator.updateOne(
                      { _id: new ObjectId(campusCoord.id) },
                      { $set: campusCoordUpdate }
                    );
                  } else {

                    const campusCoordToSave = {
                      ...campusCoord,
                      _id: new ObjectId(campusCoord.id)
                    };
                    // Asegurar que userId apunte al _id correcto del User (MISMO OBJECTID!)
                    campusCoordToSave.userId = campusCoord.user?.id || campusCoord.userId;
                    delete campusCoordToSave.id;
                    delete campusCoordToSave.user; // Remover objeto user anidado
                    delete campusCoordToSave.campus; // Remover objeto campus anidado
                    delete campusCoordToSave.school; // Remover objeto school anidado

                    if (campusCoordToSave.userId) {
                      campusCoordToSave.userId = new ObjectId(campusCoordToSave.userId);
                    }

                    await this.repositoryCampusCoordinator.save(campusCoordToSave);
                  }
                  totalSaved++;

                } catch (campusCoordError) {
                  console.error(`❌ Error procesando CampusCoordinator individual:`, campusCoordError);
                  totalErrors++;
                }
              }
            }
          });
      } else {

        await client
          .request(QUERY_GET_TOTAL_COUNT_CAMPUS_COORDINATOR, schoolData)
          .then((result: any) => {
            data = result.data;
            totalProcessed = data?.totalCount || 0;

          });
      }
    } catch (error) {
      console.error(`❌ Error sincronizando CampusCoordinator:`, error);
      totalErrors++;
    }

    return {
      entity: 'CAMPUS_COORDINATOR',
      online: totalProcessed,
      synced: totalSaved,
    };
  }

  /**
 * 📖 SINCRONIZACIÓN DE SCHOOL ADMINISTRATIVE
 */
  async syncSchoolAdministrative(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let totalProcessed = 0;
    let totalSaved = 0;
    let totalErrors = 0;

    try {
      if (typeSyncFull) {
        let data: any;
        await client
          .request(QUERY_GET_ALL_SCHOOL_ADMINISTRATIVE, schoolData)
          .then((result: any) => {
            data = result.data;
          });

        if (data?.edges && Array.isArray(data.edges)) {
          totalProcessed = data.edges.length;
          await Promise.all(
            data.edges.map(async (edge: any) => {
              const schoolAdmin = edge.node;
              if (schoolAdmin) {
                try {
                  // 1. Sincronizar el User asociado si existe
                  if (schoolAdmin.user) {
                    const userData = schoolAdmin.user;
                    const userObjectId = new ObjectId(userData.id);
                    const existingUser = await this.repositoryUser.findOne({
                      where: { _id: userObjectId },
                    });

                    if (existingUser) {
                      await this.repositoryUser.updateOne(
                        { _id: userObjectId },
                        { $set: { ...userData } }
                      );
                    } else {
                      const userToSave = {
                        ...userData,
                        _id: userObjectId
                      };
                      delete userToSave.id;
                      await this.repositoryUser.insertOne(userToSave);
                    }
                  }

                  // 2. Verificar si el SchoolAdministrative ya existe
                  const existingSchoolAdmin = await this.repositorySchoolAdministrative.findOne({
                    where: { _id: new ObjectId(schoolAdmin.id) },
                  });

                  if (existingSchoolAdmin) {
                    const schoolAdminUpdate = { ...schoolAdmin };
                    schoolAdminUpdate.userId = schoolAdmin.user?.id || schoolAdmin.userId;
                    delete schoolAdminUpdate.user;
                    delete schoolAdminUpdate.school;
                    await this.repositorySchoolAdministrative.updateOne(
                      { _id: new ObjectId(schoolAdmin.id) },
                      { $set: schoolAdminUpdate }
                    );
                  } else {
                    const schoolAdminToSave = {
                      ...schoolAdmin,
                      _id: new ObjectId(schoolAdmin.id)
                    };
                    schoolAdminToSave.userId = schoolAdmin.user?.id || schoolAdmin.userId;
                    delete schoolAdminToSave.id;
                    delete schoolAdminToSave.user;
                    delete schoolAdminToSave.school;
                    await this.repositorySchoolAdministrative.insertOne(schoolAdminToSave);
                  }
                  totalSaved++;
                } catch (schoolAdminError) {
                  console.error(`❌ Error procesando SchoolAdministrative individual:`, schoolAdminError);
                  totalErrors++;
                }
              }
            })
          );
        }
      } else {

        let data: any;
        await client
          .request(QUERY_GET_TOTAL_COUNT_SCHOOL_ADMINISTRATIVE, schoolData)
          .then((result: any) => {
            data = result.data;
            totalProcessed = data?.totalCount || 0;
          });
      }
    } catch (error) {
      console.error(`❌ Error sincronizando SchoolAdministrative:`, error);
      totalErrors++;
    }

    return {
      entity: 'SCHOOL_ADMINISTRATIVE',
      online: totalProcessed,
      synced: totalSaved,
    };
  }

  /**
 * 📖 SINCRONIZACIÓN DE SCHOOL ADMINISTRATOR
 */
  async syncSchoolAdministrator(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let totalProcessed = 0;
    let totalSaved = 0;
    let totalErrors = 0;

    try {
      if (typeSyncFull) {
        let data: any;
        await client
          .request(QUERY_GET_ALL_SCHOOL_ADMINISTRATOR, schoolData)
          .then((result: any) => {
            data = result.data;
          });

        if (data?.edges && Array.isArray(data.edges)) {
          totalProcessed = data.edges.length;
          await Promise.all(
            data.edges.map(async (edge: any) => {
              const schoolAdmin = edge.node;
              if (schoolAdmin) {
                try {
                  // 1. Sincronizar el User asociado si existe
                  if (schoolAdmin.user) {
                    const userData = schoolAdmin.user;
                    const userObjectId = new ObjectId(userData.id);
                    const existingUser = await this.repositoryUser.findOne({
                      where: { _id: userObjectId },
                    });

                    if (existingUser) {
                      await this.repositoryUser.updateOne(
                        { _id: userObjectId },
                        { $set: { ...userData } }
                      );
                    } else {

                      const userToSave = {
                        ...userData,
                        _id: userObjectId
                      };
                      delete userToSave.id;
                      await this.repositoryUser.insertOne(userToSave);
                    }
                  }

                  // 2. Verificar si el SchoolAdministrator ya existe
                  const existingSchoolAdmin = await this.repositorySchoolAdministrator.findOne({
                    where: { _id: new ObjectId(schoolAdmin.id) },
                  });

                  if (existingSchoolAdmin) {

                    const schoolAdminUpdate = { ...schoolAdmin };
                    schoolAdminUpdate.userId = schoolAdmin.user?.id || schoolAdmin.userId;
                    delete schoolAdminUpdate.user;
                    delete schoolAdminUpdate.school;
                    await this.repositorySchoolAdministrator.updateOne(
                      { _id: new ObjectId(schoolAdmin.id) },
                      { $set: schoolAdminUpdate }
                    );
                  } else {

                    const schoolAdminToSave = {
                      ...schoolAdmin,
                      _id: new ObjectId(schoolAdmin.id)
                    };
                    schoolAdminToSave.userId = schoolAdmin.user?.id || schoolAdmin.userId;
                    delete schoolAdminToSave.id;
                    delete schoolAdminToSave.user;
                    delete schoolAdminToSave.school;
                    await this.repositorySchoolAdministrator.insertOne(schoolAdminToSave);
                  }
                  totalSaved++;
                } catch (schoolAdminError) {
                  console.error(`❌ Error procesando SchoolAdministrator individual:`, schoolAdminError);
                  totalErrors++;
                }
              }
            })
          );
        }
      } else {

        let data: any;
        await client
          .request(QUERY_GET_TOTAL_COUNT_SCHOOL_ADMINISTRATOR, schoolData)
          .then((result: any) => {
            data = result.data;
            totalProcessed = data?.totalCount || 0;

          });
      }
    } catch (error) {
      console.error(`❌ Error sincronizando SchoolAdministrator:`, error);
      totalErrors++;
    }

    return {
      entity: 'SCHOOL_ADMINISTRATOR',
      online: totalProcessed,
      synced: totalSaved,
    };
  }

  /**
 * 📖 SINCRONIZACIÓN DE SCHOOL CONFIGURATION
 */
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

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC ASIGNATURE
  */
  async syncAcademicAsignature(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let data: any = null;
    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Asignature');
          return {
            entity: 'ACADEMIC_ASIGNATURE',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`📖 [SYNC-ACADEMIC-ASIGNATURE] Sincronizando para schoolId: ${schoolData.schoolId}, schoolYearId: ${schoolData.schoolYearId || 'null'}, academicAreaId: null`);

        await client
          .request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId,   // ✅ Opcional (puede ser null/undefined)
            academicAreaId: null                     // ✅ Opcional (null para obtener todas)
          })
          .then(async (result: any) => {
            data = result;
          });

        if (data?.data?.edges && data.data.edges.length > 0) {
          console.log(`📖 [SYNC-ACADEMIC-ASIGNATURE] Procesando ${data.data.edges.length} asignaturas académicas...`);

          for (let academicAsignatureEdge of data.data.edges) {
            let academicAsignatureId = academicAsignatureEdge.node.id?.toString();
            let academicAsignatureDetails = { ...academicAsignatureEdge.node };

            // 🧹 LIMPIAR CAMPOS DE RELACIONES
            delete academicAsignatureDetails.id;
            delete academicAsignatureDetails.school;
            delete academicAsignatureDetails.academicArea;
            delete academicAsignatureDetails.academicGrade;
            delete academicAsignatureDetails.generalAcademicAsignature;
            delete academicAsignatureDetails.schoolYear;

            let existingAcademicAsignature = await this.repositoryAcademicAsignature.findOneBy(academicAsignatureId);

            if (existingAcademicAsignature == null) {
              // ✅ CREAR NUEVO REGISTRO
              await this.repositoryAcademicAsignature.save({
                _id: new ObjectId(academicAsignatureId),
                ...academicAsignatureDetails,
              });
            } else {
              // 🔄 ACTUALIZAR REGISTRO EXISTENTE
              await this.repositoryAcademicAsignature.update(
                { id: academicAsignatureId },
                academicAsignatureDetails,
              );
            }
          }
        }

        return {
          entity: 'ACADEMIC_ASIGNATURE',
          online: data?.data?.edges?.length || 0,
        };
      } else {
        // 📊 SOLO CONTEO - VALIDAR PARÁMETROS OBLIGATORIOS TAMBIÉN
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Asignature count');
          return {
            entity: 'ACADEMIC_ASIGNATURE',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        await client
          .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId,   // ✅ Opcional
            academicAreaId: null                     // ✅ Opcional (null para contar todas)
          })
          .then(async (result: any) => {
            data = result.data;
          });

        return {
          entity: 'ACADEMIC_ASIGNATURE',
          online: data?.totalCount || 0,
        };
      }
    } catch (error) {
      console.error(`[SYNC-ACADEMIC-ASIGNATURE] ERROR:`, error);
      return {
        entity: 'ACADEMIC_ASIGNATURE',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE AVERAGE ACADEMIC PERIOD STUDENT
 */
async syncAverageAcademicPeriodStudent(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  let totalOnline = 0;
  let totalSynced = 0;

  try {
    if (typeSyncFull) {
      // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
      if (!schoolData?.schoolId) {
        console.error('❌ schoolData.schoolId es requerido para Average Academic Period Student');
        return {
          entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
          online: 0,
          error: 'schoolData.schoolId es requerido'
        };
      }

      console.log(`\n🎯 [AVERAGE-ACADEMIC-PERIOD-STUDENT] ⚡ MÓDULO INICIANDO...`);
      console.log(`📊 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}`);

      // 🚀 PASO 1: OBTENER PERÍODOS ACADÉMICOS (FILTRADOS O TODOS)
      console.log(`\n📅 [AVERAGE-ACADEMIC-PERIOD-STUDENT] PASO 1: Obteniendo períodos académicos...`);

      let academicPeriodsToProcess: any[] = [];

      if (schoolData.academicPeriodId) {
        // 📅 MODO FILTRADO POR PERÍODO ESPECÍFICO
        console.log(`\n📅 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Obteniendo información del período específico: ${schoolData.academicPeriodId}`);
        
        let allPeriodsData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCustom: false
          })
          .then(async (result: any) => {
            allPeriodsData = result;
          });

        if (allPeriodsData?.data?.edges?.length) {
          // Filtrar solo el período específico
          const specificPeriod = allPeriodsData.data.edges.find((edge: any) => edge.node.id === schoolData.academicPeriodId);
          
          if (specificPeriod) {
            academicPeriodsToProcess = [specificPeriod];
            console.log(`✅ [AVERAGE-ACADEMIC-PERIOD-STUDENT] Período encontrado: ${specificPeriod.node.name || specificPeriod.node.id} (${schoolData.academicPeriodId})`);
          } else {
            console.log(`⚪ [AVERAGE-ACADEMIC-PERIOD-STUDENT] No se encontró el período especificado: ${schoolData.academicPeriodId}`);
            return {
              entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
              online: 0,
              synced: 0,
            };
          }
        } else {
          console.log(`⚠️ [AVERAGE-ACADEMIC-PERIOD-STUDENT] No se encontraron períodos académicos`);
          return {
            entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
            online: 0,
            synced: 0,
          };
        }
      } else {
        // 🌐 MODO GLOBAL (TODOS LOS PERÍODOS)
        console.log(`\n🌐 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Sincronización global (todos los períodos)`);
        
        let academicPeriodsData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCustom: false
          })
          .then(async (result: any) => {
            academicPeriodsData = result;
          });

        if (!academicPeriodsData?.data?.edges?.length) {
          console.log(`⚠️ [AVERAGE-ACADEMIC-PERIOD-STUDENT] No se encontraron períodos académicos`);
          return {
            entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
            online: 0,
            synced: 0,
          };
        }

        academicPeriodsToProcess = academicPeriodsData.data.edges;
        console.log(`✅ [AVERAGE-ACADEMIC-PERIOD-STUDENT] ${academicPeriodsToProcess.length} períodos encontrados para sincronización global`);
      }

      // 🎯 PASO 2: VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
      let campusesToProcess: any[] = [];

      if (schoolData.campusId) {
        // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
        console.log(`\n🏫 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Obteniendo información de la sede específica: ${schoolData.campusId}`);
        
        try {
          const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
            schoolId: schoolData.schoolId
          });

          // Filtrar solo el campus específico
          const allCampuses = specificCampusResponse?.data?.edges || [];
          const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

          if (specificCampus) {
            campusesToProcess = [specificCampus];
            console.log(`✅ [AVERAGE-ACADEMIC-PERIOD-STUDENT] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
          } else {
            console.log(`⚪ [AVERAGE-ACADEMIC-PERIOD-STUDENT] No se encontró la sede especificada: ${schoolData.campusId}`);
            return {
              entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
              online: 0,
              synced: 0,
            };
          }
        } catch (campusError) {
          console.error(`❌ [AVERAGE-ACADEMIC-PERIOD-STUDENT] Error obteniendo sede específica:`, campusError);
          return {
            entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
            online: 0,
            error: 'Error obteniendo sede específica'
          };
        }
      } else {
        // 🌐 MODO GLOBAL (TODAS LAS SEDES)
        console.log(`\n🌐 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Sincronización global (todas las sedes)`);
        
        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        campusesToProcess = campusResponse?.data?.edges || [];
        console.log(`✅ [AVERAGE-ACADEMIC-PERIOD-STUDENT] ${campusesToProcess.length} sedes encontradas para sincronización global`);
      }

      if (campusesToProcess.length === 0) {
        console.log(`⚠️ [AVERAGE-ACADEMIC-PERIOD-STUDENT] No se encontraron sedes para sincronizar`);
        return {
          entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
          online: 0,
          synced: 0,
        };
      }

      // 🚀 PASO 3: OBTENER TODOS LOS CURSOS DE LAS SEDES SELECCIONADAS
      console.log(`\n🏫 [AVERAGE-ACADEMIC-PERIOD-STUDENT] PASO 3: Obteniendo cursos de las sedes seleccionadas...`);

      let allCourses: any[] = [];
      for (const campusEdge of campusesToProcess) {
        const campus = campusEdge.node;
        const campusId = campus.id;
        const campusName = campus.name || 'Sin nombre';

        console.log(`🏢 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Obteniendo cursos del campus: ${campusName} (${campusId})`);

        try {
          let coursesData: any = null;
          await client
            .request(QUERY_GET_ALL_COURSE, {
              schoolId: schoolData.schoolId,
              campusId: campusId,           // ✅ Campus específico
              academicGradeId: null
            })
            .then(async (result: any) => {
              coursesData = result;
            });

          if (coursesData?.data?.edges?.length > 0) {
            allCourses.push(...coursesData.data.edges);
            console.log(`✅ [AVERAGE-ACADEMIC-PERIOD-STUDENT] Campus ${campusName}: ${coursesData.data.edges.length} cursos`);
          } else {
            console.log(`⚪ [AVERAGE-ACADEMIC-PERIOD-STUDENT] Campus ${campusName}: 0 cursos`);
          }
        } catch (campusError) {
          console.error(`❌ [AVERAGE-ACADEMIC-PERIOD-STUDENT] Error en campus ${campusId}:`, campusError);
        }
      }

      console.log(`🏫 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Total cursos encontrados: ${allCourses.length}`);

      if (allCourses.length === 0) {
        console.log(`⚠️ [AVERAGE-ACADEMIC-PERIOD-STUDENT] No se encontraron cursos en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}`);
        return {
          entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
          online: 0,
          synced: 0,
        };
      }

      // 🎯 PASO 4: CALCULAR TOTAL DE CONSULTAS (Para barra de progreso)
      let currentQueryIndex = 0;
      let totalEstimatedQueries = academicPeriodsToProcess.length * allCourses.length;

      console.log(`🔢 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Total consultas estimadas: ${totalEstimatedQueries} (${academicPeriodsToProcess.length} períodos × ${allCourses.length} cursos)`);

      // 🔄 PASO 5: ITERAR TODAS LAS COMBINACIONES PERÍODO + CURSO
      for (const periodEdge of academicPeriodsToProcess) {
        const academicPeriod = periodEdge.node;
        const academicPeriodId = academicPeriod.id;
        const periodName = academicPeriod.name || academicPeriodId;

        console.log(`\n📅 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Procesando período: ${periodName} (${academicPeriodId})`);

        for (const courseEdge of allCourses) {
          const course = courseEdge.node;
          const courseId = course.id;
          const courseName = course.name || courseId;

          currentQueryIndex++;

          try {
            // 📊 Actualizar barra de progreso CON INFORMACIÓN DE FILTROS
            const filterInfo = [];
            if (schoolData.campusId) filterInfo.push(`Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}`);
            if (schoolData.academicPeriodId) filterInfo.push(`Período: ${periodName}`);
            const filterText = filterInfo.length > 0 ? filterInfo.join(' | ') : 'Global';
            
            this.showProgressBar(
              currentQueryIndex,
              totalEstimatedQueries,
              `${filterText} - ${periodName} → ${courseName}`
            );

            // 🎯 PASO 5A: CONSULTA INDIVIDUAL POR PERÍODO + CURSO
            console.log(`\n🔍 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Consultando promedios: ${periodName} → ${courseName}`);

            let averagesData: any = null;
            await client
              .request(QUERY_GET_ALL_AVERAGE_ACADEMIC_PERIOD_STUDENT, {
                academicPeriodId: academicPeriodId,   // ✅ Opcional (de la iteración)
                courseId: courseId,                   // ✅ Opcional (de la iteración)
                orderCreated: true,                   // ✅ Fijo
                allData: true                         // ✅ Fijo
              })
              .then(async (result: any) => {
                averagesData = result;
              });

            // 🎯 PASO 5B: PROCESAR RESULTADOS SI EXISTEN
            if (averagesData?.data?.edges?.length > 0) {
              console.log(`✅ [AVERAGE-ACADEMIC-PERIOD-STUDENT] Encontrados ${averagesData.data.edges.length} promedios: ${periodName} → ${courseName}`);

              totalOnline += averagesData.data.edges.length;

              for (const averageEdge of averagesData.data.edges) {
                const average = averageEdge.node;
                const averageId = average.id;

                try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  const averageDetails = { ...average };
                  delete averageDetails.id;
                  delete averageDetails.campus;
                  delete averageDetails.school;
                  delete averageDetails.academicPeriod;
                  delete averageDetails.course;
                  delete averageDetails.student;
                  delete averageDetails.performanceLevel;

                  if (averageDetails.performanceLevelId) {
                    averageDetails.performanceLevelId = new ObjectId(averageDetails.performanceLevelId);
                  }

                  // 🔍 BUSCAR SI EXISTE EN LOCAL
                  const existingAverage = await this.repositoryAverageAcademicPeriodStudent.findOneBy(averageId);

                  if (existingAverage == null) {
                    // ✅ CREAR NUEVO REGISTRO
                    await this.repositoryAverageAcademicPeriodStudent.save({
                      _id: new ObjectId(averageId),
                      ...averageDetails,
                    });
                  } else {
                    // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                    await this.repositoryAverageAcademicPeriodStudent.update(
                      { id: averageId },
                      averageDetails,
                    );
                  }

                  totalSynced++;

                } catch (averageError) {
                  console.error(`❌ [AVERAGE-ACADEMIC-PERIOD-STUDENT] Error procesando promedio ${averageId}:`, averageError);
                }
              }
            } else {
              console.log(`⚠️ [AVERAGE-ACADEMIC-PERIOD-STUDENT] No hay promedios: ${periodName} → ${courseName}`);
            }

          } catch (queryError) {
            console.error(`❌ [AVERAGE-ACADEMIC-PERIOD-STUDENT] Error en consulta ${periodName} → ${courseName}:`, queryError);
          }
        }
      }

      // 📊 Barra de progreso final
      this.showProgressBar(totalEstimatedQueries, totalEstimatedQueries, 'Promedios por Período', totalSynced);

      console.log(`\n🎉 [AVERAGE-ACADEMIC-PERIOD-STUDENT] ⚡ SINCRONIZACIÓN COMPLETADA:`);
      console.log(`📊 Total períodos procesados: ${academicPeriodsToProcess.length}`);
      console.log(`📊 Total cursos procesados: ${allCourses.length}`);
      console.log(`📊 Total promedios en línea: ${totalOnline}`);
      console.log(`💾 Total promedios sincronizados: ${totalSynced}`);
      
      // Mostrar filtros aplicados
      const filtersApplied = [];
      if (schoolData.campusId) {
        filtersApplied.push(`Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})`);
      }
      if (schoolData.academicPeriodId) {
        filtersApplied.push(`Período: ${academicPeriodsToProcess[0]?.node?.name || schoolData.academicPeriodId} (${schoolData.academicPeriodId})`);
      }
      
      if (filtersApplied.length > 0) {
        console.log(`🎯 Filtros aplicados: ${filtersApplied.join(' | ')}`);
      } else {
        console.log(`🎯 Filtro aplicado: Global (todas las sedes y períodos)`);
      }
      
      console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
      console.log(`📅 Períodos procesados: ${academicPeriodsToProcess.length}`);

      return {
        entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
        online: totalOnline,
        synced: totalSynced,
      };
    } else {
      // 📊 Solo conteo - APLICAR MISMOS FILTROS PARA CONTEO
      if (!schoolData?.schoolId) {
        console.error('❌ schoolData.schoolId es requerido para Average Academic Period Student count');
        return {
          entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
          online: 0,
          error: 'schoolData.schoolId es requerido'
        };
      }

      try {
        // Obtener períodos (filtrados o todos)
        let periodsToCount: any[] = [];
        
        if (schoolData.academicPeriodId) {
          // 📅 CONTEO PARA PERÍODO ESPECÍFICO
          console.log(`📊 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Contando registros para período: ${schoolData.academicPeriodId}`);
          
          const allPeriodsResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCustom: false
          });

          if (allPeriodsResponse?.data?.edges) {
            const specificPeriod = allPeriodsResponse.data.edges.find((edge: any) => edge.node.id === schoolData.academicPeriodId);
            if (specificPeriod) {
              periodsToCount = [specificPeriod];
            }
          }
        } else {
          // Todos los períodos
          const academicPeriodsResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCustom: false
          });
          periodsToCount = academicPeriodsResponse?.data?.edges || [];
        }

        console.log(`📅 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Períodos a contar: ${periodsToCount.length}`);

        if (schoolData.campusId) {
          // 🏫 CONTEO FILTRADO POR SEDE Y PERÍODO ESPECÍFICOS
          console.log(`📊 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Contando registros para sede: ${schoolData.campusId}`);
          
          // Obtener cursos de la sede específica
          const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
            schoolId: schoolData.schoolId,
            campusId: schoolData.campusId,
            academicGradeId: null
          });

          const courses = coursesResponse?.data?.edges || [];
          console.log(`📚 [AVERAGE-ACADEMIC-PERIOD-STUDENT] Cursos encontrados en sede ${schoolData.campusId}: ${courses.length}`);

          // Contar promedios por cada combinación período + curso de la sede
          for (const periodEdge of periodsToCount) {
            const academicPeriodId = periodEdge.node.id;
            
            for (const courseEdge of courses) {
              const courseId = courseEdge.node.id;
              
              try {
                const countResponse: any = await client.request(QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_PERIOD_STUDENT, {
                  academicPeriodId: academicPeriodId,
                  courseId: courseId,
                  orderCreated: true,
                  allData: true
                });

                totalOnline += countResponse.data?.totalCount || 0;
              } catch (combinationCountError) {
                console.warn(`⚠️ Error contando promedios del período ${academicPeriodId} - curso ${courseId}:`, combinationCountError);
              }
            }
          }
        } else {
          // 🌐 CONTEO GLOBAL O POR PERÍODO
          if (schoolData.academicPeriodId) {
            // Conteo para período específico (todos los cursos)
            for (const periodEdge of periodsToCount) {
              const countResponse: any = await client.request(QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_PERIOD_STUDENT, {
                academicPeriodId: periodEdge.node.id,
                courseId: null,
                orderCreated: true,
                allData: true
              });
              totalOnline += countResponse.data?.totalCount || 0;
            }
          } else {
            // Conteo global (todos los períodos y cursos)
            await client
              .request(QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_PERIOD_STUDENT, {
                academicPeriodId: null,
                courseId: null,
                orderCreated: true,
                allData: true
              })
              .then(async (result: any) => {
                totalOnline = result.data?.totalCount || 0;
              });
          }
        }
      } catch (countError) {
        console.warn(`⚠️ Error en conteo de promedios por período:`, countError);
      }

      return {
        entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
        online: totalOnline,
      };
    }
  } catch (error) {
    console.error(`❌ [SYNC-AVERAGE-ACADEMIC-PERIOD-STUDENT] ERROR GENERAL:`, error);
    return {
      entity: 'AVERAGE_ACADEMIC_PERIOD_STUDENT',
      online: 0,
      error: String(error),
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE AVERAGE ACADEMIC YEAR COURSE
 */
async syncAverageAcademicYearCourse(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  let totalOnline = 0;
  let totalSynced = 0;

  try {
    console.log(`\n🎯 [AVERAGE-ACADEMIC-YEAR-COURSE] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [AVERAGE-ACADEMIC-YEAR-COURSE] Parámetros: schoolYearId=${schoolData.schoolYearId}`);

    if (typeSyncFull) {
      // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
      if (!schoolData?.schoolYearId) {
        console.error('❌ schoolData.schoolYearId es requerido para Average Academic Year Course');
        return {
          entity: 'AVERAGE_ACADEMIC_YEAR_COURSE',
          online: 0,
          error: 'schoolData.schoolYearId es requerido'
        };
      }

      // 🎯 CONSULTAR TODOS LOS AVERAGE ACADEMIC YEAR COURSE POR SCHOOL YEAR ID
      console.log(`🔍 [AVERAGE-ACADEMIC-YEAR-COURSE] Consultando promedios por schoolYearId: ${schoolData.schoolYearId}`);

      await client
        .request(QUERY_GET_ALL_AVERAGE_ACADEMIC_YEAR_COURSE, {
          schoolYearId: schoolData.schoolYearId,
          orderCreated: true,
          allData: true
        })
        .then(async (result: any) => {
          const data = result.data;

          if (data?.edges?.length > 0) {
            console.log(`✅ [AVERAGE-ACADEMIC-YEAR-COURSE] Encontrados ${data.edges.length} promedios académicos anuales`);
            totalOnline = data.totalCount || data.edges.length;

            // 📊 Actualizar barra de progreso inicial
            this.showProgressBar(0, data.edges.length, 'Promedios Académicos Anuales');

            // 🔄 PROCESAR CADA PROMEDIO ACADÉMICO ANUAL
            for (let i = 0; i < data.edges.length; i++) {
              const edge = data.edges[i];
              const average = edge.node;
              const averageId = average.id;

              try {
                // 📊 Actualizar barra de progreso
                this.showProgressBar(
                  i + 1,
                  data.edges.length,
                  `Procesando promedio ${i + 1}/${data.edges.length} - ID: ${averageId.slice(-6)}`
                );

                // 🧹 PREPARAR DATOS PARA GUARDAR
                const averageDetails = { ...average };
                delete averageDetails.id;
                // Remover relaciones anidadas que no necesitamos guardar
                delete averageDetails.campus;
                delete averageDetails.school;
                delete averageDetails.schoolYear;
                delete averageDetails.course;
                delete averageDetails.performanceLevel;
                if(averageDetails.performanceLevelId) {
                  averageDetails.performanceLevelId = new ObjectId(averageDetails.performanceLevelId);
                }

                // 🔍 BUSCAR SI YA EXISTE EN LA BASE DE DATOS LOCAL
                const existingAverage = await this.repositoryAverageAcademicYearCourse.findOne({
                  where: { _id: averageId }
                });

                if (existingAverage) {
                  // 🔄 ACTUALIZAR REGISTRO EXISTENTE (solo actualizar campos, mantener _id)
                  await this.repositoryAverageAcademicYearCourse.updateOne(
                    { _id: averageId },
                    { $set: averageDetails }
                  );
                  console.log(`🔄 [AVERAGE-ACADEMIC-YEAR-COURSE] Actualizado promedio ${averageId}`);
                } else {
                  // ✅ CREAR NUEVO REGISTRO (usar el ID original como _id de MongoDB)
                  await this.repositoryAverageAcademicYearCourse.save({
                    _id: new ObjectId(averageId),
                    ...averageDetails
                  });
                  console.log(`🆕 [AVERAGE-ACADEMIC-YEAR-COURSE] Creado promedio ${averageId}`);
                }

                totalSynced++;

              } catch (averageError) {
                console.error(`❌ [AVERAGE-ACADEMIC-YEAR-COURSE] Error procesando promedio ${averageId}:`, averageError);
              }
            }
          } else {
            console.log(`⚪ [AVERAGE-ACADEMIC-YEAR-COURSE] No hay promedios académicos anuales para schoolYearId: ${schoolData.schoolYearId}`);
          }
        });

      // 📊 Barra de progreso final
      this.showProgressBar(totalOnline, totalOnline, 'Promedios Académicos Anuales', totalSynced);

      console.log(`\n🎉 [AVERAGE-ACADEMIC-YEAR-COURSE] ⚡ SINCRONIZACIÓN COMPLETADA:`);
      console.log(`📊 Total promedios académicos anuales en línea: ${totalOnline}`);
      console.log(`💾 Total promedios académicos anuales sincronizados: ${totalSynced}`);
      console.log(`🎯 Filtro aplicado: schoolYearId=${schoolData.schoolYearId}`);

      return {
        entity: 'AVERAGE_ACADEMIC_YEAR_COURSE',
        online: totalOnline,
        synced: totalSynced,
      };
    } else {
      // 📊 SOLO CONTEO
      if (!schoolData?.schoolYearId) {
        console.error('❌ schoolData.schoolYearId es requerido para Average Academic Year Course count');
        return {
          entity: 'AVERAGE_ACADEMIC_YEAR_COURSE',
          online: 0,
          error: 'schoolData.schoolYearId es requerido'
        };
      }

      await client
        .request(QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_YEAR_COURSE, {
          schoolYearId: schoolData.schoolYearId,
          orderCreated: true,
          allData: true
        })
        .then(async (result: any) => {
          totalOnline = result.data?.totalCount || 0;
        });

      console.log(`📊 [AVERAGE-ACADEMIC-YEAR-COURSE] Total en línea (solo conteo): ${totalOnline}`);

      return {
        entity: 'AVERAGE_ACADEMIC_YEAR_COURSE',
        online: totalOnline,
      };
    }
  } catch (error) {
    console.error('[SYNC-AVERAGE-ACADEMIC-YEAR-COURSE] ERROR:', error);
    return {
      entity: 'AVERAGE_ACADEMIC_YEAR_COURSE',
      online: 0,
      error: String(error),
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE AVERAGE ACADEMIC YEAR STUDENT
 */
async syncAverageAcademicYearStudent(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  let totalOnline = 0;
  let totalSynced = 0;

  try {
    if (typeSyncFull) {
      // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
      if (!schoolData?.schoolYearId) {
        console.error('❌ schoolData.schoolYearId es requerido para Average Academic Year Student');
        return {
          entity: 'AVERAGE_ACADEMIC_YEAR_STUDENT',
          online: 0,
          error: 'schoolData.schoolYearId es requerido'
        };
      }

      console.log(`\n🎯 [AVERAGE-ACADEMIC-YEAR-STUDENT] ⚡ MÓDULO INICIANDO...`);
      console.log(`📊 [AVERAGE-ACADEMIC-YEAR-STUDENT] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}, schoolYearId=${schoolData.schoolYearId}`);

      // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
      let campusesToProcess: any[] = [];

      if (schoolData.campusId) {
        // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
        console.log(`\n🏫 [AVERAGE-ACADEMIC-YEAR-STUDENT] Obteniendo información de la sede específica: ${schoolData.campusId}`);
        
        try {
          const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
            schoolId: schoolData.schoolId
          });

          // Filtrar solo el campus específico
          const allCampuses = specificCampusResponse?.data?.edges || [];
          const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

          if (specificCampus) {
            campusesToProcess = [specificCampus];
            console.log(`✅ [AVERAGE-ACADEMIC-YEAR-STUDENT] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
          } else {
            console.log(`⚪ [AVERAGE-ACADEMIC-YEAR-STUDENT] No se encontró la sede especificada: ${schoolData.campusId}`);
            return {
              entity: 'AVERAGE_ACADEMIC_YEAR_STUDENT',
              online: 0,
              synced: 0,
            };
          }
        } catch (campusError) {
          console.error(`❌ [AVERAGE-ACADEMIC-YEAR-STUDENT] Error obteniendo sede específica:`, campusError);
          return {
            entity: 'AVERAGE_ACADEMIC_YEAR_STUDENT',
            online: 0,
            error: 'Error obteniendo sede específica'
          };
        }
      } else {
        // 🌐 MODO GLOBAL (TODAS LAS SEDES)
        console.log(`\n🌐 [AVERAGE-ACADEMIC-YEAR-STUDENT] Sincronización global (todas las sedes)`);
        
        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        campusesToProcess = campusResponse?.data?.edges || [];
        console.log(`✅ [AVERAGE-ACADEMIC-YEAR-STUDENT] ${campusesToProcess.length} sedes encontradas para sincronización global`);
      }

      if (campusesToProcess.length === 0) {
        console.log(`⚠️ [AVERAGE-ACADEMIC-YEAR-STUDENT] No se encontraron sedes para sincronizar`);
        return {
          entity: 'AVERAGE_ACADEMIC_YEAR_STUDENT',
          online: 0,
          synced: 0,
        };
      }

      // 🎯 PASO 2: CALCULAR TOTAL DE CONSULTAS
      let currentCampusIndex = 0;
      let totalEstimatedConsultas = campusesToProcess.length;

      console.log(`🔢 [AVERAGE-ACADEMIC-YEAR-STUDENT] Total consultas estimadas: ${totalEstimatedConsultas} (${campusesToProcess.length} campus)`);

      // 🔄 PASO 3: ITERAR TODOS LOS CAMPUS SELECCIONADOS
      for (const campusEdge of campusesToProcess) {
        const campus = campusEdge.node;
        const campusId = campus.id;
        const campusName = campus.name || campusId;

        currentCampusIndex++;

        console.log(`\n🏢 [AVERAGE-ACADEMIC-YEAR-STUDENT] Procesando Campus ${currentCampusIndex}/${campusesToProcess.length}: ${campusName} (${campusId})`);

        try {
          // 📊 Actualizar barra de progreso CON INFORMACIÓN DE FILTRO
          this.showProgressBar(
            currentCampusIndex,
            totalEstimatedConsultas,
            `${schoolData.campusId ? `Sede: ${campusName}` : 'Global'} - Campus: ${campusName}`
          );

          // 🎯 PASO 3A: CONSULTA INDIVIDUAL POR CAMPUS
          console.log(`\n🔍 [AVERAGE-ACADEMIC-YEAR-STUDENT] Consultando cursos del campus: ${campusName}`);

          let courseData: any = null;
          await client
            .request(QUERY_GET_ALL_COURSE, {
              schoolId: schoolData.schoolId,        // ✅ Obligatorio
              campusId: campusId,                   // ✅ Obligatorio (de la iteración)
              academicGradeId: null                 // ✅ Opcional (null para obtener todos)
            })
            .then(async (result: any) => {
              courseData = result;
            });

          // 🎯 PASO 3B: PROCESAR RESULTADOS SI EXISTEN
          if (courseData?.data?.edges?.length > 0) {
            console.log(`✅ [AVERAGE-ACADEMIC-YEAR-STUDENT] Encontrados ${courseData.data.edges.length} cursos en campus ${campusName}`);

            // 🔄 PASO 3C: ITERAR TODOS LOS CURSOS DEL CAMPUS
            for (const courseEdge of courseData.data.edges) {
              const course = courseEdge.node;
              const courseId = course.id;
              const courseName = course.name || courseId;

              try {
                console.log(`\n🏫 [AVERAGE-ACADEMIC-YEAR-STUDENT] Procesando curso: ${courseName} (${courseId})`);

                // 🎯 PASO 3D: CONSULTA INDIVIDUAL POR CURSO
                let averagesData: any = null;
                await client
                  .request(QUERY_GET_ALL_AVERAGE_ACADEMIC_YEAR_STUDENT, {
                    courseId: courseId,                    // ✅ Opcional (de la iteración)
                    schoolYearId: schoolData.schoolYearId, // ✅ Opcional 
                    orderCreated: true,                    // ✅ Fijo
                    allData: true                          // ✅ Fijo
                  })
                  .then(async (result: any) => {
                    averagesData = result;
                  });

                // 🎯 PASO 3E: PROCESAR PROMEDIOS SI EXISTEN
                if (averagesData?.data?.edges?.length > 0) {
                  console.log(`✅ [AVERAGE-ACADEMIC-YEAR-STUDENT] Encontrados ${averagesData.data.edges.length} promedios en curso ${courseName}`);

                  totalOnline += averagesData.data.edges.length;

                  for (const averageEdge of averagesData.data.edges) {
                    const average = averageEdge.node;
                    const averageId = average.id;

                    try {
                      // 🧹 LIMPIAR CAMPOS DE RELACIONES
                      const averageDetails = { ...average };
                      delete averageDetails.id;
                      delete averageDetails.campus;
                      delete averageDetails.school;
                      delete averageDetails.schoolYear;
                      delete averageDetails.course;
                      delete averageDetails.student;
                      delete averageDetails.performanceLevel;

                      // 🔍 CONVERTIR performanceLevelId A OBJECTID SI ESTÁ PRESENTE
                      if (averageDetails.performanceLevelId) {
                        averageDetails.performanceLevelId = new ObjectId(averageDetails.performanceLevelId);
                      }

                      // 🔍 BUSCAR SI EXISTE EN LOCAL
                      const existingAverage = await this.repositoryAverageAcademicYearStudent.findOneBy(averageId);

                      if (existingAverage == null) {
                        // ✅ CREAR NUEVO REGISTRO
                        await this.repositoryAverageAcademicYearStudent.save({
                          _id: new ObjectId(averageId),
                          ...averageDetails,
                        });
                      } else {
                        // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                        await this.repositoryAverageAcademicYearStudent.update(
                          { id: averageId },
                          averageDetails,
                        );
                      }

                      totalSynced++;

                    } catch (averageError) {
                      console.error(`❌ [AVERAGE-ACADEMIC-YEAR-STUDENT] Error procesando promedio ${averageId}:`, averageError);
                    }
                  }
                } else {
                  console.log(`⚠️ [AVERAGE-ACADEMIC-YEAR-STUDENT] No hay promedios en el curso ${courseName}`);
                }

              } catch (courseError) {
                console.error(`❌ [AVERAGE-ACADEMIC-YEAR-STUDENT] Error en curso ${courseId}:`, courseError);
              }
            }
          } else {
            console.log(`⚠️ [AVERAGE-ACADEMIC-YEAR-STUDENT] No hay cursos en el campus ${campusName}`);
          }

        } catch (campusError) {
          console.error(`❌ [AVERAGE-ACADEMIC-YEAR-STUDENT] Error en campus ${campusId}:`, campusError);
        }
      }

      // 📊 Barra de progreso final
      this.showProgressBar(totalEstimatedConsultas, totalEstimatedConsultas, 'Promedios Anuales', totalSynced);

      console.log(`\n🎉 [AVERAGE-ACADEMIC-YEAR-STUDENT] ⚡ SINCRONIZACIÓN COMPLETADA:`);
      console.log(`📊 Total campus procesados: ${campusesToProcess.length}`);
      console.log(`📊 Total promedios en línea: ${totalOnline}`);
      console.log(`💾 Total promedios sincronizados: ${totalSynced}`);
      console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);

      return {
        entity: 'AVERAGE_ACADEMIC_YEAR_STUDENT',
        online: totalOnline,
        synced: totalSynced,
      };
    } else {
      // 📊 Solo conteo - APLICAR MISMO FILTRO PARA CONTEO
      if (!schoolData?.schoolYearId) {
        console.error('❌ schoolData.schoolYearId es requerido para Average Academic Year Student count');
        return {
          entity: 'AVERAGE_ACADEMIC_YEAR_STUDENT',
          online: 0,
          error: 'schoolData.schoolYearId es requerido'
        };
      }

      try {
        if (schoolData.campusId) {
          // 🏫 CONTEO FILTRADO POR SEDE ESPECÍFICA
          console.log(`📊 [AVERAGE-ACADEMIC-YEAR-STUDENT] Contando registros para sede: ${schoolData.campusId}`);
          
          // Primero obtener cursos de la sede específica
          const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
            schoolId: schoolData.schoolId,
            campusId: schoolData.campusId,
            academicGradeId: null
          });

          const courses = coursesResponse?.data?.edges || [];
          console.log(`📚 [AVERAGE-ACADEMIC-YEAR-STUDENT] Cursos encontrados en sede ${schoolData.campusId}: ${courses.length}`);

          // Contar promedios por cada curso de la sede
          for (const courseEdge of courses) {
            const courseId = courseEdge.node.id;
            
            try {
              const countResponse: any = await client.request(QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_YEAR_STUDENT, {
                courseId: courseId,
                schoolYearId: schoolData.schoolYearId,
                orderCreated: true,
                allData: true
              });

              totalOnline += countResponse?.data?.totalCount || 0;
            } catch (courseCountError) {
              console.warn(`⚠️ Error contando promedios del curso ${courseId}:`, courseCountError);
            }
          }
        } else {
          // 🌐 CONTEO GLOBAL - USAR LÓGICA ORIGINAL
          let campusData: any = null;
          await client
            .request(QUERY_GET_ALL_CAMPUS, {
              schoolId: schoolData.schoolId
            })
            .then(async (result: any) => {
              campusData = result;
            });

          if (campusData?.data?.edges?.length > 0) {
            // Contar promedios de todos los campus
            for (const campusEdge of campusData.data.edges) {
              const campusId = campusEdge.node.id;

              // Primero obtener cursos del campus
              let courseData: any = null;
              await client
                .request(QUERY_GET_ALL_COURSE, {
                  schoolId: schoolData.schoolId,
                  campusId: campusId,
                  academicGradeId: null
                })
                .then(async (result: any) => {
                  courseData = result;
                });

              // Luego contar promedios de cada curso
              if (courseData?.data?.edges?.length > 0) {
                for (const courseEdge of courseData.data.edges) {
                  const courseId = courseEdge.node.id;

                  await client
                    .request(QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_YEAR_STUDENT, {
                      courseId: courseId,
                      schoolYearId: schoolData.schoolYearId,
                      orderCreated: true,
                      allData: true
                    })
                    .then(async (result: any) => {
                      totalOnline += result.data?.totalCount || 0;
                    });
                }
              }
            }
          }
        }
      } catch (countError) {
        console.warn(`⚠️ Error en conteo de promedios anuales:`, countError);
      }

      return {
        entity: 'AVERAGE_ACADEMIC_YEAR_STUDENT',
        online: totalOnline,
      };
    }
  } catch (error) {
    console.error(`❌ [SYNC-AVERAGE-ACADEMIC-YEAR-STUDENT] ERROR GENERAL:`, error);
    return {
      entity: 'AVERAGE_ACADEMIC_YEAR_STUDENT',
      online: 0,
      error: String(error),
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE STUDENT BEHAVIOUR
 */
async syncStudentBehaviour(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  let totalOnline = 0;
  let totalSynced = 0;

  try {
    if (typeSyncFull) {
      // 🚀 PASO 1: OBTENER PERÍODOS ACADÉMICOS (CON FILTRO OPCIONAL)
      console.log(`\n🗓️  [STUDENT-BEHAVIOUR] Obteniendo períodos académicos...`);
      console.log(`📊 Parámetros: schoolId=${schoolData.schoolId}, schoolYearId=${schoolData.schoolYearId}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}, campusId=${schoolData.campusId || 'TODOS'}`);

      let academicPeriodsToProcess: any[] = [];

      if (schoolData.academicPeriodId) {
        // 🎯 MODO FILTRADO POR PERÍODO ESPECÍFICO
        console.log(`\n📅 [STUDENT-BEHAVIOUR] Obteniendo período específico: ${schoolData.academicPeriodId}`);
        
        // Obtener todos los períodos y filtrar el específico
        let allPeriodsData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCreated: true,
            allData: true,
            orderCustom: false
          })
          .then(async (result: any) => {
            allPeriodsData = result.data;
          });

        if (allPeriodsData?.edges?.length) {
          const specificPeriod = allPeriodsData.edges.find((edge: any) => edge.node.id === schoolData.academicPeriodId);
          if (specificPeriod) {
            academicPeriodsToProcess = [specificPeriod];
            console.log(`✅ [STUDENT-BEHAVIOUR] Período encontrado: ${specificPeriod.node.name} (${schoolData.academicPeriodId})`);
          } else {
            console.log(`⚠️ [STUDENT-BEHAVIOUR] No se encontró el período especificado: ${schoolData.academicPeriodId}`);
            return {
              entity: 'STUDENT_BEHAVIOUR',
              online: 0,
              synced: 0,
            };
          }
        }
      } else {
        // 🌐 MODO GLOBAL (TODOS LOS PERÍODOS)
        console.log(`\n🌐 [STUDENT-BEHAVIOUR] Sincronización de todos los períodos`);
        
        let academicPeriodsData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCreated: true,
            allData: true,
            orderCustom: false
          })
          .then(async (result: any) => {
            academicPeriodsData = result.data;
          });

        academicPeriodsToProcess = academicPeriodsData?.edges || [];
        console.log(`✅ [STUDENT-BEHAVIOUR] ${academicPeriodsToProcess.length} períodos encontrados para sincronización`);
      }

      if (academicPeriodsToProcess.length === 0) {
        console.log(`⚠️ [STUDENT-BEHAVIOUR] No se encontraron períodos académicos para sincronizar`);
        return {
          entity: 'STUDENT_BEHAVIOUR',
          online: 0,
          synced: 0,
        };
      }

      // 🏢 PASO 2: OBTENER CAMPUS (CON FILTRO OPCIONAL)
      console.log(`\n🏢 [STUDENT-BEHAVIOUR] Obteniendo campus...`);

      let campusesToProcess: any[] = [];

      if (schoolData.campusId) {
        // 🎯 MODO FILTRADO POR CAMPUS ESPECÍFICO
        console.log(`\n🏫 [STUDENT-BEHAVIOUR] Obteniendo campus específico: ${schoolData.campusId}`);
        
        let allCampusData: any = null;
        await client
          .request(QUERY_GET_ALL_CAMPUS, {
            schoolId: schoolData.schoolId,
            orderCreated: true,
            allData: true
          })
          .then(async (result: any) => {
            allCampusData = result.data;
          });

        if (allCampusData?.edges?.length) {
          const specificCampus = allCampusData.edges.find((edge: any) => edge.node.id === schoolData.campusId);
          if (specificCampus) {
            campusesToProcess = [specificCampus];
            console.log(`✅ [STUDENT-BEHAVIOUR] Campus encontrado: ${specificCampus.node.name} (${schoolData.campusId})`);
          } else {
            console.log(`⚠️ [STUDENT-BEHAVIOUR] No se encontró el campus especificado: ${schoolData.campusId}`);
            return {
              entity: 'STUDENT_BEHAVIOUR',
              online: 0,
              synced: 0,
            };
          }
        }
      } else {
        // 🌐 MODO GLOBAL (TODOS LOS CAMPUS)
        console.log(`\n🌐 [STUDENT-BEHAVIOUR] Sincronización de todos los campus`);
        
        let campusData: any = null;
        await client
          .request(QUERY_GET_ALL_CAMPUS, {
            schoolId: schoolData.schoolId,
            orderCreated: true,
            allData: true
          })
          .then(async (result: any) => {
            campusData = result.data;
          });

        campusesToProcess = campusData?.edges || [];
        console.log(`✅ [STUDENT-BEHAVIOUR] ${campusesToProcess.length} campus encontrados para sincronización`);
      }

      if (campusesToProcess.length === 0) {
        console.log(`⚠️ [STUDENT-BEHAVIOUR] No se encontraron campus para sincronizar`);
        return {
          entity: 'STUDENT_BEHAVIOUR',
          online: 0,
          synced: 0,
        };
      }

      // 🔄 PASO 3: OBTENER CURSOS DE LOS CAMPUS SELECCIONADOS
      let allCourses: any[] = [];

      for (const campusEdge of campusesToProcess) {
        const campus = campusEdge.node;
        const campusId = campus.id;
        const campusName = campus.name || 'Sin nombre';

        console.log(`\n🏢 [STUDENT-BEHAVIOUR] Obteniendo cursos para campus: ${campusName} (ID: ${campusId})`);

        let coursesData: any = null;
        await client
          .request(QUERY_GET_ALL_COURSE, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            academicGradeId: null,
            campusId: campusId
          })
          .then(async (result: any) => {
            coursesData = result.data;
          });

        if (coursesData?.edges?.length) {
          console.log(`📚 [STUDENT-BEHAVIOUR] Campus ${campusName}: ${coursesData.edges.length} cursos`);
          allCourses.push(...coursesData.edges);
        } else {
          console.log(`⚠️ [STUDENT-BEHAVIOUR] Campus ${campusName}: No tiene cursos`);
        }
      }

      if (allCourses.length === 0) {
        console.log(`⚠️ [STUDENT-BEHAVIOUR] No se encontraron cursos en ${schoolData.campusId ? 'el campus especificado' : 'ningún campus'}`);
        return {
          entity: 'STUDENT_BEHAVIOUR',
          online: 0,
          synced: 0,
        };
      }

      console.log(`📚 [STUDENT-BEHAVIOUR] Total de cursos encontrados: ${allCourses.length}`);

      // 🎯 PASO 4: CALCULAR TOTAL DE CONSULTAS CON FILTROS APLICADOS
      let currentQueryIndex = 0;
      let totalEstimatedQueries = 0;

      academicPeriodsToProcess.forEach((periodEdge: any) => {
        allCourses.forEach((courseEdge: any) => {
          const course = courseEdge.node;
          if (course.studentsId && Array.isArray(course.studentsId)) {
            totalEstimatedQueries += course.studentsId.length;
          }
        });
      });

      console.log(`🔢 [STUDENT-BEHAVIOUR] Total estimado de consultas: ${totalEstimatedQueries}`);
      console.log(`📊 Distribución: ${academicPeriodsToProcess.length} períodos × ${allCourses.length} cursos`);

      // 🔄 PASO 5: ITERAR PERÍODOS ACADÉMICOS FILTRADOS
      for (const periodEdge of academicPeriodsToProcess) {
        const academicPeriod = periodEdge.node;
        const academicPeriodId = academicPeriod.id;
        const periodName = academicPeriod.name || 'Sin nombre';

        console.log(`\n📅 [STUDENT-BEHAVIOUR] Procesando período: ${periodName} (ID: ${academicPeriodId})`);

        // 🔄 PASO 6: ITERAR CURSOS DE LOS CAMPUS FILTRADOS
        for (const courseEdge of allCourses) {
          const course = courseEdge.node;
          const courseId = course.id;
          const courseName = course.name || 'Sin nombre';

          console.log(`\n📖 [STUDENT-BEHAVIOUR] Procesando curso: ${courseName} en período ${periodName}`);

          if (!course.studentsId || !Array.isArray(course.studentsId) || course.studentsId.length === 0) {
            console.log(`⚠️ [STUDENT-BEHAVIOUR] Curso ${courseName} no tiene estudiantes asignados`);
            continue;
          }

          console.log(`👥 [STUDENT-BEHAVIOUR] Curso ${courseName} tiene ${course.studentsId.length} estudiantes`);

          // 🔄 PASO 7: ITERAR ESTUDIANTES
          for (const studentId of course.studentsId) {
            currentQueryIndex++;

            // Mejorar mensaje de progreso con información de filtros
            const filterInfo = `${schoolData.academicPeriodId ? `Período: ${periodName}` : 'Todos los períodos'} - ${schoolData.campusId ? `Campus: ${campusesToProcess[0]?.node?.name}` : 'Todos los campus'}`;
            
            this.showProgressBar(
              currentQueryIndex,
              totalEstimatedQueries,
              `${filterInfo} - ${courseName} - Consulta ${currentQueryIndex}/${totalEstimatedQueries}`
            );

            try {
              // 🔍 PASO 8: CONSULTA INDIVIDUAL
              let behaviourData: any = null;
              await client
                .request(QUERY_GET_ALL_STUDENT_BEHAVIOUR, {
                  academicPeriodId: academicPeriodId,
                  courseId: courseId,
                  studentId: studentId,
                  orderCreated: true,
                  allData: true
                })
                .then(async (result: any) => {
                  behaviourData = result.data;
                });

              // 📈 PASO 9: PROCESAR RESULTADOS
              const behavioursCount = behaviourData?.edges?.length || 0;
              totalOnline += behavioursCount;

              if (behavioursCount > 0) {
                console.log(`✅ [STUDENT-BEHAVIOUR] Estudiante ${studentId} en ${periodName}: ${behavioursCount} registros`);

                for (const behaviourEdge of behaviourData.edges) {
                  const behaviour = behaviourEdge.node;

                  try {
                    const behaviourId = behaviour.id?.toString();
                    const behaviourDetails = { ...behaviour };

                    // Limpiar relaciones
                    delete behaviourDetails.id;
                    delete behaviourDetails.campus;
                    delete behaviourDetails.school;
                    delete behaviourDetails.course;
                    delete behaviourDetails.academicPeriod;
                    delete behaviourDetails.student;
                    delete behaviourDetails.performanceLevel;

                    const existingBehaviour = await this.repositoryStudentBehaviour.findOne({
                      where: { _id: new ObjectId(behaviourId) },
                    });

                    if (existingBehaviour) {
                      await this.repositoryStudentBehaviour.updateOne(
                        { _id: new ObjectId(behaviourId) },
                        { $set: behaviourDetails }
                      );
                      console.log(`🔄 [STUDENT-BEHAVIOUR] Actualizado comportamiento existente ${behaviourId}`);
                    } else {
                      await this.repositoryStudentBehaviour.save({
                        _id: new ObjectId(behaviourId),
                        ...behaviourDetails,
                      });
                      console.log(`✅ [STUDENT-BEHAVIOUR] Creado comportamiento nuevo ${behaviourId}`);
                    }
                    totalSynced++;
                  } catch (dbError) {
                    console.error(`❌ [STUDENT-BEHAVIOUR] Error guardando comportamiento ${behaviour.id}:`, dbError);
                  }
                }
              } else {
                console.log(`⚪ [STUDENT-BEHAVIOUR] Estudiante ${studentId} en ${periodName}: 0 registros`);
              }

            } catch (queryError) {
              console.error(`❌ [STUDENT-BEHAVIOUR] Error consultando estudiante ${studentId} en período ${periodName}:`, queryError);
              console.log(`⚪ [STUDENT-BEHAVIOUR] Estudiante ${studentId} en ${periodName}: 0 registros (error)`);
            }
          }
        }
      }

      this.showProgressBar(totalEstimatedQueries, totalEstimatedQueries, 'Comportamientos por Período', totalSynced);

      console.log(`\n🎉 [STUDENT-BEHAVIOUR] Sincronización completada:`);
      console.log(`📊 Total registros en línea: ${totalOnline}`);
      console.log(`💾 Total registros sincronizados: ${totalSynced}`);
      console.log(`🎯 Filtros aplicados:`);
      console.log(`   - Período: ${schoolData.academicPeriodId ? `${academicPeriodsToProcess[0]?.node?.name} (${schoolData.academicPeriodId})` : 'Todos los períodos'}`);
      console.log(`   - Campus: ${schoolData.campusId ? `${campusesToProcess[0]?.node?.name} (${schoolData.campusId})` : 'Todos los campus'}`);
      console.log(`📅 Períodos procesados: ${academicPeriodsToProcess.length}`);
      console.log(`🏢 Campus procesados: ${campusesToProcess.length}`);
      console.log(`📚 Cursos procesados: ${allCourses.length}`);

      return {
        entity: 'STUDENT_BEHAVIOUR',
        online: totalOnline,
        synced: totalSynced,
      };
    } else {
      // Solo conteo - aplicar mismos filtros
      let countQuery: any = {
        academicPeriodId: schoolData.academicPeriodId || null,
        courseId: null,
        studentId: null
      };

      // Si hay filtro de campus, necesitamos contar por campus
      if (schoolData.campusId) {
        // Obtener cursos del campus específico y contar comportamientos
        // Esta es una aproximación, ya que la query no acepta campusId directamente
        console.log(`📊 [STUDENT-BEHAVIOUR] Conteo con filtro de campus: ${schoolData.campusId}`);
      }

      await client
        .request(QUERT_GET_TOTAL_COUNT_STUDENT_BEHAVIOUR, countQuery)
        .then(async (result: any) => {
          totalOnline = result.data?.totalCount || 0;
        });

      return {
        entity: 'STUDENT_BEHAVIOUR',
        online: totalOnline,
      };
    }
  } catch (error) {
    console.error(`❌ [SYNC-STUDENT-BEHAVIOUR] ERROR GENERAL:`, error);
    return {
      entity: 'STUDENT_BEHAVIOUR',
      online: 0,
      error: String(error),
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE STUDENT YEAR BEHAVIOUR
 */
async syncStudentYearBehaviour(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  let totalOnline = 0;
  let totalSynced = 0;

  try {
    if (typeSyncFull) {
      // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
      if (!schoolData?.schoolId) {
        console.error('❌ schoolData.schoolId es requerido para Student Year Behaviour');
        return {
          entity: 'STUDENT_YEAR_BEHAVIOUR',
          online: 0,
          error: 'schoolData.schoolId es requerido'
        };
      }

      console.log(`\n🎯 [STUDENT-YEAR-BEHAVIOUR] ⚡ MÓDULO INICIANDO...`);
      console.log(`📊 [STUDENT-YEAR-BEHAVIOUR] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}`);

      // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
      let campusesToProcess: any[] = [];

      if (schoolData.campusId) {
        // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
        console.log(`\n🏫 [STUDENT-YEAR-BEHAVIOUR] Obteniendo información de la sede específica: ${schoolData.campusId}`);
        
        try {
          const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
            schoolId: schoolData.schoolId
          });

          // Filtrar solo el campus específico
          const allCampuses = specificCampusResponse?.data?.edges || [];
          const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

          if (specificCampus) {
            campusesToProcess = [specificCampus];
            console.log(`✅ [STUDENT-YEAR-BEHAVIOUR] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
          } else {
            console.log(`⚪ [STUDENT-YEAR-BEHAVIOUR] No se encontró la sede especificada: ${schoolData.campusId}`);
            return {
              entity: 'STUDENT_YEAR_BEHAVIOUR',
              online: 0,
              synced: 0,
            };
          }
        } catch (campusError) {
          console.error(`❌ [STUDENT-YEAR-BEHAVIOUR] Error obteniendo sede específica:`, campusError);
          return {
            entity: 'STUDENT_YEAR_BEHAVIOUR',
            online: 0,
            error: 'Error obteniendo sede específica'
          };
        }
      } else {
        // 🌐 MODO GLOBAL (TODAS LAS SEDES)
        console.log(`\n🌐 [STUDENT-YEAR-BEHAVIOUR] Sincronización global (todas las sedes)`);
        
        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        campusesToProcess = campusResponse?.data?.edges || [];
        console.log(`✅ [STUDENT-YEAR-BEHAVIOUR] ${campusesToProcess.length} sedes encontradas para sincronización global`);
      }

      if (campusesToProcess.length === 0) {
        console.log(`⚠️ [STUDENT-YEAR-BEHAVIOUR] No se encontraron sedes para sincronizar`);
        return {
          entity: 'STUDENT_YEAR_BEHAVIOUR',
          online: 0,
          synced: 0,
        };
      }

      // 🔄 PASO 2: ITERAR POR CAMPUS SELECCIONADOS PARA OBTENER CURSOS
      let allCourses: any[] = [];

      for (const campusEdge of campusesToProcess) {
        const campus = campusEdge.node;
        const campusId = campus.id;
        const campusName = campus.name || 'Sin nombre';

        console.log(`\n🏢 [STUDENT-YEAR-BEHAVIOUR] Obteniendo cursos para campus: ${campusName} (ID: ${campusId})`);

        // 📚 PASO 3: OBTENER CURSOS POR CAMPUS (Con parámetros obligatorios)
        let coursesData: any = null;
        await client
          .request(QUERY_GET_ALL_COURSE, {
            academicGradeId: null, // null para obtener todos los grados
            schoolId: schoolData.schoolId,
            campusId: campusId  // ✅ OBLIGATORIO: campusId válido
          })
          .then(async (result: any) => {
            coursesData = result.data;
          });

        if (coursesData?.edges?.length) {
          console.log(`📚 [STUDENT-YEAR-BEHAVIOUR] Campus ${campusName}: ${coursesData.edges.length} cursos`);
          allCourses.push(...coursesData.edges); // Agregar cursos de este campus
        } else {
          console.log(`⚠️ [STUDENT-YEAR-BEHAVIOUR] Campus ${campusName}: No tiene cursos`);
        }
      }

      if (allCourses.length === 0) {
        console.log(`⚠️ [STUDENT-YEAR-BEHAVIOUR] No se encontraron cursos en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}`);
        return {
          entity: 'STUDENT_YEAR_BEHAVIOUR',
          online: 0,
          synced: 0,
        };
      }

      console.log(`📚 [STUDENT-YEAR-BEHAVIOUR] Total de cursos encontrados: ${allCourses.length}`);

      // 🎯 PASO 4: CALCULAR TOTAL DE CONSULTAS (Para barra de progreso precisa)
      let currentQueryIndex = 0;
      let totalEstimatedQueries = 0;

      // Total = cursos × estudiantes de cada curso
      allCourses.forEach((courseEdge: any) => {
        const course = courseEdge.node;
        if (course.studentsId && Array.isArray(course.studentsId)) {
          totalEstimatedQueries += course.studentsId.length;
        }
      });

      console.log(`🔢 [STUDENT-YEAR-BEHAVIOUR] Total estimado de consultas: ${totalEstimatedQueries}`);

      // 🔄 PASO 5: ITERAR CURSOS (Con schoolYearId del schoolData)
      for (const courseEdge of allCourses) {
        const course = courseEdge.node;
        const courseId = course.id;
        const courseName = course.name || 'Sin nombre';

        console.log(`\n📖 [STUDENT-YEAR-BEHAVIOUR] Procesando curso: ${courseName} (ID: ${courseId})`);

        // Verificar que el curso tenga estudiantes (prevención de errores)
        if (!course.studentsId || !Array.isArray(course.studentsId) || course.studentsId.length === 0) {
          console.log(`⚠️ [STUDENT-YEAR-BEHAVIOUR] Curso ${courseName} no tiene estudiantes asignados`);
          continue;
        }

        console.log(`👥 [STUDENT-YEAR-BEHAVIOUR] Curso ${courseName} tiene ${course.studentsId.length} estudiantes`);

        // 🔄 PASO 6: ITERAR ESTUDIANTES (Para cada curso)
        for (const studentId of course.studentsId) {
          currentQueryIndex++;

          // 📊 PASO 7: ACTUALIZAR BARRA DE PROGRESO CON INFORMACIÓN DE FILTRO
          this.showProgressBar(
            currentQueryIndex,
            totalEstimatedQueries,
            `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global'} - ${courseName} - Est. ${currentQueryIndex}/${totalEstimatedQueries}`
          );

          try {
            // 🔍 PASO 8: CONSULTA INDIVIDUAL CON PARÁMETROS OBLIGATORIOS
            // ✅ schoolYearId: OBLIGATORIO (del schoolData)
            // ✅ courseId: OBLIGATORIO (del curso actual)  
            // ⚪ studentId: OPCIONAL (estudiante específico)
            let behaviourData: any = null;
            await client
              .request(QUERY_GET_ALL_STUDENT_YEAR_BEHAVIOUR, {
                schoolYearId: schoolData.schoolYearId, // 🔑 OBLIGATORIO: del schoolData
                courseId: courseId,                    // 🔑 OBLIGATORIO: del curso actual
                studentId: studentId,                  // ⚪ OPCIONAL: estudiante específico
                orderCreated: true,
                allData: true
              })
              .then(async (result: any) => {
                behaviourData = result.data;
              });

            // 📈 PASO 9: CONTAR Y DECIDIR SI ALMACENAR
            const behavioursCount = behaviourData?.edges?.length || 0;
            totalOnline += behavioursCount;

            if (behavioursCount > 0) {
              console.log(`✅ [STUDENT-YEAR-BEHAVIOUR] Curso ${courseName} → Estudiante ${studentId}: ${behavioursCount} registros`);

              // 💾 SINCRONIZAR CADA COMPORTAMIENTO ANUAL
              for (const behaviourEdge of behaviourData.edges) {
                const behaviour = behaviourEdge.node;

                try {
                  // 🔑 PASO 10: USAR OBJECTID CORRECTAMENTE
                  const behaviourId = behaviour.id?.toString();
                  const behaviourDetails = { ...behaviour };

                  // 🧹 PASO 11: LIMPIAR CAMPOS DE RELACIONES
                  delete behaviourDetails.id;
                  delete behaviourDetails.campus;              // Relación campus
                  delete behaviourDetails.school;              // Relación school
                  delete behaviourDetails.course;              // Relación course
                  delete behaviourDetails.schoolYear;          // Relación schoolYear
                  delete behaviourDetails.student;             // Relación student
                  delete behaviourDetails.performanceLevel;    // Relación performanceLevel

                  if (behaviourDetails.performanceLevelId) {
                    behaviourDetails.performanceLevelId = new ObjectId(behaviourDetails.performanceLevelId);
                  }

                  // 🔍 PASO 12: BUSCAR SI EXISTE
                  const existingBehaviour = await this.repositoryStudentYearBehaviour.findOne({
                    where: { _id: new ObjectId(behaviourId) },
                  });

                  if (existingBehaviour) {
                    // 🔄 ACTUALIZAR EXISTENTE
                    await this.repositoryStudentYearBehaviour.updateOne(
                      { _id: new ObjectId(behaviourId) },
                      { $set: behaviourDetails }
                    );
                    console.log(`🔄 [STUDENT-YEAR-BEHAVIOUR] Actualizado comportamiento existente ${behaviourId}`);
                  } else {
                    // ✨ CREAR NUEVO
                    await this.repositoryStudentYearBehaviour.save({
                      _id: new ObjectId(behaviourId),
                      ...behaviourDetails,
                    });
                    console.log(`✅ [STUDENT-YEAR-BEHAVIOUR] Creado comportamiento nuevo ${behaviourId}`);
                  }
                  totalSynced++;
                } catch (dbError) {
                  console.error(`❌ [STUDENT-YEAR-BEHAVIOUR] Error guardando comportamiento ${behaviour.id}:`, dbError);
                }
              }
            } else {
              // ⚪ NO HAY DATOS: Solo mostrar 0
              console.log(`⚪ [STUDENT-YEAR-BEHAVIOUR] Curso ${courseName} → Estudiante ${studentId}: 0 registros`);
            }

          } catch (queryError) {
            console.error(`❌ [STUDENT-YEAR-BEHAVIOUR] Error consultando curso ${courseId} → estudiante ${studentId}:`, queryError);
            console.log(`⚪ [STUDENT-YEAR-BEHAVIOUR] Curso ${courseName} → Estudiante ${studentId}: 0 registros (error)`);
          }
        }
      }

      // 📊 Barra de progreso final
      this.showProgressBar(totalEstimatedQueries, totalEstimatedQueries, 'Comportamientos Anuales', totalSynced);

      console.log(`\n🎉 [STUDENT-YEAR-BEHAVIOUR] ⚡ SINCRONIZACIÓN COMPLETADA:`);
      console.log(`📊 Total registros en línea: ${totalOnline}`);
      console.log(`💾 Total registros sincronizados: ${totalSynced}`);
      console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
      console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
      console.log(`📚 Cursos procesados: ${allCourses.length}`);

      return {
        entity: 'STUDENT_YEAR_BEHAVIOUR',
        online: totalOnline,
        synced: totalSynced,
      };
    } else {
      // 📊 Solo conteo - APLICAR MISMO FILTRO PARA CONTEO
      if (!schoolData?.schoolYearId) {
        console.error('❌ schoolData.schoolYearId es requerido para Student Year Behaviour count');
        return {
          entity: 'STUDENT_YEAR_BEHAVIOUR',
          online: 0,
          error: 'schoolData.schoolYearId es requerido'
        };
      }

      try {
        if (schoolData.campusId) {
          // 🏫 CONTEO FILTRADO POR SEDE ESPECÍFICA
          console.log(`📊 [STUDENT-YEAR-BEHAVIOUR] Contando registros para sede: ${schoolData.campusId}`);
          
          // Primero obtener cursos de la sede específica
          const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
            academicGradeId: null,
            schoolId: schoolData.schoolId,
            campusId: schoolData.campusId
          });

          const courses = coursesResponse?.data?.edges || [];
          console.log(`📚 [STUDENT-YEAR-BEHAVIOUR] Cursos encontrados en sede ${schoolData.campusId}: ${courses.length}`);

          // Contar comportamientos por cada curso de la sede
          for (const courseEdge of courses) {
            const courseId = courseEdge.node.id;
            
            try {
              const countResponse: any = await client.request(QUERT_GET_TOTAL_COUNT_STUDENT_YEAR_BEHAVIOUR, {
                schoolYearId: schoolData.schoolYearId,
                courseId: courseId,
                studentId: null
              });

              totalOnline += countResponse?.data?.totalCount || 0;
            } catch (courseCountError) {
              console.warn(`⚠️ Error contando comportamientos del curso ${courseId}:`, courseCountError);
            }
          }
        } else {
          // 🌐 CONTEO GLOBAL
          await client
            .request(QUERT_GET_TOTAL_COUNT_STUDENT_YEAR_BEHAVIOUR, {
              schoolYearId: schoolData.schoolYearId, // Obligatorio para conteo
              courseId: null,                        // null para contar todos los cursos
              studentId: null                        // null para contar todos los estudiantes
            })
            .then(async (result: any) => {
              totalOnline = result.data?.totalCount || 0;
            });
        }
      } catch (countError) {
        console.warn(`⚠️ Error en conteo de comportamientos anuales:`, countError);
      }

      return {
        entity: 'STUDENT_YEAR_BEHAVIOUR',
        online: totalOnline,
      };
    }
  } catch (error) {
    console.error(`❌ [SYNC-STUDENT-YEAR-BEHAVIOUR] ERROR GENERAL:`, error);
    return {
      entity: 'STUDENT_YEAR_BEHAVIOUR',
      online: 0,
      error: String(error),
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE STUDENT OBSERVER ANOTATION
 */
async syncStudentObserverAnnotation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  let totalOnline = 0;
  let totalSynced = 0;

  try {
    if (typeSyncFull) {
      // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
      if (!schoolData?.schoolId) {
        console.error('❌ schoolData.schoolId es requerido para Student Observer Annotation');
        return {
          entity: 'STUDENT_OBSERVER_ANNOTATION',
          online: 0,
          error: 'schoolData.schoolId es requerido'
        };
      }

      console.log(`\n🎯 [STUDENT-OBSERVER-ANNOTATION] ⚡ MÓDULO INICIANDO...`);
      console.log(`📊 [STUDENT-OBSERVER-ANNOTATION] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}`);

      // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
      let campusesToProcess: any[] = [];

      if (schoolData.campusId) {
        // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
        console.log(`\n🏫 [STUDENT-OBSERVER-ANNOTATION] Obteniendo información de la sede específica: ${schoolData.campusId}`);
        
        try {
          const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
            schoolId: schoolData.schoolId
          });

          // Filtrar solo el campus específico
          const allCampuses = specificCampusResponse?.data?.edges || [];
          const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

          if (specificCampus) {
            campusesToProcess = [specificCampus];
            console.log(`✅ [STUDENT-OBSERVER-ANNOTATION] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
          } else {
            console.log(`⚪ [STUDENT-OBSERVER-ANNOTATION] No se encontró la sede especificada: ${schoolData.campusId}`);
            return {
              entity: 'STUDENT_OBSERVER_ANNOTATION',
              online: 0,
              synced: 0,
            };
          }
        } catch (campusError) {
          console.error(`❌ [STUDENT-OBSERVER-ANNOTATION] Error obteniendo sede específica:`, campusError);
          return {
            entity: 'STUDENT_OBSERVER_ANNOTATION',
            online: 0,
            error: 'Error obteniendo sede específica'
          };
        }
      } else {
        // 🌐 MODO GLOBAL (TODAS LAS SEDES)
        console.log(`\n🌐 [STUDENT-OBSERVER-ANNOTATION] Sincronización global (todas las sedes)`);
        
        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        campusesToProcess = campusResponse?.data?.edges || [];
        console.log(`✅ [STUDENT-OBSERVER-ANNOTATION] ${campusesToProcess.length} sedes encontradas para sincronización global`);
      }

      if (campusesToProcess.length === 0) {
        console.log(`⚠️ [STUDENT-OBSERVER-ANNOTATION] No se encontraron sedes para sincronizar`);
        return {
          entity: 'STUDENT_OBSERVER_ANNOTATION',
          online: 0,
          synced: 0,
        };
      }

      // 🎯 VERIFICAR SI HAY FILTRO POR PERÍODO ACADÉMICO ESPECÍFICO
      let academicPeriodName = 'TODOS';
      if (schoolData.academicPeriodId) {
        console.log(`\n📅 [STUDENT-OBSERVER-ANNOTATION] Filtro por período académico: ${schoolData.academicPeriodId}`);
        
        // Obtener información del período para el nombre (opcional, para mejor logging)
        try {
          const periodResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCustom: false
          });
          
          const periods = periodResponse?.data?.edges || [];
          const specificPeriod = periods.find((edge: any) => edge.node.id === schoolData.academicPeriodId);
          
          if (specificPeriod) {
            academicPeriodName = specificPeriod.node.name || schoolData.academicPeriodId;
            console.log(`✅ [STUDENT-OBSERVER-ANNOTATION] Período encontrado: ${academicPeriodName}`);
          }
        } catch (periodError) {
          console.warn(`⚠️ [STUDENT-OBSERVER-ANNOTATION] No se pudo obtener nombre del período, usando ID`);
        }
      }

      // 🔄 PASO 2: ITERAR POR CAMPUS SELECCIONADOS PARA OBTENER CURSOS
      let allCourses: any[] = [];

      for (const campusEdge of campusesToProcess) {
        const campus = campusEdge.node;
        const campusId = campus.id;
        const campusName = campus.name || 'Sin nombre';

        console.log(`\n🏢 [STUDENT-OBSERVER-ANNOTATION] Obteniendo cursos para campus: ${campusName} (ID: ${campusId})`);

        // 📚 PASO 3: OBTENER CURSOS POR CAMPUS (Con parámetros obligatorios)
        let coursesData: any = null;
        await client
          .request(QUERY_GET_ALL_COURSE, {
            academicGradeId: null, // null para obtener todos los grados
            schoolId: schoolData.schoolId,
            campusId: campusId  // ✅ OBLIGATORIO: campusId válido
          })
          .then(async (result: any) => {
            coursesData = result.data;
          });

        if (coursesData?.edges?.length) {
          console.log(`📚 [STUDENT-OBSERVER-ANNOTATION] Campus ${campusName}: ${coursesData.edges.length} cursos`);
          allCourses.push(...coursesData.edges); // Agregar cursos de este campus
        } else {
          console.log(`⚠️ [STUDENT-OBSERVER-ANNOTATION] Campus ${campusName}: No tiene cursos`);
        }
      }

      if (allCourses.length === 0) {
        console.log(`⚠️ [STUDENT-OBSERVER-ANNOTATION] No se encontraron cursos en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}`);
        return {
          entity: 'STUDENT_OBSERVER_ANNOTATION',
          online: 0,
          synced: 0,
        };
      }

      console.log(`📚 [STUDENT-OBSERVER-ANNOTATION] Total de cursos encontrados: ${allCourses.length}`);

      // 🎯 PASO 4: CALCULAR TOTAL DE ESTUDIANTES (Para barra de progreso precisa)
      let currentStudentIndex = 0;
      let totalEstimatedStudents = 0;

      // Sumo todos los estudiantes de todos los cursos
      allCourses.forEach((courseEdge: any) => {
        const course = courseEdge.node;
        if (course.studentsId && Array.isArray(course.studentsId)) {
          totalEstimatedStudents += course.studentsId.length;
        }
      });

      console.log(`👥 [STUDENT-OBSERVER-ANNOTATION] Total estimado de estudiantes: ${totalEstimatedStudents}`);

      // 🔄 PASO 5: ITERAR CURSOS (Patrón clásico)
      for (const courseEdge of allCourses) {
        const course = courseEdge.node;
        const courseId = course.id;
        const courseName = course.name || 'Sin nombre';

        console.log(`\n📖 [STUDENT-OBSERVER-ANNOTATION] Procesando curso: ${courseName} (ID: ${courseId})`);

        // Verificar que el curso tenga estudiantes (prevención de errores)
        if (!course.studentsId || !Array.isArray(course.studentsId) || course.studentsId.length === 0) {
          console.log(`⚠️ [STUDENT-OBSERVER-ANNOTATION] Curso ${courseName} no tiene estudiantes asignados`);
          continue;
        }

        console.log(`👥 [STUDENT-OBSERVER-ANNOTATION] Curso ${courseName} tiene ${course.studentsId.length} estudiantes`);

        // 🔄 PASO 6: ITERAR ESTUDIANTES (Tu algoritmo específico)
        for (const studentId of course.studentsId) {
          currentStudentIndex++;

          // 📊 PASO 7: ACTUALIZAR BARRA DE PROGRESO CON INFORMACIÓN DE FILTROS
          this.showProgressBar(
            currentStudentIndex,
            totalEstimatedStudents,
            `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global'} - ${schoolData.academicPeriodId ? `Período: ${academicPeriodName}` : 'Todos'} - ${courseName} - Est. ${currentStudentIndex}/${totalEstimatedStudents}`
          );

          try {
            // 🔍 PASO 8: CONSULTA INDIVIDUAL CON FILTRO DE PERÍODO SI EXISTE
            let annotationsData: any = null;
            
            // Construir parámetros de consulta
            const queryParams: any = {
              courseId: courseId,
              studentId: studentId,
              orderCreated: true,
              allData: true
            };

            // 🎯 AGREGAR FILTRO DE PERÍODO ACADÉMICO SI EXISTE
            if (schoolData.academicPeriodId) {
              queryParams.academicPeriodId = schoolData.academicPeriodId;
            }

            await client
              .request(QUERY_GET_ALL_STUDENT_OBSERVER_ANNOTATION, queryParams)
              .then(async (result: any) => {
                annotationsData = result.data;
              });

            // 📈 PASO 9: CONTAR Y DECIDIR SI ALMACENAR
            const annotationsCount = annotationsData?.edges?.length || 0;
            totalOnline += annotationsCount;

            if (annotationsCount > 0) {
              console.log(`✅ [STUDENT-OBSERVER-ANNOTATION] Curso ${courseName} → Estudiante ${studentId}: ${annotationsCount} anotaciones${schoolData.academicPeriodId ? ` (Período: ${academicPeriodName})` : ''}`);

              // 💾 SINCRONIZAR CADA ANOTACIÓN
              for (const annotationEdge of annotationsData.edges) {
                const annotation = annotationEdge.node;

                try {
                  // 🔄 PREPARAR DATOS CON PATRÓN ObjectId
                  const annotationId = annotation.id?.toString();
                  const annotationDetails = { ...annotation };

                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  delete annotationDetails.id;
                  delete annotationDetails.campus;
                  delete annotationDetails.school;
                  delete annotationDetails.course;
                  delete annotationDetails.academicPeriod;
                  delete annotationDetails.student;
                  delete annotationDetails.observerAnnotationType;
                  delete annotationDetails.createdByUser;
                  delete annotationDetails.updatedByUser;

                  // 🔍 BUSCAR SI YA EXISTE (POR _id ObjectId)
                  const existingAnnotation = await this.repositoryStudentObserverAnnotation.findOne({
                    where: { _id: new ObjectId(annotationId) }
                  });

                  if (existingAnnotation) {
                    // 🔄 ACTUALIZAR PRESERVANDO _id
                    await this.repositoryStudentObserverAnnotation.updateOne(
                      { _id: new ObjectId(annotationId) },
                      { $set: annotationDetails }
                    );
                  } else {
                    // 💾 CREAR CON _id ObjectId
                    await this.repositoryStudentObserverAnnotation.save({
                      _id: new ObjectId(annotationId),
                      ...annotationDetails,
                    });
                  }

                  totalSynced++;

                } catch (saveError: any) {
                  console.warn(`⚠️ [STUDENT-OBSERVER-ANNOTATION] Error al guardar anotación ${annotation.id}:`, saveError?.message || saveError);
                }
              }

            } else {
              console.log(`⚪ [STUDENT-OBSERVER-ANNOTATION] Curso ${courseName} → Estudiante ${studentId}: 0 anotaciones${schoolData.academicPeriodId ? ` (Período: ${academicPeriodName})` : ''}`);
            }

          } catch (queryError: any) {
            console.error(`❌ [STUDENT-OBSERVER-ANNOTATION] Error consultando estudiante ${studentId}:`, queryError);
            console.log(`⚪ [STUDENT-OBSERVER-ANNOTATION] Curso ${courseName} → Estudiante ${studentId}: 0 anotaciones (error)`);
          }
        }
      }

      // 📊 Barra de progreso final
      this.showProgressBar(totalEstimatedStudents, totalEstimatedStudents, 'Anotaciones Observador', totalSynced);

      console.log(`\n🎉 [STUDENT-OBSERVER-ANNOTATION] ⚡ SINCRONIZACIÓN COMPLETADA:`);
      console.log(`📊 Total registros en línea: ${totalOnline}`);
      console.log(`💾 Total registros sincronizados: ${totalSynced}`);
      console.log(`🎯 Filtros aplicados:`);
      console.log(`   - Campus: ${schoolData.campusId ? `${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Todos los campus'}`);
      console.log(`   - Período: ${schoolData.academicPeriodId ? `${academicPeriodName} (${schoolData.academicPeriodId})` : 'Todos los períodos'}`);
      console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
      console.log(`📚 Cursos procesados: ${allCourses.length}`);

      return {
        entity: 'STUDENT_OBSERVER_ANNOTATION',
        online: totalOnline,
        synced: totalSynced,
      };
    } else {
      // 📊 Solo conteo - APLICAR MISMOS FILTROS PARA CONTEO
      try {
        // Construir parámetros base para conteo
        const countParams: any = { ...schoolData };
        
        if (schoolData.campusId || schoolData.academicPeriodId) {
          // Si hay filtros específicos, necesitamos contar por partes
          totalOnline = 0;
          
          if (schoolData.campusId) {
            // 🏫 CONTEO FILTRADO POR SEDE ESPECÍFICA
            console.log(`📊 [STUDENT-OBSERVER-ANNOTATION] Contando registros para sede: ${schoolData.campusId}`);
            
            // Obtener cursos de la sede específica
            const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
              academicGradeId: null,
              schoolId: schoolData.schoolId,
              campusId: schoolData.campusId
            });

            const courses = coursesResponse?.data?.edges || [];
            console.log(`📚 [STUDENT-OBSERVER-ANNOTATION] Cursos encontrados en sede ${schoolData.campusId}: ${courses.length}`);

            // Contar anotaciones por cada curso de la sede
            for (const courseEdge of courses) {
              const courseId = courseEdge.node.id;
              
              try {
                const queryParams: any = {
                  courseId: courseId,
                  studentId: null
                };
                
                // Agregar filtro de período si existe
                if (schoolData.academicPeriodId) {
                  queryParams.academicPeriodId = schoolData.academicPeriodId;
                }
                
                const countResponse: any = await client.request(QUERT_GET_TOTAL_COUNT_STUDENT_OBSERVER_ANNOTATION, queryParams);
                totalOnline += countResponse?.data?.totalCount || 0;
              } catch (courseCountError) {
                console.warn(`⚠️ Error contando anotaciones del curso ${courseId}:`, courseCountError);
              }
            }
          } else {
            // Solo filtro por período académico (sin filtro de campus)
            const queryParams: any = {
              ...schoolData
            };
            
            if (schoolData.academicPeriodId) {
              queryParams.academicPeriodId = schoolData.academicPeriodId;
            }
            
            const result: any = await client.request(QUERT_GET_TOTAL_COUNT_STUDENT_OBSERVER_ANNOTATION, queryParams);
            totalOnline = result.data?.totalCount || 0;
          }
        } else {
          // 🌐 CONTEO GLOBAL (sin filtros)
          const result: any = await client.request(QUERT_GET_TOTAL_COUNT_STUDENT_OBSERVER_ANNOTATION, schoolData);
          totalOnline = result.data?.totalCount || 0;
        }
        
        console.log(`📊 [STUDENT-OBSERVER-ANNOTATION] Total registros contados: ${totalOnline}`);
        if (schoolData.campusId) console.log(`   - Filtrado por campus: ${schoolData.campusId}`);
        if (schoolData.academicPeriodId) console.log(`   - Filtrado por período: ${schoolData.academicPeriodId}`);
        
      } catch (countError) {
        console.warn(`⚠️ Error en conteo de anotaciones del observador:`, countError);
      }

      return {
        entity: 'STUDENT_OBSERVER_ANNOTATION',
        online: totalOnline,
      };
    }
  } catch (error: any) {
    console.error(`❌ [SYNC-STUDENT-OBSERVER-ANNOTATION] ERROR GENERAL:`, error);
    return {
      entity: 'STUDENT_OBSERVER_ANNOTATION',
      online: 0,
      error: String(error),
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC AREA COURSE PERIOD VALUATION
 */
async syncAcademicAreaCoursePeriodValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  let totalOnline = 0;
  let totalSynced = 0;

  try {
    if (typeSyncFull) {
      // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
      if (!schoolData?.schoolId || !schoolData?.schoolYearId) {
        console.error('❌ schoolData.schoolId y schoolData.schoolYearId son requeridos para Academic Area Course Period Valuation');
        return {
          entity: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION',
          online: 0,
          error: 'schoolData.schoolId y schoolData.schoolYearId son requeridos'
        };
      }

      console.log(`\n🎯 [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] ⚡ MÓDULO INICIANDO...`);
      console.log(`📖 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Parámetros: schoolId=${schoolData.schoolId}, schoolYearId=${schoolData.schoolYearId}, campusId=${schoolData.campusId || 'TODOS'}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}`);

      // 🚀 PASO 1: OBTENER PERÍODOS ACADÉMICOS CON FILTRO OPCIONAL
      console.log(`📅 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Obteniendo períodos académicos...`);

      let academicPeriodsToProcess: any[] = [];

      if (schoolData.academicPeriodId) {
        // 📅 MODO FILTRADO POR PERÍODO ACADÉMICO ESPECÍFICO
        console.log(`\n📅 [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Aplicando filtro por período académico: ${schoolData.academicPeriodId}`);
        
        const academicPeriodsResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
          schoolId: schoolData.schoolId,
          schoolYearId: schoolData.schoolYearId,
          orderCustom: false
        });

        const allPeriods = academicPeriodsResponse?.data?.edges || [];
        const specificPeriod = allPeriods.find((edge: any) => edge.node.id === schoolData.academicPeriodId);

        if (specificPeriod) {
          academicPeriodsToProcess = [specificPeriod];
          console.log(`✅ [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Período encontrado: ${specificPeriod.node.name} (${schoolData.academicPeriodId})`);
        } else {
          console.log(`⚪ [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] No se encontró el período académico especificado: ${schoolData.academicPeriodId}`);
          return {
            entity: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION',
            online: 0,
          };
        }
      } else {
        // 🌐 TODOS LOS PERÍODOS ACADÉMICOS
        console.log(`\n🌐 [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Obteniendo todos los períodos académicos`);
        
        const academicPeriodsResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
          schoolId: schoolData.schoolId,
          schoolYearId: schoolData.schoolYearId,
          orderCustom: false
        });

        academicPeriodsToProcess = academicPeriodsResponse?.data?.edges || [];
        console.log(`📅 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Encontrados ${academicPeriodsToProcess.length} períodos académicos`);
      }

      if (academicPeriodsToProcess.length === 0) {
        console.log(`⚠️ [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] No se encontraron períodos académicos`);
        return {
          entity: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION',
          online: 0,
        };
      }

      // 🚀 PASO 2: OBTENER TODAS LAS ÁREAS ACADÉMICAS
      console.log(`📚 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Obteniendo áreas académicas...`);

      const academicAreasResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_AREA, {
        schoolId: schoolData.schoolId,
        schoolYearId: schoolData.schoolYearId
      });

      const academicAreas = academicAreasResponse?.data?.edges || [];
      console.log(`📚 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Encontradas ${academicAreas.length} áreas académicas`);

      if (academicAreas.length === 0) {
        console.log(`⚠️ [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] No se encontraron áreas académicas`);
        return {
          entity: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION',
          online: 0,
        };
      }

      // 🚀 PASO 3: OBTENER CAMPUS CON FILTRO OPCIONAL
      console.log(`🏢 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Obteniendo campus...`);

      let campusesToProcess: any[] = [];

      if (schoolData.campusId) {
        // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
        console.log(`\n🏫 [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Aplicando filtro por sede: ${schoolData.campusId}`);
        
        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        const allCampuses = campusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] No se encontró la sede especificada: ${schoolData.campusId}`);
          return {
            entity: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION',
            online: 0,
          };
        }
      } else {
        // 🌐 TODAS LAS SEDES
        console.log(`\n🌐 [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Obteniendo todas las sedes`);
        
        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        campusesToProcess = campusResponse?.data?.edges || [];
        console.log(`🏢 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Encontrados ${campusesToProcess.length} campus`);
      }

      if (campusesToProcess.length === 0) {
        console.log(`⚠️ [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] No se encontraron campus`);
        return {
          entity: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION',
          online: 0,
        };
      }

      // 🚀 PASO 4: OBTENER CURSOS DE LAS SEDES SELECCIONADAS
      console.log(`🏫 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Obteniendo cursos de las sedes seleccionadas...`);

      let allCourses: any[] = [];
      for (const campusEdge of campusesToProcess) {
        const campus = campusEdge.node;
        const campusId = campus.id;

        try {
          const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
            schoolId: schoolData.schoolId,
            campusId: campusId,           // ✅ Campus específico (filtrado)
            academicGradeId: null
          });

          const courses = coursesResponse?.data?.edges || [];
          allCourses = allCourses.concat(courses);
          console.log(`🏫 Campus ${campus.name}: ${courses.length} cursos`);

        } catch (campusError) {
          console.error(`❌ Error obteniendo cursos del campus ${campusId}:`, campusError);
        }
      }

      console.log(`🏫 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Total cursos encontrados: ${allCourses.length}`);

      // 🎯 PASO 5: EXTRAER ESTUDIANTES ÚNICOS DE TODOS LOS CURSOS
      let allStudentIds: string[] = [];
      allCourses.forEach((courseEdge: any) => {
        const course = courseEdge.node;
        if (course.studentsId && Array.isArray(course.studentsId)) {
          course.studentsId.forEach((studentId: string) => {
            if (!allStudentIds.includes(studentId)) {
              allStudentIds.push(studentId);
            }
          });
        }
      });

      console.log(`👥 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Total estudiantes únicos: ${allStudentIds.length}`);

      // 🎯 PASO 6: CALCULAR TOTAL DE CONSULTAS CON FILTROS APLICADOS
      const totalQueries = academicPeriodsToProcess.length * academicAreas.length * allStudentIds.length;
      console.log(`🔢 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Total consultas estimadas: ${totalQueries}`);
      console.log(`📊 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Distribución: ${academicPeriodsToProcess.length} períodos × ${academicAreas.length} áreas × ${allStudentIds.length} estudiantes`);

      let currentQuery = 0;

      // 🔄 PASO 7: ITERAR POR PERÍODOS ACADÉMICOS FILTRADOS
      for (const periodEdge of academicPeriodsToProcess) {
        const academicPeriod = periodEdge.node;
        const academicPeriodId = academicPeriod.id;
        const periodName = academicPeriod.name || 'Sin nombre';

        console.log(`\n📅 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Procesando período: ${periodName} (${academicPeriodId})`);

        // 🔄 PASO 8: ITERAR POR ÁREAS ACADÉMICAS
        for (const areaEdge of academicAreas) {
          const academicArea = areaEdge.node;
          const academicAreaId = academicArea.id;
          const areaName = academicArea.name || 'Sin nombre';

          // 🔄 PASO 9: ITERAR POR ESTUDIANTES
          for (const studentId of allStudentIds) {
            currentQuery++;

            // 📊 MOSTRAR PROGRESO CON INFORMACIÓN DE FILTROS
            this.showProgressBar(
              currentQuery,
              totalQueries,
              `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name}` : 'Global'}${schoolData.academicPeriodId ? ` - Período: ${periodName}` : ''} - ${areaName}`
            );

            try {
              // 🔍 PASO 10: CONSULTA INDIVIDUAL CON PARÁMETROS OBLIGATORIOS
              const valuationsResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_AREA_COURSE_PERIOD_VALUATION, {
                academicPeriodId: academicPeriodId,    // ✅ Obligatorio (ahora filtrado)
                academicAreaId: academicAreaId,        // ✅ Obligatorio
                studentId: studentId                   // ✅ Opcional pero lo enviamos
              });

              const valuations = valuationsResponse?.data?.edges || [];
              totalOnline += valuations.length;

              // 💾 PASO 11: SINCRONIZAR CADA VALORACIÓN
              for (const valuationEdge of valuations) {
                const valuation = valuationEdge.node;

                /* try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  const valuationData = {
                    campusId: valuation.campusId,
                    schoolId: valuation.schoolId,
                    academicAreaId: valuation.academicAreaId,
                    academicPeriodId: valuation.academicPeriodId,
                    studentId: valuation.studentId,
                    assessment: valuation.assessment,
                    performanceLevelId: valuation.performanceLevelId,
                    //performanceLevelId: valuation.performanceLevelId ? new ObjectId(valuation.performanceLevelId) : null,
                    valuationType: valuation.valuationType,
                    active: valuation.active,
                    version: valuation.version,
                    createdAt: valuation.createdAt,
                    updatedAt: valuation.updatedAt,
                    createdByUserId: valuation.createdByUserId,
                    updatedByUserId: valuation.updatedByUserId,
                  };

                  // 🔍 BUSCAR SI YA EXISTE
                  const existingValuation = await this.repositoryAcademicAreaCoursePeriodValuation.findOne({
                    where: { _id: new ObjectId(valuation.id) }
                  });

                  if (existingValuation) {
                    // 🔄 ACTUALIZAR EXISTENTE
                    await this.repositoryAcademicAreaCoursePeriodValuation.updateOne(
                      { _id: new ObjectId(valuation.id) },
                      { $set: valuationData }
                    );
                  } else {
                    // ✅ CREAR NUEVO
                    await this.repositoryAcademicAreaCoursePeriodValuation.save({
                      _id: new ObjectId(valuation.id),
                      ...valuationData,
                    });
                  }

                  totalSynced++;

                } */

                try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  const valuationData = {
                    campusId: valuation.campusId,
                    schoolId: valuation.schoolId,
                    academicAreaId: valuation.academicAreaId,
                    academicPeriodId: valuation.academicPeriodId,
                    studentId: valuation.studentId,
                    assessment: valuation.assessment,
                    //performanceLevelId: valuation.performanceLevelId,
                    performanceLevelId: valuation.performanceLevelId ? new ObjectId(valuation.performanceLevelId) : null,
                    valuationType: valuation.valuationType,
                    active: valuation.active,
                    version: valuation.version,
                    createdAt: valuation.createdAt,
                    updatedAt: valuation.updatedAt,
                    createdByUserId: valuation.createdByUserId,
                    updatedByUserId: valuation.updatedByUserId,
                  };

                  // 🔍 BUSCAR SI YA EXISTE
                  const existingValuation = await this.repositoryAcademicAreaCoursePeriodValuation.findOne({
                    where: { _id: new ObjectId(valuation.id) }
                  });

                  if (existingValuation) {
                    // 🔄 ACTUALIZAR EXISTENTE
                    await this.repositoryAcademicAreaCoursePeriodValuation.updateOne(
                      { _id: new ObjectId(valuation.id) },
                      { $set: valuationData }
                    );
                  } else {
                    // ✅ CREAR NUEVO
                    await this.repositoryAcademicAreaCoursePeriodValuation.insertOne({
                    //await this.repositoryAcademicAreaCoursePeriodValuation.save({
                      _id: new ObjectId(valuation.id),
                      ...valuationData,
                    });
                  }

                  totalSynced++;

                } catch (saveError: any) {
                  console.warn(`⚠️ [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Error al guardar valoración ${valuation.id}:`, saveError?.message);
                }
              }

            } catch (queryError: any) {
              console.warn(`⚠️ [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Error en consulta período ${academicPeriodId} → área ${academicAreaId} → estudiante ${studentId}:`, queryError?.message);
            }
          }
        }
      }

      console.log(`📖 [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] ✅ Completado: ${totalOnline} registros encontrados, ${totalSynced} sincronizados`);
      console.log(`🎯 Filtros aplicados:`);
      console.log(`   🏢 Sede: ${schoolData.campusId ? `${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Todas las sedes'}`);
      console.log(`   📅 Período: ${schoolData.academicPeriodId ? `${academicPeriodsToProcess[0]?.node?.name || schoolData.academicPeriodId} (${schoolData.academicPeriodId})` : 'Todos los períodos'}`);
      console.log(`   📊 Sedes procesadas: ${campusesToProcess.length}`);
      console.log(`   📊 Períodos procesados: ${academicPeriodsToProcess.length}`);

      return {
        entity: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION',
        online: totalOnline,
        synced: totalSynced,
      };

    } else {
      // 📊 SOLO CONTEO - APLICAR MISMOS FILTROS
      if (!schoolData?.schoolId) {
        console.error('❌ schoolData.schoolId es requerido para Academic Area Course Period Valuation count');
        return {
          entity: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION',
          online: 0,
          error: 'schoolData.schoolId es requerido'
        };
      }

      try {
        // 🔢 APLICAR FILTROS PARA CONTEO
        if (schoolData.academicPeriodId && schoolData.campusId) {
          // 🎯 CONTEO CON AMBOS FILTROS
          console.log(`📊 [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Contando con filtros: Sede ${schoolData.campusId} + Período ${schoolData.academicPeriodId}`);
          
          // Obtener áreas académicas
          const academicAreasResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_AREA, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId
          });

          const academicAreas = academicAreasResponse?.data?.edges || [];

          // Obtener cursos de la sede específica
          const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
            schoolId: schoolData.schoolId,
            campusId: schoolData.campusId,
            academicGradeId: null
          });

          const courses = coursesResponse?.data?.edges || [];
          
          // Extraer estudiantes únicos
          let studentIds: string[] = [];
          courses.forEach((courseEdge: any) => {
            const course = courseEdge.node;
            if (course.studentsId && Array.isArray(course.studentsId)) {
              course.studentsId.forEach((studentId: string) => {
                if (!studentIds.includes(studentId)) {
                  studentIds.push(studentId);
                }
              });
            }
          });

          // Contar valoraciones para cada combinación
          for (const areaEdge of academicAreas) {
            const academicAreaId = areaEdge.node.id;
            
            for (const studentId of studentIds) {
              try {
                const countResponse: any = await client.request(QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_PERIOD_VALUATION, {
                  academicPeriodId: schoolData.academicPeriodId,
                  academicAreaId: academicAreaId,
                  studentId: studentId
                });

                totalOnline += countResponse?.data?.totalCount || 0;
              } catch (countError) {
                console.warn(`⚠️ Error contando período ${schoolData.academicPeriodId} - área ${academicAreaId} - estudiante ${studentId}:`, countError);
              }
            }
          }
        } else if (schoolData.academicPeriodId) {
          // 🎯 CONTEO SOLO POR PERÍODO
          console.log(`📊 [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Contando solo por período: ${schoolData.academicPeriodId}`);
          
          await client
            .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_PERIOD_VALUATION, {
              academicPeriodId: schoolData.academicPeriodId,
              academicAreaId: "temp",
              studentId: null
            })
            .then(async (result: any) => {
              totalOnline = result?.data?.totalCount || 0;
            });
        } else if (schoolData.campusId) {
          // 🎯 CONTEO SOLO POR SEDE (necesitaría lógica similar al caso completo pero sin filtro de período)
          console.log(`📊 [ACADEMIC-AREA-COURSE-PERIOD-VALUATION] Contando solo por sede: ${schoolData.campusId}`);
          
          // Implementar lógica similar pero iterando todos los períodos
          const academicPeriodsResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCustom: false
          });

          const academicPeriods = academicPeriodsResponse?.data?.edges || [];
          
          // ... (lógica similar al caso anterior pero iterando períodos)
          for (const periodEdge of academicPeriods) {
            const academicPeriodId = periodEdge.node.id;
            
            // Contar para este período con la sede específica
            try {
              const countResponse: any = await client.request(QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_PERIOD_VALUATION, {
                academicPeriodId: academicPeriodId,
                academicAreaId: "temp",
                studentId: null
              });

              totalOnline += countResponse?.data?.totalCount || 0;
            } catch (countError) {
              console.warn(`⚠️ Error contando período ${academicPeriodId}:`, countError);
            }
          }
        } else {
          // 🌐 CONTEO GLOBAL (lógica original)
          await client
            .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_PERIOD_VALUATION, {
              academicPeriodId: "temp",
              academicAreaId: "temp",
              studentId: null
            })
            .then(async (result: any) => {
              totalOnline = result?.data?.totalCount || 0;
            });
        }
      } catch (countError) {
        console.warn(`⚠️ Error en conteo de valoraciones:`, countError);
      }

      return {
        entity: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION',
        online: totalOnline,
      };
    }
  } catch (error: any) {
    console.error(`❌ [SYNC-ACADEMIC-AREA-COURSE-PERIOD-VALUATION] ERROR GENERAL:`, error);
    return {
      entity: 'ACADEMIC_AREA_COURSE_PERIOD_VALUATION',
      online: 0,
      error: String(error),
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC AREA COURSE YEAR VALUATION
 */
async syncAcademicAreaCourseYearValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  let totalOnline = 0;
  let totalSynced = 0;

  try {
    if (typeSyncFull) {
      // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
      if (!schoolData?.schoolId || !schoolData?.schoolYearId) {
        console.error('❌ schoolData.schoolId y schoolData.schoolYearId son requeridos para Academic Area Course Year Valuation');
        return {
          entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
          online: 0,
          error: 'schoolData.schoolId y schoolData.schoolYearId son requeridos'
        };
      }

      console.log(`\n🎯 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] ⚡ MÓDULO INICIANDO...`);
      console.log(`📊 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Parámetros: schoolId=${schoolData.schoolId}, schoolYearId=${schoolData.schoolYearId}, campusId=${schoolData.campusId || 'TODOS'}`);

      // 🚀 PASO 1: OBTENER TODAS LAS ÁREAS ACADÉMICAS
      console.log(`📚 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Obteniendo áreas académicas...`);

      const academicAreasResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_AREA, {
        schoolId: schoolData.schoolId,
        schoolYearId: schoolData.schoolYearId,
        orderCreated: true,
        allData: true
      });

      const academicAreas = academicAreasResponse?.data?.edges || [];
      console.log(`📚 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Encontradas ${academicAreas.length} áreas académicas`);

      if (academicAreas.length === 0) {
        console.log(`⚠️ [ACADEMIC-AREA-COURSE-YEAR-VALUATION] No se encontraron áreas académicas`);
        return {
          entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
          online: 0,
        };
      }

      // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
      let campusesToProcess: any[] = [];

      if (schoolData.campusId) {
        // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
        console.log(`\n🏫 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Obteniendo información de la sede específica: ${schoolData.campusId}`);
        
        try {
          const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
            schoolId: schoolData.schoolId
          });

          // Filtrar solo el campus específico
          const allCampuses = specificCampusResponse?.data?.edges || [];
          const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

          if (specificCampus) {
            campusesToProcess = [specificCampus];
            console.log(`✅ [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
          } else {
            console.log(`⚪ [ACADEMIC-AREA-COURSE-YEAR-VALUATION] No se encontró la sede especificada: ${schoolData.campusId}`);
            return {
              entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
              online: 0,
            };
          }
        } catch (campusError) {
          console.error(`❌ [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Error obteniendo sede específica:`, campusError);
          return {
            entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
            online: 0,
            error: 'Error obteniendo sede específica'
          };
        }
      } else {
        // 🌐 MODO GLOBAL (TODAS LAS SEDES)
        console.log(`\n🌐 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Sincronización global (todas las sedes)`);
        
        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        campusesToProcess = campusResponse?.data?.edges || [];
        console.log(`✅ [ACADEMIC-AREA-COURSE-YEAR-VALUATION] ${campusesToProcess.length} sedes encontradas para sincronización global`);
      }

      if (campusesToProcess.length === 0) {
        console.log(`⚠️ [ACADEMIC-AREA-COURSE-YEAR-VALUATION] No se encontraron sedes para sincronizar`);
        return {
          entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
          online: 0,
        };
      }

      // 🚀 PASO 2: OBTENER CURSOS DE LAS SEDES SELECCIONADAS PARA EXTRAER ESTUDIANTES
      console.log(`🏫 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Obteniendo cursos de las sedes seleccionadas para extraer estudiantes...`);

      let allCourses: any[] = [];
      for (const campusEdge of campusesToProcess) {
        const campus = campusEdge.node;
        const campusId = campus.id;
        const campusName = campus.name || 'Sin nombre';

        console.log(`🏢 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Procesando sede: ${campusName} (${campusId})`);

        try {
          const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
            schoolId: schoolData.schoolId,
            campusId: campusId,        // ✅ Campus específico
            academicGradeId: null
          });

          const courses = coursesResponse?.data?.edges || [];
          allCourses = allCourses.concat(courses);
          console.log(`🏫 Campus ${campusName}: ${courses.length} cursos`);

        } catch (campusError) {
          console.error(`❌ Error obteniendo cursos del campus ${campusId}:`, campusError);
        }
      }

      console.log(`🏫 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Total cursos encontrados: ${allCourses.length}`);

      if (allCourses.length === 0) {
        console.log(`⚠️ [ACADEMIC-AREA-COURSE-YEAR-VALUATION] No se encontraron cursos en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}`);
        return {
          entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
          online: 0,
        };
      }

      // 🎯 PASO 3: EXTRAER ESTUDIANTES ÚNICOS DE TODOS LOS CURSOS DE LAS SEDES SELECCIONADAS
      let allStudentIds: string[] = [];
      allCourses.forEach((courseEdge: any) => {
        const course = courseEdge.node;
        if (course.studentsId && Array.isArray(course.studentsId)) {
          course.studentsId.forEach((studentId: string) => {
            if (!allStudentIds.includes(studentId)) {
              allStudentIds.push(studentId);
            }
          });
        }
      });

      console.log(`👥 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Total estudiantes únicos: ${allStudentIds.length}`);

      // 🎯 PASO 4: CALCULAR TOTAL DE CONSULTAS
      const totalQueries = academicAreas.length * allStudentIds.length;
      console.log(`🔢 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Total consultas estimadas: ${totalQueries}`);

      let currentQuery = 0;

      // 🔄 PASO 5: ITERAR POR ÁREAS ACADÉMICAS
      for (const areaEdge of academicAreas) {
        const academicArea = areaEdge.node;
        const academicAreaId = academicArea.id;
        const areaName = academicArea.name || 'Sin nombre';

        console.log(`📖 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Procesando área: ${areaName}`);

        // 🔄 PASO 6: ITERAR POR ESTUDIANTES
        for (const studentId of allStudentIds) {
          currentQuery++;

          // 📊 MOSTRAR PROGRESO CON INFORMACIÓN DE FILTRO
          this.showProgressBar(
            currentQuery,
            totalQueries,
            `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global'} - Valoraciones Anuales: ${areaName}`
          );

          try {
            // 🔍 PASO 7: CONSULTA INDIVIDUAL CON PARÁMETROS OBLIGATORIOS
            const valuationsResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_AREA_COURSE_YEAR_VALUATION, {
              schoolYearId: schoolData.schoolYearId,    // ✅ Obligatorio
              academicAreaId: academicAreaId,           // ✅ Obligatorio
              studentId: studentId,                     // ✅ Opcional pero lo enviamos
              orderCreated: true,
              allData: true
            });

            const valuations = valuationsResponse?.data?.edges || [];
            totalOnline += valuations.length;

            // 💾 PASO 8: SINCRONIZAR CADA VALORACIÓN
            for (const valuationEdge of valuations) {
              const valuation = valuationEdge.node;

              try {
                // 🧹 LIMPIAR CAMPOS DE RELACIONES
                const valuationData = {
                  campusId: valuation.campusId,
                  schoolId: valuation.schoolId,
                  academicAreaId: valuation.academicAreaId,
                  schoolYearId: valuation.schoolYearId,
                  studentId: valuation.studentId,
                  assessment: valuation.assessment,
                  performanceLevelId: valuation.performanceLevelId,
                  valuationType: valuation.valuationType,
                  active: valuation.active,
                  version: valuation.version,
                  createdAt: valuation.createdAt,
                  updatedAt: valuation.updatedAt,
                  createdByUserId: valuation.createdByUserId,
                  updatedByUserId: valuation.updatedByUserId,
                };

                // 🔍 BUSCAR SI YA EXISTE
                const existingValuation = await this.repositoryAcademicAreaCourseYearValuation.findOne({
                  where: { _id: new ObjectId(valuation.id) }
                });

                if (existingValuation) {
                  // 🔄 ACTUALIZAR EXISTENTE
                  await this.repositoryAcademicAreaCourseYearValuation.updateOne(
                    { _id: new ObjectId(valuation.id) },
                    { $set: valuationData }
                  );
                } else {
                  // ✅ CREAR NUEVO
                  await this.repositoryAcademicAreaCourseYearValuation.save({
                    _id: new ObjectId(valuation.id),
                    ...valuationData,
                  });
                }

                totalSynced++;

              } catch (saveError: any) {
                console.warn(`⚠️ [SYNC-ACADEMIC-AREA-COURSE-YEAR-VALUATION] Error al guardar valoración ${valuation.id}:`, saveError?.message);
              }
            }

          } catch (queryError: any) {
            console.warn(`⚠️ [SYNC-ACADEMIC-AREA-COURSE-YEAR-VALUATION] Error en consulta área ${academicAreaId} → estudiante ${studentId}:`, queryError?.message);
          }
        }
      }

      console.log(`📖 [SYNC-ACADEMIC-AREA-COURSE-YEAR-VALUATION] ✅ Completado: ${totalOnline} registros encontrados, ${totalSynced} sincronizados`);
      console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
      console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
      console.log(`📚 Cursos procesados: ${allCourses.length}`);
      console.log(`👥 Estudiantes únicos procesados: ${allStudentIds.length}`);

      return {
        entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
        online: totalOnline,
        synced: totalSynced,
      };

    } else {
      // 📊 SOLO CONTEO - APLICAR MISMO FILTRO PARA CONTEO
      if (!schoolData?.schoolId || !schoolData?.schoolYearId) {
        console.error('❌ schoolData.schoolId y schoolData.schoolYearId son requeridos para Academic Area Course Year Valuation count');
        return {
          entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
          online: 0,
          error: 'schoolData.schoolId y schoolData.schoolYearId son requeridos'
        };
      }

      try {
        if (schoolData.campusId) {
          // 🏫 CONTEO FILTRADO POR SEDE ESPECÍFICA
          console.log(`📊 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Contando registros para sede: ${schoolData.campusId}`);
          
          // Primero obtener áreas académicas
          const academicAreasResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_AREA, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCreated: true,
            allData: true
          });

          const academicAreas = academicAreasResponse?.data?.edges || [];
          console.log(`📚 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Áreas académicas encontradas: ${academicAreas.length}`);

          // Luego obtener estudiantes de la sede específica
          const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
            schoolId: schoolData.schoolId,
            campusId: schoolData.campusId,
            academicGradeId: null
          });

          const courses = coursesResponse?.data?.edges || [];
          console.log(`📚 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Cursos encontrados en sede ${schoolData.campusId}: ${courses.length}`);

          // Extraer estudiantes únicos de la sede
          let studentIds: string[] = [];
          courses.forEach((courseEdge: any) => {
            const course = courseEdge.node;
            if (course.studentsId && Array.isArray(course.studentsId)) {
              course.studentsId.forEach((studentId: string) => {
                if (!studentIds.includes(studentId)) {
                  studentIds.push(studentId);
                }
              });
            }
          });

          console.log(`👥 [ACADEMIC-AREA-COURSE-YEAR-VALUATION] Estudiantes únicos en sede ${schoolData.campusId}: ${studentIds.length}`);

          // Contar valoraciones por cada combinación área + estudiante de la sede
          for (const areaEdge of academicAreas) {
            const academicAreaId = areaEdge.node.id;
            
            for (const studentId of studentIds) {
              try {
                const countResponse: any = await client.request(QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_YEAR_VALUATION, {
                  schoolYearId: schoolData.schoolYearId,
                  academicAreaId: academicAreaId,
                  studentId: studentId
                });

                totalOnline += countResponse?.data?.totalCount || 0;
              } catch (combinationCountError) {
                console.warn(`⚠️ Error contando valoraciones del área ${academicAreaId} - estudiante ${studentId}:`, combinationCountError);
              }
            }
          }
        } else {
          // 🌐 CONTEO GLOBAL
          await client
            .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_YEAR_VALUATION, {
              schoolYearId: schoolData.schoolYearId,    // ✅ Obligatorio
              academicAreaId: "temp",                   // ✅ Valor temporal para conteo
              studentId: null                           // ✅ Opcional
            })
            .then(async (result: any) => {
              totalOnline = result?.data?.totalCount || 0;
            });
        }
      } catch (countError) {
        console.warn(`⚠️ Error en conteo de valoraciones anuales por área:`, countError);
      }

      return {
        entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
        online: totalOnline,
      };
    }
  } catch (error: any) {
    console.error(`❌ [SYNC-ACADEMIC-AREA-COURSE-YEAR-VALUATION] ERROR GENERAL:`, error);
    return {
      entity: 'ACADEMIC_AREA_COURSE_YEAR_VALUATION',
      online: 0,
      error: String(error),
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE GRADE ASSIGNMENT
 */
  async syncGradeAssignment(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let totalOnline = 0;
    let totalSynced = 0;

    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Grade Assignment');
          return {
            entity: 'GRADE_ASSIGNMENT',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`\n🎯 [GRADE-ASSIGNMENT] INICIANDO SINCRONIZACIÓN COMPLEJA...`);
        console.log(`📊 [GRADE-ASSIGNMENT] Combinatoria: GRADOS × ASIGNATURAS para schoolId: ${schoolData.schoolId}`);

        // 🚀 PASO 1: OBTENER TODOS LOS ACADEMIC GRADES
        console.log(`\n📚 [GRADE-ASSIGNMENT] PASO 1: Obteniendo Academic Grades...`);

        let academicGradesData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_GRADE, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId    // ✅ Opcional
          })
          .then(async (result: any) => {
            academicGradesData = result;
          });

        if (!academicGradesData?.data?.edges?.length) {
          console.log(`⚠️  [GRADE-ASSIGNMENT] No se encontraron Academic Grades`);
          return {
            entity: 'GRADE_ASSIGNMENT',
            online: 0,
            synced: 0,
          };
        }

        const academicGrades = academicGradesData.data.edges;
        console.log(`📚 [GRADE-ASSIGNMENT] Encontrados ${academicGrades.length} Academic Grades`);

        // 🚀 PASO 2: OBTENER TODAS LAS ACADEMIC ASIGNATURES
        console.log(`\n📖 [GRADE-ASSIGNMENT] PASO 2: Obteniendo Academic Asignatures...`);

        let academicAsignaturesData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId,   // ✅ Opcional
            academicAreaId: null                     // ✅ Opcional (null para todas)
          })
          .then(async (result: any) => {
            academicAsignaturesData = result;
          });

        if (!academicAsignaturesData?.data?.edges?.length) {
          console.log(`⚠️  [GRADE-ASSIGNMENT] No se encontraron Academic Asignatures`);
          return {
            entity: 'GRADE_ASSIGNMENT',
            online: 0,
            synced: 0,
          };
        }

        const academicAsignatures = academicAsignaturesData.data.edges;
        console.log(`📖 [GRADE-ASSIGNMENT] Encontradas ${academicAsignatures.length} Academic Asignatures`);

        // 🎯 PASO 3: CALCULAR TOTAL DE COMBINACIONES
        let currentCombinationIndex = 0;
        let totalEstimatedCombinations = academicGrades.length * academicAsignatures.length;

        console.log(`🔢 [GRADE-ASSIGNMENT] Total combinaciones estimadas: ${totalEstimatedCombinations} (${academicGrades.length} grados × ${academicAsignatures.length} asignaturas)`);

        // 🔄 PASO 4: ITERAR TODAS LAS COMBINACIONES
        for (const gradeEdge of academicGrades) {
          const academicGrade = gradeEdge.node;
          const academicGradeId = academicGrade.id;
          const gradeName = academicGrade.name || academicGradeId;

          console.log(`\n📚 [GRADE-ASSIGNMENT] Procesando Grado: ${gradeName} (${academicGradeId})`);

          // 🔄 PASO 4B: PARA CADA GRADO, ITERAR TODAS LAS ASIGNATURAS
          for (const asignatureEdge of academicAsignatures) {
            const academicAsignature = asignatureEdge.node;
            const academicAsignatureId = academicAsignature.id;
            const asignatureName = academicAsignature.name || academicAsignatureId;

            currentCombinationIndex++;

            try {
              // 📊 Actualizar barra de progreso
              this.showProgressBar(
                currentCombinationIndex,
                totalEstimatedCombinations,
                `${gradeName} × ${asignatureName}`
              );

              // 🎯 PASO 4C: CONSULTA INDIVIDUAL POR COMBINACIÓN
              console.log(`\n🔍 [GRADE-ASSIGNMENT] Consultando combinación ${currentCombinationIndex}/${totalEstimatedCombinations}:`);
              console.log(`   📚 Grado: ${gradeName} (${academicGradeId})`);
              console.log(`   📖 Asignatura: ${asignatureName} (${academicAsignatureId})`);

              let gradeAssignmentData: any = null;
              await client
                .request(QUERY_GET_ALL_GRADE_ASSIGNMENT, {
                  schoolId: schoolData.schoolId,           // ✅ Obligatorio
                  academicGradeId: academicGradeId,        // ✅ Obligatorio (de la iteración)
                  academicAsignatureId: academicAsignatureId, // ✅ Obligatorio (de la iteración)
                })
                .then(async (result: any) => {
                  gradeAssignmentData = result;
                });

              // 🎯 PASO 4D: PROCESAR RESULTADOS SI EXISTEN
              if (gradeAssignmentData?.data?.edges?.length > 0) {
                console.log(`✅ [GRADE-ASSIGNMENT] Encontrados ${gradeAssignmentData.data.edges.length} Grade Assignments para esta combinación`);

                totalOnline += gradeAssignmentData.data.edges.length;

                for (const gradeAssignmentEdge of gradeAssignmentData.data.edges) {
                  const gradeAssignment = gradeAssignmentEdge.node;
                  const gradeAssignmentId = gradeAssignment.id;

                  try {
                    // 🧹 LIMPIAR CAMPOS DE RELACIONES
                    const gradeAssignmentDetails = { ...gradeAssignment };
                    delete gradeAssignmentDetails.id;
                    delete gradeAssignmentDetails.school;
                    delete gradeAssignmentDetails.academicGrade;
                    delete gradeAssignmentDetails.academicAsignature;
                    delete gradeAssignmentDetails.schoolYear;

                    // 🔍 BUSCAR SI EXISTE EN LOCAL
                    const existingGradeAssignment = await this.repositoryGradeAssignment.findOneBy(gradeAssignmentId);

                    if (existingGradeAssignment == null) {
                      // ✅ CREAR NUEVO REGISTRO
                      await this.repositoryGradeAssignment.save({
                        _id: new ObjectId(gradeAssignmentId),
                        ...gradeAssignmentDetails,
                      });
                    } else {
                      // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                      await this.repositoryGradeAssignment.update(
                        { id: gradeAssignmentId },
                        gradeAssignmentDetails,
                      );
                    }

                    totalSynced++;

                  } catch (gradeAssignmentError) {
                    console.error(`❌ [GRADE-ASSIGNMENT] Error procesando Grade Assignment ${gradeAssignmentId}:`, gradeAssignmentError);
                  }
                }
              } else {
                console.log(`⚠️  [GRADE-ASSIGNMENT] No hay Grade Assignments para esta combinación`);
              }

            } catch (combinationError) {
              console.error(`❌ [GRADE-ASSIGNMENT] Error en combinación Grade(${academicGradeId}) × Asignature(${academicAsignatureId}):`, combinationError);
            }
          }
        }

        // 📊 Barra de progreso final
        this.showProgressBar(totalEstimatedCombinations, totalEstimatedCombinations, 'Grade Assignments', totalSynced);

        console.log(`\n🎉 [GRADE-ASSIGNMENT] SINCRONIZACIÓN COMPLEJA COMPLETADA:`);
        console.log(`📊 Total combinaciones procesadas: ${totalEstimatedCombinations}`);
        console.log(`📊 Total registros en línea: ${totalOnline}`);
        console.log(`💾 Total registros sincronizados: ${totalSynced}`);

        return {
          entity: 'GRADE_ASSIGNMENT',
          online: totalOnline,
          synced: totalSynced,
        };
      } else {
        // 📊 Solo conteo - usar query de conteo total
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Grade Assignment count');
          return {
            entity: 'GRADE_ASSIGNMENT',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        await client
          .request(QUERT_GET_TOTAL_COUNT_GRADE_ASSIGNMENT, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            academicGradeId: null,                   // ✅ Opcional (null para contar todos)
            academicAsignatureId: null               // ✅ Opcional (null para contar todos)
          })
          .then(async (result: any) => {
            totalOnline = result.data?.totalCount || 0;
          });

        return {
          entity: 'GRADE_ASSIGNMENT',
          online: totalOnline,
        };
      }
    } catch (error) {
      console.error(`❌ [SYNC-GRADE-ASSIGNMENT] ERROR GENERAL:`, error);
      return {
        entity: 'GRADE_ASSIGNMENT',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE TEACHER
 */
  async syncTeacher(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let totalOnline = 0;
    let totalSynced = 0;

    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Teacher');
          return {
            entity: 'TEACHER',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`📖 [SYNC-TEACHER] Iniciando sincronización para schoolId: ${schoolData.schoolId}, schoolYearId: ${schoolData.schoolYearId || 'null'}`);

        // 🚀 PASO 1: OBTENER TODOS LOS CAMPUS DEL COLEGIO
        console.log(`🏢 [SYNC-TEACHER] Obteniendo campus para schoolId: ${schoolData.schoolId}`);

        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        const campuses = campusResponse?.data?.edges || [];
        console.log(`🏢 [SYNC-TEACHER] Encontrados ${campuses.length} campus`);

        if (campuses.length === 0) {
          console.log(`⚠️ [SYNC-TEACHER] No se encontraron campus para sincronizar teachers`);
          return {
            entity: 'TEACHER',
            online: 0,
            synced: 0,
          };
        }

        // 🎯 PASO 2: EXTRAER IDs DE CAMPUS PARA CREAR ARRAYS
        const campusIds = campuses.map((campusEdge: any) => campusEdge.node.id);
        console.log(`🏢 [SYNC-TEACHER] Campus IDs: ${campusIds.join(', ')}`);

        // 🔍 PASO 3: CONSULTA ÚNICA CON ARRAYS DE PARÁMETROS OBLIGATORIOS
        console.log(`👨‍🏫 [SYNC-TEACHER] Consultando teachers de todos los campus...`);

        const teachersResponse: any = await client.request(QUERY_GET_ALL_TEACHER, {
          schoolId: [schoolData.schoolId],        // ✅ Array obligatorio
          campusId: campusIds,                    // ✅ Array obligatorio (todos los campus)
          schoolYearId: schoolData.schoolYearId   // ✅ Opcional
        });

        const teachers = teachersResponse?.data?.edges || [];
        totalOnline = teachers.length;

        console.log(`👨‍🏫 [SYNC-TEACHER] Encontrados ${teachers.length} teachers en total`);

        // 💾 PASO 4: SINCRONIZAR CADA TEACHER
        let insertedCount = 0;
        let updatedCount = 0;

        for (let i = 0; i < teachers.length; i++) {
          const teacherEdge = teachers[i];
          const teacher = teacherEdge.node;

          // 📊 MOSTRAR PROGRESO
          this.showProgressBar(
            i + 1,
            teachers.length,
            `Sincronizando teacher ${teacher.id}`
          );

          try {
            // 🧹 LIMPIAR CAMPOS DE RELACIONES Y PREPARAR DATOS
            const teacherDetails = { ...teacher };
            const userDetails = teacherDetails.user ? { ...teacherDetails.user } : null;

            delete teacherDetails.id;
            delete teacherDetails.user;
            delete teacherDetails.school;
            delete teacherDetails.campus;
            delete teacherDetails.academicAsignature;
            delete teacherDetails.schoolYear;

            // 🔍 SINCRONIZAR USUARIO PRIMERO (SI EXISTE)
            if (userDetails) {
              const userId = userDetails.id?.toString();
              delete userDetails.id;

              const existingUser = await this.repositoryUser.findOneBy(userId);

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

            // 🔍 BUSCAR SI EXISTE EL TEACHER EN LOCAL
            const existingTeacher = await this.repositoryTeacher.findOneBy(teacher.id);

            if (existingTeacher == null) {
              // ✅ CREAR NUEVO REGISTRO
              await this.repositoryTeacher.save({
                _id: new ObjectId(teacher.id),
                ...teacherDetails,
              });
              insertedCount++;
            } else {
              // 🔄 ACTUALIZAR REGISTRO EXISTENTE
              await this.repositoryTeacher.update(
                { id: teacher.id },
                teacherDetails,
              );
              updatedCount++;
            }

            totalSynced++;

          } catch (saveError: any) {
            console.warn(`⚠️ [SYNC-TEACHER] Error al guardar teacher ${teacher.id}:`, saveError?.message);
          }
        }

        console.log(`📖 [SYNC-TEACHER] ✅ Completado: ${insertedCount} creados, ${updatedCount} actualizados, ${totalSynced} sincronizados`);

        return {
          entity: 'TEACHER',
          online: totalOnline,
          synced: totalSynced,
        };

      } else {
        // 📊 SOLO CONTEO - VALIDAR PARÁMETROS OBLIGATORIOS TAMBIÉN
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Teacher count');
          return {
            entity: 'TEACHER',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        await client
          .request(QUERT_GET_TOTAL_COUNT_TEACHER, {
            schoolId: [schoolData.schoolId],        // ✅ Array obligatorio
            campusId: null,                         // ✅ Null para contar todos
            schoolYearId: schoolData.schoolYearId   // ✅ Opcional
          })
          .then(async (result: any) => {
            totalOnline = result?.data?.totalCount || 0;
          });

        return {
          entity: 'TEACHER',
          online: totalOnline,
        };
      }
    } catch (error: any) {
      console.error(`❌ [SYNC-TEACHER] ERROR GENERAL:`, error);
      return {
        entity: 'TEACHER',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC ASIGNATURE COURSE
 */
async syncAcademicAsignatureCourse(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let totalOnline = 0;
    let totalSynced = 0;
    let syncedAcademicAsignatureCourseIds: string[] = []; // 🎯 GUARDAR IDs SINCRONIZADOS EN MEMORIA

    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Asignature Course');
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`\n🎯 [ACADEMIC-ASIGNATURE-COURSE] ⚡ MÓDULO INICIANDO...`);
        console.log(`📊 [ACADEMIC-ASIGNATURE-COURSE] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}`);

        try {
          let courseIds: string[] = [];

          // 🔍 OBTENER CURSOS SEGÚN CAMPUSID (SI ESTÁ PRESENTE)
          if (schoolData.campusId) {
            console.log(`\n🏫 [ACADEMIC-ASIGNATURE-COURSE] Obteniendo cursos de la sede: ${schoolData.campusId}`);

            const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
              orderCreated: true,
              allData: true,
              campusId: schoolData.campusId
            });

            const coursesCount = coursesResponse?.data?.edges?.length || 0;
            console.log(`✅ [ACADEMIC-ASIGNATURE-COURSE] ${coursesCount} cursos encontrados en la sede`);

            if (coursesCount > 0) {
              courseIds = coursesResponse.data.edges.map((edge: any) => edge.node.id);
              console.log(`📚 [ACADEMIC-ASIGNATURE-COURSE] IDs de cursos: [${courseIds.slice(0, 3).join(', ')}${courseIds.length > 3 ? '...' : ''}]`);
            } else {
              console.log(`⚪ [ACADEMIC-ASIGNATURE-COURSE] No se encontraron cursos en la sede especificada`);
              return {
                entity: 'ACADEMIC_ASIGNATURE_COURSE',
                online: 0,
                synced: 0,
                syncedIds: [] // 🎯 RETORNAR ARRAY VACÍO SI NO HAY DATOS
              };
            }
          } else {
            console.log(`\n🌐 [ACADEMIC-ASIGNATURE-COURSE] Sincronización global (todas las sedes)`);
            courseIds = []; // Vacío significa "todos los cursos"
          }

          // 🔍 SINCRONIZAR ASIGNATURAS POR CADA CURSO (O GLOBAL SI NO HAY CAMPUSID)
          if (courseIds.length > 0) {
            // 📚 SINCRONIZACIÓN POR CURSOS ESPECÍFICOS
            let currentProgress = 0;
            const totalCourses = courseIds.length;

            for (let courseIndex = 0; courseIndex < courseIds.length; courseIndex++) {
              const courseId = courseIds[courseIndex];

              // 📊 ACTUALIZAR BARRA DE PROGRESO POR CURSO
              this.showProgressBar(
                courseIndex + 1,
                totalCourses,
                `Procesando curso ${courseIndex + 1}/${totalCourses}`
              );

              try {
                console.log(`\n🔍 [ACADEMIC-ASIGNATURE-COURSE] Consultando asignaturas del curso: ${courseId}`);

                let asignatureCoursesData: any = null;
                await client
                  .request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                    orderCreated: true,
                    allData: true,
                    courseId: courseId
                  })
                  .then(async (result: any) => {
                    asignatureCoursesData = result.data;
                  });

                // 📈 CONTAR Y PROCESAR ASIGNATURAS DEL CURSO
                const asignatureCoursesCount = asignatureCoursesData?.edges?.length || 0;
                totalOnline += asignatureCoursesCount;

                if (asignatureCoursesCount > 0) {
                  console.log(`✅ [ACADEMIC-ASIGNATURE-COURSE] ${asignatureCoursesCount} asignaturas encontradas en curso ${courseId}`);

                  // 💾 SINCRONIZAR CADA ASIGNATURA DE CURSO
                  for (let i = 0; i < asignatureCoursesData.edges.length; i++) {
                    const asignatureCourseEdge = asignatureCoursesData.edges[i];
                    const asignatureCourse = asignatureCourseEdge.node;

                    try {
                      // 🧹 LIMPIAR CAMPOS DE RELACIONES
                      const asignatureCourseDetails = { ...asignatureCourse };
                      delete asignatureCourseDetails.id;
                      delete asignatureCourseDetails.campus;
                      delete asignatureCourseDetails.school;
                      delete asignatureCourseDetails.academicAsignature;
                      delete asignatureCourseDetails.course;
                      delete asignatureCourseDetails.teacher;
                      delete asignatureCourseDetails.gradeAssignment;
                      delete asignatureCourseDetails.schoolYear;

                      // 🔍 BUSCAR SI EXISTE EN LOCAL
                      const existingAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(asignatureCourse.id);

                      if (existingAsignatureCourse == null) {
                        // ✅ CREAR NUEVO REGISTRO
                        await this.repositoryAcademicAsignatureCourse.save({
                          _id: new ObjectId(asignatureCourse.id),
                          ...asignatureCourseDetails,
                        });
                      } else {
                        // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                        await this.repositoryAcademicAsignatureCourse.update(
                          { id: asignatureCourse.id },
                          asignatureCourseDetails,
                        );
                      }

                      totalSynced++;
                      syncedAcademicAsignatureCourseIds.push(asignatureCourse.id); // 🎯 GUARDAR ID SINCRONIZADO

                    } catch (saveError: any) {
                      console.warn(`⚠️ [ACADEMIC-ASIGNATURE-COURSE] Error al guardar asignatura ${asignatureCourse.id}:`, saveError?.message || saveError);
                    }
                  }
                } else {
                  console.log(`⚪ [ACADEMIC-ASIGNATURE-COURSE] No se encontraron asignaturas en curso ${courseId}`);
                }

              } catch (courseError: any) {
                console.warn(`⚠️ [ACADEMIC-ASIGNATURE-COURSE] Error procesando curso ${courseId}:`, courseError?.message || courseError);
              }
            }
          } else {
            // 🌐 SINCRONIZACIÓN GLOBAL (TODAS LAS ASIGNATURAS)
            console.log(`\n🔍 [ACADEMIC-ASIGNATURE-COURSE] Consultando todas las asignaturas de curso (modo global)`);

            let asignatureCoursesData: any = null;
            await client
              .request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                orderCreated: true,
                allData: true,
                courseId: null,
                campusId: null
              })
              .then(async (result: any) => {
                asignatureCoursesData = result.data;
              });

            // 📈 CONTAR Y PROCESAR ASIGNATURAS DE CURSO
            const asignatureCoursesCount = asignatureCoursesData?.edges?.length || 0;
            totalOnline = asignatureCoursesCount;

            if (asignatureCoursesCount > 0) {
              console.log(`✅ [ACADEMIC-ASIGNATURE-COURSE] ${asignatureCoursesCount} asignaturas de curso encontradas globalmente`);

              // 💾 SINCRONIZAR CADA ASIGNATURA DE CURSO
              for (let i = 0; i < asignatureCoursesData.edges.length; i++) {
                const asignatureCourseEdge = asignatureCoursesData.edges[i];
                const asignatureCourse = asignatureCourseEdge.node;

                // 📊 ACTUALIZAR BARRA DE PROGRESO
                this.showProgressBar(
                  i + 1,
                  asignatureCoursesCount,
                  `Asignaturas de Curso ${i + 1}/${asignatureCoursesCount}`
                );

                try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  const asignatureCourseDetails = { ...asignatureCourse };
                  delete asignatureCourseDetails.id;
                  delete asignatureCourseDetails.campus;
                  delete asignatureCourseDetails.school;
                  delete asignatureCourseDetails.academicAsignature;
                  delete asignatureCourseDetails.course;
                  delete asignatureCourseDetails.teacher;
                  delete asignatureCourseDetails.gradeAssignment;
                  delete asignatureCourseDetails.schoolYear;

                  // 🔍 BUSCAR SI EXISTE EN LOCAL
                  const existingAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(asignatureCourse.id);

                  if (existingAsignatureCourse == null) {
                    // ✅ CREAR NUEVO REGISTRO
                    await this.repositoryAcademicAsignatureCourse.save({
                      _id: new ObjectId(asignatureCourse.id),
                      ...asignatureCourseDetails,
                    });
                  } else {
                    // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                    await this.repositoryAcademicAsignatureCourse.update(
                      { id: asignatureCourse.id },
                      asignatureCourseDetails,
                    );
                  }

                  totalSynced++;
                  syncedAcademicAsignatureCourseIds.push(asignatureCourse.id); // 🎯 GUARDAR ID SINCRONIZADO

                } catch (saveError: any) {
                  console.warn(`⚠️ [ACADEMIC-ASIGNATURE-COURSE] Error al guardar asignatura ${asignatureCourse.id}:`, saveError?.message || saveError);
                }
              }
            } else {
              console.log(`⚪ [ACADEMIC-ASIGNATURE-COURSE] No se encontraron asignaturas de curso globalmente`);
            }
          }

        } catch (queryError: any) {
          console.error(`❌ [ACADEMIC-ASIGNATURE-COURSE] Error en consulta:`, queryError);
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE',
            online: 0,
            error: String(queryError),
          };
        }

        // 📊 Barra de progreso final
        this.showProgressBar(totalOnline, totalOnline, 'Asignaturas de Curso', totalSynced);

        console.log(`\n🎉 [ACADEMIC-ASIGNATURE-COURSE] ⚡ MÓDULO COMPLETADO:`);
        console.log(`📊 Total asignaturas en línea: ${totalOnline}`);
        console.log(`💾 Total asignaturas sincronizadas: ${totalSynced}`);
        console.log(`🔗 IDs guardados para próximo módulo: ${syncedAcademicAsignatureCourseIds.length}`);
        console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${schoolData.campusId}` : 'Global (todas las sedes)'}`);

        return {
          entity: 'ACADEMIC_ASIGNATURE_COURSE',
          online: totalOnline,
          synced: totalSynced,
          syncedIds: syncedAcademicAsignatureCourseIds, // 🎯 RETORNAR IDs PARA PRÓXIMO MÓDULO
        };
      } else {
        // 📊 Solo conteo - usar query de conteo si existe
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Asignature Course count');
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        try {
          // 🔍 CONTAR CON FILTRO POR CAMPUS SI ESTÁ PRESENTE
          if (schoolData.campusId) {
            // Primero obtener cursos de la sede
            const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
              orderCreated: true,
              allData: true,
              campusId: schoolData.campusId
            });

            const courseIds = coursesResponse?.data?.edges?.map((edge: any) => edge.node.id) || [];

            // Luego contar asignaturas por cada curso
            for (const courseId of courseIds) {
              try {
                const countResponse: any = await client.request(QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE_COURSE, {
                  courseId: courseId,
                  campusId: null
                });

                totalOnline += countResponse?.data?.totalCount || 0;
              } catch (error) {
                // Si falla el conteo, usar la query normal
                try {
                  const asignatureResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                    orderCreated: true,
                    allData: true,
                    courseId: courseId
                  });

                  totalOnline += asignatureResponse?.data?.edges?.length || 0;
                } catch (innerError) {
                  console.warn(`⚠️ Error contando asignaturas del curso ${courseId}:`, innerError);
                }
              }
            }
          } else {
            // Conteo global
            try {
              const countResponse: any = await client.request(QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE_COURSE, {
                courseId: null,
                campusId: null
              });

              totalOnline = countResponse?.data?.totalCount || 0;
            } catch (error) {
              // Si falla el conteo, usar la query normal y contar edges
              try {
                const asignatureResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                  orderCreated: true,
                  allData: true,
                  courseId: null,
                  campusId: null
                });

                totalOnline = asignatureResponse?.data?.edges?.length || 0;
              } catch (innerError) {
                console.warn(`⚠️ Error contando asignaturas de curso:`, innerError);
              }
            }
          }
        } catch (error) {
          console.warn(`⚠️ Error en conteo de asignaturas de curso:`, error);
        }

        return {
          entity: 'ACADEMIC_ASIGNATURE_COURSE',
          online: totalOnline,
        };
      }
    } catch (error: any) {
      console.error(`❌ [SYNC-ACADEMIC-ASIGNATURE-COURSE] ERROR GENERAL:`, error);
      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC STANDARD
 */
  async syncAcademicStandard(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let totalOnline = 0;
    let totalSynced = 0;

    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Standard');
          return {
            entity: 'ACADEMIC_STANDARD',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`\n🎯 [ACADEMIC-STANDARD] INICIANDO SINCRONIZACIÓN COMPLEJA...`);
        console.log(`📊 [ACADEMIC-STANDARD] Combinatoria: GRADOS × ASIGNATURAS para schoolId: ${schoolData.schoolId}`);

        // 🚀 PASO 1: OBTENER TODOS LOS ACADEMIC GRADES
        console.log(`\n📚 [ACADEMIC-STANDARD] PASO 1: Obteniendo Academic Grades...`);

        let academicGradesData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_GRADE, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId    // ✅ Opcional
          })
          .then(async (result: any) => {
            academicGradesData = result;
          });

        if (!academicGradesData?.data?.edges?.length) {
          console.log(`⚠️  [ACADEMIC-STANDARD] No se encontraron Academic Grades`);
          return {
            entity: 'ACADEMIC_STANDARD',
            online: 0,
            synced: 0,
          };
        }

        const academicGrades = academicGradesData.data.edges;
        console.log(`📚 [ACADEMIC-STANDARD] Encontrados ${academicGrades.length} Academic Grades`);

        // 🚀 PASO 2: OBTENER TODAS LAS ACADEMIC ASIGNATURES
        console.log(`\n📖 [ACADEMIC-STANDARD] PASO 2: Obteniendo Academic Asignatures...`);

        let academicAsignaturesData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE, {
            schoolId: schoolData.schoolId,           // ✅ Obligatorio
            schoolYearId: schoolData.schoolYearId,   // ✅ Opcional
            academicAreaId: null                     // ✅ Opcional (null para todas)
          })
          .then(async (result: any) => {
            academicAsignaturesData = result;
          });

        if (!academicAsignaturesData?.data?.edges?.length) {
          console.log(`⚠️  [ACADEMIC-STANDARD] No se encontraron Academic Asignatures`);
          return {
            entity: 'ACADEMIC_STANDARD',
            online: 0,
            synced: 0,
          };
        }

        const academicAsignatures = academicAsignaturesData.data.edges;
        console.log(`📖 [ACADEMIC-STANDARD] Encontradas ${academicAsignatures.length} Academic Asignatures`);

        // 🎯 PASO 3: CALCULAR TOTAL DE COMBINACIONES
        let currentCombinationIndex = 0;
        let totalEstimatedCombinations = academicGrades.length * academicAsignatures.length;

        console.log(`🔢 [ACADEMIC-STANDARD] Total combinaciones estimadas: ${totalEstimatedCombinations} (${academicGrades.length} grados × ${academicAsignatures.length} asignaturas)`);

        // 🔄 PASO 4: ITERAR TODAS LAS COMBINACIONES
        for (const gradeEdge of academicGrades) {
          const academicGrade = gradeEdge.node;
          const academicGradeId = academicGrade.id;
          const gradeName = academicGrade.name || academicGradeId;

          console.log(`\n📚 [ACADEMIC-STANDARD] Procesando Grado: ${gradeName} (${academicGradeId})`);

          // 🔄 PASO 4B: PARA CADA GRADO, ITERAR TODAS LAS ASIGNATURAS
          for (const asignatureEdge of academicAsignatures) {
            const academicAsignature = asignatureEdge.node;
            const academicAsignatureId = academicAsignature.id;
            const asignatureName = academicAsignature.name || academicAsignatureId;

            currentCombinationIndex++;

            try {
              // 📊 Actualizar barra de progreso
              this.showProgressBar(
                currentCombinationIndex,
                totalEstimatedCombinations,
                `${gradeName} × ${asignatureName}`
              );

              // 🎯 PASO 4C: CONSULTA INDIVIDUAL POR COMBINACIÓN
              console.log(`\n🔍 [ACADEMIC-STANDARD] Consultando combinación ${currentCombinationIndex}/${totalEstimatedCombinations}:`);
              console.log(`   📚 Grado: ${gradeName} (${academicGradeId})`);
              console.log(`   📖 Asignatura: ${asignatureName} (${academicAsignatureId})`);

              let academicStandardData: any = null;
              await client
                .request(QUERY_GET_ALL_ACADEMIC_STANDARD, {
                  schoolId: schoolData.schoolId,           // ✅ Obligatorio
                  academicGradeId: academicGradeId,        // ✅ Obligatorio (de la iteración)
                  academicAsignatureId: academicAsignatureId, // ✅ Obligatorio (de la iteración)
                })
                .then(async (result: any) => {
                  academicStandardData = result;
                });

              // 🎯 PASO 4D: PROCESAR RESULTADOS SI EXISTEN
              if (academicStandardData?.data?.edges?.length > 0) {
                console.log(`✅ [ACADEMIC-STANDARD] Encontrados ${academicStandardData.data.edges.length} Academic Standards para esta combinación`);

                totalOnline += academicStandardData.data.edges.length;

                for (const academicStandardEdge of academicStandardData.data.edges) {
                  const academicStandard = academicStandardEdge.node;
                  const academicStandardId = academicStandard.id;

                  try {
                    // 🧹 LIMPIAR CAMPOS DE RELACIONES
                    const academicStandardDetails = { ...academicStandard };
                    delete academicStandardDetails.id;
                    delete academicStandardDetails.school;
                    delete academicStandardDetails.academicGrade;
                    delete academicStandardDetails.academicAsignature;
                    delete academicStandardDetails.generalAcademicStandard;

                    // 🔍 BUSCAR SI EXISTE EN LOCAL
                    const existingAcademicStandard = await this.repositoryAcademicStandard.findOneBy(academicStandardId);

                    if (existingAcademicStandard == null) {
                      // ✅ CREAR NUEVO REGISTRO
                      await this.repositoryAcademicStandard.save({
                        _id: new ObjectId(academicStandardId),
                        ...academicStandardDetails,
                      });
                    } else {
                      // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                      await this.repositoryAcademicStandard.update(
                        { id: academicStandardId },
                        academicStandardDetails,
                      );
                    }

                    totalSynced++;

                  } catch (academicStandardError) {
                    console.error(`❌ [ACADEMIC-STANDARD] Error procesando Academic Standard ${academicStandardId}:`, academicStandardError);
                  }
                }
              } else {
                console.log(`⚠️  [ACADEMIC-STANDARD] No hay Academic Standards para esta combinación`);
              }

            } catch (combinationError) {
              console.error(`❌ [ACADEMIC-STANDARD] Error en combinación Grade(${academicGradeId}) × Asignature(${academicAsignatureId}):`, combinationError);
            }
          }
        }

        // 📊 Barra de progreso final
        this.showProgressBar(totalEstimatedCombinations, totalEstimatedCombinations, 'Academic Standards', totalSynced);

        console.log(`\n🎉 [ACADEMIC-STANDARD] SINCRONIZACIÓN COMPLEJA COMPLETADA:`);
        console.log(`📊 Total combinaciones procesadas: ${totalEstimatedCombinations}`);
        console.log(`📊 Total registros en línea: ${totalOnline}`);
        console.log(`💾 Total registros sincronizados: ${totalSynced}`);

        return {
          entity: 'ACADEMIC_STANDARD',
          online: totalOnline,
          synced: totalSynced,
        };
      } else {
        // 📊 Solo conteo - usar query de conteo total
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Standard count');
          return {
            entity: 'ACADEMIC_STANDARD',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        // Para conteo, necesitamos sumar todas las combinaciones
        let academicGradesData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_GRADE, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId
          })
          .then(async (result: any) => {
            academicGradesData = result;
          });

        let academicAsignaturesData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            academicAreaId: null
          })
          .then(async (result: any) => {
            academicAsignaturesData = result;
          });

        if (academicGradesData?.data?.edges?.length > 0 && academicAsignaturesData?.data?.edges?.length > 0) {
          for (const gradeEdge of academicGradesData.data.edges) {
            for (const asignatureEdge of academicAsignaturesData.data.edges) {
              await client
                .request(QUERT_GET_TOTAL_COUNT_ACADEMIC_STANDARD, {
                  schoolId: schoolData.schoolId,
                  academicGradeId: gradeEdge.node.id,
                  academicAsignatureId: asignatureEdge.node.id
                })
                .then(async (result: any) => {
                  totalOnline += result.data?.totalCount || 0;
                });
            }
          }
        }

        return {
          entity: 'ACADEMIC_STANDARD',
          online: totalOnline,
        };
      }
    } catch (error) {
      console.error(`❌ [SYNC-ACADEMIC-STANDARD] ERROR GENERAL:`, error);
      return {
        entity: 'ACADEMIC_STANDARD',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE QUESTION BANK TEST ONLINE
 */
  async syncQuestionBankTestOnline(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let totalOnline = 0;
    let totalSynced = 0;

    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Question Bank Test Online');
          return {
            entity: 'QUESTION_BANK_TEST_ONLINE',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`\n🎯 [QUESTION-BANK-TEST-ONLINE] INICIANDO SINCRONIZACIÓN...`);
        console.log(`📊 [QUESTION-BANK-TEST-ONLINE] Flujo: CAMPUS → QUESTION BANKS para schoolId: ${schoolData.schoolId}`);

        // 🚀 PASO 1: OBTENER TODOS LOS CAMPUS DEL COLEGIO
        console.log(`\n🏢 [QUESTION-BANK-TEST-ONLINE] PASO 1: Obteniendo Campus...`);

        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        const campuses = campusResponse?.data?.edges || [];
        console.log(`🏢 [QUESTION-BANK-TEST-ONLINE] Encontrados ${campuses.length} Campus`);

        if (campuses.length === 0) {
          console.log(`⚠️  [QUESTION-BANK-TEST-ONLINE] No se encontraron Campus para sincronizar`);
          return {
            entity: 'QUESTION_BANK_TEST_ONLINE',
            online: 0,
            synced: 0,
          };
        }

        // 🎯 PASO 2: CALCULAR TOTAL DE CONSULTAS (Para barra de progreso precisa)
        let currentCampusIndex = 0;
        let totalEstimatedCampuses = campuses.length;

        console.log(`🔢 [QUESTION-BANK-TEST-ONLINE] Total campus a procesar: ${totalEstimatedCampuses}`);

        // 🔄 PASO 3: ITERAR TODOS LOS CAMPUS
        for (const campusEdge of campuses) {
          const campus = campusEdge.node;
          const campusId = campus.id;
          const campusName = campus.name || 'Sin nombre';

          currentCampusIndex++;

          // 📊 PASO 4: ACTUALIZAR BARRA DE PROGRESO
          this.showProgressBar(
            currentCampusIndex,
            totalEstimatedCampuses,
            `Question Banks: ${campusName}`
          );

          console.log(`\n🏢 [QUESTION-BANK-TEST-ONLINE] Procesando Campus: ${campusName} (${campusId})`);

          try {
            // 🔍 PASO 5: CONSULTA INDIVIDUAL POR CAMPUS (PARÁMETRO OBLIGATORIO)
            let questionBanksData: any = null;
            await client
              .request(QUERY_GET_ALL_QUESTION_BANK_TEST_ONLINE, {
                campusId: campusId  // ✅ Parámetro obligatorio
              })
              .then(async (result: any) => {
                questionBanksData = result.data;
              });

            // 📈 PASO 6: CONTAR Y PROCESAR QUESTION BANKS
            const questionBanksCount = questionBanksData?.edges?.length || 0;
            totalOnline += questionBanksCount;

            console.log(`📊 [QUESTION-BANK-TEST-ONLINE] Campus ${campusName}: ${questionBanksCount} question banks encontrados`);

            if (questionBanksCount > 0) {
              // 💾 SINCRONIZAR CADA QUESTION BANK
              for (const questionBankEdge of questionBanksData.edges) {
                const questionBank = questionBankEdge.node;

                try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  const questionBankDetails = { ...questionBank };
                  delete questionBankDetails.id;
                  delete questionBankDetails.campus;
                  delete questionBankDetails.school;
                  delete questionBankDetails.academicAsignature;
                  delete questionBankDetails.academicGrade;
                  delete questionBankDetails.teacher;

                  // 🔍 BUSCAR SI EXISTE EN LOCAL
                  const existingQuestionBank = await this.repositoryQuestionBankTestOnline.findOneBy(questionBank.id);

                  if (existingQuestionBank == null) {
                    // ✅ CREAR NUEVO REGISTRO
                    await this.repositoryQuestionBankTestOnline.save({
                      _id: new ObjectId(questionBank.id),
                      ...questionBankDetails,
                    });
                  } else {
                    // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                    await this.repositoryQuestionBankTestOnline.update(
                      { id: questionBank.id },
                      questionBankDetails,
                    );
                  }

                  totalSynced++;

                } catch (saveError: any) {
                  console.warn(`⚠️ [QUESTION-BANK-TEST-ONLINE] Error al guardar question bank ${questionBank.id}:`, saveError?.message || saveError);
                }
              }

            } else {
              console.log(`⚪ [QUESTION-BANK-TEST-ONLINE] Campus ${campusName}: 0 question banks`);
            }

          } catch (queryError: any) {
            console.error(`❌ [QUESTION-BANK-TEST-ONLINE] Error consultando campus ${campusId}:`, queryError);
          }
        }

        // 📊 Barra de progreso final
        this.showProgressBar(totalEstimatedCampuses, totalEstimatedCampuses, 'Question Banks', totalSynced);

        console.log(`\n🎉 [QUESTION-BANK-TEST-ONLINE] SINCRONIZACIÓN COMPLETADA:`);
        console.log(`📊 Total campus procesados: ${campuses.length}`);
        console.log(`📊 Total question banks en línea: ${totalOnline}`);
        console.log(`💾 Total question banks sincronizados: ${totalSynced}`);

        return {
          entity: 'QUESTION_BANK_TEST_ONLINE',
          online: totalOnline,
          synced: totalSynced,
        };
      } else {
        // 📊 Solo conteo - necesitamos sumar todos los campus
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Question Bank Test Online count');
          return {
            entity: 'QUESTION_BANK_TEST_ONLINE',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        // Para conteo, obtenemos todos los campus y sumamos sus question banks
        const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        const campuses = campusResponse?.data?.edges || [];

        for (const campusEdge of campuses) {
          const campus = campusEdge.node;
          const campusId = campus.id;

          try {
            await client
              .request(QUERT_GET_TOTAL_COUNT_QUESTION_BANK_TEST_ONLINE, {
                campusId: campusId  // ✅ Parámetro obligatorio para conteo
              })
              .then(async (result: any) => {
                totalOnline += result?.data?.totalCount || 0;
              });
          } catch (error: any) {
            console.warn(`⚠️ Error contando question banks del campus ${campusId}:`, error?.message);
          }
        }

        return {
          entity: 'QUESTION_BANK_TEST_ONLINE',
          online: totalOnline,
        };
      }
    } catch (error: any) {
      console.error(`❌ [SYNC-QUESTION-BANK-TEST-ONLINE] ERROR GENERAL:`, error);
      return {
        entity: 'QUESTION_BANK_TEST_ONLINE',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE LEARNING
 */
  async syncLearning(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    let totalOnline = 0;
    let totalSynced = 0;

    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Learning');
          return {
            entity: 'LEARNING',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        console.log(`\n🎯 [LEARNING] ⚡ MÓDULO COMPLEJO INICIANDO...`);
        console.log(`📊 [LEARNING] Flujo: PERÍODOS → GRADOS → ASIGNATURAS → LEARNING para schoolId: ${schoolData.schoolId}`);

        // 🚀 PASO 1: OBTENER TODOS LOS PERÍODOS ACADÉMICOS (PARÁMETRO OBLIGATORIO)
        console.log(`\n📅 [LEARNING] PASO 1: Obteniendo períodos académicos...`);

        let academicPeriodsData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCustom: false
          })
          .then(async (result: any) => {
            academicPeriodsData = result.data;
          });

        if (!academicPeriodsData?.edges?.length) {
          console.log(`⚠️  [LEARNING] No se encontraron períodos académicos para sincronizar`);
          return {
            entity: 'LEARNING',
            online: 0,
            synced: 0,
          };
        }

        const academicPeriods = academicPeriodsData.edges;
        console.log(`📅 [LEARNING] Encontrados ${academicPeriods.length} períodos académicos`);

        // 🚀 PASO 2: OBTENER TODOS LOS GRADOS ACADÉMICOS
        console.log(`\n📚 [LEARNING] PASO 2: Obteniendo grados académicos...`);

        let academicGradesData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_GRADE, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId
          })
          .then(async (result: any) => {
            academicGradesData = result.data;
          });

        if (!academicGradesData?.edges?.length) {
          console.log(`⚠️  [LEARNING] No se encontraron grados académicos para sincronizar`);
          return {
            entity: 'LEARNING',
            online: 0,
            synced: 0,
          };
        }

        const academicGrades = academicGradesData.edges;
        console.log(`📚 [LEARNING] Encontrados ${academicGrades.length} grados académicos`);

        // 🚀 PASO 3: OBTENER TODAS LAS ASIGNATURAS ACADÉMICAS
        console.log(`\n📖 [LEARNING] PASO 3: Obteniendo asignaturas académicas...`);

        let academicAsignaturesData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            academicAreaId: null
          })
          .then(async (result: any) => {
            academicAsignaturesData = result.data;
          });

        if (!academicAsignaturesData?.edges?.length) {
          console.log(`⚠️  [LEARNING] No se encontraron asignaturas académicas para sincronizar`);
          return {
            entity: 'LEARNING',
            online: 0,
            synced: 0,
          };
        }

        const academicAsignatures = academicAsignaturesData.edges;
        console.log(`📖 [LEARNING] Encontradas ${academicAsignatures.length} asignaturas académicas`);

        // 🎯 PASO 4: CALCULAR TOTAL DE CONSULTAS (Para barra de progreso precisa)
        let currentQueryIndex = 0;
        let totalEstimatedQueries = 0;

        // Total = períodos × grados × asignaturas (combinatoria completa)
        totalEstimatedQueries = academicPeriods.length * academicGrades.length * academicAsignatures.length;

        console.log(`🔢 [LEARNING] Total consultas estimadas: ${totalEstimatedQueries} (${academicPeriods.length} períodos × ${academicGrades.length} grados × ${academicAsignatures.length} asignaturas)`);

        // 🔄 PASO 5: TRIPLE ITERACIÓN - PERÍODOS → GRADOS → ASIGNATURAS
        for (const periodEdge of academicPeriods) {
          const academicPeriod = periodEdge.node;
          const academicPeriodId = academicPeriod.id;
          const periodName = academicPeriod.name || 'Sin nombre';

          console.log(`\n📅 [LEARNING] Procesando período: ${periodName} (${academicPeriodId})`);

          // 🔄 PASO 5A: ITERAR GRADOS ACADÉMICOS
          for (const gradeEdge of academicGrades) {
            const academicGrade = gradeEdge.node;
            const academicGradeId = academicGrade.id;
            const gradeName = academicGrade.name || 'Sin nombre';

            console.log(`\n📚 [LEARNING] Procesando grado: ${gradeName} en período ${periodName}`);

            // 🔄 PASO 5B: ITERAR ASIGNATURAS ACADÉMICAS
            for (const asignatureEdge of academicAsignatures) {
              const academicAsignature = asignatureEdge.node;
              const academicAsignatureId = academicAsignature.id;
              const asignatureName = academicAsignature.name || 'Sin nombre';

              currentQueryIndex++;

              // 📊 PASO 6: ACTUALIZAR BARRA DE PROGRESO
              this.showProgressBar(
                currentQueryIndex,
                totalEstimatedQueries,
                `Learning: ${periodName} → ${gradeName} → ${asignatureName}`
              );

              try {
                // 🔍 PASO 7: CONSULTA INDIVIDUAL CON PARÁMETROS OBLIGATORIOS
                console.log(`\n🔍 [LEARNING] Consultando combinación ${currentQueryIndex}/${totalEstimatedQueries}:`);
                console.log(`   📅 Período: ${periodName} (${academicPeriodId})`);
                console.log(`   📚 Grado: ${gradeName} (${academicGradeId})`);
                console.log(`   📖 Asignatura: ${asignatureName} (${academicAsignatureId})`);

                let learningsData: any = null;
                await client
                  .request(QUERY_GET_ALL_LEARNING, {
                    schoolId: schoolData.schoolId,           // ✅ Obligatorio (fijo)
                    academicPeriodsId: [academicPeriodId],   // ✅ Obligatorio (array con período actual)
                    academicGradeId: academicGradeId,        // ✅ Opcional (iteración)
                    academicAsignatureId: academicAsignatureId // ✅ Opcional (iteración)
                  })
                  .then(async (result: any) => {
                    learningsData = result.data;
                  });

                // 📈 PASO 8: CONTAR Y PROCESAR LEARNING
                const learningsCount = learningsData?.edges?.length || 0;
                totalOnline += learningsCount;

                if (learningsCount > 0) {
                  console.log(`✅ [LEARNING] Período ${periodName} → Grado ${gradeName} → Asignatura ${asignatureName}: ${learningsCount} learning encontrados`);

                  // 💾 SINCRONIZAR CADA LEARNING
                  for (const learningEdge of learningsData.edges) {
                    const learning = learningEdge.node;

                    try {
                      // 🧹 LIMPIAR CAMPOS DE RELACIONES
                      const learningDetails = { ...learning };
                      delete learningDetails.id;
                      delete learningDetails.school;
                      delete learningDetails.academicAsignature;
                      delete learningDetails.generalBasicLearningRight;
                      delete learningDetails.academicStandard;
                      delete learningDetails.academicGrade;
                      delete learningDetails.academicPeriods;
                      delete learningDetails.evidenceLearnings;

                      // 🔍 BUSCAR SI EXISTE EN LOCAL
                      const existingLearning = await this.repositoryLearning.findOneBy(learning.id);

                      if (existingLearning == null) {
                        // ✅ CREAR NUEVO REGISTRO
                        await this.repositoryLearning.save({
                          _id: new ObjectId(learning.id),
                          ...learningDetails,
                        });
                      } else {
                        // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                        await this.repositoryLearning.update(
                          { id: learning.id },
                          learningDetails,
                        );
                      }

                      totalSynced++;

                    } catch (saveError: any) {
                      console.warn(`⚠️ [LEARNING] Error al guardar learning ${learning.id}:`, saveError?.message || saveError);
                    }
                  }

                } else {
                  // Log silencioso para no saturar consola en módulo pesado
                  // console.log(`⚪ [LEARNING] Período ${periodName} → Grado ${gradeName} → Asignatura ${asignatureName}: 0 learning`);
                }

              } catch (queryError: any) {
                console.error(`❌ [LEARNING] Error consultando período ${academicPeriodId} → grado ${academicGradeId} → asignatura ${academicAsignatureId}:`, queryError);
              }
            }
          }
        }

        // 📊 Barra de progreso final
        this.showProgressBar(totalEstimatedQueries, totalEstimatedQueries, 'Learning', totalSynced);

        console.log(`\n🎉 [LEARNING] ⚡ MÓDULO COMPLEJO COMPLETADO:`);
        console.log(`📊 Total consultas realizadas: ${totalEstimatedQueries}`);
        console.log(`📊 Total learning en línea: ${totalOnline}`);
        console.log(`💾 Total learning sincronizados: ${totalSynced}`);

        return {
          entity: 'LEARNING',
          online: totalOnline,
          synced: totalSynced,
        };
      } else {
        // 📊 Solo conteo - necesitamos combinar períodos y usar query de conteo
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Learning count');
          return {
            entity: 'LEARNING',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        // Para conteo, obtenemos períodos y hacemos consulta general
        let academicPeriodsData: any = null;
        await client
          .request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCustom: false
          })
          .then(async (result: any) => {
            academicPeriodsData = result.data;
          });

        if (academicPeriodsData?.edges?.length > 0) {
          // Extraer IDs de todos los períodos para la consulta de conteo
          const allPeriodIds = academicPeriodsData.edges.map((edge: any) => edge.node.id);

          await client
            .request(QUERT_GET_TOTAL_COUNT_LEARNING, {
              schoolId: schoolData.schoolId,
              academicPeriodsId: allPeriodIds,    // ✅ Obligatorio (todos los períodos)
              academicGradeId: null,              // ✅ Opcional (null para todos)
              academicAsignatureId: null          // ✅ Opcional (null para todos)
            })
            .then(async (result: any) => {
              totalOnline = result?.data?.totalCount || 0;
            });
        }

        return {
          entity: 'LEARNING',
          online: totalOnline,
        };
      }
    } catch (error: any) {
      console.error(`❌ [SYNC-LEARNING] ERROR GENERAL:`, error);
      return {
        entity: 'LEARNING',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC ASIGNATURE COURSE PERIOD VALUATION
 */
  async syncAcademicAsignatureCoursePeriodValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any, syncedAcademicAsignatureCourseIds?: string[]) {
    let totalOnline = 0;
    let totalSynced = 0;

    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Asignature Course Period Valuation');
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        if (!schoolData?.academicPeriodId) {
          console.error('❌ schoolData.academicPeriodId es requerido para Academic Asignature Course Period Valuation');
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
            online: 0,
            error: 'schoolData.academicPeriodId es requerido'
          };
        }

        console.log(`\n🎯 [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] ⚡ MÓDULO INICIANDO...`);
        console.log(`📊 [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] Parámetros: schoolId=${schoolData.schoolId}, academicPeriodId=${schoolData.academicPeriodId}`);

        // 🎯 VERIFICAR SI TENEMOS IDs DE ASIGNATURAS SINCRONIZADAS DEL MÓDULO ANTERIOR
        let academicAsignatureCourseIds: string[] = [];

        if (syncedAcademicAsignatureCourseIds && syncedAcademicAsignatureCourseIds.length > 0) {
          academicAsignatureCourseIds = syncedAcademicAsignatureCourseIds;
          console.log(`🔗 [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] USANDO ${academicAsignatureCourseIds.length} IDs DEL MÓDULO ANTERIOR`);
          console.log(`🎯 [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] IDs: [${academicAsignatureCourseIds.slice(0, 3).join(', ')}${academicAsignatureCourseIds.length > 3 ? '...' : ''}]`);
        } else {
          // 🌐 SINCRONIZACIÓN GLOBAL (OBTENER TODAS LAS ASIGNATURAS)
          console.log(`\n🌐 [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] Obteniendo todas las asignaturas de curso...`);

          let courseIds: string[] = [];

          // 🔍 OBTENER CURSOS SEGÚN CAMPUSID (SI ESTÁ PRESENTE)
          if (schoolData.campusId) {
            console.log(`\n🏫 [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] Obteniendo cursos de la sede: ${schoolData.campusId}`);

            const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
              orderCreated: true,
              allData: true,
              campusId: schoolData.campusId
            });

            const coursesCount = coursesResponse?.data?.edges?.length || 0;
            console.log(`✅ [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] ${coursesCount} cursos encontrados en la sede`);

            if (coursesCount > 0) {
              courseIds = coursesResponse.data.edges.map((edge: any) => edge.node.id);
            } else {
              console.log(`⚪ [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] No se encontraron cursos en la sede especificada`);
              return {
                entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
                online: 0,
                synced: 0
              };
            }
          } else {
            console.log(`\n🌐 [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] Sincronización global (todas las sedes)`);
            courseIds = []; // Vacío significa "todos los cursos"
          }

          // 🔍 OBTENER ASIGNATURAS POR CADA CURSO (O GLOBAL SI NO HAY CAMPUSID)
          if (courseIds.length > 0) {
            // 📚 OBTENER ASIGNATURAS POR CURSOS ESPECÍFICOS
            for (const courseId of courseIds) {
              try {
                const asignatureCoursesData: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                  orderCreated: true,
                  allData: true,
                  courseId: courseId
                });

                const asignatureCourses = asignatureCoursesData?.data?.edges || [];
                asignatureCourses.forEach((edge: any) => {
                  academicAsignatureCourseIds.push(edge.node.id);
                });

              } catch (courseError: any) {
                console.warn(`⚠️ [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] Error procesando curso ${courseId}:`, courseError?.message || courseError);
              }
            }
          } else {
            // 🌐 OBTENER TODAS LAS ASIGNATURAS GLOBALMENTE
            const asignatureCoursesData: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
              orderCreated: true,
              allData: true,
              courseId: null,
              campusId: null
            });

            const asignatureCourses = asignatureCoursesData?.data?.edges || [];
            asignatureCourses.forEach((edge: any) => {
              academicAsignatureCourseIds.push(edge.node.id);
            });
          }

          console.log(`✅ [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] ${academicAsignatureCourseIds.length} asignaturas de curso obtenidas`);
        }

        if (academicAsignatureCourseIds.length === 0) {
          console.log(`⚪ [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] No se encontraron asignaturas de curso para sincronizar`);
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
            online: 0,
            synced: 0
          };
        }

        // 🔄 PROCESAR CADA ACADEMIC ASIGNATURE COURSE CON EL PERIODO ACADÉMICO
        let currentProgress = 0;
        const totalAsignatures = academicAsignatureCourseIds.length;

        for (let asignatureIndex = 0; asignatureIndex < academicAsignatureCourseIds.length; asignatureIndex++) {
          const academicAsignatureCourseId = academicAsignatureCourseIds[asignatureIndex];

          // 📊 ACTUALIZAR BARRA DE PROGRESO
          this.showProgressBar(
            asignatureIndex + 1,
            totalAsignatures,
            `Procesando asignatura ${asignatureIndex + 1}/${totalAsignatures}`
          );

          try {
            console.log(`\n🔍 [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] Consultando valoraciones para asignatura: ${academicAsignatureCourseId}`);

            let valuationsData: any = null;
            await client
              .request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION_OPTIONAL_STUDENT, {
                orderCreated: true,
                allData: true,
                academicPeriodId: schoolData.academicPeriodId,
                academicAsignatureCourseId: academicAsignatureCourseId
                // ✅ NO enviamos studentId para obtener todos los estudiantes
              })
              .then(async (result: any) => {
                valuationsData = result.data;
              });

            // 📈 CONTAR Y PROCESAR VALORACIONES
            const valuationsCount = valuationsData?.edges?.length || 0;
            totalOnline += valuationsCount;

            if (valuationsCount > 0) {
              console.log(`✅ [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] ${valuationsCount} valoraciones encontradas para asignatura ${academicAsignatureCourseId}`);

              // 💾 SINCRONIZAR CADA VALORACIÓN
              for (let i = 0; i < valuationsData.edges.length; i++) {
                const valuationEdge = valuationsData.edges[i];
                const valuation = valuationEdge.node;

                try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  const valuationDetails = { ...valuation };
                  delete valuationDetails.id;
                  delete valuationDetails.campus;
                  delete valuationDetails.school;
                  delete valuationDetails.academicAsignatureCourse;
                  delete valuationDetails.academicPeriod;
                  delete valuationDetails.student;
                  delete valuationDetails.performanceLevel;

                  // � CONVERTIR SOLO performanceLevelId A OBJECTID
                  if (valuationDetails.performanceLevelId) {
                    valuationDetails.performanceLevelId = new ObjectId(valuationDetails.performanceLevelId);
                  }

                  // �🔍 BUSCAR SI EXISTE EN LOCAL
                  const existingValuation = await this.repositoryAcademicAsignatureCoursePeriodValuation.findOneBy(valuation.id);

                  if (existingValuation == null) {
                    // ✅ CREAR NUEVO REGISTRO
                    await this.repositoryAcademicAsignatureCoursePeriodValuation.save({
                      _id: new ObjectId(valuation.id),
                      ...valuationDetails,
                    });
                  } else {
                    // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                    await this.repositoryAcademicAsignatureCoursePeriodValuation.update(
                      { id: valuation.id },
                      valuationDetails,
                    );
                  }

                  totalSynced++;

                } catch (saveError: any) {
                  console.warn(`⚠️ [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] Error al guardar valoración ${valuation.id}:`, saveError?.message || saveError);
                }
              }
            } else {
              console.log(`⚪ [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] No se encontraron valoraciones para asignatura ${academicAsignatureCourseId}`);
            }

          } catch (asignatureError: any) {
            console.warn(`⚠️ [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] Error procesando asignatura ${academicAsignatureCourseId}:`, asignatureError?.message || asignatureError);
          }
        }

        // 📊 Barra de progreso final
        this.showProgressBar(totalAsignatures, totalAsignatures, 'Valoraciones por Asignatura y Período', totalSynced);

        console.log(`\n🎉 [ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] ⚡ MÓDULO COMPLETADO:`);
        console.log(`📊 Total valoraciones en línea: ${totalOnline}`);
        console.log(`💾 Total valoraciones sincronizadas: ${totalSynced}`);
        console.log(`🔗 Asignaturas procesadas: ${academicAsignatureCourseIds.length}`);
        console.log(`🎯 Modo: ${syncedAcademicAsignatureCourseIds && syncedAcademicAsignatureCourseIds.length > 0 ? 'IDs del módulo anterior' : 'Consulta completa'}`);

        return {
          entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
          online: totalOnline,
          synced: totalSynced,
        };
      } else {
        // 📊 Solo conteo - usar query de conteo si existe
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Asignature Course Period Valuation count');
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        if (!schoolData?.academicPeriodId) {
          console.error('❌ schoolData.academicPeriodId es requerido para Academic Asignature Course Period Valuation count');
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
            online: 0,
            error: 'schoolData.academicPeriodId es requerido'
          };
        }

        try {
          // 🔍 CONTAR CON FILTRO POR CAMPUS SI ESTÁ PRESENTE
          if (schoolData.campusId) {
            // Primero obtener cursos de la sede
            const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
              orderCreated: true,
              allData: true,
              campusId: schoolData.campusId
            });

            const courseIds = coursesResponse?.data?.edges?.map((edge: any) => edge.node.id) || [];

            // Luego contar valoraciones por cada curso
            for (const courseId of courseIds) {
              try {
                // Obtener asignaturas del curso
                const asignatureResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                  orderCreated: true,
                  allData: true,
                  courseId: courseId
                });

                const asignatureIds = asignatureResponse?.data?.edges?.map((edge: any) => edge.node.id) || [];

                // Contar valoraciones por cada asignatura
                for (const asignatureId of asignatureIds) {
                  try {
                    const valuationResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION_OPTIONAL_STUDENT, {
                      orderCreated: true,
                      allData: true,
                      academicPeriodId: schoolData.academicPeriodId,
                      academicAsignatureCourseId: asignatureId
                      // ✅ NO enviamos studentId para obtener todos los estudiantes
                    });

                    totalOnline += valuationResponse?.data?.edges?.length || 0;
                  } catch (innerError) {
                    console.warn(`⚠️ Error contando valoraciones de asignatura ${asignatureId}:`, innerError);
                  }
                }
              } catch (innerError) {
                console.warn(`⚠️ Error contando asignaturas del curso ${courseId}:`, innerError);
              }
            }
          } else {
            // Conteo global
            try {
              // Obtener todas las asignaturas de curso
              const asignatureResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                orderCreated: true,
                allData: true,
                courseId: null,
                campusId: null
              });

              const asignatureIds = asignatureResponse?.data?.edges?.map((edge: any) => edge.node.id) || [];

              // Contar valoraciones por cada asignatura
              for (const asignatureId of asignatureIds) {
                try {
                  const valuationResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION_OPTIONAL_STUDENT, {
                    orderCreated: true,
                    allData: true,
                    academicPeriodId: schoolData.academicPeriodId,
                    academicAsignatureCourseId: asignatureId
                    // ✅ NO enviamos studentId para obtener todos los estudiantes
                  });

                  totalOnline += valuationResponse?.data?.edges?.length || 0;
                } catch (innerError) {
                  console.warn(`⚠️ Error contando valoraciones de asignatura ${asignatureId}:`, innerError);
                }
              }
            } catch (error) {
              console.warn(`⚠️ Error en conteo global de valoraciones:`, error);
            }
          }
        } catch (error) {
          console.warn(`⚠️ Error en conteo de valoraciones:`, error);
        }

        return {
          entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
          online: totalOnline,
        };
      }
    } catch (error: any) {
      console.error(`❌ [SYNC-ACADEMIC-ASIGNATURE-COURSE-PERIOD-VALUATION] ERROR GENERAL:`, error);
      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC ASIGNATURE COURSE YEAR VALUATION
 */
  async syncAcademicAsignatureCourseYearValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any, syncedAcademicAsignatureCourseIds?: string[]) {
    let totalOnline = 0;
    let totalSynced = 0;

    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Asignature Course Year Valuation');
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        if (!schoolData?.schoolYearId) {
          console.error('❌ schoolData.schoolYearId es requerido para Academic Asignature Course Year Valuation');
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION',
            online: 0,
            error: 'schoolData.schoolYearId es requerido'
          };
        }

        console.log(`\n🎯 [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] ⚡ MÓDULO INICIANDO...`);
        console.log(`📊 [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] Parámetros: schoolId=${schoolData.schoolId}, schoolYearId=${schoolData.schoolYearId}`);

        // 🎯 VERIFICAR SI TENEMOS IDs DE ASIGNATURAS SINCRONIZADAS DEL MÓDULO ANTERIOR
        let academicAsignatureCourseIds: string[] = [];

        if (syncedAcademicAsignatureCourseIds && syncedAcademicAsignatureCourseIds.length > 0) {
          academicAsignatureCourseIds = syncedAcademicAsignatureCourseIds;
          console.log(`🔗 [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] USANDO ${academicAsignatureCourseIds.length} IDs DEL MÓDULO ANTERIOR`);
          console.log(`🎯 [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] IDs: [${academicAsignatureCourseIds.slice(0, 3).join(', ')}${academicAsignatureCourseIds.length > 3 ? '...' : ''}]`);
        } else {
          // 🌐 SINCRONIZACIÓN GLOBAL (OBTENER TODAS LAS ASIGNATURAS)
          console.log(`\n🌐 [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] Obteniendo todas las asignaturas de curso...`);

          let courseIds: string[] = [];

          // 🔍 OBTENER CURSOS SEGÚN CAMPUSID (SI ESTÁ PRESENTE)
          if (schoolData.campusId) {
            console.log(`\n🏫 [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] Obteniendo cursos de la sede: ${schoolData.campusId}`);

            const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
              orderCreated: true,
              allData: true,
              campusId: schoolData.campusId
            });

            const coursesCount = coursesResponse?.data?.edges?.length || 0;
            console.log(`✅ [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] ${coursesCount} cursos encontrados en la sede`);

            if (coursesCount > 0) {
              courseIds = coursesResponse.data.edges.map((edge: any) => edge.node.id);
            } else {
              console.log(`⚪ [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] No se encontraron cursos en la sede especificada`);
              return {
                entity: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION',
                online: 0,
                synced: 0
              };
            }
          } else {
            console.log(`\n🌐 [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] Sincronización global (todas las sedes)`);
            courseIds = []; // Vacío significa "todos los cursos"
          }

          // 🔍 OBTENER ASIGNATURAS POR CADA CURSO (O GLOBAL SI NO HAY CAMPUSID)
          if (courseIds.length > 0) {
            // 📚 OBTENER ASIGNATURAS POR CURSOS ESPECÍFICOS
            for (const courseId of courseIds) {
              try {
                const asignatureCoursesData: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                  orderCreated: true,
                  allData: true,
                  courseId: courseId
                });

                const asignatureCourses = asignatureCoursesData?.data?.edges || [];
                asignatureCourses.forEach((edge: any) => {
                  academicAsignatureCourseIds.push(edge.node.id);
                });

              } catch (courseError: any) {
                console.warn(`⚠️ [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] Error procesando curso ${courseId}:`, courseError?.message || courseError);
              }
            }
          } else {
            // 🌐 OBTENER TODAS LAS ASIGNATURAS GLOBALMENTE
            const asignatureCoursesData: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
              orderCreated: true,
              allData: true,
              courseId: null,
              campusId: null
            });

            const asignatureCourses = asignatureCoursesData?.data?.edges || [];
            asignatureCourses.forEach((edge: any) => {
              academicAsignatureCourseIds.push(edge.node.id);
            });
          }

          console.log(`✅ [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] ${academicAsignatureCourseIds.length} asignaturas de curso obtenidas`);
        }

        if (academicAsignatureCourseIds.length === 0) {
          console.log(`⚪ [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] No se encontraron asignaturas de curso para sincronizar`);
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION',
            online: 0,
            synced: 0
          };
        }

        // 🔄 PROCESAR CADA ACADEMIC ASIGNATURE COURSE CON EL AÑO ESCOLAR
        let currentProgress = 0;
        const totalAsignatures = academicAsignatureCourseIds.length;

        for (let asignatureIndex = 0; asignatureIndex < academicAsignatureCourseIds.length; asignatureIndex++) {
          const academicAsignatureCourseId = academicAsignatureCourseIds[asignatureIndex];

          // 📊 ACTUALIZAR BARRA DE PROGRESO
          this.showProgressBar(
            asignatureIndex + 1,
            totalAsignatures,
            `Procesando asignatura ${asignatureIndex + 1}/${totalAsignatures}`
          );

          try {
            console.log(`\n🔍 [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] Consultando valoraciones para asignatura: ${academicAsignatureCourseId}`);

            let valuationsData: any = null;
            await client
              .request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION, {
                orderCreated: true,
                allData: true,
                schoolYearId: schoolData.schoolYearId,
                academicAsignatureCourseId: academicAsignatureCourseId
                // ✅ NO enviamos studentId para obtener todos los estudiantes
              })
              .then(async (result: any) => {
                valuationsData = result.data;
              });

            // 📈 CONTAR Y PROCESAR VALORACIONES
            const valuationsCount = valuationsData?.edges?.length || 0;
            totalOnline += valuationsCount;

            if (valuationsCount > 0) {
              console.log(`✅ [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] ${valuationsCount} valoraciones encontradas para asignatura ${academicAsignatureCourseId}`);

              // 💾 SINCRONIZAR CADA VALORACIÓN
              for (let i = 0; i < valuationsData.edges.length; i++) {
                const valuationEdge = valuationsData.edges[i];
                const valuation = valuationEdge.node;

                try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  const valuationDetails = { ...valuation };
                  delete valuationDetails.id;
                  delete valuationDetails.campus;
                  delete valuationDetails.school;
                  delete valuationDetails.academicAsignatureCourse;
                  delete valuationDetails.schoolYear;
                  delete valuationDetails.student;
                  delete valuationDetails.performanceLevel;
                  delete valuationDetails.academicPeriod;

                  // 🔄 DEJAR performanceLevelId COMO STRING (sin conversión a ObjectId)
                  // if (valuationDetails.performanceLevelId) {
                  //   valuationDetails.performanceLevelId = new ObjectId(valuationDetails.performanceLevelId);
                  // }

                  // 🔍 BUSCAR SI EXISTE EN LOCAL
                  const existingValuation = await this.repositoryAcademicAsignatureCourseYearValuation.findOneBy(valuation.id);

                  if (existingValuation == null) {
                    // ✅ CREAR NUEVO REGISTRO
                    await this.repositoryAcademicAsignatureCourseYearValuation.save({
                      _id: new ObjectId(valuation.id),
                      ...valuationDetails,
                    });
                  } else {
                    // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                    await this.repositoryAcademicAsignatureCourseYearValuation.update(
                      { id: valuation.id },
                      valuationDetails,
                    );
                  }

                  totalSynced++;

                } catch (saveError: any) {
                  console.warn(`⚠️ [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] Error al guardar valoración ${valuation.id}:`, saveError?.message || saveError);
                }
              }
            } else {
              console.log(`⚪ [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] No se encontraron valoraciones para asignatura ${academicAsignatureCourseId}`);
            }

          } catch (asignatureError: any) {
            console.warn(`⚠️ [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] Error procesando asignatura ${academicAsignatureCourseId}:`, asignatureError?.message || asignatureError);
          }
        }

        // 📊 Barra de progreso final
        this.showProgressBar(totalAsignatures, totalAsignatures, 'Valoraciones por Asignatura y Año', totalSynced);

        console.log(`\n🎉 [ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] ⚡ MÓDULO COMPLETADO:`);
        console.log(`📊 Total valoraciones en línea: ${totalOnline}`);
        console.log(`💾 Total valoraciones sincronizadas: ${totalSynced}`);
        console.log(`🔗 Asignaturas procesadas: ${academicAsignatureCourseIds.length}`);
        console.log(`🎯 Modo: ${syncedAcademicAsignatureCourseIds && syncedAcademicAsignatureCourseIds.length > 0 ? 'IDs del módulo anterior' : 'Consulta completa'}`);

        return {
          entity: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION',
          online: totalOnline,
          synced: totalSynced,
        };
      } else {
        // 📊 Solo conteo - usar query de conteo si existe
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Academic Asignature Course Year Valuation count');
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        if (!schoolData?.schoolYearId) {
          console.error('❌ schoolData.schoolYearId es requerido para Academic Asignature Course Year Valuation count');
          return {
            entity: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION',
            online: 0,
            error: 'schoolData.schoolYearId es requerido'
          };
        }

        try {
          // 🔍 CONTAR CON FILTRO POR CAMPUS SI ESTÁ PRESENTE
          if (schoolData.campusId) {
            // Primero obtener cursos de la sede
            const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
              orderCreated: true,
              allData: true,
              campusId: schoolData.campusId
            });

            const courseIds = coursesResponse?.data?.edges?.map((edge: any) => edge.node.id) || [];

            // Luego contar valoraciones por cada curso
            for (const courseId of courseIds) {
              try {
                // Obtener asignaturas del curso
                const asignatureResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                  orderCreated: true,
                  allData: true,
                  courseId: courseId
                });

                const asignatureIds = asignatureResponse?.data?.edges?.map((edge: any) => edge.node.id) || [];

                // Contar valoraciones por cada asignatura
                for (const asignatureId of asignatureIds) {
                  try {
                    const valuationResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION, {
                      orderCreated: true,
                      allData: true,
                      schoolYearId: schoolData.schoolYearId,
                      academicAsignatureCourseId: asignatureId
                    });

                    totalOnline += valuationResponse?.data?.edges?.length || 0;
                  } catch (innerError) {
                    console.warn(`⚠️ Error contando valoraciones de asignatura ${asignatureId}:`, innerError);
                  }
                }
              } catch (innerError) {
                console.warn(`⚠️ Error contando asignaturas del curso ${courseId}:`, innerError);
              }
            }
          } else {
            // Conteo global
            try {
              // Obtener todas las asignaturas de curso
              const asignatureResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                orderCreated: true,
                allData: true,
                courseId: null,
                campusId: null
              });

              const asignatureIds = asignatureResponse?.data?.edges?.map((edge: any) => edge.node.id) || [];

              // Contar valoraciones por cada asignatura
              for (const asignatureId of asignatureIds) {
                try {
                  const valuationResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION, {
                    orderCreated: true,
                    allData: true,
                    schoolYearId: schoolData.schoolYearId,
                    academicAsignatureCourseId: asignatureId
                  });

                  totalOnline += valuationResponse?.data?.edges?.length || 0;
                } catch (innerError) {
                  console.warn(`⚠️ Error contando valoraciones de asignatura ${asignatureId}:`, innerError);
                }
              }
            } catch (error) {
              console.warn(`⚠️ Error en conteo global de valoraciones:`, error);
            }
          }
        } catch (error) {
          console.warn(`⚠️ Error en conteo de valoraciones:`, error);
        }

        return {
          entity: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION',
          online: totalOnline,
        };
      }
    } catch (error: any) {
      console.error(`❌ [SYNC-ACADEMIC-ASIGNATURE-COURSE-YEAR-VALUATION] ERROR GENERAL:`, error);
      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE STUDENT ATTENDANCE
 */
  async syncStudentAttendance(typeSyncFull: boolean, client: GraphQLClient, schoolData: any, syncedAcademicAsignatureCourseIds?: string[]) {
    let totalOnline = 0;
    let totalSynced = 0;

    try {
      if (typeSyncFull) {
        // 🔍 VALIDAR PARÁMETROS OBLIGATORIOS
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Student Attendance');
          return {
            entity: 'STUDENT_ATTENDANCE',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        if (!schoolData?.academicPeriodId) {
          console.error('❌ schoolData.academicPeriodId es requerido para Student Attendance');
          return {
            entity: 'STUDENT_ATTENDANCE',
            online: 0,
            error: 'schoolData.academicPeriodId es requerido'
          };
        }

        console.log(`\n🎯 [STUDENT-ATTENDANCE] ⚡ MÓDULO INICIANDO...`);
        console.log(`📊 [STUDENT-ATTENDANCE] Parámetros: schoolId=${schoolData.schoolId}, academicPeriodId=${schoolData.academicPeriodId}`);

        // 🎯 VERIFICAR SI TENEMOS IDs DE ASIGNATURAS SINCRONIZADAS DEL MÓDULO ANTERIOR
        let academicAsignatureCourseIds: string[] = [];

        if (syncedAcademicAsignatureCourseIds && syncedAcademicAsignatureCourseIds.length > 0) {
          academicAsignatureCourseIds = syncedAcademicAsignatureCourseIds;
          console.log(`🔗 [STUDENT-ATTENDANCE] USANDO ${academicAsignatureCourseIds.length} IDs DEL MÓDULO ANTERIOR`);
          console.log(`🎯 [STUDENT-ATTENDANCE] IDs: [${academicAsignatureCourseIds.slice(0, 3).join(', ')}${academicAsignatureCourseIds.length > 3 ? '...' : ''}]`);
        } else {
          // 🌐 SINCRONIZACIÓN GLOBAL (OBTENER TODAS LAS ASIGNATURAS)
          console.log(`\n🌐 [STUDENT-ATTENDANCE] Obteniendo todas las asignaturas de curso...`);

          let courseIds: string[] = [];

          // 🔍 OBTENER CURSOS SEGÚN CAMPUSID (SI ESTÁ PRESENTE)
          if (schoolData.campusId) {
            console.log(`\n🏫 [STUDENT-ATTENDANCE] Obteniendo cursos de la sede: ${schoolData.campusId}`);

            const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
              orderCreated: true,
              allData: true,
              campusId: schoolData.campusId
            });

            const coursesCount = coursesResponse?.data?.edges?.length || 0;
            console.log(`✅ [STUDENT-ATTENDANCE] ${coursesCount} cursos encontrados en la sede`);

            if (coursesCount > 0) {
              courseIds = coursesResponse.data.edges.map((edge: any) => edge.node.id);
            } else {
              console.log(`⚪ [STUDENT-ATTENDANCE] No se encontraron cursos en la sede especificada`);
              return {
                entity: 'STUDENT_ATTENDANCE',
                online: 0,
                synced: 0
              };
            }
          } else {
            console.log(`\n🌐 [STUDENT-ATTENDANCE] Sincronización global (todas las sedes)`);
            courseIds = []; // Vacío significa "todos los cursos"
          }

          // 🔍 OBTENER ASIGNATURAS POR CADA CURSO (O GLOBAL SI NO HAY CAMPUSID)
          if (courseIds.length > 0) {
            // 📚 OBTENER ASIGNATURAS POR CURSOS ESPECÍFICOS
            for (const courseId of courseIds) {
              try {
                const asignatureCoursesData: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                  orderCreated: true,
                  allData: true,
                  courseId: courseId
                });

                const asignatureCourses = asignatureCoursesData?.data?.edges || [];
                asignatureCourses.forEach((edge: any) => {
                  academicAsignatureCourseIds.push(edge.node.id);
                });

              } catch (courseError: any) {
                console.warn(`⚠️ [STUDENT-ATTENDANCE] Error procesando curso ${courseId}:`, courseError?.message || courseError);
              }
            }
          } else {
            // 🌐 OBTENER TODAS LAS ASIGNATURAS GLOBALMENTE
            const asignatureCoursesData: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
              orderCreated: true,
              allData: true,
              courseId: null,
              campusId: null
            });

            const asignatureCourses = asignatureCoursesData?.data?.edges || [];
            asignatureCourses.forEach((edge: any) => {
              academicAsignatureCourseIds.push(edge.node.id);
            });
          }

          console.log(`✅ [STUDENT-ATTENDANCE] ${academicAsignatureCourseIds.length} asignaturas de curso obtenidas`);
        }

        if (academicAsignatureCourseIds.length === 0) {
          console.log(`⚪ [STUDENT-ATTENDANCE] No se encontraron asignaturas de curso para sincronizar`);
          return {
            entity: 'STUDENT_ATTENDANCE',
            online: 0,
            synced: 0
          };
        }

        // 🔄 PROCESAR CADA ACADEMIC ASIGNATURE COURSE CON EL PERÍODO ACADÉMICO
        let currentProgress = 0;
        const totalAsignatures = academicAsignatureCourseIds.length;

        for (let asignatureIndex = 0; asignatureIndex < academicAsignatureCourseIds.length; asignatureIndex++) {
          const academicAsignatureCourseId = academicAsignatureCourseIds[asignatureIndex];

          // 📊 ACTUALIZAR BARRA DE PROGRESO
          this.showProgressBar(
            asignatureIndex + 1,
            totalAsignatures,
            `Procesando asignatura ${asignatureIndex + 1}/${totalAsignatures}`
          );

          try {
            console.log(`\n🔍 [STUDENT-ATTENDANCE] Consultando asistencias para asignatura: ${academicAsignatureCourseId}`);

            let attendanceData: any = null;
            await client
              .request(QUERY_GET_ALL_STUDENT_ATTENDANCE, {
                academicPeriodId: schoolData.academicPeriodId,
                academicAsignatureCourseId: academicAsignatureCourseId,
                orderCreated: true,
                allData: true
              })
              .then(async (result: any) => {
                attendanceData = result.data;
              });

            // 📈 CONTAR Y PROCESAR ASISTENCIAS
            const attendanceCount = attendanceData?.edges?.length || 0;
            totalOnline += attendanceCount;

            if (attendanceCount > 0) {
              console.log(`✅ [STUDENT-ATTENDANCE] ${attendanceCount} asistencias encontradas para asignatura ${academicAsignatureCourseId}`);

              // 💾 SINCRONIZAR CADA ASISTENCIA
              for (let i = 0; i < attendanceData.edges.length; i++) {
                const attendanceEdge = attendanceData.edges[i];
                const attendance = attendanceEdge.node;

                try {
                  // 🧹 LIMPIAR CAMPOS DE RELACIONES
                  const attendanceDetails = { ...attendance };
                  delete attendanceDetails.id;
                  delete attendanceDetails.campus;
                  delete attendanceDetails.school;
                  delete attendanceDetails.academicAsignatureCourse;
                  delete attendanceDetails.academicPeriod;
                  delete attendanceDetails.student;

                  // ✅ MANTENER day COMO TIPO Date (no convertir a string)
                  // El campo day ya viene como Date desde GraphQL y debe preservarse

                  // 🔍 BUSCAR SI EXISTE EN LOCAL
                  const existingAttendance = await this.repositoryStudentAttendance.findOneBy(attendance.id);

                  if (existingAttendance == null) {
                    // ✅ CREAR NUEVO REGISTRO
                    await this.repositoryStudentAttendance.save({
                      _id: new ObjectId(attendance.id),
                      ...attendanceDetails,
                    });
                  } else {
                    // 🔄 ACTUALIZAR REGISTRO EXISTENTE
                    await this.repositoryStudentAttendance.update(
                      { id: attendance.id },
                      attendanceDetails,
                    );
                  }

                  totalSynced++;

                } catch (saveError: any) {
                  console.warn(`⚠️ [STUDENT-ATTENDANCE] Error al guardar asistencia ${attendance.id}:`, saveError?.message || saveError);
                }
              }
            } else {
              console.log(`⚪ [STUDENT-ATTENDANCE] No se encontraron asistencias para asignatura ${academicAsignatureCourseId}`);
            }

          } catch (asignatureError: any) {
            console.warn(`⚠️ [STUDENT-ATTENDANCE] Error procesando asignatura ${academicAsignatureCourseId}:`, asignatureError?.message || asignatureError);
          }
        }

        // 📊 Barra de progreso final
        this.showProgressBar(totalAsignatures, totalAsignatures, 'Asistencias por Asignatura y Período', totalSynced);

        console.log(`\n🎉 [STUDENT-ATTENDANCE] ⚡ MÓDULO COMPLETADO:`);
        console.log(`📊 Total asistencias en línea: ${totalOnline}`);
        console.log(`💾 Total asistencias sincronizadas: ${totalSynced}`);
        console.log(`🔗 Asignaturas procesadas: ${academicAsignatureCourseIds.length}`);
        console.log(`🎯 Modo: ${syncedAcademicAsignatureCourseIds && syncedAcademicAsignatureCourseIds.length > 0 ? 'IDs del módulo anterior' : 'Consulta completa'}`);

        return {
          entity: 'STUDENT_ATTENDANCE',
          online: totalOnline,
          synced: totalSynced,
        };
      } else {
        // 📊 Solo conteo - usar query de conteo si existe
        if (!schoolData?.schoolId) {
          console.error('❌ schoolData.schoolId es requerido para Student Attendance count');
          return {
            entity: 'STUDENT_ATTENDANCE',
            online: 0,
            error: 'schoolData.schoolId es requerido'
          };
        }

        if (!schoolData?.academicPeriodId) {
          console.error('❌ schoolData.academicPeriodId es requerido para Student Attendance count');
          return {
            entity: 'STUDENT_ATTENDANCE',
            online: 0,
            error: 'schoolData.academicPeriodId es requerido'
          };
        }

        try {
          // 🔍 CONTAR CON FILTRO POR CAMPUS SI ESTÁ PRESENTE
          if (schoolData.campusId) {
            // Primero obtener cursos de la sede
            const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
              orderCreated: true,
              allData: true,
              campusId: schoolData.campusId
            });

            const courseIds = coursesResponse?.data?.edges?.map((edge: any) => edge.node.id) || [];

            // Luego contar asistencias por cada curso
            for (const courseId of courseIds) {
              try {
                // Obtener asignaturas del curso
                const asignatureResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                  orderCreated: true,
                  allData: true,
                  courseId: courseId
                });

                const asignatureIds = asignatureResponse?.data?.edges?.map((edge: any) => edge.node.id) || [];

                // Contar asistencias por cada asignatura
                for (const asignatureId of asignatureIds) {
                  try {
                    const attendanceResponse: any = await client.request(QUERY_GET_ALL_STUDENT_ATTENDANCE, {
                      academicPeriodId: schoolData.academicPeriodId,
                      academicAsignatureCourseId: asignatureId,
                      orderCreated: true,
                      allData: true
                    });

                    totalOnline += attendanceResponse?.data?.edges?.length || 0;
                  } catch (innerError) {
                    console.warn(`⚠️ Error contando asistencias de asignatura ${asignatureId}:`, innerError);
                  }
                }
              } catch (innerError) {
                console.warn(`⚠️ Error contando asignaturas del curso ${courseId}:`, innerError);
              }
            }
          } else {
            // Conteo global
            try {
              // Obtener todas las asignaturas de curso
              const asignatureResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
                orderCreated: true,
                allData: true,
                courseId: null,
                campusId: null
              });

              const asignatureIds = asignatureResponse?.data?.edges?.map((edge: any) => edge.node.id) || [];

              // Contar asistencias por cada asignatura
              for (const asignatureId of asignatureIds) {
                try {
                  const attendanceResponse: any = await client.request(QUERY_GET_ALL_STUDENT_ATTENDANCE, {
                    academicPeriodId: schoolData.academicPeriodId,
                    academicAsignatureCourseId: asignatureId,
                    orderCreated: true,
                    allData: true
                  });

                  totalOnline += attendanceResponse?.data?.edges?.length || 0;
                } catch (innerError) {
                  console.warn(`⚠️ Error contando asistencias de asignatura ${asignatureId}:`, innerError);
                }
              }
            } catch (error) {
              console.warn(`⚠️ Error en conteo global de asistencias:`, error);
            }
          }
        } catch (error) {
          console.warn(`⚠️ Error en conteo de asistencias:`, error);
        }

        return {
          entity: 'STUDENT_ATTENDANCE',
          online: totalOnline,
        };
      }
    } catch (error: any) {
      console.error(`❌ [SYNC-STUDENT-ATTENDANCE] ERROR GENERAL:`, error);
      return {
        entity: 'STUDENT_ATTENDANCE',
        online: 0,
        error: String(error),
      };
    }
  }

  /**
   * 📖 SINCRONIZACIÓN DE FORUM
   */
  async syncForum(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    try {
      console.log('📖 [SYNC-FORUM] Iniciando sincronización...');

      // Obtener total count primero si no es sync full
      let totalCount = 0;
      if (!typeSyncFull) {
        const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_FORUM, {
          schoolId: schoolData.schoolId,
          schoolYearId: schoolData.schoolYearId,
        });
        totalCount = countResult.data.totalCount;
        console.log(`📖 [SYNC-FORUM] Total en servidor: ${totalCount} foros`);
      }

      // Obtener todos los foros de la escuela
      const result: any = await client.request(QUERY_GET_ALL_FORUM, {
        schoolId: schoolData.schoolId,
        schoolYearId: schoolData.schoolYearId,
      });

      const forums = result.data.edges;
      console.log(`📖 [SYNC-FORUM] Procesando ${forums.length} foros...`);

      let insertedCount = 0;
      let updatedCount = 0;

      for (let i = 0; i < forums.length; i++) {
        const forum = forums[i].node;
        const id = forum.id;

        // Mostrar progreso
        this.showProgressBar(i + 1, forums.length, 'Forum', forums.length);

        // Eliminar campos que no se deben insertar directamente
        delete forum.id;
        delete forum.school;
        //delete evidenceLearning.learning;

        const existing = await this.repositoryForum.findOneBy(id);

        if (!existing) {
          // Crear nuevo
          await this.repositoryForum.save({
            _id: new ObjectId(id),
            ...forum,
          });
          insertedCount++;
        } else {
          // Actualizar existente
          await this.repositoryForum.update({ id }, forum);
          updatedCount++;
        }
      }

      console.log(`📖 [SYNC-FORUM] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);

      return {
        entity: 'FORUM',
        online: forums.length,
      };
    } catch (error) {
      console.error('❌ [SYNC-FORUM] Error:', error);
      return {
        entity: 'FORUM',
        online: 0,
      };
    }
  }

  /**
   * 📖 SINCRONIZACIÓN DE QUESTION CATEGORY TEST ONLINE
   */
  async syncQuestionCategoryTestOnline(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    try {
      console.log('📖 [SYNC-QUESTION-CATEGORY-TEST-ONLINE] Iniciando sincronización...');

      let totalOnline = 0;
      let insertedCount = 0;
      let updatedCount = 0;

      // 🏢 PASO 1: OBTENER TODOS LOS CAMPUS DEL COLEGIO
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      const campuses = campusResponse?.data?.edges || [];
      console.log(`🏢 Campus obtenidos: ${campuses.length}`);

      if (campuses.length === 0) {
        console.log('⚠️ No hay Campus para obtener Question Category Test Online');
        return { entity: 'QUESTION_CATEGORY', online: 0 };
      }

      // 🎯 PASO 2: PARA CADA CAMPUS, SINCRONIZAR SUS QUESTION CATEGORY
      for (let campusIndex = 0; campusIndex < campuses.length; campusIndex++) {
        const campus = campuses[campusIndex]?.node;

        if (!campus?.id) {
          console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
          continue;
        }

        console.log(`🏢 PASO 2.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

        try {
          // Obtener count si no es sync full
          if (!typeSyncFull) {
            const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_QUESTION_CATEGORY_TEST_ONLINE, {
              campusId: campus.id,
            });
            totalOnline += countResult.data?.totalCount || 0;
            continue; // Solo conteo
          }

          // Obtener todas las categorías de preguntas del campus
          const result: any = await client.request(QUERY_GET_ALL_QUESTION_CATEGORY_TEST_ONLINE, {
            campusId: campus.id, // ✅ Ahora sí enviamos campusId
          });

          const questionCategories = result.data.edges;
          console.log(`📖 [SYNC-QUESTION-CATEGORY-TEST-ONLINE] Campus ${campus.name}: ${questionCategories.length} categorías...`);

          totalOnline += questionCategories.length;

          for (let i = 0; i < questionCategories.length; i++) {
            const questionCategory = questionCategories[i].node;
            const id = questionCategory.id;

            // Mostrar progreso
            this.showProgressBar(insertedCount + updatedCount + 1, totalOnline, 'QuestionCategory');

            // Eliminar campos que no se deben insertar directamente
            delete questionCategory.id;
            delete questionCategory.school;
            delete questionCategory.campus;
            delete questionCategory.questionBankTestOnline;

            const existing = await this.repositoryQuestionCategoryTestOnline.findOneBy(id);

            if (!existing) {
              // Crear nuevo
              await this.repositoryQuestionCategoryTestOnline.save({
                _id: new ObjectId(id),
                ...questionCategory,
              });
              insertedCount++;
            } else {
              // Actualizar existente
              await this.repositoryQuestionCategoryTestOnline.update({ id }, questionCategory);
              updatedCount++;
            }
          }

        } catch (campusError) {
          console.error(`❌ Error procesando Campus ${campus.id}:`, campusError);
        }
      }

      console.log(`📖 [SYNC-QUESTION-CATEGORY-TEST-ONLINE] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);

      return {
        entity: 'QUESTION_CATEGORY',
        online: totalOnline,
      };
    } catch (error) {
      console.error('❌ [SYNC-QUESTION-CATEGORY-TEST-ONLINE] Error:', error);
      return {
        entity: 'QUESTION_CATEGORY',
        online: 0,
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE EVIDENCE LEARNING
 */
async syncEvidenceLearning(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📖 [SYNC-EVIDENCE-LEARNING] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [EVIDENCE-LEARNING] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [EVIDENCE-LEARNING] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}, schoolYearId=${schoolData.schoolYearId || 'null'}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [EVIDENCE-LEARNING] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId,
          orderCreated: true,
          allData: true
        });

        // Filtrar solo el campus específico
        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [EVIDENCE-LEARNING] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [EVIDENCE-LEARNING] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'EVIDENCE_LEARNING', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [EVIDENCE-LEARNING] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'EVIDENCE_LEARNING',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES) - APLICAR FILTRO DE PERÍODO ACADÉMICO SI EXISTE
      console.log(`\n🌐 [EVIDENCE-LEARNING] Sincronización global (todas las evidencias de aprendizaje)`);
      
      // Para modo global, obtenemos TODAS las evidencias directamente con la query original
      try {
        // 🎯 APLICAR FILTRO POR PERÍODO ACADÉMICO EN MODO GLOBAL SI SE ESPECIFICA
        if (schoolData.academicPeriodId) {
          console.log(`📅 [EVIDENCE-LEARNING] Aplicando filtro por período académico: ${schoolData.academicPeriodId}`);
          
          // Obtener Learnings específicos del período académico
          const learningsResponse: any = await client.request(QUERY_GET_ALL_LEARNING, {
            schoolId: schoolData.schoolId,
            academicPeriodsId: [schoolData.academicPeriodId],
            academicGradeId: null,
            academicAsignatureId: null
          });

          const learnings = learningsResponse?.data?.edges || [];
          console.log(`📚 [EVIDENCE-LEARNING] Learnings encontrados para el período: ${learnings.length}`);

          if (learnings.length === 0) {
            console.log(`⚪ [EVIDENCE-LEARNING] No se encontraron learnings para el período académico especificado`);
            return { entity: 'EVIDENCE_LEARNING', online: 0 };
          }

          // Obtener count si no es sync full
          if (!typeSyncFull) {
            for (const learningEdge of learnings) {
              const learning = learningEdge.node;
              const learningId = learning.id;

              const evidenceResult: any = await client.request(QUERY_GET_ALL_EVIDENCE_LEARNING, {
                schoolId: schoolData.schoolId,
                schoolYearId: schoolData.schoolYearId,
              });

              // Filtrar por learningId en memoria
              const filteredEvidences = evidenceResult.data?.edges?.filter((edge: any) => 
                edge.node.learningId === learningId
              ) || [];

              totalOnline += filteredEvidences.length;
            }

            console.log(`📖 [EVIDENCE-LEARNING] Total en servidor (período específico): ${totalOnline} evidencias`);
            
            return {
              entity: 'EVIDENCE_LEARNING',
              online: totalOnline,
            };
          }

          // Sincronización completa filtrada por período
          for (const learningEdge of learnings) {
            const learning = learningEdge.node;
            const learningId = learning.id;

            const evidenceResult: any = await client.request(QUERY_GET_ALL_EVIDENCE_LEARNING, {
              schoolId: schoolData.schoolId,
              schoolYearId: schoolData.schoolYearId,
            });

            // Filtrar por learningId en memoria
            const filteredEvidences = evidenceResult.data?.edges?.filter((edge: any) => 
              edge.node.learningId === learningId
            ) || [];

            totalOnline += filteredEvidences.length;

            for (let i = 0; i < filteredEvidences.length; i++) {
              const evidenceLearning = filteredEvidences[i].node;
              const id = evidenceLearning.id;

              // Mostrar progreso CON INFORMACIÓN DE FILTROS
              this.showProgressBar(
                insertedCount + updatedCount + 1, 
                totalOnline, 
                `Global (Período: ${schoolData.academicPeriodId}) - Evidence Learning ${insertedCount + updatedCount + 1}/${totalOnline}`
              );

              // Eliminar campos que no se deben insertar directamente
              delete evidenceLearning.id;
              delete evidenceLearning.school;
              delete evidenceLearning.learning;

              const existing = await this.repositoryEvidenceLearning.findOneBy(id);

              if (!existing) {
                await this.repositoryEvidenceLearning.save({
                  _id: new ObjectId(id),
                  ...evidenceLearning,
                });
                insertedCount++;
              } else {
                await this.repositoryEvidenceLearning.update({ id }, evidenceLearning);
                updatedCount++;
              }
            }
          }

          console.log(`📖 [EVIDENCE-LEARNING] ✅ Completado (Global + Período): ${insertedCount} creadas, ${updatedCount} actualizadas`);
          console.log(`🎯 Filtro aplicado: Global + Período Académico ${schoolData.academicPeriodId}`);

          return {
            entity: 'EVIDENCE_LEARNING',
            online: totalOnline,
          };
        }

        // Sin filtro de período académico - lógica original
        if (!typeSyncFull) {
          const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_EVIDENCE_LEARNING, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
          });
          totalOnline = countResult.data?.totalCount || 0;
          console.log(`📖 [EVIDENCE-LEARNING] Total en servidor: ${totalOnline} evidencias`);
          
          return {
            entity: 'EVIDENCE_LEARNING',
            online: totalOnline,
          };
        }

        const result: any = await client.request(QUERY_GET_ALL_EVIDENCE_LEARNING, {
          schoolId: schoolData.schoolId,
          schoolYearId: schoolData.schoolYearId,
        });

        const evidenceLearnings = result.data?.edges || [];
        console.log(`📖 [EVIDENCE-LEARNING] Procesando ${evidenceLearnings.length} evidencias de aprendizaje...`);

        totalOnline = evidenceLearnings.length;

        for (let i = 0; i < evidenceLearnings.length; i++) {
          const evidenceLearning = evidenceLearnings[i].node;
          const id = evidenceLearning.id;

          this.showProgressBar(
            i + 1, 
            evidenceLearnings.length, 
            `Global - Evidence Learning ${i + 1}/${evidenceLearnings.length}`
          );

          delete evidenceLearning.id;
          delete evidenceLearning.school;
          delete evidenceLearning.learning;

          const existing = await this.repositoryEvidenceLearning.findOneBy(id);

          if (!existing) {
            await this.repositoryEvidenceLearning.save({
              _id: new ObjectId(id),
              ...evidenceLearning,
            });
            insertedCount++;
          } else {
            await this.repositoryEvidenceLearning.update({ id }, evidenceLearning);
            updatedCount++;
          }
        }

        console.log(`📖 [EVIDENCE-LEARNING] ✅ Completado (Global): ${insertedCount} creadas, ${updatedCount} actualizadas`);
        console.log(`🎯 Filtro aplicado: Global (todas las evidencias de aprendizaje)`);

        return {
          entity: 'EVIDENCE_LEARNING',
          online: totalOnline,
        };

      } catch (globalError) {
        console.error(`❌ [EVIDENCE-LEARNING] Error en sincronización global:`, globalError);
        return {
          entity: 'EVIDENCE_LEARNING',
          online: 0,
          error: 'Error en sincronización global'
        };
      }
    }

    // 🏫 PROCESAMIENTO POR SEDE ESPECÍFICA
    if (campusesToProcess.length === 0) {
      console.log(`⚠️ [EVIDENCE-LEARNING] No se encontraron sedes para sincronizar`);
      return { entity: 'EVIDENCE_LEARNING', online: 0 };
    }

    // 🔄 PASO: PROCESAR EVIDENCE LEARNING POR SEDE ESPECÍFICA
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`🏢 PASO ${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      try {
        console.log(`\n📚 [EVIDENCE-LEARNING] Obteniendo Learnings del campus: ${campus.name}`);

        // 🎯 OBTENER PERÍODOS ACADÉMICOS - FILTRAR SI SE ESPECIFICA UNO
        let academicPeriodsToProcess: any[] = [];

        if (schoolData.academicPeriodId) {
          // 📅 MODO FILTRADO POR PERÍODO ACADÉMICO ESPECÍFICO
          console.log(`\n📅 [EVIDENCE-LEARNING] Aplicando filtro por período académico: ${schoolData.academicPeriodId}`);
          
          const specificPeriodResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCustom: false
          });

          const allPeriods = specificPeriodResponse?.data?.edges || [];
          const specificPeriod = allPeriods.find((edge: any) => edge.node.id === schoolData.academicPeriodId);

          if (specificPeriod) {
            academicPeriodsToProcess = [specificPeriod];
            console.log(`✅ [EVIDENCE-LEARNING] Período encontrado: ${specificPeriod.node.name} (${schoolData.academicPeriodId})`);
          } else {
            console.log(`⚪ [EVIDENCE-LEARNING] No se encontró el período académico especificado: ${schoolData.academicPeriodId}`);
            continue;
          }
        } else {
          // 🌐 TODOS LOS PERÍODOS ACADÉMICOS
          console.log(`\n🌐 [EVIDENCE-LEARNING] Obteniendo todos los períodos académicos`);
          
          const academicPeriodsResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
            schoolId: schoolData.schoolId,
            schoolYearId: schoolData.schoolYearId,
            orderCustom: false
          });

          academicPeriodsToProcess = academicPeriodsResponse?.data?.edges || [];
          console.log(`📅 [EVIDENCE-LEARNING] Períodos académicos encontrados: ${academicPeriodsToProcess.length}`);
        }

        if (academicPeriodsToProcess.length === 0) {
          console.log(`⚠️ [EVIDENCE-LEARNING] No se encontraron períodos académicos para procesar`);
          continue;
        }

        // Primero obtener todos los Academic Grades
        const academicGradesResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_GRADE, {
          schoolId: schoolData.schoolId,
          schoolYearId: schoolData.schoolYearId
        });

        const academicGrades = academicGradesResponse?.data?.edges || [];
        console.log(`📚 [EVIDENCE-LEARNING] Academic Grades encontrados: ${academicGrades.length}`);

        // Luego obtener todas las asignaturas
        const academicAsignaturesResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE, {
          schoolId: schoolData.schoolId,
          schoolYearId: schoolData.schoolYearId,
          academicAreaId: null
        });

        const academicAsignatures = academicAsignaturesResponse?.data?.edges || [];
        console.log(`📖 [EVIDENCE-LEARNING] Academic Asignatures encontradas: ${academicAsignatures.length}`);

        // 🔄 ITERAR PERÍODOS ACADÉMICOS FILTRADOS
        for (const periodEdge of academicPeriodsToProcess) {
          const academicPeriod = periodEdge.node;
          const academicPeriodId = academicPeriod.id;
          const periodName = academicPeriod.name || academicPeriodId;

          console.log(`\n📅 [EVIDENCE-LEARNING] Procesando período: ${periodName} (${academicPeriodId})`);

          for (const gradeEdge of academicGrades) {
            const academicGrade = gradeEdge.node;
            const academicGradeId = academicGrade.id;

            for (const asignatureEdge of academicAsignatures) {
              const academicAsignature = asignatureEdge.node;
              const academicAsignatureId = academicAsignature.id;

              try {
                // Obtener Learnings para esta combinación
                const learningsResponse: any = await client.request(QUERY_GET_ALL_LEARNING, {
                  schoolId: schoolData.schoolId,
                  academicPeriodsId: [academicPeriodId],
                  academicGradeId: academicGradeId,
                  academicAsignatureId: academicAsignatureId
                });

                const learnings = learningsResponse?.data?.edges || [];

                if (learnings.length > 0) {
                  console.log(`📚 [EVIDENCE-LEARNING] Encontrados ${learnings.length} learnings para período ${periodName} - grado ${academicGrade.name} - asignatura ${academicAsignature.name}`);

                  for (const learningEdge of learnings) {
                    const learning = learningEdge.node;
                    const learningId = learning.id;

                    try {
                      // Obtener count si no es sync full
                      if (!typeSyncFull) {
                        const evidenceResult: any = await client.request(QUERY_GET_ALL_EVIDENCE_LEARNING, {
                          schoolId: schoolData.schoolId,
                          schoolYearId: schoolData.schoolYearId,
                        });

                        const filteredEvidences = evidenceResult.data?.edges?.filter((edge: any) => 
                          edge.node.learningId === learningId
                        ) || [];

                        totalOnline += filteredEvidences.length;
                        console.log(`📊 Learning ${learningId}: ${filteredEvidences.length} evidencias`);
                        continue;
                      }

                      const evidenceResult: any = await client.request(QUERY_GET_ALL_EVIDENCE_LEARNING, {
                        schoolId: schoolData.schoolId,
                        schoolYearId: schoolData.schoolYearId,
                      });

                      const allEvidences = evidenceResult.data?.edges || [];
                      const filteredEvidences = allEvidences.filter((edge: any) => 
                        edge.node.learningId === learningId
                      );

                      console.log(`📖 [EVIDENCE-LEARNING] Learning ${learningId}: ${filteredEvidences.length} evidencias de aprendizaje...`);

                      totalOnline += filteredEvidences.length;

                      for (let i = 0; i < filteredEvidences.length; i++) {
                        const evidenceLearning = filteredEvidences[i].node;
                        const id = evidenceLearning.id;

                        // Mostrar progreso CON INFORMACIÓN DE FILTROS
                        this.showProgressBar(
                          insertedCount + updatedCount + 1,
                          totalOnline,
                          `Sede: ${campus.name}${schoolData.academicPeriodId ? ` - Período: ${periodName}` : ''} - Evidence Learning ${i + 1}/${filteredEvidences.length}`
                        );

                        delete evidenceLearning.id;
                        delete evidenceLearning.school;
                        delete evidenceLearning.learning;

                        const existing = await this.repositoryEvidenceLearning.findOneBy(id);

                        if (!existing) {
                          await this.repositoryEvidenceLearning.save({
                            _id: new ObjectId(id),
                            ...evidenceLearning,
                          });
                          insertedCount++;
                        } else {
                          await this.repositoryEvidenceLearning.update({ id }, evidenceLearning);
                          updatedCount++;
                        }
                      }

                    } catch (learningError) {
                      console.warn(`⚠️ [EVIDENCE-LEARNING] Error procesando Learning ${learningId}:`, learningError);
                    }
                  }
                }

              } catch (combinationError) {
                console.warn(`⚠️ [EVIDENCE-LEARNING] Error en combinación período ${academicPeriodId} - grado ${academicGradeId} - asignatura ${academicAsignatureId}:`, combinationError);
              }
            }
          }
        }

      } catch (campusError) {
        console.error(`❌ [EVIDENCE-LEARNING] Error procesando Campus ${campus.id}:`, campusError);
      }
    }

    console.log(`📖 [EVIDENCE-LEARNING] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);
    console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las evidencias)'}`);
    console.log(`📅 Período académico: ${schoolData.academicPeriodId ? `Específico (${schoolData.academicPeriodId})` : 'Todos los períodos'}`);
    console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);

    return {
      entity: 'EVIDENCE_LEARNING',
      online: totalOnline,
    };

  } catch (error) {
    console.error('❌ [SYNC-EVIDENCE-LEARNING] Error:', error);
    return {
      entity: 'EVIDENCE_LEARNING',
      online: 0,
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE EVALUATIVE COMPONENT
 */
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
              await this.repositoryEvaluativeComponent.save({
                _id: new ObjectId(evaluativeComponentId),
                ...evaluativeComponentDetails,
              });
            } else {
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

  /**
   * 📚 SINCRONIZACIÓN DE CLASSROOM PLAN
   */
async syncClassroomPlan(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📚 [SYNC-CLASSROOM-PLAN] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [CLASSROOM-PLAN] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [CLASSROOM-PLAN] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [CLASSROOM-PLAN] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId,
          orderCreated: true,
          allData: true
        });

        // Filtrar solo el campus específico
        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [CLASSROOM-PLAN] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [CLASSROOM-PLAN] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'CLASSROOM_PLAN', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [CLASSROOM-PLAN] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'CLASSROOM_PLAN',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES)
      console.log(`\n🌐 [CLASSROOM-PLAN] Sincronización global (todas las sedes)`);
      
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      campusesToProcess = campusResponse?.data?.edges || [];
      console.log(`✅ [CLASSROOM-PLAN] ${campusesToProcess.length} sedes encontradas para sincronización global`);
    }

    if (campusesToProcess.length === 0) {
      console.log('⚠️ [CLASSROOM-PLAN] No se encontraron sedes para sincronizar');
      return { entity: 'CLASSROOM_PLAN', online: 0 };
    }

    // 🎯 PASO 2: PARA CADA CAMPUS SELECCIONADO, OBTENER SUS ACADEMIC ASIGNATURE COURSES
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`🏢 PASO 2.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      try {
        // 🎯 OBTENER ACADEMIC ASIGNATURE COURSES ESPECÍFICOS DEL CAMPUS Y AÑO ESCOLAR
        const academicAsignatureCourseResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
          schoolId: schoolData.schoolId,        // ✅ Tu escuela
          schoolYearId: schoolData.schoolYearId, // ✅ Tu año escolar  
          campusId: campus.id,                  // ✅ Campus específico
          orderCreated: true,
          allData: true
        });

        const academicAsignatureCourses = academicAsignatureCourseResponse?.data?.edges || [];
        console.log(`🎯 Academic Asignature Courses del Campus ${campus.name}: ${academicAsignatureCourses.length}`);

        if (academicAsignatureCourses.length === 0) {
          console.log(`⚠️ No hay Academic Asignature Courses en Campus ${campus.name}`);
          continue;
        }

        // 📚 PASO 3: PARA CADA ACADEMIC ASIGNATURE COURSE DEL CAMPUS, BUSCAR CLASSROOM PLANS
        for (let courseIndex = 0; courseIndex < academicAsignatureCourses.length; courseIndex++) {
          const academicAsignatureCourse = academicAsignatureCourses[courseIndex]?.node;

          if (!academicAsignatureCourse?.id) {
            console.log(`⚠️ Academic Asignature Course ${courseIndex + 1} sin ID válido, saltando...`);
            continue;
          }

          console.log(`🎯 PASO 3.${courseIndex + 1}: Procesando Academic Asignature Course: ${academicAsignatureCourse.id}`);

          try {
            // Obtener count si no es sync full
            if (!typeSyncFull) {
              const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_CLASSROOM_PLAN, {
                academicAsignatureCourseId: academicAsignatureCourse.id,
              });
              totalOnline += countResult.data?.totalCount || 0;
              continue; // Solo conteo
            }

            // Obtener todos los classroom plans del academic asignature course
            const result: any = await client.request(QUERY_GET_ALL_CLASSROOM_PLAN, {
              academicAsignatureCourseId: academicAsignatureCourse.id,
            });

            const classroomPlans = result.data.edges;
            console.log(`📚 [CLASSROOM-PLAN] Academic Asignature Course ${academicAsignatureCourse.id}: ${classroomPlans.length} planes...`);

            totalOnline += classroomPlans.length;

            for (let i = 0; i < classroomPlans.length; i++) {
              const classroomPlan = classroomPlans[i].node;
              const id = classroomPlan.id;

              // Mostrar progreso CON INFORMACIÓN DE FILTRO
              this.showProgressBar(
                insertedCount + updatedCount + 1, 
                totalOnline, 
                `${schoolData.campusId ? `Sede: ${campus.name}` : 'Global'} - ClassroomPlan`
              );

              // Eliminar campos que no se deben insertar directamente
              delete classroomPlan.id;
              delete classroomPlan.school;
              delete classroomPlan.campus;
              delete classroomPlan.academicPeriod;
              delete classroomPlan.academicAsignature;
              delete classroomPlan.academicGrade;
              delete classroomPlan.academicAsignatureCourse;
              delete classroomPlan.learnigs;
              delete classroomPlan.academicStandards;
              delete classroomPlan.generalBasicLearningRights;

              const existing = await this.repositoryClassroomPlan.findOneBy(id);

              if (!existing) {
                // Crear nuevo
                await this.repositoryClassroomPlan.save({
                  _id: new ObjectId(id),
                  ...classroomPlan,
                });
                insertedCount++;
              } else {
                // Actualizar existente
                await this.repositoryClassroomPlan.update({ id }, classroomPlan);
                updatedCount++;
              }
            }

          } catch (courseError) {
            console.error(`❌ Error procesando Academic Asignature Course ${academicAsignatureCourse.id}:`, courseError);
          }
        }

      } catch (campusError) {
        console.error(`❌ Error procesando Campus ${campus.id}:`, campusError);
      }
    }

    console.log(`\n📚 [CLASSROOM-PLAN] ✅ Completado: ${insertedCount} creados, ${updatedCount} actualizados`);
    console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
    console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);

    return {
      entity: 'CLASSROOM_PLAN',
      online: totalOnline,
    };
  } catch (error) {
    console.error('❌ [SYNC-CLASSROOM-PLAN] Error:', error);
    return {
      entity: 'CLASSROOM_PLAN',
      online: 0,
    };
  }
}

  /**
   * 📖 SINCRONIZACIÓN DE FORUMQUESTION
   */
  async syncForumQuestion(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    try {
      console.log('📖 [SYNC-FORUM-QUESTION] Iniciando sincronización...');

      // Obtener total count primero si no es sync full
      let totalCount = 0;
      if (!typeSyncFull) {
        const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_FORUM_QUESTION, {
          schoolId: schoolData.schoolId,
          schoolYearId: schoolData.schoolYearId,
        });
        totalCount = countResult.data.totalCount;
        console.log(`📖 [SYNC-FORUM-QUESTION] Total en servidor: ${totalCount} preguntas de foro`);
      }

      // Obtener todas las preguntas de foro de la escuela
      const result: any = await client.request(QUERY_GET_ALL_FORUM_QUESTION, {
        schoolId: schoolData.schoolId,
        schoolYearId: schoolData.schoolYearId,
      });

      const forumQuestions = result.data.edges;
      console.log(`📖 [SYNC-FORUM-QUESTION] Procesando ${forumQuestions.length} preguntas de foro...`);

      let insertedCount = 0;
      let updatedCount = 0;

      for (let i = 0; i < forumQuestions.length; i++) {
        const forumQuestion = forumQuestions[i].node;
        const id = forumQuestion.id;

        // Mostrar progreso
        this.showProgressBar(i + 1, forumQuestions.length, 'ForumQuestion', forumQuestions.length);

        // Eliminar campos que no se deben insertar directamente
        delete forumQuestion.id;
        delete forumQuestion.school;

        const existing = await this.repositoryForumQuestion.findOneBy(id);

        if (!existing) {
          // Crear nuevo
          await this.repositoryForumQuestion.save({
            _id: new ObjectId(id),
            ...forumQuestion,
          });
          insertedCount++;
        } else {
          // Actualizar existente
          await this.repositoryForumQuestion.update({ id }, forumQuestion);
          updatedCount++;
        }
      }

      console.log(`📖 [SYNC-FORUM-QUESTION] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);

      return {
        entity: 'FORUMQUESTION',
        online: forumQuestions.length,
      };
    } catch (error) {
      console.error('❌ [SYNC-FORUM-QUESTION] Error:', error);
      return {
        entity: 'FORUMQUESTION',
        online: 0,
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE QUESTION TEST ONLINE
 */
  async syncQuestionTestOnline(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    try {
      console.log('📖 [SYNC-QUESTION-TEST-ONLINE] Iniciando sincronización...');

      let totalOnline = 0;
      let insertedCount = 0;
      let updatedCount = 0;

      // 🏢 PASO 1: OBTENER TODOS LOS CAMPUS DEL COLEGIO
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      const campuses = campusResponse?.data?.edges || [];
      console.log(`🏢 Campus obtenidos: ${campuses.length}`);

      if (campuses.length === 0) {
        console.log('⚠️ No hay Campus para obtener Question Test Online');
        return { entity: 'QUESTION_TEST', online: 0 };
      }

      // 🎯 PASO 2: PARA CADA CAMPUS, SINCRONIZAR SUS QUESTION TEST
      for (let campusIndex = 0; campusIndex < campuses.length; campusIndex++) {
        const campus = campuses[campusIndex]?.node;

        if (!campus?.id) {
          console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
          continue;
        }

        console.log(`🏢 PASO 2.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

        try {
          // Obtener count si no es sync full
          if (!typeSyncFull) {
            const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_QUESTION_TEST_ONLINE, {
              campusId: campus.id,
            });
            totalOnline += countResult.data?.totalCount || 0;
            continue; // Solo conteo
          }

          // Obtener todas las pruebas de preguntas del campus
          const result: any = await client.request(QUERY_GET_ALL_QUESTION_TEST_ONLINE, {
            campusId: campus.id, // ✅ Ahora sí enviamos campusId
          });

          const questionTests = result.data.edges;
          console.log(`📖 [SYNC-QUESTION-TEST-ONLINE] Campus ${campus.name}: ${questionTests.length} pruebas de preguntas...`);

          totalOnline += questionTests.length;

          for (let i = 0; i < questionTests.length; i++) {
            const questionTest = questionTests[i].node;
            const id = questionTest.id;

            // Mostrar progreso
            this.showProgressBar(insertedCount + updatedCount + 1, totalOnline, 'QuestionTest');

            // Eliminar campos que no se deben insertar directamente
            delete questionTest.id;
            delete questionTest.school;
            delete questionTest.campus;
            delete questionTest.questionCategoryTestOnline;

            const existing = await this.repositoryQuestionTestOnline.findOneBy(id);

            if (!existing) {
              // Crear nuevo
              await this.repositoryQuestionTestOnline.save({
                _id: new ObjectId(id),
                ...questionTest,
              });
              insertedCount++;
            } else {
              // Actualizar existente
              await this.repositoryQuestionTestOnline.update({ id }, questionTest);
              updatedCount++;
            }
          }

        } catch (campusError) {
          console.error(`❌ Error procesando Campus ${campus.id}:`, campusError);
        }
      }

      console.log(`📖 [SYNC-QUESTION-TEST-ONLINE] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);

      return {
        entity: 'QUESTION_TEST',
        online: totalOnline,
      };
    } catch (error) {
      console.error('❌ [SYNC-QUESTION-TEST-ONLINE] Error:', error);
      return {
        entity: 'QUESTION_TEST',
        online: 0,
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE ACADEMIC ASIGNATURE COURSE PERIOD EVIDENCE LEARNING VALUATION
 */
  async syncAcademicAsignatureCoursePeriodEvidenceLearningValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    try {
      console.log('📖 [SYNC-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] Iniciando sincronización...');

      let totalOnline = 0;
      let insertedCount = 0;
      let updatedCount = 0;

      // 🏢 PASO 1: OBTENER TODOS LOS CAMPUS DEL COLEGIO
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      const campuses = campusResponse?.data?.edges || [];
      console.log(`🏢 Campus obtenidos: ${campuses.length}`);

      if (campuses.length === 0) {
        console.log('⚠️ No hay Campus para obtener Acamdemic Asignature Course Period Evidence Learning Valuation');
        return { entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION', online: 0 };
      }

      // 🎯 PASO 2: PARA CADA CAMPUS, SINCRONIZAR SUS ACADEMIC ASIGNATURE COURSE PERIOD EVIDENCE LEARNING VALUATION
      for (let campusIndex = 0; campusIndex < campuses.length; campusIndex++) {
        const campus = campuses[campusIndex]?.node;

        if (!campus?.id) {
          console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
          continue;
        }

        console.log(`🏢 PASO 2.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

        try {
          // Obtener count si no es sync full
          if (!typeSyncFull) {
            const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION, {
              campusId: campus.id,
            });
            totalOnline += countResult.data?.totalCount || 0;
            continue; // Solo conteo
          }

          const result: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION, {
            campusId: campus.id, // ✅ Ahora sí enviamos campusId
          });

          const academicAsignatureCoursePeriodEvidenceLearningValuations = result.data.edges;
          console.log(`📖 [SYNC-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] Campus ${campus.name}: ${academicAsignatureCoursePeriodEvidenceLearningValuations.length} valoraciones asignaturas academicas...`);

          totalOnline += academicAsignatureCoursePeriodEvidenceLearningValuations.length;

          for (let i = 0; i < academicAsignatureCoursePeriodEvidenceLearningValuations.length; i++) {
            const academicAsignatureCoursePeriodEvidenceLearningValuation = academicAsignatureCoursePeriodEvidenceLearningValuations[i].node;
            const id = academicAsignatureCoursePeriodEvidenceLearningValuation.id;

            // Mostrar progreso
            this.showProgressBar(insertedCount + updatedCount + 1, totalOnline, 'AcademicAsignatureCoursePeriodEvidenceLearningValuation');

            // Eliminar campos que no se deben insertar directamente
            delete academicAsignatureCoursePeriodEvidenceLearningValuation.id;
            delete academicAsignatureCoursePeriodEvidenceLearningValuation.school;
            delete academicAsignatureCoursePeriodEvidenceLearningValuation.campus;
            delete academicAsignatureCoursePeriodEvidenceLearningValuation.academicAsignatureCourse;
            delete academicAsignatureCoursePeriodEvidenceLearningValuation.student;
            delete academicAsignatureCoursePeriodEvidenceLearningValuation.performanceLevel;
            delete academicAsignatureCoursePeriodEvidenceLearningValuation.academicPeriod;
            delete academicAsignatureCoursePeriodEvidenceLearningValuation.evidenceLearnig;

            const existing = await this.repositoryAcademicAsignatureCoursePeriodEvidenceLearningValuation.findOneBy(id);

            if (!existing) {
              // Crear nuevo
              await this.repositoryAcademicAsignatureCoursePeriodEvidenceLearningValuation.save({
                _id: new ObjectId(id),
                ...academicAsignatureCoursePeriodEvidenceLearningValuation,
              });
              insertedCount++;
            } else {
              // Actualizar existente
              await this.repositoryAcademicAsignatureCoursePeriodEvidenceLearningValuation.update({ id }, academicAsignatureCoursePeriodEvidenceLearningValuation);
              updatedCount++;
            }
          }

        } catch (campusError) {
          console.error(`❌ Error procesando Campus ${campus.id}:`, campusError);
        }
      }

      console.log(`📖 [SYNC-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);

      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION',
        online: totalOnline,
      };
    } catch (error) {
      console.error('❌ [SYNC-ACADEMIC-ASIGNATURE-COURSE-PERIOD-EVIDENCE-LEARNING-VALUATION] Error:', error);
      return {
        entity: 'ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION',
        online: 0,
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE EXPERIENCE LEARNING
 */
async syncExperienceLearning(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📖 [SYNC-EXPERIENCE-LEARNING] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [EXPERIENCE-LEARNING] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [EXPERIENCE-LEARNING] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [EXPERIENCE-LEARNING] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId,
          orderCreated: true,
          allData: true
        });

        // Filtrar solo el campus específico
        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [EXPERIENCE-LEARNING] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [EXPERIENCE-LEARNING] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'EXPERIENCE_LEARNING', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [EXPERIENCE-LEARNING] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'EXPERIENCE_LEARNING',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES)
      console.log(`\n🌐 [EXPERIENCE-LEARNING] Sincronización global (todas las sedes)`);
      
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      campusesToProcess = campusResponse?.data?.edges || [];
      console.log(`✅ [EXPERIENCE-LEARNING] ${campusesToProcess.length} sedes encontradas para sincronización global`);
    }

    if (campusesToProcess.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING] No se encontraron sedes para sincronizar`);
      return { entity: 'EXPERIENCE_LEARNING', online: 0 };
    }

    // 📅 VERIFICAR SI HAY FILTRO POR PERÍODO ACADÉMICO
    if (schoolData.academicPeriodId) {
      console.log(`📅 [EXPERIENCE-LEARNING] Aplicando filtro por período académico: ${schoolData.academicPeriodId}`);
    } else {
      console.log(`📅 [EXPERIENCE-LEARNING] Sin filtro de período académico (sincronizando todos los períodos)`);
    }

    // 🎯 PASO 2: DEFINIR TODOS LOS TIPOS DE EXPERIENCE LEARNING
    const experienceLearningTypes = ['NORMAL', 'RECOVERY']; // ✅ Traer ambos tipos
    console.log(`🔄 [EXPERIENCE-LEARNING] Sincronizando tipos: ${experienceLearningTypes.join(', ')}`);

    // 🎯 PASO 3: PARA CADA CAMPUS SELECCIONADO Y CADA TIPO, SINCRONIZAR EXPERIENCE LEARNING
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`🏢 PASO 3.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      // 🔄 PASO 4: ITERAR CADA TIPO DE EXPERIENCE LEARNING
      for (const experienceLearningType of experienceLearningTypes) {
        console.log(`\n📋 [EXPERIENCE-LEARNING] Procesando tipo: ${experienceLearningType} en Campus ${campus.name}`);
        
        // Mostrar si hay filtro de período académico
        if (schoolData.academicPeriodId) {
          console.log(`   📅 Filtrando por período: ${schoolData.academicPeriodId}`);
        }

        try {
          // Obtener count si no es sync full
          if (!typeSyncFull) {
            const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING, {
              campusId: campus.id,
              academicAsignatureCourseId: null,
              academicPeriodId: schoolData.academicPeriodId || null, // ✅ APLICAR FILTRO DE PERÍODO SI EXISTE
              experienceLearningType: experienceLearningType
            });
            const typeCount = countResult.data?.totalCount || 0;
            totalOnline += typeCount;
            console.log(`📊 Campus ${campus.name} - Tipo ${experienceLearningType}${schoolData.academicPeriodId ? ` - Período ${schoolData.academicPeriodId}` : ''}: ${typeCount} registros`);
            continue; // Solo conteo
          }

          const result: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING, {
            campusId: campus.id,
            academicAsignatureCourseId: null,
            academicPeriodId: schoolData.academicPeriodId || null, // ✅ APLICAR FILTRO DE PERÍODO SI EXISTE
            experienceLearningType: experienceLearningType
          });

          const experienceLearnings = result.data.edges;
          console.log(`📖 [EXPERIENCE-LEARNING] Campus ${campus.name} - Tipo ${experienceLearningType}${schoolData.academicPeriodId ? ` - Período ${schoolData.academicPeriodId}` : ''}: ${experienceLearnings.length} registros...`);

          totalOnline += experienceLearnings.length;

          for (let i = 0; i < experienceLearnings.length; i++) {
            const experienceLearning = experienceLearnings[i].node;
            const id = experienceLearning.id;

            // Mostrar progreso CON INFORMACIÓN DE FILTRO
            this.showProgressBar(
              insertedCount + updatedCount + 1,
              totalOnline,
              `${schoolData.campusId ? `Sede: ${campus.name}` : 'Global'} - ${schoolData.academicPeriodId ? `Período: ${schoolData.academicPeriodId}` : 'Todos'} - ${experienceLearningType}`
            );

            // Eliminar campos que no se deben insertar directamente
            delete experienceLearning.id;
            delete experienceLearning.school;
            delete experienceLearning.campus;
            delete experienceLearning.academicAsignatureCourse;
            delete experienceLearning.learnings;
            delete experienceLearning.student;
            delete experienceLearning.evaluativeComponents;
            delete experienceLearning.performanceLevel;
            delete experienceLearning.academicPeriod;
            delete experienceLearning.evidenceLearnigs;

            const existing = await this.repositoryExperienceLearning.findOneBy(id);

            if (!existing) {
              // Crear nuevo
              await this.repositoryExperienceLearning.save({
                _id: new ObjectId(id),
                ...experienceLearning,
              });
              insertedCount++;
            } else {
              // Actualizar existente
              await this.repositoryExperienceLearning.update({ id }, experienceLearning);
              updatedCount++;
            }
          }

        } catch (typeError) {
          console.error(`❌ Error procesando tipo ${experienceLearningType} en Campus ${campus.id}${schoolData.academicPeriodId ? ` para período ${schoolData.academicPeriodId}` : ''}:`, typeError);
        }
      }
    }

    console.log(`\n📖 [EXPERIENCE-LEARNING] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);
    console.log(`📊 [EXPERIENCE-LEARNING] Tipos sincronizados: ${experienceLearningTypes.join(', ')}`);
    console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
    console.log(`📅 Período académico: ${schoolData.academicPeriodId ? `Específico (${schoolData.academicPeriodId})` : 'Todos los períodos'}`);
    console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);

    return {
      entity: 'EXPERIENCE_LEARNING',
      online: totalOnline,
    };
  } catch (error) {
    console.error('❌ [SYNC-EXPERIENCE-LEARNING] Error:', error);
    return {
      entity: 'EXPERIENCE_LEARNING',
      online: 0,
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE EXPERIENCE LEARNING AVERAGE VALUATION
 */
async syncExperienceLearningAverageValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📖 [SYNC-EXPERIENCE-LEARNING-AVERAGE-VALUATION] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [EXPERIENCE-LEARNING-AVERAGE-VALUATION] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [EXPERIENCE-LEARNING-AVERAGE-VALUATION] Parámetros:`);
    console.log(`   - schoolId: ${schoolData.schoolId}`);
    console.log(`   - campusId: ${schoolData.campusId || 'TODOS'}`);
    console.log(`   - schoolYearId: ${schoolData.schoolYearId || 'null'}`);
    console.log(`   - academicPeriodId: ${schoolData.academicPeriodId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [EXPERIENCE-LEARNING-AVERAGE-VALUATION] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId
        });

        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [EXPERIENCE-LEARNING-AVERAGE-VALUATION] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [EXPERIENCE-LEARNING-AVERAGE-VALUATION] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'EXPERIENCE_LEARNING_AVERAGE_VALUATION', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [EXPERIENCE-LEARNING-AVERAGE-VALUATION] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'EXPERIENCE_LEARNING_AVERAGE_VALUATION',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES)
      console.log(`\n🌐 [EXPERIENCE-LEARNING-AVERAGE-VALUATION] Sincronización global (todas las sedes)`);
      
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId
      });

      campusesToProcess = campusResponse?.data?.edges || [];
      console.log(`✅ [EXPERIENCE-LEARNING-AVERAGE-VALUATION] ${campusesToProcess.length} sedes encontradas para sincronización global`);
    }

    if (campusesToProcess.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-AVERAGE-VALUATION] No se encontraron sedes para sincronizar`);
      return { entity: 'EXPERIENCE_LEARNING_AVERAGE_VALUATION', online: 0 };
    }

    // 🆕 DETERMINAR QUÉ PERÍODOS ACADÉMICOS PROCESAR
    let academicPeriodsToProcess: any[] = [];

    if (schoolData.academicPeriodId) {
      // 📅 MODO FILTRADO POR PERÍODO ACADÉMICO ESPECÍFICO
      console.log(`\n📅 [EXPERIENCE-LEARNING-AVERAGE-VALUATION] Obteniendo información del período académico específico: ${schoolData.academicPeriodId}`);
      
      try {
        const academicPeriodsResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
          schoolId: schoolData.schoolId,
          schoolYearId: schoolData.schoolYearId,
          orderCustom: false
        });

        const allPeriods = academicPeriodsResponse?.data?.edges || [];
        const specificPeriod = allPeriods.find((edge: any) => edge.node.id === schoolData.academicPeriodId);

        if (specificPeriod) {
          academicPeriodsToProcess = [specificPeriod];
          console.log(`✅ [EXPERIENCE-LEARNING-AVERAGE-VALUATION] Período académico encontrado: ${specificPeriod.node.name} (${schoolData.academicPeriodId})`);
        } else {
          console.log(`⚪ [EXPERIENCE-LEARNING-AVERAGE-VALUATION] No se encontró el período académico especificado: ${schoolData.academicPeriodId}`);
          return { entity: 'EXPERIENCE_LEARNING_AVERAGE_VALUATION', online: 0 };
        }
      } catch (periodError) {
        console.error(`❌ [EXPERIENCE-LEARNING-AVERAGE-VALUATION] Error obteniendo período académico específico:`, periodError);
        return {
          entity: 'EXPERIENCE_LEARNING_AVERAGE_VALUATION',
          online: 0,
          error: 'Error obteniendo período académico específico'
        };
      }
    } else {
      // 📅 MODO GLOBAL (TODOS LOS PERÍODOS)
      console.log(`\n📅 [EXPERIENCE-LEARNING-AVERAGE-VALUATION] Sincronización global (todos los períodos académicos)`);
      
      const academicPeriodsResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_PERIOD, {
        schoolId: schoolData.schoolId,
        schoolYearId: schoolData.schoolYearId,
        orderCustom: false
      });

      academicPeriodsToProcess = academicPeriodsResponse?.data?.edges || [];
      console.log(`✅ [EXPERIENCE-LEARNING-AVERAGE-VALUATION] ${academicPeriodsToProcess.length} períodos académicos encontrados para sincronización global`);
    }

    if (academicPeriodsToProcess.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-AVERAGE-VALUATION] No se encontraron períodos académicos para sincronizar`);
      return { entity: 'EXPERIENCE_LEARNING_AVERAGE_VALUATION', online: 0 };
    }

    // 🎯 PASO 2: DEFINIR TODOS LOS TIPOS DE EXPERIENCE LEARNING
    const experienceLearningTypes = ['NORMAL', 'RECOVERY'];
    console.log(`🔄 [EXPERIENCE-LEARNING-AVERAGE-VALUATION] Tipos a sincronizar: ${experienceLearningTypes.join(', ')}`);

    // 🎯 NUEVO ENFOQUE: OBTENER CURSOS PRIMERO, LUEGO ASIGNATURAS
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`\n🏢 PASO 3.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      try {
        // 📚 PASO ALTERNATIVO: Obtener CURSOS del campus primero
        console.log(`📚 [ALTERNATIVE] Obteniendo cursos del campus ${campus.name}...`);
        
        const coursesResponse: any = await client.request(QUERY_GET_ALL_COURSE, {
          schoolId: schoolData.schoolId,
          campusId: campus.id,
          academicGradeId: null
        });

        const courses = coursesResponse?.data?.edges || [];
        console.log(`📚 Cursos encontrados en campus ${campus.name}: ${courses.length}`);

        if (courses.length === 0) {
          console.log(`⚠️ No hay cursos en Campus ${campus.name}`);
          continue;
        }

        // Para cada curso, obtener sus Academic Asignature Courses
        let allAcademicAsignatureCourses: any[] = [];
        
        for (const courseEdge of courses) {
          const course = courseEdge.node;
          console.log(`🔍 Obteniendo asignaturas del curso ${course.name || course.id}...`);
          
          try {
            const asignatureCourseResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
              orderCreated: true,
              allData: true,
              courseId: course.id  // Filtrar por courseId
            });

            const asignatureCourses = asignatureCourseResponse?.data?.edges || [];
            console.log(`   ✅ Curso ${course.name}: ${asignatureCourses.length} asignaturas`);
            
            allAcademicAsignatureCourses = allAcademicAsignatureCourses.concat(asignatureCourses);
          } catch (courseError) {
            console.warn(`⚠️ Error obteniendo asignaturas del curso ${course.id}:`, courseError);
          }
        }

        console.log(`📚 Total Academic Asignature Courses en Campus ${campus.name}: ${allAcademicAsignatureCourses.length}`);
        
        if (allAcademicAsignatureCourses.length === 0) {
          console.log(`⚠️ No hay Academic Asignature Courses en ningún curso del Campus ${campus.name}`);
          
          // PLAN B: Intentar obtener directamente sin filtro de campus
          console.log(`🔄 [PLAN B] Intentando obtener todas las asignaturas y filtrar manualmente...`);
          
          const allAsignaturesResponse: any = await client.request(QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE, {
            orderCreated: true,
            allData: true
          });

          const allAsignatures = allAsignaturesResponse?.data?.edges || [];
          console.log(`📊 Total asignaturas encontradas (sin filtro): ${allAsignatures.length}`);

          // Filtrar manualmente por los IDs de cursos del campus
          const courseIds = courses.map((c: any) => c.node.id);
          allAcademicAsignatureCourses = allAsignatures.filter((edge: any) => {
            return courseIds.includes(edge.node.courseId);
          });

          console.log(`📊 Asignaturas filtradas para campus ${campus.name}: ${allAcademicAsignatureCourses.length}`);

          if (allAcademicAsignatureCourses.length === 0) {
            console.log(`⚠️ No se encontraron asignaturas incluso después del filtro manual`);
            continue;
          }
        }

        // 🎯 PARA CADA ACADEMIC ASIGNATURE COURSE ENCONTRADA
        for (let courseIndex = 0; courseIndex < allAcademicAsignatureCourses.length; courseIndex++) {
          const academicAsignatureCourse = allAcademicAsignatureCourses[courseIndex]?.node;

          if (!academicAsignatureCourse?.id) {
            console.log(`⚠️ Academic Asignature Course ${courseIndex + 1} sin ID válido, saltando...`);
            continue;
          }

          console.log(`📚 Procesando Academic Asignature Course: ${academicAsignatureCourse.id}`);

          // 🎯 PARA CADA PERÍODO ACADÉMICO (YA FILTRADO)
          for (let periodIndex = 0; periodIndex < academicPeriodsToProcess.length; periodIndex++) {
            const academicPeriod = academicPeriodsToProcess[periodIndex]?.node;

            if (!academicPeriod?.id) {
              continue;
            }

            // 🔧 OBTENER EVALUATIVE COMPONENTS
            const evaluativeComponentsResponse: any = await client.request(QUERY_GET_ALL_EVALUATIVE_COMPONENT_SYNC_OFFLINE, {
              schoolId: schoolData.schoolId,
              schoolYearId: schoolData.schoolYearId
            });

            const evaluativeComponents = evaluativeComponentsResponse?.getAllEvaluativeComponentSyncOffline?.edges || [];
            
            if (evaluativeComponents.length === 0) {
              console.log(`⚠️ No hay Evaluative Components para procesar`);
              continue;
            }

            // 🎯 PARA CADA EVALUATIVE COMPONENT
            for (let componentIndex = 0; componentIndex < evaluativeComponents.length; componentIndex++) {
              const evaluativeComponent = evaluativeComponents[componentIndex]?.node;

              if (!evaluativeComponent?.id) {
                continue;
              }

              // 🔄 ITERAR CADA TIPO DE EXPERIENCE LEARNING
              for (const experienceLearningType of experienceLearningTypes) {
                try {
                  // Obtener count si no es sync full
                  if (!typeSyncFull) {
                    const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_AVERAGE_VALUATION, {
                      experienceLearningType: experienceLearningType,
                      studentId: null,
                      evaluativeComponentId: evaluativeComponent.id,
                      academicPeriodId: academicPeriod.id,
                      academicAsignatureCourseId: academicAsignatureCourse.id
                    });
                    const typeCount = countResult.data?.totalCount || 0;
                    totalOnline += typeCount;
                    continue;
                  }

                  // ✅ CONSULTA FINAL CON TODOS LOS PARÁMETROS OBLIGATORIOS
                  const result: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING_AVERAGE_VALUATION, {
                    experienceLearningType: experienceLearningType,
                    studentId: null,
                    evaluativeComponentId: evaluativeComponent.id,
                    academicPeriodId: academicPeriod.id,
                    academicAsignatureCourseId: academicAsignatureCourse.id
                  });

                  const experienceLearningAverageValuations = result.data?.edges || [];

                  if (experienceLearningAverageValuations.length > 0) {
                    console.log(`📖 Encontrados ${experienceLearningAverageValuations.length} registros para ${experienceLearningType}`);
                    totalOnline += experienceLearningAverageValuations.length;

                    for (let i = 0; i < experienceLearningAverageValuations.length; i++) {
                      const experienceLearningAverageValuation = experienceLearningAverageValuations[i].node;
                      const id = experienceLearningAverageValuation.id;

                      // Mostrar progreso
                      this.showProgressBar(
                        insertedCount + updatedCount + 1,
                        totalOnline,
                        `${campus.name} - ${academicPeriod.name} - ${experienceLearningType}`
                      );

                      // Eliminar campos que no se deben insertar directamente
                      delete experienceLearningAverageValuation.id;
                      delete experienceLearningAverageValuation.school;
                      delete experienceLearningAverageValuation.campus;
                      delete experienceLearningAverageValuation.academicAsignatureCourse;
                      delete experienceLearningAverageValuation.student;
                      delete experienceLearningAverageValuation.evaluativeComponent;
                      delete experienceLearningAverageValuation.performanceLevel;
                      delete experienceLearningAverageValuation.academicPeriod;

                      if (experienceLearningAverageValuation.performanceLevelId) {
                        experienceLearningAverageValuation.performanceLevelId = new ObjectId(experienceLearningAverageValuation.performanceLevelId);
                      }

                      const existing = await this.repositoryExperienceLearningAverageValuation.findOneBy(id);

                      if (!existing) {
                        await this.repositoryExperienceLearningAverageValuation.save({
                          _id: new ObjectId(id),
                          ...experienceLearningAverageValuation,
                        });
                        insertedCount++;
                      } else {
                        await this.repositoryExperienceLearningAverageValuation.update(
                          { id }, 
                          experienceLearningAverageValuation
                        );
                        updatedCount++;
                      }
                    }
                  }

                } catch (typeError) {
                      // Silenciar error si no hay datos
                    const errorMessage = typeError instanceof Error ? typeError.message : String(typeError);
                    if (!errorMessage?.includes('Cannot read properties')) {
                    console.warn(`⚠️ Error procesando combinación: ${errorMessage}`);
                  }
                }
              }
            }
          }
        }

      } catch (campusError) {
        console.error(`❌ Error procesando Campus ${campus.id}:`, campusError);
      }
    }

    console.log(`\n📖 [EXPERIENCE-LEARNING-AVERAGE-VALUATION] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);
    console.log(`📊 Total registros procesados: ${totalOnline}`);
    console.log(`🎯 Filtros aplicados:`);
    console.log(`   - Sede: ${schoolData.campusId ? `${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global (todas las sedes)'}`);
    console.log(`   - Período: ${schoolData.academicPeriodId ? `${academicPeriodsToProcess[0]?.node?.name || schoolData.academicPeriodId}` : 'Global (todos los períodos)'}`);

    return {
      entity: 'EXPERIENCE_LEARNING_AVERAGE_VALUATION',
      online: totalOnline,
    };
  } catch (error) {
    console.error('❌ [SYNC-EXPERIENCE-LEARNING-AVERAGE-VALUATION] Error:', error);
    return {
      entity: 'EXPERIENCE_LEARNING_AVERAGE_VALUATION',
      online: 0,
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE FORUM INTERACTION
 */
  async syncForumInteraction(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
    try {
      console.log('📖 [SYNC-FORUM-INTERACTION] Iniciando sincronización...');

      let totalOnline = 0;
      let insertedCount = 0;
      let updatedCount = 0;

      // 🎯 PASO 1: OBTENER TODOS LOS FOROS PRIMERO (PARA EXTRAER forumIds)
      console.log(`📖 [SYNC-FORUM-INTERACTION] Obteniendo todos los foros del colegio...`);

      const forumsResponse: any = await client.request(QUERY_GET_ALL_FORUM, {
        schoolId: schoolData.schoolId
      });

      const forums = forumsResponse?.data?.edges || [];
      console.log(`📖 [SYNC-FORUM-INTERACTION] Encontrados ${forums.length} foros`);

      if (forums.length === 0) {
        console.log('⚠️ No hay foros para obtener sus interacciones');
        return { entity: 'FORUM_INTERACTION', online: 0 };
      }

      // 🎯 PASO 2: PARA CADA FORO, OBTENER SUS FORUM INTERACTIONS
      for (let forumIndex = 0; forumIndex < forums.length; forumIndex++) {
        const forum = forums[forumIndex]?.node;

        if (!forum?.id) {
          console.log(`⚠️ Foro ${forumIndex + 1} sin ID válido, saltando...`);
          continue;
        }

        console.log(`📖 PASO 2.${forumIndex + 1}: Procesando Foro: ${forum.name || forum.id}`);

        try {
          // Obtener count si no es sync full
          if (!typeSyncFull) {
            const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_FORUM_INTERACTION, {
              forumId: forum.id // ✅ Solo parámetro obligatorio
            });
            const forumCount = countResult.data?.totalCount || 0;
            totalOnline += forumCount;
            console.log(`📊 Foro ${forum.name || forum.id}: ${forumCount} interacciones`);
            continue; // Solo conteo
          }

          // ✅ CONSULTA SIN PARÁMETROS ADICIONALES
          const result: any = await client.request(QUERY_GET_ALL_FORUM_INTERACTION, {
            forumId: forum.id // ✅ Solo parámetro obligatorio
          });

          const forumInteractions = result.data?.edges || [];
          console.log(`📖 [SYNC-FORUM-INTERACTION] Foro ${forum.name || forum.id}: ${forumInteractions.length} interacciones...`);

          totalOnline += forumInteractions.length;

          // 🎯 PASO 3: SINCRONIZAR CADA FORUM INTERACTION
          for (let i = 0; i < forumInteractions.length; i++) {
            const forumInteraction = forumInteractions[i].node;
            const id = forumInteraction.id;

            // Mostrar progreso
            this.showProgressBar(
              insertedCount + updatedCount + 1,
              totalOnline,
              `ForumInteraction - ${forum.name || forum.id}`
            );

            // Eliminar campos que no se deben insertar directamente
            delete forumInteraction.id;
            delete forumInteraction.school;
            delete forumInteraction.campus;
            delete forumInteraction.forumQuestion;
            delete forumInteraction.schoolYear;

            const existing = await this.repositoryForumInteraction.findOneBy(id);

            if (!existing) {
              // Crear nuevo
              await this.repositoryForumInteraction.save({
                _id: new ObjectId(id),
                ...forumInteraction,
              });
              insertedCount++;
            } else {
              // Actualizar existente
              await this.repositoryForumInteraction.update({ id }, forumInteraction);
              updatedCount++;
            }
          }

        } catch (forumError) {
          console.error(`❌ Error procesando Foro ${forum.id}:`, forumError);
        }
      }

      console.log(`📖 [SYNC-FORUM-INTERACTION] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);

      return {
        entity: 'FORUM_INTERACTION',
        online: totalOnline,
      };
    } catch (error) {
      console.error('❌ [SYNC-FORUM-INTERACTION] Error:', error);
      return {
        entity: 'FORUM_INTERACTION',
        online: 0,
      };
    }
  }

  /**
 * 📖 SINCRONIZACIÓN DE EXPERIENCE LEARNING CO EVALUATION
 */
async syncExperienceLearningCoEvaluation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📖 [SYNC-EXPERIENCE-LEARNING-CO-EVALUATION] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [EXPERIENCE-LEARNING-CO-EVALUATION] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [EXPERIENCE-LEARNING-CO-EVALUATION] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [EXPERIENCE-LEARNING-CO-EVALUATION] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId,
          orderCreated: true,
          allData: true
        });

        // Filtrar solo el campus específico
        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [EXPERIENCE-LEARNING-CO-EVALUATION] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [EXPERIENCE-LEARNING-CO-EVALUATION] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'EXPERIENCE_LEARNING_CO_EVALUATION', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [EXPERIENCE-LEARNING-CO-EVALUATION] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'EXPERIENCE_LEARNING_CO_EVALUATION',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES)
      console.log(`\n🌐 [EXPERIENCE-LEARNING-CO-EVALUATION] Sincronización global (todas las sedes)`);
      
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      campusesToProcess = campusResponse?.data?.edges || [];
      console.log(`✅ [EXPERIENCE-LEARNING-CO-EVALUATION] ${campusesToProcess.length} sedes encontradas para sincronización global`);
    }

    if (campusesToProcess.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-CO-EVALUATION] No se encontraron sedes para sincronizar`);
      return { entity: 'EXPERIENCE_LEARNING_CO_EVALUATION', online: 0 };
    }

    // 🎯 PASO 2: DEFINIR TODOS LOS TIPOS DE EXPERIENCE LEARNING
    const experienceLearningTypes = ['NORMAL', 'RECOVERY'];
    console.log(`🔄 [EXPERIENCE-LEARNING-CO-EVALUATION] Tipos a procesar: ${experienceLearningTypes.join(', ')}`);

    // Array para almacenar todas las experiencias de aprendizaje
    let allExperienceLearnings: any[] = [];

    // 🎯 PASO 3: PARA CADA CAMPUS SELECCIONADO Y CADA TIPO, OBTENER EXPERIENCE LEARNINGS
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`🏢 PASO 3.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      // 🔄 PASO 4: ITERAR CADA TIPO DE EXPERIENCE LEARNING
      for (const experienceLearningType of experienceLearningTypes) {
        console.log(`📋 [EXPERIENCE-LEARNING-CO-EVALUATION] Procesando tipo: ${experienceLearningType} en Campus: ${campus.name}`);

        try {
          // ✅ OBTENER EXPERIENCE LEARNINGS DEL CAMPUS Y TIPO SELECCIONADO
          // 🔧 IMPORTANTE: No usar academicPeriodId en esta consulta inicial
          const experienceLearningResponse: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING, {
            campusId: campus.id,
            experienceLearningType: experienceLearningType,
            academicAsignatureCourseId: null,
            academicPeriodId: null  // ✅ Mantener null para obtener todas
          }).catch((error) => {
            // Si hay error pero también datos, extraer los datos
            if (error.response?.data?.data) {
              console.warn(`⚠️ [EXPERIENCE-LEARNING-CO-EVALUATION] Advertencia en consulta (pero con datos): ${error.response.errors?.length || 0} errores`);
              return { data: error.response.data.data };
            }
            throw error;
          });

          const experienceLearnings = experienceLearningResponse?.data?.edges || [];
          console.log(`📊 Experience Learnings obtenidas (${experienceLearningType}): ${experienceLearnings.length}`);

          // Agregar al array principal
          allExperienceLearnings = allExperienceLearnings.concat(experienceLearnings);

        } catch (error) {
          console.error(`❌ Error obteniendo Experience Learning tipo ${experienceLearningType} en Campus ${campus.id}:`, error);
        }
      }
    }

    console.log(`📖 [EXPERIENCE-LEARNING-CO-EVALUATION] Total Experience Learnings encontradas: ${allExperienceLearnings.length}`);

    if (allExperienceLearnings.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-CO-EVALUATION] No se encontraron Experience Learnings en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}`);
      return { entity: 'EXPERIENCE_LEARNING_CO_EVALUATION', online: 0 };
    }

    // 🎯 PASO 5: PARA CADA EXPERIENCE LEARNING, OBTENER SUS CO-EVALUACIONES
    for (let expIndex = 0; expIndex < allExperienceLearnings.length; expIndex++) {
      const experienceLearning = allExperienceLearnings[expIndex]?.node;

      if (!experienceLearning?.id) {
        console.log(`⚠️ Experience Learning ${expIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`📖 PASO 5.${expIndex + 1}: Procesando Experience Learning: ${experienceLearning.title || experienceLearning.id}`);

      try {
        // Obtener count si no es sync full
        if (!typeSyncFull) {
          const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_CO_EVALUATION, {
            experienceLearningId: experienceLearning.id, // ✅ Parámetro obligatorio
            coEvaluatorId: null,
            studentId: null
          }).catch((error) => {
            console.warn(`⚠️ Error obteniendo conteo para Experience Learning ${experienceLearning.id}`);
            return { data: { totalCount: 0 } };
          });
          
          const coEvaluationCount = countResult.data?.totalCount || 0;
          totalOnline += coEvaluationCount;
          console.log(`📊 Experience Learning ${experienceLearning.title || experienceLearning.id}: ${coEvaluationCount} co-evaluaciones`);
          continue; // Solo conteo
        }

        // ✅ CONSULTA CON PARÁMETRO OBLIGATORIO experienceLearningId
        const result: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING_CO_EVALUATION, {
          experienceLearningId: experienceLearning.id, // ✅ Parámetro obligatorio
          coEvaluatorId: null, // Opcional
          studentId: null // Opcional
        }).catch((error) => {
          console.warn(`⚠️ Error obteniendo co-evaluaciones para Experience Learning ${experienceLearning.id}`);
          return { data: { edges: [] } };
        });

        const coEvaluations = result.data?.edges || [];
        console.log(`📖 [EXPERIENCE-LEARNING-CO-EVALUATION] Experience Learning ${experienceLearning.title || experienceLearning.id}: ${coEvaluations.length} co-evaluaciones...`);

        totalOnline += coEvaluations.length;

        // 🎯 PASO 6: SINCRONIZAR CADA CO-EVALUACIÓN
        for (let i = 0; i < coEvaluations.length; i++) {
          const coEvaluation = coEvaluations[i].node;
          const id = coEvaluation.id;

          // Mostrar progreso CON INFORMACIÓN DE FILTRO
          this.showProgressBar(
            insertedCount + updatedCount + 1,
            totalOnline,
            `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global'} - CoEvaluation - ${experienceLearning.title || experienceLearning.id}`
          );

          // Eliminar campos que no se deben insertar directamente
          delete coEvaluation.id;
          delete coEvaluation.school;
          delete coEvaluation.campus;
          delete coEvaluation.experienceLearning;
          delete coEvaluation.coEvaluator;
          delete coEvaluation.student;
          delete coEvaluation.performanceLevel;

          try {
            const existing = await this.repositoryExperienceLearningCoEvaluation.findOneBy(id);

            if (!existing) {
              // Crear nuevo
              await this.repositoryExperienceLearningCoEvaluation.save({
                _id: new ObjectId(id),
                ...coEvaluation,
              });
              insertedCount++;
            } else {
              // Actualizar existente
              await this.repositoryExperienceLearningCoEvaluation.update({ id }, coEvaluation);
              updatedCount++;
            }
          } catch (saveError) {
            console.warn(`⚠️ Error guardando co-evaluación ${id}:`, saveError);
          }
        }

      } catch (experienceError) {
        console.error(`❌ Error procesando Experience Learning ${experienceLearning.id}:`, experienceError);
      }
    }

    console.log(`📖 [EXPERIENCE-LEARNING-CO-EVALUATION] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);
    console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
    console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
    console.log(`📚 Experience Learnings procesadas: ${allExperienceLearnings.length}`);

    return {
      entity: 'EXPERIENCE_LEARNING_CO_EVALUATION',
      online: totalOnline,
    };
  } catch (error) {
    console.error('❌ [SYNC-EXPERIENCE-LEARNING-CO-EVALUATION] Error:', error);
    return {
      entity: 'EXPERIENCE_LEARNING_CO_EVALUATION',
      online: 0,
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE EXPERIENCE LEARNING CO EVALUATION VALUATION
 */
async syncExperienceLearningCoEvaluationValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📖 [SYNC-EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId,
          orderCreated: true,
          allData: true
        });

        // Filtrar solo el campus específico
        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES)
      console.log(`\n🌐 [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Sincronización global (todas las sedes)`);
      
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      campusesToProcess = campusResponse?.data?.edges || [];
      console.log(`✅ [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] ${campusesToProcess.length} sedes encontradas para sincronización global`);
    }

    if (campusesToProcess.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] No se encontraron sedes para sincronizar`);
      return { entity: 'EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION', online: 0 };
    }

    // 🎯 PASO 2: DEFINIR TODOS LOS TIPOS DE EXPERIENCE LEARNING
    const experienceLearningTypes = ['NORMAL', 'RECOVERY'];
    console.log(`🔄 [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Tipos a procesar: ${experienceLearningTypes.join(', ')}`);

    // Array para almacenar todas las experiencias de aprendizaje
    let allExperienceLearnings: any[] = [];

    // 🎯 PASO 3: PARA CADA CAMPUS SELECCIONADO Y CADA TIPO, OBTENER EXPERIENCE LEARNINGS
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`🏢 PASO 3.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      // 🔄 PASO 4: ITERAR CADA TIPO DE EXPERIENCE LEARNING
      for (const experienceLearningType of experienceLearningTypes) {
        console.log(`📋 [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Procesando tipo: ${experienceLearningType} en Campus: ${campus.name}`);

        try {
          // ✅ IMPORTANTE: NO usar academicPeriodId en esta consulta para evitar errores
          // El filtro por período se puede hacer después si es necesario
          const experienceLearningResponse: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING, {
            campusId: campus.id,
            experienceLearningType: experienceLearningType,
            academicAsignatureCourseId: null,
            academicPeriodId: null  // ✅ Mantener null para evitar errores
          }).catch((error) => {
            // Si hay error pero también datos, extraer los datos
            if (error.response?.data?.data) {
              console.warn(`⚠️ [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Advertencia en consulta (pero con datos): ${error.response.errors?.length || 0} errores`);
              return { data: error.response.data.data };
            }
            throw error;
          });

          const experienceLearnings = experienceLearningResponse?.data?.edges || [];
          console.log(`📊 Experience Learnings obtenidas (${experienceLearningType}): ${experienceLearnings.length}`);

          // Si hay un filtro de período académico, aplicarlo después de obtener los datos
          if (schoolData.academicPeriodId) {
            const filteredExperienceLearnings = experienceLearnings.filter((edge: any) => 
              edge.node.academicPeriodId === schoolData.academicPeriodId
            );
            console.log(`📅 Filtradas por período ${schoolData.academicPeriodId}: ${filteredExperienceLearnings.length} de ${experienceLearnings.length}`);
            allExperienceLearnings = allExperienceLearnings.concat(filteredExperienceLearnings);
          } else {
            // Agregar todas sin filtro
            allExperienceLearnings = allExperienceLearnings.concat(experienceLearnings);
          }

        } catch (error) {
          console.error(`❌ Error obteniendo Experience Learning tipo ${experienceLearningType} en Campus ${campus.id}:`, error);
        }
      }
    }

    console.log(`📖 [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Total Experience Learnings encontradas: ${allExperienceLearnings.length}`);

    if (allExperienceLearnings.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] No se encontraron Experience Learnings en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}`);
      return { entity: 'EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION', online: 0 };
    }

    // 🎯 PASO 5: PARA CADA EXPERIENCE LEARNING, OBTENER SUS CO-EVALUATION VALUATIONS
    for (let expIndex = 0; expIndex < allExperienceLearnings.length; expIndex++) {
      const experienceLearning = allExperienceLearnings[expIndex]?.node;

      if (!experienceLearning?.id) {
        console.log(`⚠️ Experience Learning ${expIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`📖 PASO 5.${expIndex + 1}: Procesando Experience Learning: ${experienceLearning.title || experienceLearning.id}`);

      try {
        // Obtener count si no es sync full
        if (!typeSyncFull) {
          const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION, {
            experienceLearningId: experienceLearning.id, // ✅ Parámetro obligatorio
            studentId: null // Opcional
          }).catch((error) => {
            console.warn(`⚠️ Error obteniendo conteo para Experience Learning ${experienceLearning.id}`);
            return { data: { totalCount: 0 } };
          });
          
          const valuationCount = countResult.data?.totalCount || 0;
          totalOnline += valuationCount;
          console.log(`📊 Experience Learning ${experienceLearning.title || experienceLearning.id}: ${valuationCount} valoraciones de co-evaluación`);
          continue; // Solo conteo
        }

        // ✅ CONSULTA CON PARÁMETRO OBLIGATORIO experienceLearningId
        const result: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION, {
          experienceLearningId: experienceLearning.id, // ✅ Parámetro obligatorio
          studentId: null // Opcional
        }).catch((error) => {
          console.warn(`⚠️ Error obteniendo co-evaluation valuations para Experience Learning ${experienceLearning.id}`);
          return { data: { edges: [] } };
        });

        const coEvaluationValuations = result.data?.edges || [];
        console.log(`📖 [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Experience Learning ${experienceLearning.title || experienceLearning.id}: ${coEvaluationValuations.length} valoraciones de co-evaluación...`);

        totalOnline += coEvaluationValuations.length;

        // 🎯 PASO 6: SINCRONIZAR CADA CO-EVALUATION VALUATION
        for (let i = 0; i < coEvaluationValuations.length; i++) {
          const coEvaluationValuation = coEvaluationValuations[i].node;
          const id = coEvaluationValuation.id;

          // Mostrar progreso CON INFORMACIÓN DE FILTRO
          this.showProgressBar(
            insertedCount + updatedCount + 1,
            totalOnline,
            `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global'} - CoEvaluationValuation - ${experienceLearning.title || experienceLearning.id}`
          );

          // Eliminar campos que no se deben insertar directamente
          delete coEvaluationValuation.id;
          delete coEvaluationValuation.school;
          delete coEvaluationValuation.campus;
          delete coEvaluationValuation.experienceLearning;
          delete coEvaluationValuation.student;
          delete coEvaluationValuation.performanceLevel;
          delete coEvaluationValuation.coEvaluator;

          try {
            const existing = await this.repositoryExperienceLearningCoEvaluationValuation.findOneBy(id);

            if (!existing) {
              // Crear nuevo
              await this.repositoryExperienceLearningCoEvaluationValuation.save({
                _id: new ObjectId(id),
                ...coEvaluationValuation,
              });
              insertedCount++;
            } else {
              // Actualizar existente
              await this.repositoryExperienceLearningCoEvaluationValuation.update({ id }, coEvaluationValuation);
              updatedCount++;
            }
          } catch (saveError) {
            console.warn(`⚠️ Error guardando co-evaluation valuation ${id}:`, saveError);
          }
        }

      } catch (experienceError) {
        console.error(`❌ Error procesando Experience Learning ${experienceLearning.id}:`, experienceError);
      }
    }

    console.log(`📖 [EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);
    console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
    console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
    console.log(`📚 Experience Learnings procesadas: ${allExperienceLearnings.length}`);

    return {
      entity: 'EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION',
      online: totalOnline,
    };
  } catch (error) {
    console.error('❌ [SYNC-EXPERIENCE-LEARNING-CO-EVALUATION-VALUATION] Error:', error);
    return {
      entity: 'EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION',
      online: 0,
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE EXPERIENCE LEARNING RUBRIC CRITERIA
 */
async syncExperienceLearningRubricCriteria(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📖 [SYNC-EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId,
          orderCreated: true,
          allData: true
        });

        // Filtrar solo el campus específico
        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES)
      console.log(`\n🌐 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Sincronización global (todas las sedes)`);
      
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      campusesToProcess = campusResponse?.data?.edges || [];
      console.log(`✅ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] ${campusesToProcess.length} sedes encontradas para sincronización global`);
    }

    if (campusesToProcess.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] No se encontraron sedes para sincronizar`);
      return { entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA', online: 0 };
    }

    // 📅 VERIFICAR SI HAY FILTRO POR PERÍODO ACADÉMICO
    if (schoolData.academicPeriodId) {
      console.log(`📅 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Aplicando filtro por período académico: ${schoolData.academicPeriodId}`);
    } else {
      console.log(`📅 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Sin filtro de período académico (sincronizando todos los períodos)`);
    }

    // 🎯 PASO 2: DEFINIR TODOS LOS TIPOS DE EXPERIENCE LEARNING
    const experienceLearningTypes = ['NORMAL', 'RECOVERY'];
    console.log(`🔄 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Tipos a procesar: ${experienceLearningTypes.join(', ')}`);

    // Array para almacenar todas las experiencias de aprendizaje
    let allExperienceLearnings: any[] = [];

    // 🎯 PASO 3: PARA CADA CAMPUS SELECCIONADO Y CADA TIPO, OBTENER EXPERIENCE LEARNINGS
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`🏢 PASO 3.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      // 🔄 PASO 4: ITERAR CADA TIPO DE EXPERIENCE LEARNING
      for (const experienceLearningType of experienceLearningTypes) {
        console.log(`📋 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Procesando tipo: ${experienceLearningType} en Campus: ${campus.name}`);
        
        // Mostrar si hay filtro de período académico
        if (schoolData.academicPeriodId) {
          console.log(`   📅 Filtrando por período académico: ${schoolData.academicPeriodId}`);
        }

        try {
          // ✅ OBTENER EXPERIENCE LEARNINGS DEL CAMPUS Y TIPO SELECCIONADO
          // AHORA INCLUIMOS EL FILTRO DE PERÍODO ACADÉMICO SI EXISTE
          const experienceLearningResponse: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING, {
            campusId: campus.id,
            experienceLearningType: experienceLearningType,
            academicAsignatureCourseId: null,
            academicPeriodId: schoolData.academicPeriodId || null // 🎯 APLICAR FILTRO DE PERÍODO SI EXISTE
          });

          const experienceLearnings = experienceLearningResponse?.data?.edges || [];
          console.log(`📊 Experience Learnings obtenidas (${experienceLearningType})${schoolData.academicPeriodId ? ` para período ${schoolData.academicPeriodId}` : ''}: ${experienceLearnings.length}`);

          // Agregar al array principal
          allExperienceLearnings = allExperienceLearnings.concat(experienceLearnings);

        } catch (error) {
          console.error(`❌ Error obteniendo Experience Learning tipo ${experienceLearningType} en Campus ${campus.id}:`, error);
        }
      }
    }

    console.log(`📖 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Total Experience Learnings encontradas${schoolData.academicPeriodId ? ` para el período ${schoolData.academicPeriodId}` : ''}: ${allExperienceLearnings.length}`);

    if (allExperienceLearnings.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] No se encontraron Experience Learnings en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}${schoolData.academicPeriodId ? ` para el período ${schoolData.academicPeriodId}` : ''}`);
      return { entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA', online: 0 };
    }

    // 🎯 PASO 5: PARA CADA EXPERIENCE LEARNING, OBTENER SUS RUBRIC CRITERIA
    for (let expIndex = 0; expIndex < allExperienceLearnings.length; expIndex++) {
      const experienceLearning = allExperienceLearnings[expIndex]?.node;

      if (!experienceLearning?.id) {
        console.log(`⚠️ Experience Learning ${expIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`📖 PASO 5.${expIndex + 1}: Procesando Experience Learning: ${experienceLearning.title || experienceLearning.id}${experienceLearning.academicPeriodId ? ` (Período: ${experienceLearning.academicPeriodId})` : ''}`);

      try {
        // Obtener count si no es sync full
        if (!typeSyncFull) {
          const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_RUBRIC_CRITERIA, {
            experienceLearningId: experienceLearning.id // ✅ Parámetro obligatorio
          });
          const criteriaCount = countResult.data?.totalCount || 0;
          totalOnline += criteriaCount;
          console.log(`📊 Experience Learning ${experienceLearning.title || experienceLearning.id}: ${criteriaCount} criterios de rúbrica`);
          continue; // Solo conteo
        }

        // ✅ CONSULTA CON PARÁMETRO OBLIGATORIO experienceLearningId
        const result: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING_RUBRIC_CRITERIA, {
          experienceLearningId: experienceLearning.id // ✅ Parámetro obligatorio
        });

        const rubricCriteria = result.data?.edges || [];
        console.log(`📖 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Experience Learning ${experienceLearning.title || experienceLearning.id}: ${rubricCriteria.length} criterios de rúbrica...`);

        totalOnline += rubricCriteria.length;

        // 🎯 PASO 6: SINCRONIZAR CADA RUBRIC CRITERIA
        for (let i = 0; i < rubricCriteria.length; i++) {
          const rubricCriterion = rubricCriteria[i].node;
          const id = rubricCriterion.id;

          // Mostrar progreso CON INFORMACIÓN DE FILTRO MEJORADA
          this.showProgressBar(
            insertedCount + updatedCount + 1,
            totalOnline,
            `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global'}${schoolData.academicPeriodId ? ` - Período: ${schoolData.academicPeriodId}` : ''} - RubricCriteria - ${experienceLearning.title || experienceLearning.id}`
          );

          // Eliminar campos que no se deben insertar directamente
          delete rubricCriterion.id;
          delete rubricCriterion.school;
          delete rubricCriterion.campus;
          delete rubricCriterion.experienceLearning;
          delete rubricCriterion.evidenceLearnig;
          delete rubricCriterion.experienceLearningRubricCriteriaPerformanceLevel;

          const existing = await this.repositoryExperienceLearningRubricCriteria.findOneBy(id);

          if (!existing) {
            // Crear nuevo
            await this.repositoryExperienceLearningRubricCriteria.save({
              _id: new ObjectId(id),
              ...rubricCriterion,
            });
            insertedCount++;
          } else {
            // Actualizar existente
            await this.repositoryExperienceLearningRubricCriteria.update({ id }, rubricCriterion);
            updatedCount++;
          }
        }

      } catch (experienceError) {
        console.error(`❌ Error procesando Experience Learning ${experienceLearning.id}:`, experienceError);
      }
    }

    console.log(`\n📖 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA] ✅ Completado: ${insertedCount} creados, ${updatedCount} actualizados`);
    console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
    console.log(`📅 Período académico: ${schoolData.academicPeriodId ? `Específico (${schoolData.academicPeriodId})` : 'Todos los períodos'}`);
    console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
    console.log(`📚 Experience Learnings procesadas: ${allExperienceLearnings.length}`);

    return {
      entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA',
      online: totalOnline,
    };
  } catch (error) {
    console.error('❌ [SYNC-EXPERIENCE-LEARNING-RUBRIC-CRITERIA] Error:', error);
    return {
      entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA',
      online: 0,
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE EXPERIENCE LEARNING RUBRIC VALUATION
 */
async syncExperienceLearningRubricValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📖 [SYNC-EXPERIENCE-LEARNING-RUBRIC-VALUATION] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId,
          orderCreated: true,
          allData: true
        });

        // Filtrar solo el campus específico
        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [EXPERIENCE-LEARNING-RUBRIC-VALUATION] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'EXPERIENCE_LEARNING_RUBRIC_VALUATION', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'EXPERIENCE_LEARNING_RUBRIC_VALUATION',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES)
      console.log(`\n🌐 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Sincronización global (todas las sedes)`);
      
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      campusesToProcess = campusResponse?.data?.edges || [];
      console.log(`✅ [EXPERIENCE-LEARNING-RUBRIC-VALUATION] ${campusesToProcess.length} sedes encontradas para sincronización global`);
    }

    if (campusesToProcess.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-RUBRIC-VALUATION] No se encontraron sedes para sincronizar`);
      return { entity: 'EXPERIENCE_LEARNING_RUBRIC_VALUATION', online: 0 };
    }

    // 📅 VERIFICAR SI HAY FILTRO POR PERÍODO ACADÉMICO
    if (schoolData.academicPeriodId) {
      console.log(`📅 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Aplicando filtro por período académico: ${schoolData.academicPeriodId}`);
    } else {
      console.log(`📅 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Sin filtro de período académico (sincronizando todos los períodos)`);
    }

    // 🎯 PASO 2: DEFINIR TODOS LOS TIPOS DE EXPERIENCE LEARNING
    const experienceLearningTypes = ['NORMAL', 'RECOVERY'];
    console.log(`🔄 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Tipos a procesar: ${experienceLearningTypes.join(', ')}`);

    // Array para almacenar todas las experiencias de aprendizaje
    let allExperienceLearnings: any[] = [];

    // 🎯 PASO 3: PARA CADA CAMPUS SELECCIONADO Y CADA TIPO, OBTENER EXPERIENCE LEARNINGS
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`🏢 PASO 3.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      // 🔄 PASO 4: ITERAR CADA TIPO DE EXPERIENCE LEARNING
      for (const experienceLearningType of experienceLearningTypes) {
        console.log(`📋 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Procesando tipo: ${experienceLearningType} en Campus: ${campus.name}`);
        
        // Mostrar si hay filtro de período académico
        if (schoolData.academicPeriodId) {
          console.log(`   📅 Filtrando por período: ${schoolData.academicPeriodId}`);
        }

        try {
          // ✅ OBTENER EXPERIENCE LEARNINGS DEL CAMPUS Y TIPO SELECCIONADO
          // APLICANDO FILTRO DE PERÍODO SI EXISTE
          const experienceLearningResponse: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING, {
            campusId: campus.id,
            experienceLearningType: experienceLearningType,
            academicAsignatureCourseId: null,
            academicPeriodId: schoolData.academicPeriodId || null // ✅ APLICAR FILTRO DE PERÍODO SI EXISTE
          });

          const experienceLearnings = experienceLearningResponse?.data?.edges || [];
          console.log(`📊 Experience Learnings obtenidas (${experienceLearningType}${schoolData.academicPeriodId ? ` - Período ${schoolData.academicPeriodId}` : ''}): ${experienceLearnings.length}`);

          // Agregar al array principal
          allExperienceLearnings = allExperienceLearnings.concat(experienceLearnings);

        } catch (error) {
          console.error(`❌ Error obteniendo Experience Learning tipo ${experienceLearningType} en Campus ${campus.id}${schoolData.academicPeriodId ? ` para período ${schoolData.academicPeriodId}` : ''}:`, error);
        }
      }
    }

    console.log(`📖 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Total Experience Learnings encontradas${schoolData.academicPeriodId ? ` para el período ${schoolData.academicPeriodId}` : ''}: ${allExperienceLearnings.length}`);

    if (allExperienceLearnings.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-RUBRIC-VALUATION] No se encontraron Experience Learnings en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}${schoolData.academicPeriodId ? ` para el período ${schoolData.academicPeriodId}` : ''}`);
      return { entity: 'EXPERIENCE_LEARNING_RUBRIC_VALUATION', online: 0 };
    }

    // 🎯 PASO 5: PARA CADA EXPERIENCE LEARNING, OBTENER SUS RUBRIC VALUATIONS
    for (let expIndex = 0; expIndex < allExperienceLearnings.length; expIndex++) {
      const experienceLearning = allExperienceLearnings[expIndex]?.node;

      if (!experienceLearning?.id) {
        console.log(`⚠️ Experience Learning ${expIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`📖 PASO 5.${expIndex + 1}: Procesando Experience Learning: ${experienceLearning.title || experienceLearning.id}${experienceLearning.academicPeriodId ? ` (Período: ${experienceLearning.academicPeriodId})` : ''}`);

      try {
        // Obtener count si no es sync full
        if (!typeSyncFull) {
          const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_RUBRIC_VALUATION, {
            experienceLearningId: experienceLearning.id // ✅ Parámetro obligatorio
          });
          const rubricValuationCount = countResult.data?.totalCount || 0;
          totalOnline += rubricValuationCount;
          console.log(`📊 Experience Learning ${experienceLearning.title || experienceLearning.id}: ${rubricValuationCount} valoraciones de rúbrica`);
          continue; // Solo conteo
        }

        // ✅ CONSULTA CON PARÁMETRO OBLIGATORIO experienceLearningId
        const result: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING_RUBRIC_VALUATION, {
          experienceLearningId: experienceLearning.id // ✅ Parámetro obligatorio
        });

        const rubricValuations = result.data?.edges || [];
        console.log(`📖 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] Experience Learning ${experienceLearning.title || experienceLearning.id}: ${rubricValuations.length} valoraciones de rúbrica...`);

        totalOnline += rubricValuations.length;

        // 🎯 PASO 6: SINCRONIZAR CADA RUBRIC VALUATION
        for (let i = 0; i < rubricValuations.length; i++) {
          const rubricValuation = rubricValuations[i].node;
          const id = rubricValuation.id;

          // Mostrar progreso CON INFORMACIÓN DE FILTRO
          this.showProgressBar(
            insertedCount + updatedCount + 1,
            totalOnline,
            `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global'} - ${schoolData.academicPeriodId ? `Período: ${schoolData.academicPeriodId}` : 'Todos'} - Rubric Valuation`
          );

          // Eliminar campos que no se deben insertar directamente
          delete rubricValuation.id;
          delete rubricValuation.school;
          delete rubricValuation.campus;
          delete rubricValuation.experienceLearning;
          delete rubricValuation.student;
          delete rubricValuation.performanceLevel;

          if (rubricValuation.performanceLevelId) {
            rubricValuation.performanceLevelId = new ObjectId(rubricValuation.performanceLevelId);
          }

          const existing = await this.repositoryExperienceLearningRubricValuation.findOneBy(id);

          if (!existing) {
            // Crear nuevo
            await this.repositoryExperienceLearningRubricValuation.save({
              _id: new ObjectId(id),
              ...rubricValuation,
            });
            insertedCount++;
          } else {
            // Actualizar existente
            await this.repositoryExperienceLearningRubricValuation.update({ id }, rubricValuation);
            updatedCount++;
          }
        }

      } catch (experienceError) {
        console.error(`❌ Error procesando Experience Learning ${experienceLearning.id}:`, experienceError);
      }
    }

    console.log(`\n📖 [EXPERIENCE-LEARNING-RUBRIC-VALUATION] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);
    console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
    console.log(`📅 Período académico: ${schoolData.academicPeriodId ? `Específico (${schoolData.academicPeriodId})` : 'Todos los períodos'}`);
    console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
    console.log(`📚 Experience Learnings procesadas: ${allExperienceLearnings.length}`);

    return {
      entity: 'EXPERIENCE_LEARNING_RUBRIC_VALUATION',
      online: totalOnline,
    };
  } catch (error) {
    console.error('❌ [SYNC-EXPERIENCE-LEARNING-RUBRIC-VALUATION] Error:', error);
    return {
      entity: 'EXPERIENCE_LEARNING_RUBRIC_VALUATION',
      online: 0,
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE EXPERIENCE LEARNING SELF ASSESSMENT VALUATION
 */
async syncExperienceLearningSelfAssessmentValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📖 [SYNC-EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId,
          orderCreated: true,
          allData: true
        });

        // Filtrar solo el campus específico
        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES)
      console.log(`\n🌐 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Sincronización global (todas las sedes)`);
      
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      campusesToProcess = campusResponse?.data?.edges || [];
      console.log(`✅ [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] ${campusesToProcess.length} sedes encontradas para sincronización global`);
    }

    if (campusesToProcess.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] No se encontraron sedes para sincronizar`);
      return { entity: 'EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION', online: 0 };
    }

    // 📅 VERIFICAR SI HAY FILTRO POR PERÍODO ACADÉMICO
    if (schoolData.academicPeriodId) {
      console.log(`📅 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Aplicando filtro por período académico: ${schoolData.academicPeriodId}`);
    } else {
      console.log(`📅 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Sin filtro de período académico (sincronizando todos los períodos)`);
    }

    // 🎯 PASO 2: DEFINIR TODOS LOS TIPOS DE EXPERIENCE LEARNING
    const experienceLearningTypes = ['NORMAL', 'RECOVERY'];
    console.log(`🔄 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Tipos a procesar: ${experienceLearningTypes.join(', ')}`);

    // Array para almacenar todas las experiencias de aprendizaje
    let allExperienceLearnings: any[] = [];

    // 🎯 PASO 3: PARA CADA CAMPUS SELECCIONADO Y CADA TIPO, OBTENER EXPERIENCE LEARNINGS
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`🏢 PASO 3.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      // 🔄 PASO 4: ITERAR CADA TIPO DE EXPERIENCE LEARNING
      for (const experienceLearningType of experienceLearningTypes) {
        console.log(`📋 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Procesando tipo: ${experienceLearningType} en Campus: ${campus.name}`);
        
        // Mostrar si hay filtro de período académico
        if (schoolData.academicPeriodId) {
          console.log(`📅 Filtrando por período académico: ${schoolData.academicPeriodId}`);
        }

        try {
          // ✅ OBTENER EXPERIENCE LEARNINGS DEL CAMPUS Y TIPO SELECCIONADO
          // AHORA CON FILTRO DE PERÍODO ACADÉMICO SI EXISTE
          const experienceLearningResponse: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING, {
            campusId: campus.id,
            experienceLearningType: experienceLearningType,
            academicAsignatureCourseId: null,
            academicPeriodId: schoolData.academicPeriodId || null // ✅ APLICAR FILTRO DE PERÍODO SI EXISTE
          });

          const experienceLearnings = experienceLearningResponse?.data?.edges || [];
          console.log(`📊 Experience Learnings obtenidas (${experienceLearningType})${schoolData.academicPeriodId ? ` para período ${schoolData.academicPeriodId}` : ''}: ${experienceLearnings.length}`);

          // Agregar al array principal
          allExperienceLearnings = allExperienceLearnings.concat(experienceLearnings);

        } catch (error) {
          console.error(`❌ Error obteniendo Experience Learning tipo ${experienceLearningType} en Campus ${campus.id}:`, error);
        }
      }
    }

    console.log(`📖 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Total Experience Learnings encontradas${schoolData.academicPeriodId ? ` para el período ${schoolData.academicPeriodId}` : ''}: ${allExperienceLearnings.length}`);

    if (allExperienceLearnings.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] No se encontraron Experience Learnings en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}${schoolData.academicPeriodId ? ` para el período ${schoolData.academicPeriodId}` : ''}`);
      return { entity: 'EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION', online: 0 };
    }

    // 🎯 PASO 5: PARA CADA EXPERIENCE LEARNING, OBTENER SUS SELF ASSESSMENT VALUATIONS
    for (let expIndex = 0; expIndex < allExperienceLearnings.length; expIndex++) {
      const experienceLearning = allExperienceLearnings[expIndex]?.node;

      if (!experienceLearning?.id) {
        console.log(`⚠️ Experience Learning ${expIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`📖 PASO 5.${expIndex + 1}: Procesando Experience Learning: ${experienceLearning.title || experienceLearning.id}${experienceLearning.academicPeriodId ? ` (Período: ${experienceLearning.academicPeriodId})` : ''}`);

      try {
        // Obtener count si no es sync full
        if (!typeSyncFull) {
          const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION, {
            experienceLearningId: experienceLearning.id, // ✅ Parámetro obligatorio
            studentId: null // Opcional
          });
          const selfAssessmentCount = countResult.data?.totalCount || 0;
          totalOnline += selfAssessmentCount;
          console.log(`📊 Experience Learning ${experienceLearning.title || experienceLearning.id}: ${selfAssessmentCount} autoevaluaciones`);
          continue; // Solo conteo
        }

        // ✅ CONSULTA CON PARÁMETRO OBLIGATORIO experienceLearningId
        const result: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION, {
          experienceLearningId: experienceLearning.id, // ✅ Parámetro obligatorio
          studentId: null // Opcional
        });

        const selfAssessmentValuations = result.data?.edges || [];
        console.log(`📖 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Experience Learning ${experienceLearning.title || experienceLearning.id}: ${selfAssessmentValuations.length} autoevaluaciones...`);

        totalOnline += selfAssessmentValuations.length;

        // 🎯 PASO 6: SINCRONIZAR CADA SELF ASSESSMENT VALUATION
        for (let i = 0; i < selfAssessmentValuations.length; i++) {
          const selfAssessmentValuation = selfAssessmentValuations[i].node;
          const id = selfAssessmentValuation.id;

          // Mostrar progreso CON INFORMACIÓN DE FILTRO
          this.showProgressBar(
            insertedCount + updatedCount + 1,
            totalOnline,
            `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global'} - SelfAssessment - ${experienceLearning.title || experienceLearning.id}`
          );

          // Eliminar campos que no se deben insertar directamente
          delete selfAssessmentValuation.id;
          delete selfAssessmentValuation.school;
          delete selfAssessmentValuation.campus;
          delete selfAssessmentValuation.experienceLearning;
          delete selfAssessmentValuation.student;
          delete selfAssessmentValuation.performanceLevel;

          const existing = await this.repositoryExperienceLearningSelfAssessmentValuation.findOneBy(id);

          if (!existing) {
            // Crear nuevo
            await this.repositoryExperienceLearningSelfAssessmentValuation.save({
              _id: new ObjectId(id),
              ...selfAssessmentValuation,
            });
            insertedCount++;
          } else {
            // Actualizar existente
            await this.repositoryExperienceLearningSelfAssessmentValuation.update({ id }, selfAssessmentValuation);
            updatedCount++;
          }
        }

      } catch (experienceError) {
        console.error(`❌ Error procesando Experience Learning ${experienceLearning.id}:`, experienceError);
      }
    }

    console.log(`\n📖 [EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);
    console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
    console.log(`📅 Período académico: ${schoolData.academicPeriodId ? `Específico (${schoolData.academicPeriodId})` : 'Todos los períodos'}`);
    console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
    console.log(`📚 Experience Learnings procesadas: ${allExperienceLearnings.length}`);

    return {
      entity: 'EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION',
      online: totalOnline,
    };
  } catch (error) {
    console.error('❌ [SYNC-EXPERIENCE-LEARNING-SELF-ASSESSMENT-VALUATION] Error:', error);
    return {
      entity: 'EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION',
      online: 0,
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE EXPERIENCE LEARNING TRADITIONAL VALUATION
 */
async syncExperienceLearningTraditionalValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📖 [SYNC-EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId,
          orderCreated: true,
          allData: true
        });

        // Filtrar solo el campus específico
        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'EXPERIENCE_LEARNING_TRADITIONAL_VALUATION', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'EXPERIENCE_LEARNING_TRADITIONAL_VALUATION',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES)
      console.log(`\n🌐 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Sincronización global (todas las sedes)`);
      
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      campusesToProcess = campusResponse?.data?.edges || [];
      console.log(`✅ [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] ${campusesToProcess.length} sedes encontradas para sincronización global`);
    }

    if (campusesToProcess.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] No se encontraron sedes para sincronizar`);
      return { entity: 'EXPERIENCE_LEARNING_TRADITIONAL_VALUATION', online: 0 };
    }

    // 📅 VERIFICAR SI HAY FILTRO POR PERÍODO ACADÉMICO
    if (schoolData.academicPeriodId) {
      console.log(`📅 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Aplicando filtro por período académico: ${schoolData.academicPeriodId}`);
    } else {
      console.log(`📅 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Sin filtro de período académico (sincronizando todos los períodos)`);
    }

    // 🎯 PASO 2: DEFINIR TODOS LOS TIPOS DE EXPERIENCE LEARNING
    const experienceLearningTypes = ['NORMAL', 'RECOVERY'];
    console.log(`🔄 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Tipos a procesar: ${experienceLearningTypes.join(', ')}`);

    // Array para almacenar todas las experiencias de aprendizaje
    let allExperienceLearnings: any[] = [];

    // 🎯 PASO 3: PARA CADA CAMPUS SELECCIONADO Y CADA TIPO, OBTENER EXPERIENCE LEARNINGS
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`🏢 PASO 3.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      // 🔄 PASO 4: ITERAR CADA TIPO DE EXPERIENCE LEARNING
      for (const experienceLearningType of experienceLearningTypes) {
        console.log(`📋 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Procesando tipo: ${experienceLearningType} en Campus: ${campus.name}`);
        
        // Mostrar si hay filtro de período académico
        if (schoolData.academicPeriodId) {
          console.log(`   📅 Filtrando por período: ${schoolData.academicPeriodId}`);
        }

        try {
          // ✅ OBTENER EXPERIENCE LEARNINGS DEL CAMPUS Y TIPO SELECCIONADO
          // APLICANDO FILTRO DE PERÍODO SI EXISTE
          const experienceLearningResponse: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING, {
            campusId: campus.id,
            experienceLearningType: experienceLearningType,
            academicAsignatureCourseId: null,
            academicPeriodId: schoolData.academicPeriodId || null // ✅ APLICAR FILTRO DE PERÍODO SI EXISTE
          });

          const experienceLearnings = experienceLearningResponse?.data?.edges || [];
          console.log(`📊 Experience Learnings obtenidas (${experienceLearningType}${schoolData.academicPeriodId ? ` - Período ${schoolData.academicPeriodId}` : ''}): ${experienceLearnings.length}`);

          // Agregar al array principal
          allExperienceLearnings = allExperienceLearnings.concat(experienceLearnings);

        } catch (error) {
          console.error(`❌ Error obteniendo Experience Learning tipo ${experienceLearningType} en Campus ${campus.id}${schoolData.academicPeriodId ? ` para período ${schoolData.academicPeriodId}` : ''}:`, error);
        }
      }
    }

    console.log(`📖 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Total Experience Learnings encontradas${schoolData.academicPeriodId ? ` para el período ${schoolData.academicPeriodId}` : ''}: ${allExperienceLearnings.length}`);

    if (allExperienceLearnings.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] No se encontraron Experience Learnings en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}${schoolData.academicPeriodId ? ` para el período ${schoolData.academicPeriodId}` : ''}`);
      return { entity: 'EXPERIENCE_LEARNING_TRADITIONAL_VALUATION', online: 0 };
    }

    // 🎯 PASO 5: PARA CADA EXPERIENCE LEARNING, OBTENER SUS TRADITIONAL VALUATIONS
    for (let expIndex = 0; expIndex < allExperienceLearnings.length; expIndex++) {
      const experienceLearning = allExperienceLearnings[expIndex]?.node;

      if (!experienceLearning?.id) {
        console.log(`⚠️ Experience Learning ${expIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`📖 PASO 5.${expIndex + 1}: Procesando Experience Learning: ${experienceLearning.title || experienceLearning.id}${experienceLearning.academicPeriodId ? ` (Período: ${experienceLearning.academicPeriodId})` : ''}`);

      try {
        // Obtener count si no es sync full
        if (!typeSyncFull) {
          const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_TRADITIONAL_VALUATION, {
            experienceLearningId: experienceLearning.id, // ✅ Parámetro obligatorio
            studentId: null // Opcional
          });
          const traditionalValuationCount = countResult.data?.totalCount || 0;
          totalOnline += traditionalValuationCount;
          console.log(`📊 Experience Learning ${experienceLearning.title || experienceLearning.id}: ${traditionalValuationCount} valoraciones tradicionales`);
          continue; // Solo conteo
        }

        // ✅ CONSULTA CON PARÁMETRO OBLIGATORIO experienceLearningId
        const result: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING_TRADITIONAL_VALUATION, {
          experienceLearningId: experienceLearning.id, // ✅ Parámetro obligatorio
          studentId: null // Opcional
        });

        const traditionalValuations = result.data?.edges || [];
        console.log(`📖 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Experience Learning ${experienceLearning.title || experienceLearning.id}: ${traditionalValuations.length} valoraciones tradicionales...`);

        totalOnline += traditionalValuations.length;

        // 🎯 PASO 6: SINCRONIZAR CADA TRADITIONAL VALUATION
        for (let i = 0; i < traditionalValuations.length; i++) {
          const traditionalValuation = traditionalValuations[i].node;
          const id = traditionalValuation.id;

          // Mostrar progreso CON INFORMACIÓN DE FILTRO
          this.showProgressBar(
            insertedCount + updatedCount + 1,
            totalOnline,
            `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global'} - ${schoolData.academicPeriodId ? `Período: ${schoolData.academicPeriodId}` : 'Todos'} - Traditional Valuation`
          );

          // Eliminar campos que no se deben insertar directamente
          delete traditionalValuation.id;
          delete traditionalValuation.school;
          delete traditionalValuation.campus;
          delete traditionalValuation.experienceLearning;
          delete traditionalValuation.student;
          delete traditionalValuation.performanceLevel;

          const existing = await this.repositoryExperienceLearningTraditionalValuation.findOneBy(id);

          if (!existing) {
            // Crear nuevo
            await this.repositoryExperienceLearningTraditionalValuation.save({
              _id: new ObjectId(id),
              ...traditionalValuation,
            });
            insertedCount++;
          } else {
            // Actualizar existente
            await this.repositoryExperienceLearningTraditionalValuation.update({ id }, traditionalValuation);
            updatedCount++;
          }
        }

      } catch (experienceError) {
        console.error(`❌ Error procesando Experience Learning ${experienceLearning.id}:`, experienceError);
      }
    }

    console.log(`\n📖 [EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);
    console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
    console.log(`📅 Período académico: ${schoolData.academicPeriodId ? `Específico (${schoolData.academicPeriodId})` : 'Todos los períodos'}`);
    console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
    console.log(`📚 Experience Learnings procesadas: ${allExperienceLearnings.length}`);

    return {
      entity: 'EXPERIENCE_LEARNING_TRADITIONAL_VALUATION',
      online: totalOnline,
    };
  } catch (error) {
    console.error('❌ [SYNC-EXPERIENCE-LEARNING-TRADITIONAL-VALUATION] Error:', error);
    return {
      entity: 'EXPERIENCE_LEARNING_TRADITIONAL_VALUATION',
      online: 0,
    };
  }
}

  /**
 * 📖 SINCRONIZACIÓN DE EXPERIENCE LEARNING RUBRIC CRITERIA VALUATION
 */
async syncExperienceLearningRubricCriteriaValuation(typeSyncFull: boolean, client: GraphQLClient, schoolData: any) {
  try {
    console.log('📖 [SYNC-EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Iniciando sincronización...');

    let totalOnline = 0;
    let insertedCount = 0;
    let updatedCount = 0;

    console.log(`\n🎯 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] ⚡ MÓDULO INICIANDO...`);
    console.log(`📊 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Parámetros: schoolId=${schoolData.schoolId}, campusId=${schoolData.campusId || 'TODOS'}, academicPeriodId=${schoolData.academicPeriodId || 'TODOS'}`);

    // 🎯 VERIFICAR SI HAY FILTRO POR CAMPUS ESPECÍFICO
    let campusesToProcess: any[] = [];

    if (schoolData.campusId) {
      // 🏫 MODO FILTRADO POR SEDE ESPECÍFICA
      console.log(`\n🏫 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Obteniendo información de la sede específica: ${schoolData.campusId}`);
      
      try {
        const specificCampusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
          schoolId: schoolData.schoolId,
          orderCreated: true,
          allData: true
        });

        // Filtrar solo el campus específico
        const allCampuses = specificCampusResponse?.data?.edges || [];
        const specificCampus = allCampuses.find((edge: any) => edge.node.id === schoolData.campusId);

        if (specificCampus) {
          campusesToProcess = [specificCampus];
          console.log(`✅ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Sede encontrada: ${specificCampus.node.name} (${schoolData.campusId})`);
        } else {
          console.log(`⚪ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] No se encontró la sede especificada: ${schoolData.campusId}`);
          return { entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION', online: 0 };
        }
      } catch (campusError) {
        console.error(`❌ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Error obteniendo sede específica:`, campusError);
        return {
          entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION',
          online: 0,
          error: 'Error obteniendo sede específica'
        };
      }
    } else {
      // 🌐 MODO GLOBAL (TODAS LAS SEDES)
      console.log(`\n🌐 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Sincronización global (todas las sedes)`);
      
      const campusResponse: any = await client.request(QUERY_GET_ALL_CAMPUS, {
        schoolId: schoolData.schoolId,
        orderCreated: true,
        allData: true
      });

      campusesToProcess = campusResponse?.data?.edges || [];
      console.log(`✅ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] ${campusesToProcess.length} sedes encontradas para sincronización global`);
    }

    if (campusesToProcess.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] No se encontraron sedes para sincronizar`);
      return { entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION', online: 0 };
    }

    // 📅 VERIFICAR SI HAY FILTRO POR PERÍODO ACADÉMICO
    if (schoolData.academicPeriodId) {
      console.log(`📅 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Aplicando filtro por período académico: ${schoolData.academicPeriodId}`);
    } else {
      console.log(`📅 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Sin filtro de período académico (sincronizando todos los períodos)`);
    }

    // 🎯 PASO 2: DEFINIR TODOS LOS TIPOS DE EXPERIENCE LEARNING
    const experienceLearningTypes = ['NORMAL', 'RECOVERY'];
    console.log(`🔄 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Tipos a procesar: ${experienceLearningTypes.join(', ')}`);

    // Array para almacenar todas las experiencias de aprendizaje
    let allExperienceLearnings: any[] = [];

    // 🎯 PASO 3: PARA CADA CAMPUS SELECCIONADO Y CADA TIPO, OBTENER EXPERIENCE LEARNINGS
    for (let campusIndex = 0; campusIndex < campusesToProcess.length; campusIndex++) {
      const campus = campusesToProcess[campusIndex]?.node;

      if (!campus?.id) {
        console.log(`⚠️ Campus ${campusIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`🏢 PASO 3.${campusIndex + 1}: Procesando Campus: ${campus.name} (${campus.id})`);

      // 🔄 PASO 4: ITERAR CADA TIPO DE EXPERIENCE LEARNING
      for (const experienceLearningType of experienceLearningTypes) {
        console.log(`📋 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Procesando tipo: ${experienceLearningType} en Campus: ${campus.name}`);

        try {
          // ✅ OBTENER EXPERIENCE LEARNINGS DEL CAMPUS Y TIPO SELECCIONADO
          // Ahora también filtrar por academicPeriodId si está presente
          const experienceLearningResponse: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING, {
            campusId: campus.id,
            experienceLearningType: experienceLearningType,
            academicAsignatureCourseId: null,
            academicPeriodId: schoolData.academicPeriodId || null // 📅 NUEVO: Filtro por período
          });

          const experienceLearnings = experienceLearningResponse?.data?.edges || [];
          console.log(`📊 Experience Learnings obtenidas (${experienceLearningType})${schoolData.academicPeriodId ? ` para período ${schoolData.academicPeriodId}` : ''}: ${experienceLearnings.length}`);

          // Agregar al array principal
          allExperienceLearnings = allExperienceLearnings.concat(experienceLearnings);

        } catch (error) {
          console.error(`❌ Error obteniendo Experience Learning tipo ${experienceLearningType} en Campus ${campus.id}:`, error);
        }
      }
    }

    console.log(`📖 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Total Experience Learnings encontradas${schoolData.academicPeriodId ? ` para el período ${schoolData.academicPeriodId}` : ''}: ${allExperienceLearnings.length}`);

    if (allExperienceLearnings.length === 0) {
      console.log(`⚠️ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] No se encontraron Experience Learnings en ${schoolData.campusId ? 'la sede especificada' : 'ninguna sede'}${schoolData.academicPeriodId ? ` para el período ${schoolData.academicPeriodId}` : ''}`);
      return { entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION', online: 0 };
    }

    // 🎯 PASO 5: PARA CADA EXPERIENCE LEARNING, OBTENER SUS RUBRIC CRITERIA
    for (let expIndex = 0; expIndex < allExperienceLearnings.length; expIndex++) {
      const experienceLearning = allExperienceLearnings[expIndex]?.node;

      if (!experienceLearning?.id) {
        console.log(`⚠️ Experience Learning ${expIndex + 1} sin ID válido, saltando...`);
        continue;
      }

      console.log(`📖 PASO 5.${expIndex + 1}: Procesando Experience Learning: ${experienceLearning.title || experienceLearning.id}${experienceLearning.academicPeriodId ? ` (Período: ${experienceLearning.academicPeriodId})` : ''}`);

      try {
        // ✅ OBTENER RUBRIC CRITERIA PARA ESTA EXPERIENCE LEARNING
        const rubricCriteriaResult: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING_RUBRIC_CRITERIA, {
          experienceLearningId: experienceLearning.id // ✅ Parámetro obligatorio
        });

        const rubricCriteria = rubricCriteriaResult.data?.edges || [];
        console.log(`📖 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Experience Learning ${experienceLearning.title || experienceLearning.id}: ${rubricCriteria.length} criterios de rúbrica encontrados`);

        // 🎯 PASO 6: PARA CADA RUBRIC CRITERIA, OBTENER SUS CRITERIA VALUATIONS
        for (let criteriaIndex = 0; criteriaIndex < rubricCriteria.length; criteriaIndex++) {
          const rubricCriterion = rubricCriteria[criteriaIndex]?.node;

          if (!rubricCriterion?.id) {
            console.log(`⚠️ Rubric Criteria ${criteriaIndex + 1} sin ID válido, saltando...`);
            continue;
          }

          console.log(`📖 PASO 6.${criteriaIndex + 1}: Procesando Rubric Criteria: ${rubricCriterion.id}`);

          try {
            // Obtener count si no es sync full
            if (!typeSyncFull) {
              const countResult: any = await client.request(QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION, {
                experienceLearningRubricCriteriaId: rubricCriterion.id, // ✅ Parámetro obligatorio
                studentId: null // Opcional
              });
              const criteriaValuationCount = countResult.data?.totalCount || 0;
              totalOnline += criteriaValuationCount;
              console.log(`📊 Rubric Criteria ${rubricCriterion.id}: ${criteriaValuationCount} valoraciones de criterio`);
              continue; // Solo conteo
            }

            // ✅ CONSULTA CON PARÁMETRO OBLIGATORIO experienceLearningRubricCriteriaId
            const result: any = await client.request(QUERY_GET_ALL_EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION, {
              experienceLearningRubricCriteriaId: rubricCriterion.id, // ✅ Parámetro obligatorio
              studentId: null // Opcional
            });

            const criteriaValuations = result.data?.edges || [];
            console.log(`📖 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Rubric Criteria ${rubricCriterion.id}: ${criteriaValuations.length} valoraciones de criterio...`);

            totalOnline += criteriaValuations.length;

            // 🎯 PASO 7: SINCRONIZAR CADA CRITERIA VALUATION
            for (let i = 0; i < criteriaValuations.length; i++) {
              const criteriaValuation = criteriaValuations[i].node;
              const id = criteriaValuation.id;

              // Mostrar progreso CON INFORMACIÓN DE FILTRO
              this.showProgressBar(
                insertedCount + updatedCount + 1,
                totalOnline,
                `${schoolData.campusId ? `Sede: ${campusesToProcess[0]?.node?.name || schoolData.campusId}` : 'Global'} - CriteriaValuation - ${experienceLearning.title || experienceLearning.id} - Criteria ${rubricCriterion.id}`
              );

              // Eliminar campos que no se deben insertar directamente
              delete criteriaValuation.id;
              delete criteriaValuation.school;
              delete criteriaValuation.campus;
              delete criteriaValuation.experienceLearning;
              delete criteriaValuation.student;
              delete criteriaValuation.performanceLevel;
              delete criteriaValuation.experienceLearningRubricCriteria;

              const existing = await this.repositoryExperienceLearningRubricCriteriaValuation.findOneBy(id);

              if (!existing) {
                // Crear nuevo
                await this.repositoryExperienceLearningRubricCriteriaValuation.save({
                  _id: new ObjectId(id),
                  ...criteriaValuation,
                });
                insertedCount++;
              } else {
                // Actualizar existente
                await this.repositoryExperienceLearningRubricCriteriaValuation.update({ id }, criteriaValuation);
                updatedCount++;
              }
            }

          } catch (criteriaError) {
            console.error(`❌ Error procesando Rubric Criteria ${rubricCriterion.id}:`, criteriaError);
          }
        }

      } catch (experienceError) {
        console.error(`❌ Error procesando Experience Learning ${experienceLearning.id}:`, experienceError);
      }
    }

    console.log(`\n📖 [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] ✅ Completado: ${insertedCount} creadas, ${updatedCount} actualizadas`);
    console.log(`🎯 Filtro aplicado: ${schoolData.campusId ? `Sede ${campusesToProcess[0]?.node?.name || schoolData.campusId} (${schoolData.campusId})` : 'Global (todas las sedes)'}`);
    console.log(`📅 Período académico: ${schoolData.academicPeriodId ? `Específico (${schoolData.academicPeriodId})` : 'Todos los períodos'}`);
    console.log(`🏢 Sedes procesadas: ${campusesToProcess.length}`);
    console.log(`📚 Experience Learnings procesadas: ${allExperienceLearnings.length}`);

    return {
      entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION',
      online: totalOnline,
    };
  } catch (error) {
    console.error('❌ [EXPERIENCE-LEARNING-RUBRIC-CRITERIA-VALUATION] Error:', error);
    return {
      entity: 'EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION',
      online: 0,
    };
  }
}

}