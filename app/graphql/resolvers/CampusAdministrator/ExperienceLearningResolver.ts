import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { AcademicAreaCoursePeriodValuationRepository, AcademicAreaRepository, AcademicAsignatureCoursePeriodValuationRepository, AcademicAsignatureCourseRepository, AcademicAsignatureRepository, AcademicGradeRepository, AcademicPeriodRepository, AverageAcademicPeriodCourseRepository, AverageAcademicPeriodStudentRepository, CampusRepository, CourseRepository, EvaluativeComponentRepository, EvidenceLearningRepository, ExperienceLearningAverageValuationRepository, ExperienceLearningCoEvaluationRepository, ExperienceLearningCoEvaluationValuationRepository, ExperienceLearningRepository, ExperienceLearningRubricCriteriaRepository, ExperienceLearningRubricCriteriaValuationRepository, ExperienceLearningRubricValuationRepository, ExperienceLearningSelfAssessmentValuationRepository, ExperienceLearningTraditionalValuationRepository, LearningRepository, PerformanceLevelRepository, SchoolRepository, UserRepository } from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { ExperienceLearningType } from '../../enums/ExperienceLearningType';
import { ExperienceType } from '../../enums/ExperienceType';
import { PerformanceLevelType } from '../../enums/PerformanceLevelType';
import { ValuationType } from '../../enums/ValuationType';
import { NewExperienceLearning } from '../../inputs/CampusAdministrator/NewExperienceLearning';
import { IContext } from '../../interfaces/IContext';
import { AcademicAreaCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAreaCoursePeriodValuation';
import { AcademicAsignatureCourse } from '../../models/CampusAdministrator/AcademicAsignatureCourse';
import { AcademicAsignatureCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAsignatureCoursePeriodValuation';
import { AverageAcademicPeriodCourse } from '../../models/CampusAdministrator/AverageAcademicPeriodCourse';
import { AverageAcademicPeriodStudent } from '../../models/CampusAdministrator/AverageAcademicPeriodStudent';
import { Course } from '../../models/CampusAdministrator/Course';
import { ExperienceLearning, ExperienceLearningConnection } from '../../models/CampusAdministrator/ExperienceLearning';
import { ExperienceLearningAverageValuation } from '../../models/CampusAdministrator/ExperienceLearningAverageValuation';
import { ExperienceLearningCoEvaluation } from '../../models/CampusAdministrator/ExperienceLearningCoEvaluation';
import { ExperienceLearningCoEvaluationValuation } from '../../models/CampusAdministrator/ExperienceLearningCoEvaluationValuation';
import { ExperienceLearningRubricCriteria } from '../../models/CampusAdministrator/ExperienceLearningRubricCriteria';
import { ExperienceLearningRubricCriteriaValuation } from '../../models/CampusAdministrator/ExperienceLearningRubricCriteriaValuation';
import { ExperienceLearningRubricValuation } from '../../models/CampusAdministrator/ExperienceLearningRubricValuation';
import { ExperienceLearningSelfAssessmentValuation } from '../../models/CampusAdministrator/ExperienceLearningSelfAssessmentValuation';
import { ExperienceLearningTraditionalValuation } from '../../models/CampusAdministrator/ExperienceLearningTraditionalValuation';
import { ExperienceLearningValuation } from '../../models/CampusAdministrator/ExperienceLearningValuation';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicArea } from '../../models/SchoolAdministrator/AcademicArea';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../../models/SchoolAdministrator/AcademicGrade';
import { AcademicPeriod } from '../../models/SchoolAdministrator/AcademicPeriod';
import { EvaluativeComponent } from '../../models/SchoolAdministrator/EvaluativeComponent';
import { EvidenceLearning } from '../../models/SchoolAdministrator/EvidenceLearning';
import { Learning } from '../../models/SchoolAdministrator/Learning';
import { PerformanceLevel } from '../../models/SchoolAdministrator/PerformanceLevel';
import { ConnectionArgs } from '../../pagination/relaySpecs';
import { PerformanceLevelResolver } from '../SchoolAdministrator/PerformanceLevelResolver';

@Resolver(ExperienceLearning)
export class ExperienceLearningResolver {
  @InjectRepository(ExperienceLearning)
  private repository = ExperienceLearningRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(Campus)
  private repositoryCampus = CampusRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(Learning)
  private repositoryLearning = LearningRepository;

  @InjectRepository(EvidenceLearning)
  private repositoryEvidenceLearning = EvidenceLearningRepository;

  @InjectRepository(AcademicAsignatureCourse)
  private repositoryAcademicAsignatureCourse = AcademicAsignatureCourseRepository;

  @InjectRepository(AcademicPeriod)
  private repositoryAcademicPeriod = AcademicPeriodRepository;

  @InjectRepository(EvaluativeComponent)
  private repositoryEvaluativeComponent = EvaluativeComponentRepository;

  @InjectRepository(Course)
  private repositoryCourse = CourseRepository;

  @InjectRepository(AcademicGrade)
  private repositoryAcademicGrade = AcademicGradeRepository;

  @InjectRepository(ExperienceLearningTraditionalValuation)
  private repositoryExperienceLearningTraditionalValuation = ExperienceLearningTraditionalValuationRepository;

  @InjectRepository(ExperienceLearningSelfAssessmentValuation)
  private repositoryExperienceLearningSelfAssessmentValuation = ExperienceLearningSelfAssessmentValuationRepository;

  @InjectRepository(ExperienceLearningCoEvaluation)
  private repositoryExperienceLearningCoEvaluation = ExperienceLearningCoEvaluationRepository;

  @InjectRepository(ExperienceLearningCoEvaluationValuation)
  private repositoryExperienceLearningCoEvaluationValuation = ExperienceLearningCoEvaluationValuationRepository;

  @InjectRepository(ExperienceLearningAverageValuation)
  private repositoryExperienceLearningAverageValuation = ExperienceLearningAverageValuationRepository;

  @InjectRepository(AcademicAsignatureCoursePeriodValuation)
  private repositoryAcademicAsignatureCoursePeriodValuation = AcademicAsignatureCoursePeriodValuationRepository;

  @InjectRepository(AcademicAreaCoursePeriodValuation)
  private repositoryAcademicAreaCoursePeriodValuation = AcademicAreaCoursePeriodValuationRepository;

  @InjectRepository(ExperienceLearningRubricCriteria)
  private repositoryExperienceLearningRubricCriteria = ExperienceLearningRubricCriteriaRepository;

  @InjectRepository(ExperienceLearningRubricCriteriaValuation)
  private repositoryExperienceLearningRubricCriteriaValuation = ExperienceLearningRubricCriteriaValuationRepository;

  @InjectRepository(ExperienceLearningRubricValuation)
  private repositoryExperienceLearningRubricValuation = ExperienceLearningRubricValuationRepository;

  @InjectRepository(AcademicAsignature)
  private repositoryAcademicAsignature = AcademicAsignatureRepository;

  @InjectRepository(PerformanceLevel)
  private repositoryPerformanceLevel = PerformanceLevelRepository;

  @InjectRepository(AcademicArea)
  private repositoryAcademicArea = AcademicAreaRepository;

  @InjectRepository(AverageAcademicPeriodStudent)
  private repositoryAverageAcademicPeriodStudent = AverageAcademicPeriodStudentRepository;

  @InjectRepository(AverageAcademicPeriodCourse)
  private repositoryAverageAcademicPeriodCourse = AverageAcademicPeriodCourseRepository;

  private performanceLevelResolver = new PerformanceLevelResolver();

  @Query(() => ExperienceLearning, { nullable: true })
  async getExperienceLearning(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => ExperienceLearningConnection)
  async getAllExperienceLearning(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('campusId', () => String) campusId: String,
    @Arg('academicPeriodId', () => String, { nullable: true }) academicPeriodId: String,
    @Arg('academicAsignatureCourseId', () => String, { nullable: true })
    academicAsignatureCourseId: String
  ): Promise<ExperienceLearningConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        if (academicAsignatureCourseId && academicPeriodId) {
          result = await this.repository.findBy({
            where: {
              campusId,
              academicPeriodId,
              academicAsignatureCourseId,
              experienceLearningType,
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          if (academicAsignatureCourseId) {
            result = await this.repository.findBy({
              where: {
                academicAsignatureCourseId,
                campusId,
                experienceLearningType,
              },
              order: { createdAt: 'DESC' },
            });
          } else {
            if (academicPeriodId) {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  academicPeriodId,
                  experienceLearningType,
                },
                order: { createdAt: 'DESC' },
              });
            } else {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  experienceLearningType,
                },
                order: { createdAt: 'DESC' },
              });
            }
          }
        }
      } else {
        if (academicAsignatureCourseId && academicPeriodId) {
          result = await this.repository.findBy({
            where: {
              campusId,
              academicPeriodId,
              academicAsignatureCourseId,
              experienceLearningType,
            },
          });
        } else {
          if (academicAsignatureCourseId) {
            result = await this.repository.findBy({
              where: {
                academicAsignatureCourseId,
                campusId,
                experienceLearningType,
              },
            });
          } else {
            if (academicPeriodId) {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  academicPeriodId,
                  experienceLearningType,
                },
              });
            } else {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  experienceLearningType,
                },
              });
            }
          }
        }
      }
    } else {
      if (orderCreated) {
        if (academicAsignatureCourseId && academicPeriodId) {
          result = await this.repository.findBy({
            where: {
              campusId,
              academicPeriodId,
              academicAsignatureCourseId,
              experienceLearningType,
              active: true,
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          if (academicAsignatureCourseId) {
            result = await this.repository.findBy({
              where: {
                academicAsignatureCourseId,
                campusId,
                experienceLearningType,
                active: true,
              },
              order: { createdAt: 'DESC' },
            });
          } else {
            if (academicPeriodId) {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  academicPeriodId,
                  experienceLearningType,
                  active: true,
                },
                order: { createdAt: 'DESC' },
              });
            } else {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  experienceLearningType,
                  active: true,
                },
                order: { createdAt: 'DESC' },
              });
            }
          }
        }
      } else {
        if (academicAsignatureCourseId && academicPeriodId) {
          result = await this.repository.findBy({
            where: {
              campusId,
              academicPeriodId,
              academicAsignatureCourseId,
              experienceLearningType,
              active: true,
            },
          });
        } else {
          if (academicAsignatureCourseId) {
            result = await this.repository.findBy({
              where: {
                academicAsignatureCourseId,
                campusId,
                experienceLearningType,
                active: true,
              },
            });
          } else {
            if (academicPeriodId) {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  academicPeriodId,
                  experienceLearningType,
                  active: true,
                },
              });
            } else {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  experienceLearningType,
                  active: true,
                },
              });
            }
          }
        }
      }
    }
    let resultConn = new ExperienceLearningConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Query(() => ExperienceLearningConnection)
  async getAllExperienceLearningWhitoutCampusId(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('academicAsignatureCourseId', () => String) academicAsignatureCourseId: String,
    @Arg('academicPeriodId', () => String, { nullable: true }) academicPeriodId: String,
  ): Promise<ExperienceLearningConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        if (academicPeriodId) {
          result = await this.repository.findBy({
            where: {
              academicPeriodId,
              academicAsignatureCourseId,
              experienceLearningType,
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              academicAsignatureCourseId,
              experienceLearningType,
            },
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (academicAsignatureCourseId && academicPeriodId) {
          result = await this.repository.findBy({
            where: {
              academicPeriodId,
              academicAsignatureCourseId,
              experienceLearningType,
            },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              academicAsignatureCourseId,
              experienceLearningType,
            },
          });
        }
      }
    } else {
      if (orderCreated) {
        if (academicPeriodId) {
          result = await this.repository.findBy({
            where: {
              academicPeriodId,
              academicAsignatureCourseId,
              experienceLearningType,
              active: true,
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              academicAsignatureCourseId,
              experienceLearningType,
              active: true,
            },
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (academicPeriodId) {
          result = await this.repository.findBy({
            where: {
              academicPeriodId,
              academicAsignatureCourseId,
              experienceLearningType,
              active: true,
            },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              academicAsignatureCourseId,
              experienceLearningType,
              active: true,
            },
          });
        }
      }
    }
    let resultConn = new ExperienceLearningConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => ExperienceLearning)
  async createExperienceLearning(
    @Arg('data') data: NewExperienceLearning,
    @Ctx() context: IContext
  ): Promise<ExperienceLearning> {
    let dataProcess: NewExperienceLearning = removeEmptyStringElements(data);
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

  @Mutation(() => ExperienceLearning)
  async updateExperienceLearning(
    @Arg('data') data: NewExperienceLearning,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<ExperienceLearning | null> {
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
    if (result?.academicPeriodId && result?.academicAsignatureCourseId) {
      this.updateAllStudentAcademicAsignatureCoursePeriodValuation(result?.academicAsignatureCourseId, result?.academicPeriodId, result?.experienceLearningType ? result?.experienceLearningType : ExperienceLearningType.NORMAL)
    }
    return result;
  }

  @Mutation(() => Boolean)
  async changeActiveExperienceLearning(
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
    if (result?.academicPeriodId && result?.academicAsignatureCourseId) {
      this.updateAllStudentAcademicAsignatureCoursePeriodValuation(result?.academicAsignatureCourseId, result?.academicPeriodId, result?.experienceLearningType ? result?.experienceLearningType : ExperienceLearningType.NORMAL)
    }
    if (result.id) {
      return true;
    } else {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteExperienceLearning(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    if (data?.academicPeriodId && data?.academicAsignatureCourseId) {
      this.updateAllStudentAcademicAsignatureCoursePeriodValuation(data?.academicAsignatureCourseId, data?.academicPeriodId, data?.experienceLearningType ? data?.experienceLearningType : ExperienceLearningType.NORMAL)
    }
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @Mutation(() => Boolean)
  async createExperienceLearningTraditionalValuationStudents(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    const result = await this.repository.findOneBy(id);
    if (result) {
      const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
        result?.academicAsignatureCourseId
      );
      if (academicAsignatureCourse) {
        const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
        if (course) {
          const students = course.studentsId;
          if (students) {
            for (let student of students) {
              let experienceLearningTraditionalValuation =
                await this.repositoryExperienceLearningTraditionalValuation.findBy({
                  where: {
                    experienceLearningId: id,
                    studentId: student,
                  },
                });
              if (experienceLearningTraditionalValuation.length == 0) {
                let createdByUserId = context?.user?.authorization?.id;
                const model = await this.repositoryExperienceLearningTraditionalValuation.create({
                  experienceLearningId: id,
                  studentId: student,
                  assessment: undefined,
                  active: true,
                  version: 0,
                  createdByUserId,
                });
                let result = await this.repositoryExperienceLearningTraditionalValuation.save(
                  model
                );
              }
            }
          }
        }
      }
    }
    return true;
  }

  @Mutation(() => Boolean)
  async createExperienceLearningSelfAssessmentValuationStudents(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    const result = await this.repository.findOneBy(id);
    if (result) {
      const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
        result?.academicAsignatureCourseId
      );
      if (academicAsignatureCourse) {
        const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
        if (course) {
          const students = course.studentsId;
          if (students) {
            for (let student of students) {
              let experienceLearningSelfAssessmentValuation =
                await this.repositoryExperienceLearningSelfAssessmentValuation.findBy({
                  where: {
                    experienceLearningId: id,
                    studentId: student,
                  },
                });
              if (experienceLearningSelfAssessmentValuation.length == 0) {
                let createdByUserId = context?.user?.authorization?.id;
                const model = await this.repositoryExperienceLearningSelfAssessmentValuation.create(
                  {
                    experienceLearningId: id,
                    studentId: student,
                    assessment: undefined,
                    observations: undefined,
                    active: true,
                    version: 0,
                    createdByUserId,
                  }
                );
                let result = await this.repositoryExperienceLearningSelfAssessmentValuation.save(
                  model
                );
              }
            }
          }
        }
      }
    }
    return true;
  }

  @Mutation(() => Boolean)
  async createExperienceLearningCoEvaluationStudents(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    const result = await this.repository.findOneBy(id);
    if (result) {
      const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
        result?.academicAsignatureCourseId
      );
      if (academicAsignatureCourse) {
        const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
        if (course) {
          const coEvaluators = course.studentsId;
          if (coEvaluators) {
            for (let coEvaluator of coEvaluators) {
              const students = course.studentsId;
              if (students) {
                for (let student of students) {
                  if (coEvaluator != student) {
                    let experienceLearningCoEvaluation =
                      await this.repositoryExperienceLearningCoEvaluation.findBy({
                        where: {
                          coEvaluatorId: coEvaluator,
                          experienceLearningId: id,
                          studentId: student,
                        },
                      });
                    if (experienceLearningCoEvaluation.length == 0) {
                      let createdByUserId = context?.user?.authorization?.id;
                      const model = await this.repositoryExperienceLearningCoEvaluation.create({
                        experienceLearningId: id,
                        coEvaluatorId: coEvaluator,
                        studentId: student,
                        assessment: undefined,
                        observations: undefined,
                        active: true,
                        version: 0,
                        createdByUserId,
                      });
                      let result = await this.repositoryExperienceLearningCoEvaluation.save(model);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return true;
  }

  @Mutation(() => Boolean)
  async createExperienceLearningCoEvaluationValuationStudents(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    const result = await this.repository.findOneBy(id);
    let createdByUserId = context?.user?.authorization?.id;
    let updatedByUserId = context?.user?.authorization?.id;
    if (result) {
      const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
        result?.academicAsignatureCourseId
      );
      if (academicAsignatureCourse) {
        const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
        if (course) {
          const students = course.studentsId;
          if (students) {
            for (let student of students) {
              let experienceLearningCoEvaluationValuation =
                await this.repositoryExperienceLearningCoEvaluationValuation.findBy({
                  where: {
                    experienceLearningId: id,
                    studentId: student,
                  },
                });
              let experienceLearningCoEvaluations =
                await this.repositoryExperienceLearningCoEvaluation.findBy({
                  where: {
                    experienceLearningId: id,
                    studentId: student,
                  },
                });
              if (experienceLearningCoEvaluationValuation.length == 0) {
                if (experienceLearningCoEvaluations.length > 0) {
                  let assessment = 0;
                  let count = 0;
                  experienceLearningCoEvaluations.forEach((experienceLearningCoEvaluation) => {
                    assessment += experienceLearningCoEvaluation.assessment
                      ? experienceLearningCoEvaluation.assessment
                      : 0;
                    if (experienceLearningCoEvaluation.assessment) {
                      count++;
                    }
                  });
                  if (assessment !== 0) {
                    assessment = assessment / count;
                  }
                  const model = await this.repositoryExperienceLearningCoEvaluationValuation.create(
                    {
                      experienceLearningId: id,
                      studentId: student,
                      assessment: assessment !== 0 ? assessment : undefined,
                      active: true,
                      version: 0,
                      createdByUserId,
                    }
                  );
                  let result = await this.repositoryExperienceLearningCoEvaluationValuation.save(
                    model
                  );
                } else {
                  const model = await this.repositoryExperienceLearningCoEvaluationValuation.create(
                    {
                      experienceLearningId: id,
                      studentId: student,
                      assessment: undefined,
                      active: true,
                      version: 0,
                      createdByUserId,
                    }
                  );
                  let result = await this.repositoryExperienceLearningCoEvaluationValuation.save(
                    model
                  );
                }
              } else {
                if (experienceLearningCoEvaluations.length > 0) {
                  let assessment = 0;
                  let count = 0;
                  experienceLearningCoEvaluations.forEach((experienceLearningCoEvaluation) => {
                    assessment += experienceLearningCoEvaluation.assessment
                      ? experienceLearningCoEvaluation.assessment
                      : 0;
                    if (experienceLearningCoEvaluation.assessment) {
                      count++;
                    }
                  });
                  if (assessment !== 0) {
                    assessment = assessment / count;
                  }
                  let data = experienceLearningCoEvaluationValuation[0];
                  let result = await this.repositoryExperienceLearningCoEvaluationValuation.save({
                    _id: data.id,
                    ...data,
                    assessment: assessment !== 0 ? assessment : undefined,
                    version: (data?.version as number) + 1,
                    updatedByUserId,
                  });
                }
              }
            }
          }
        }
      }
    }
    return true;
  }

  @Mutation(() => Boolean)
  async createExperienceLearningRubricStudents(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    const result = await this.repository.findOneBy(id);
    let createdByUserId = context?.user?.authorization?.id;
    let updatedByUserId = context?.user?.authorization?.id;
    if (result) {
      const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
        result?.academicAsignatureCourseId
      );
      const experienceLearningRubricCriterias =
        await this.repositoryExperienceLearningRubricCriteria.findBy({
          where: {
            experienceLearningId: id,
          },
        });
      if (academicAsignatureCourse && experienceLearningRubricCriterias) {
        const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
        if (course) {
          const students = course.studentsId;
          if (students) {
            for (let student of students) {
              for (let experienceLearningRubricCriteria of experienceLearningRubricCriterias) {
                let experienceLearningRubricCriteriaValuation =
                  await this.repositoryExperienceLearningRubricCriteriaValuation.findBy({
                    where: {
                      experienceLearningRubricCriteriaId:
                        experienceLearningRubricCriteria.id.toString(),
                      studentId: student,
                    },
                  });
                if (experienceLearningRubricCriteriaValuation.length == 0) {
                  const model =
                    await this.repositoryExperienceLearningRubricCriteriaValuation.create({
                      experienceLearningRubricCriteriaId:
                        experienceLearningRubricCriteria.id.toString(),
                      studentId: student,
                      active: true,
                      version: 0,
                      createdByUserId,
                    });
                  let result = await this.repositoryExperienceLearningRubricCriteriaValuation.save(
                    model
                  );
                }
              }
              let experienceLearningRubricValuation =
                await this.repositoryExperienceLearningRubricValuation.findBy({
                  where: {
                    experienceLearningId: id,
                    studentId: student,
                  },
                });
              if (experienceLearningRubricValuation.length == 0) {
                const model = await this.repositoryExperienceLearningRubricValuation.create({
                  experienceLearningId: id,
                  studentId: student,
                  active: true,
                  version: 0,
                  createdByUserId,
                });
                let result = await this.repositoryExperienceLearningRubricValuation.save(model);
              }
            }
          }
        }
      }
    }
    return true;
  }

  @Query(() => [ExperienceLearningValuation], { nullable: true })
  async getValuationStudents(@Arg('id', () => String) id: string) {
    let result: ExperienceLearningValuation[] = [];
    const experienceLearning = await this.repository.findOneBy(id);
    if (experienceLearning) {
      switch (experienceLearning?.experienceType) {
        case ExperienceType.COEVALUATION:
          result = await this.repositoryExperienceLearningCoEvaluationValuation.findBy({
            where: {
              experienceLearningId: experienceLearning?.id.toString(),
            },
          });
          break;
        case ExperienceType.SELFAPPRAISAL:
          result = await this.repositoryExperienceLearningSelfAssessmentValuation.findBy({
            where: {
              experienceLearningId: experienceLearning?.id.toString(),
            },
          });
          break;
        case ExperienceType.TRADITIONALVALUATION:
          result = await this.repositoryExperienceLearningTraditionalValuation.findBy({
            where: {
              experienceLearningId: experienceLearning?.id.toString(),
            },
          });
          break;
        case ExperienceType.VALUATIONRUBRIC:
          result = await this.repositoryExperienceLearningRubricValuation.findBy({
            where: {
              experienceLearningId: experienceLearning?.id.toString(),
            },
          });
          break;
        // case ExperienceType.ONLINETEST:
        //   break;
      }
    }
    return result;
  }

  @Mutation(() => Boolean)
  async createExperienceLearningAverageValuationStudent(
    @Arg('academicAsignatureCourseId', () => String) academicAsignatureCourseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('evaluativeComponentId', () => String) evaluativeComponentId: string,
    @Arg('studentId', () => String) studentId: string,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
  ) {
    const experienceLearnings = await this.repository.findBy({
      where: {
        evaluativeComponentsId: { $in: [evaluativeComponentId] },
        academicAsignatureCourseId,
        academicPeriodId,
        experienceLearningType,
        active: true,
      },
    });
    if (experienceLearnings) {
      const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
        academicAsignatureCourseId
      );
      if (academicAsignatureCourse) {
        const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
        if (course) {
          let studentAverage: ExperienceLearningAverageValuation;
          let average = 0;
          let evaluations = [];
          let performanceLevelType: any = null;
          let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourse({}, academicAsignatureCourseId + "");
          let performanceLevelsFinal = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + "");
          let diferencesPerformanceLevels = (performanceLevels?.edges?.length - performanceLevelsFinal?.edges?.length);
          if (performanceLevels) {
            performanceLevelType = performanceLevels?.edges[0]?.node?.type;
          }
          let studentAverageList = await this.repositoryExperienceLearningAverageValuation.findBy({
            where: {
              academicAsignatureCourseId,
              academicPeriodId,
              evaluativeComponentId,
              studentId,
            },
          });
          if (studentAverageList.length > 0) {
            studentAverage = studentAverageList[0];
          } else {
            studentAverage = new ExperienceLearningAverageValuation();
            studentAverage.version = 0;
            studentAverage.active = true;
            studentAverage.studentId = studentId;
            studentAverage.average = 0;
            studentAverage.evaluativeComponentId = evaluativeComponentId;
            studentAverage.academicPeriodId = academicPeriodId;
            studentAverage.academicAsignatureCourseId = academicAsignatureCourseId;
            studentAverage.experienceLearningType = experienceLearningType;
          }
          let countExperienceLearningAssessment = 0;
          for (let experienceLearning of experienceLearnings) {
            switch (experienceLearning.experienceType) {
              case ExperienceType.COEVALUATION:
                evaluations = await this.repositoryExperienceLearningCoEvaluationValuation.findBy({
                  where: {
                    experienceLearningId: experienceLearning.id.toString(),
                    studentId,
                  },
                });
                evaluations.forEach((evaluation) => {
                  switch (performanceLevelType) {
                    case PerformanceLevelType.QUALITATIVE:
                      if (evaluation?.performanceLevelId) {
                        let performanceLevelIndex = performanceLevels?.edges?.findIndex((i: any) => i.node.id.toString() === evaluation?.performanceLevelId) + 1;
                        average += performanceLevelIndex;
                        countExperienceLearningAssessment++;
                      }
                      break;
                    case PerformanceLevelType.QUANTITATIVE:
                      if (evaluation?.assessment) {
                        average += evaluation?.assessment;
                        countExperienceLearningAssessment++;
                        break;
                      }
                  }
                });
                break;
              case ExperienceType.SELFAPPRAISAL:
                evaluations = await this.repositoryExperienceLearningSelfAssessmentValuation.findBy(
                  {
                    where: {
                      experienceLearningId: experienceLearning.id.toString(),
                      studentId,
                    },
                  }
                );
                evaluations.forEach((evaluation) => {
                  switch (performanceLevelType) {
                    case PerformanceLevelType.QUALITATIVE:
                      if (evaluation?.performanceLevelId) {
                        let performanceLevelIndex = performanceLevels?.edges?.findIndex((i: any) => i.node.id.toString() === evaluation?.performanceLevelId) + 1;
                        average += performanceLevelIndex;
                        countExperienceLearningAssessment++;
                      }
                      break;
                    case PerformanceLevelType.QUANTITATIVE:
                      if (evaluation?.assessment) {
                        average += evaluation?.assessment;
                        countExperienceLearningAssessment++;
                        break;
                      }
                  }
                });
                break;
              case ExperienceType.TRADITIONALVALUATION:
                evaluations = await this.repositoryExperienceLearningTraditionalValuation.findBy({
                  where: {
                    experienceLearningId: experienceLearning.id.toString(),
                    studentId,
                  },
                });
                evaluations.forEach((evaluation) => {
                  switch (performanceLevelType) {
                    case PerformanceLevelType.QUALITATIVE:
                      if (evaluation?.performanceLevelId) {
                        let perfomance = performanceLevels?.edges?.find((i: any) => i.node.id.toString() === evaluation?.performanceLevelId);
                        let performanceLevelIndex = performanceLevels?.edges?.findIndex((i: any) => i.node.id.toString() === evaluation?.performanceLevelId) - diferencesPerformanceLevels;
                        if (perfomance?.node?.isFinal) {
                          average += performanceLevelIndex;
                        } else {
                          average += 0;
                        }
                        countExperienceLearningAssessment++;
                      }
                      break;
                    case PerformanceLevelType.QUANTITATIVE:
                      if (evaluation?.assessment) {
                        average += evaluation?.assessment;
                        countExperienceLearningAssessment++;
                        break;
                      }
                  }
                });
                break;
              case ExperienceType.VALUATIONRUBRIC:
                evaluations = await this.repositoryExperienceLearningRubricValuation.findBy({
                  where: {
                    experienceLearningId: experienceLearning.id.toString(),
                    studentId,
                  },
                });
                evaluations.forEach((evaluation) => {
                  switch (performanceLevelType) {
                    case PerformanceLevelType.QUALITATIVE:
                      if (evaluation?.performanceLevelId) {
                        let performanceLevelIndex = performanceLevels?.edges?.findIndex((i: any) => i.node.id.toString() === evaluation?.performanceLevelId);
                        average += performanceLevelIndex;
                        countExperienceLearningAssessment++;
                      }
                      break;
                    case PerformanceLevelType.QUANTITATIVE:
                      if (evaluation?.assessment) {
                        average += evaluation?.assessment;
                        countExperienceLearningAssessment++;
                        break;
                      }
                  }
                });
                break;
              // case ExperienceType.ONLINETEST:
              //   break;
            }
          }
          performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + "");
          average = average / countExperienceLearningAssessment;
          switch (performanceLevelType) {
            case PerformanceLevelType.QUALITATIVE:
              if (average != null && average > 0 && countExperienceLearningAssessment > 0) {
                studentAverage.average = average;
                let averagePerfomanceLevel = Number(average.toFixed(0));
                //studentAverage.performanceLevelId = performanceLevels?.edges[Math.trunc(average)]?.node?.id.toString();
                studentAverage.performanceLevelId = performanceLevels?.edges[averagePerfomanceLevel]?.node?.id.toString();
              } else {
                studentAverage.average = 0;
                studentAverage.performanceLevelId = performanceLevels?.edges[0]?.node?.id.toString();
              }
              break;
            case PerformanceLevelType.QUANTITATIVE:
              studentAverage.average = average;
              if (Number.isNaN(average) || average < 0) {
                studentAverage.average = 0;
              } else {
                let performanceLevelId;
                let perf = performanceLevels?.edges?.find((c: any) => {
                  return average < c.node.topScore && average >= c.node.minimumScore;
                });
                if (perf === undefined) {
                  perf = performanceLevels?.edges?.find((c: any) => {
                    return average <= c.node.topScore && average > c.node.minimumScore;
                  });
                }
                if (perf && perf?.node?.id) {
                  performanceLevelId = perf.node.id
                }
                studentAverage.performanceLevelId = performanceLevelId;
              }
              break;
          }
          if (studentAverage.id) {
            studentAverage = await this.repositoryExperienceLearningAverageValuation.save({
              _id: new ObjectId(studentAverage.id.toString()),
              ...studentAverage,
              version: (studentAverage?.version as number) + 1,
            });
          } else {
            studentAverage = await this.repositoryExperienceLearningAverageValuation.save({
              ...studentAverage,
            });
          }
        }
      }
      return true;
    }
  }

  @Mutation(() => Boolean)
  async createExperienceLearningAverageValuationStudents(
    @Arg('academicAsignatureCourseId', () => String) academicAsignatureCourseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('evaluativeComponentId', () => String) evaluativeComponentId: string,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
  ) {
    const experienceLearnings = await this.repository.findBy({
      where: {
        evaluativeComponentsId: { $in: [evaluativeComponentId] },
        academicAsignatureCourseId,
        academicPeriodId,
        active: true,
      },
    });
    if (experienceLearnings) {
      const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
        academicAsignatureCourseId
      );
      if (academicAsignatureCourse) {
        const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
        if (course) {
          const students = course.studentsId;
          if (students) {
            for (const student of students) {
              await this.createExperienceLearningAverageValuationStudent(
                academicAsignatureCourseId,
                academicPeriodId,
                evaluativeComponentId,
                student as string,
                experienceLearningType
              );
            }
          }
          return true;
        }
      }
    }
  }

  @Mutation(() => Boolean)
  async updateAllStudentSchoolPeriodValuation(
    @Arg('schoolId', () => String) schoolId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
  ) {
    const school = await this.repositorySchool.findOneBy(schoolId);
    if (school) {
      const academicGrades = await this.repositoryAcademicGrade.findBy({ where: { schoolId: school?.id?.toString() } });
      for (let academicGrade of academicGrades) {
        let promisesList: any[] = [];
        console.log("Generando =", academicGrade?.name + " " + academicGrade?.id?.toString())
        promisesList.push(
          this.updateAllStudentGradePeriodValuation(academicGrade?.id?.toString(), academicPeriodId, experienceLearningType)
        );
        await Promise.all(promisesList).then(() => {
          return true;
        });
      }
      return true;
    }
  }

  @Mutation(() => Boolean)
  async updateAllStudentGradePeriodValuation(
    @Arg('academicGradeId', () => String) academicGradeId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
  ) {
    const academicGrade = await this.repositoryAcademicGrade.findOneBy(academicGradeId);
    if (academicGrade) {
      const courses = await this.repositoryCourse.findBy({ where: { academicGradeId: academicGrade?.id?.toString() } });
      for (let course of courses) {
        let promisesList: any[] = [];
        console.log("Generando =", course?.name + " " + course?.academicGradeId)
        promisesList.push(
          this.updateAllStudentCoursePeriodValuation(course?.id?.toString(), academicPeriodId, experienceLearningType)
        );
        await Promise.all(promisesList).then(() => {
          return true;
        });
      }
      return true;
    }
  }

  @Mutation(() => Boolean)
  async updateAllStudentCoursePeriodValuation(
    @Arg('courseId', () => String) courseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
  ) {
    const course = await this.repositoryCourse.findOneBy(courseId);
    if (course) {
      let students = course.studentsId;
      const academicAsignatureCourses = await this.repositoryAcademicAsignatureCourse.findBy({ where: { courseId: courseId, active: true } })
      let promisesList: any[] = [];
      for (let academicAsignatureCourse of academicAsignatureCourses) {
        if (academicAsignatureCourse) {
          promisesList.push(
            this.updateAllStudentAcademicAsignatureCoursePeriodValuation(academicAsignatureCourse?.id?.toString(), academicPeriodId, experienceLearningType)
          );
        }
      }
      return await Promise.all(promisesList).then(async () => {
        if (students) {
          let areasAux: any[] = []
          let asignaturesAux: any[] = []
          for (let asignatureCourse of academicAsignatureCourses) {
            let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse?.academicAsignatureId);
            let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature?.academicAreaId);
            if (academicArea !== null) {
              asignaturesAux.push(academicAsignature);
              areasAux.push(academicArea);
            }
          }
          const ids = areasAux.map(o => o.id?.toString())
          const count: any = {};
          ids.forEach(element => {
            count[element] = (count[element] || 0) + 1;
          });
          const filtered = areasAux.filter(({ id }, index) => !ids.includes(id?.toString(), index + 1))
          for (let filter of filtered) {
            filter.count = count[filter?.id];
          }
          let promisesListAreasStudent: any[] = [];
          for (let filter of filtered) {
            let asignaturesArea = asignaturesAux?.filter((itemV: any) => itemV?.academicAreaId == filter?.id);
            if (asignaturesArea?.length > 0) {
              let asignature = asignaturesArea[0];
              for (let asignatureCourse of academicAsignatureCourses) {
                for (let student of students) {
                  if (asignatureCourse?.academicAsignatureId == asignature?.id?.toString()) {
                    //console.log("uno man")
                    promisesListAreasStudent.push(
                      this.createAcademicAreaCoursePeriodValuationStudent(asignatureCourse?.id?.toString(), academicPeriodId, student + "")
                    );
                  }
                }
              }
            }
          }
          await Promise.all(promisesListAreasStudent).then(async () => {
            return true;
          });
          let promisesListStudents: any[] = [];
          for (let student of students) {
            promisesListStudents.push(
              this.createAveragePeriodValuationStudent(course?.id?.toString(), academicPeriodId, student + "")
            );
          }
          await Promise.all(promisesListStudents).then(async () => {
            return true;
          });
        }
      });
    }
  }

  //este es el que se llama cuando se actualiza una nota
  @Mutation(() => Boolean)
  async updateAllStudentAcademicAsignatureCoursePeriodValuation(
    @Arg('academicAsignatureCourseId', () => String) academicAsignatureCourseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
  ) {
    const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
      academicAsignatureCourseId
    );
    if (academicAsignatureCourse) {
      const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
      if (course) {
        let students = course.studentsId;
        let promisesListAsignatures: any[] = [];
        if (students) {
          for (let student of students) {
            promisesListAsignatures.push(
              this.createAcademicAsignatureCoursePeriodValuationStudentBulk(academicAsignatureCourseId, academicPeriodId, student + "", experienceLearningType)
            );
          }
          await Promise.all(promisesListAsignatures).then(async () => {
          });
          return true;
        }
      }
    }
  }

  @Mutation(() => Boolean)
  async createAcademicAsignatureCoursePeriodValuationStudentBulk(
    @Arg('academicAsignatureCourseId', () => String) academicAsignatureCourseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('studentId', () => String) studentId: string,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
  ) {
    let academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
      academicAsignatureCourseId
    );
    let evaluativeComponents: EvaluativeComponent[] = [];
    if (academicAsignatureCourse) {
      let course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
      let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(
        academicAsignatureCourse.academicAsignatureId
      );
      if (course && academicAsignature) {
        let campus = await this.repositoryCampus.findOneBy(course.campusId);
        if (campus) {
          evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
            where: {
              academicAsignaturesId: { $in: [academicAsignature.id.toString()] },
              academicAreasId: null,
              schoolId: campus.schoolId,
              active: true,
            },
            order: { createdAt: 'DESC' },
          });
          if (evaluativeComponents.length === 0) {
            evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
              where: {
                academicAsignaturesId: null,
                academicAreasId: { $in: [academicAsignature.academicAreaId] },
                schoolId: campus.schoolId,
                active: true,
              },
              order: { createdAt: 'DESC' },
            });
            if (evaluativeComponents.length === 0) {
              evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
                where: {
                  academicAsignaturesId: null,
                  academicAreasId: null,
                  schoolId: campus.schoolId,
                  active: true,
                },
                order: { createdAt: 'DESC' },
              });
            }
          }
        }
      }
    }
    if (academicAsignatureCourse) {
      const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
      if (course) {
        let studentPeriodValuation: AcademicAsignatureCoursePeriodValuation;
        let average = 0;
        let perf = null;
        let performanceLevelId = undefined;
        let studentPeriodValuationList =
          await this.repositoryAcademicAsignatureCoursePeriodValuation.findBy({
            where: {
              academicAsignatureCourseId,
              academicPeriodId,
              studentId,
              experienceLearningType
            },
          });
        let countDefinitive = 0;
        let countCalculate = 0;
        let countRecovery = 0;
        if (studentPeriodValuationList.length > 1) {
          for (let studentPeriodValuation of studentPeriodValuationList) {
            switch (studentPeriodValuation?.valuationType) {
              case ValuationType?.DEFINITIVE:
                countDefinitive++;
                break;
              case ValuationType?.CALCULATE:
                countCalculate++;
                break;
              case ValuationType?.RECOVERY:
                countRecovery++;
                break;
            }
          }
          if (countCalculate > 1) {
            for (let studentPeriodValuation of studentPeriodValuationList) {
              if (studentPeriodValuation?.valuationType == ValuationType?.CALCULATE) {
                let result = await this.repositoryAcademicAsignatureCoursePeriodValuation.deleteOne({ _id: new ObjectId(studentPeriodValuation?.id?.toString()) });
              }
            }
            studentPeriodValuationList = [];
          }
          if (countRecovery > 1) {
            for (let studentPeriodValuation of studentPeriodValuationList) {
              if (studentPeriodValuation?.valuationType == ValuationType?.RECOVERY) {
                let result = await this.repositoryAcademicAsignatureCoursePeriodValuation.deleteOne({ _id: new ObjectId(studentPeriodValuation?.id?.toString()) });
              }
            }
            studentPeriodValuationList = [];
          }
        }
        if (countDefinitive == 0) {
          if (studentPeriodValuationList.length > 0) {
            studentPeriodValuation = studentPeriodValuationList[0];
          } else {
            studentPeriodValuation = new AcademicAsignatureCoursePeriodValuation();
            studentPeriodValuation.version = 0;
            studentPeriodValuation.active = true;
            studentPeriodValuation.studentId = studentId;
            studentPeriodValuation.academicPeriodId = academicPeriodId;
            studentPeriodValuation.academicAsignatureCourseId = academicAsignatureCourseId;
            studentPeriodValuation.assessment = 0;
            if (experienceLearningType == ExperienceLearningType?.NORMAL) {
              studentPeriodValuation.valuationType = ValuationType?.CALCULATE;
            }
            if (experienceLearningType == ExperienceLearningType?.RECOVERY) {
              studentPeriodValuation.valuationType = ValuationType?.RECOVERY;
            }
          }
          let performanceLevelType: any = null;
          let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + "");
          if (performanceLevels) {
            performanceLevelType = performanceLevels?.edges[0]?.node?.type;
          }
          for (let evaluativeComponent of evaluativeComponents) {
            await this.createExperienceLearningAverageValuationStudent(academicAsignatureCourseId, academicPeriodId, evaluativeComponent.id.toString(), studentId, experienceLearningType);
            const experienceLearningAverageValuation =
              await this.repositoryExperienceLearningAverageValuation.findBy({
                where: {
                  academicAsignatureCourseId,
                  academicPeriodId,
                  studentId,
                  evaluativeComponentId: evaluativeComponent.id.toString(),
                },
              });
            if (experienceLearningAverageValuation.length > 0) {
              let averageComponent = 0;
              let weightComponent = 0;
              switch (performanceLevelType) {
                case PerformanceLevelType.QUALITATIVE:
                  let performanceLevelIndex = performanceLevels?.edges?.findIndex((i: any) => i.node.id.toString() === experienceLearningAverageValuation[0]?.performanceLevelId) + 1;
                  averageComponent = performanceLevelIndex;
                  weightComponent = evaluativeComponent.weight ? evaluativeComponent.weight : 0;
                  average += averageComponent * (weightComponent / 100);
                  break;
                case PerformanceLevelType.QUANTITATIVE:
                  averageComponent = experienceLearningAverageValuation[0].average
                    ? experienceLearningAverageValuation[0].average
                    : 0;
                  weightComponent = evaluativeComponent.weight ? evaluativeComponent.weight : 0;
                  average += averageComponent * (weightComponent / 100);
                  break;
              }
            }
          }
          switch (performanceLevelType) {
            case PerformanceLevelType.QUALITATIVE:
              let averagePerfomanceLevel = Number(average.toFixed(0));
              studentPeriodValuation.performanceLevelId = performanceLevels?.edges[averagePerfomanceLevel - 1]?.node?.id.toString();
              //studentPeriodValuation.performanceLevelId = performanceLevels?.edges[Math.trunc(average) - 1]?.node?.id.toString();
              break;
            case PerformanceLevelType.QUANTITATIVE:
              studentPeriodValuation.assessment = average;
              perf = performanceLevels?.edges?.find((c: any) => {
                return average < c.node.topScore && average >= c.node.minimumScore;
              });
              if (perf === undefined) {
                perf = performanceLevels?.edges?.find((c: any) => {
                  return average <= c.node.topScore && average > c.node.minimumScore;
                });
              }
              if (perf && perf?.node?.id) {
                performanceLevelId = perf.node.id
              }
              studentPeriodValuation.performanceLevelId = performanceLevelId;
              break;
          }
          studentPeriodValuation.valuationType = ValuationType.CALCULATE;
          if (studentPeriodValuation.id) {
            studentPeriodValuation =
              await this.repositoryAcademicAsignatureCoursePeriodValuation.save({
                _id: new ObjectId(studentPeriodValuation.id.toString()),
                ...studentPeriodValuation,
                version: (studentPeriodValuation?.version as number) + 1,
              });
          } else {
            studentPeriodValuation =
              await this.repositoryAcademicAsignatureCoursePeriodValuation.save({
                ...studentPeriodValuation,
              });
          }
        }


      }
    }
    return true;
  }

  //este es el que actualiza cuando cambian una nota en la planilla
  @Mutation(() => Boolean)
  async createAcademicAsignatureCoursePeriodValuationStudent(
    @Arg('academicAsignatureCourseId', () => String) academicAsignatureCourseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('studentId', () => String) studentId: string,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
  ) {
    let academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
      academicAsignatureCourseId
    );
    let evaluativeComponents: EvaluativeComponent[] = [];
    if (academicAsignatureCourse) {
      let course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
      let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(
        academicAsignatureCourse.academicAsignatureId
      );
      if (course && academicAsignature) {
        let campus = await this.repositoryCampus.findOneBy(course.campusId);
        if (campus) {
          evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
            where: {
              academicAsignaturesId: { $in: [academicAsignature.id.toString()] },
              academicAreasId: null,
              schoolId: campus.schoolId,
              active: true,
            },
            order: { createdAt: 'DESC' },
          });
          if (evaluativeComponents.length === 0) {
            evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
              where: {
                academicAsignaturesId: null,
                academicAreasId: { $in: [academicAsignature.academicAreaId] },
                schoolId: campus.schoolId,
                active: true,
              },
              order: { createdAt: 'DESC' },
            });
            if (evaluativeComponents.length === 0) {
              evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
                where: {
                  academicAsignaturesId: null,
                  academicAreasId: null,
                  schoolId: campus.schoolId,
                  active: true,
                },
                order: { createdAt: 'DESC' },
              });
            }
          }
        }
      }
    }
    if (academicAsignatureCourse) {
      const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
      if (course) {
        let studentPeriodValuation: AcademicAsignatureCoursePeriodValuation;
        let average = 0;
        let perf = null;
        let performanceLevelId = undefined;
        let studentPeriodValuationList =
          await this.repositoryAcademicAsignatureCoursePeriodValuation.findBy({
            where: {
              academicAsignatureCourseId,
              academicPeriodId,
              studentId,
            },
          });
        let countDefinitive = 0;
        let countCalculate = 0;
        let countRecovery = 0;
        if (studentPeriodValuationList.length > 1) {
          for (let studentPeriodValuation of studentPeriodValuationList) {
            switch (studentPeriodValuation?.valuationType) {
              case ValuationType?.DEFINITIVE:
                countDefinitive++;
                break;
              case ValuationType?.CALCULATE:
                countCalculate++;
                break;
              case ValuationType?.RECOVERY:
                countRecovery++;
                break;
            }
          }
          if (countCalculate > 1) {
            for (let studentPeriodValuation of studentPeriodValuationList) {
              if (studentPeriodValuation?.valuationType == ValuationType?.CALCULATE) {
                let result = await this.repositoryAcademicAsignatureCoursePeriodValuation.deleteOne({ _id: new ObjectId(studentPeriodValuation?.id?.toString()) });
              }
            }
            studentPeriodValuationList = [];
          }
        }
        if (countDefinitive == 0 && countRecovery == 0) {
          if (studentPeriodValuationList.length > 0) {
            studentPeriodValuation = studentPeriodValuationList[0];
          } else {
            studentPeriodValuation = new AcademicAsignatureCoursePeriodValuation();
            studentPeriodValuation.version = 0;
            studentPeriodValuation.active = true;
            studentPeriodValuation.studentId = studentId;
            studentPeriodValuation.academicPeriodId = academicPeriodId;
            studentPeriodValuation.academicAsignatureCourseId = academicAsignatureCourseId;
            studentPeriodValuation.assessment = 0;
          }
          let performanceLevelType: any = null;
          let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + "");
          if (performanceLevels) {
            performanceLevelType = performanceLevels?.edges[0]?.node?.type;
          }
          for (let evaluativeComponent of evaluativeComponents) {
            await this.createExperienceLearningAverageValuationStudent(academicAsignatureCourseId, academicPeriodId, evaluativeComponent.id.toString(), studentId, experienceLearningType);
            const experienceLearningAverageValuation =
              await this.repositoryExperienceLearningAverageValuation.findBy({
                where: {
                  academicAsignatureCourseId,
                  academicPeriodId,
                  studentId,
                  evaluativeComponentId: evaluativeComponent.id.toString(),
                },
              });
            if (experienceLearningAverageValuation.length > 0) {
              let averageComponent = 0;
              let weightComponent = 0;
              switch (performanceLevelType) {
                case PerformanceLevelType.QUALITATIVE:
                  let performanceLevelIndex = performanceLevels?.edges?.findIndex((i: any) => i.node.id.toString() === experienceLearningAverageValuation[0]?.performanceLevelId) + 1;
                  averageComponent = performanceLevelIndex;
                  weightComponent = evaluativeComponent.weight ? evaluativeComponent.weight : 0;
                  average += averageComponent * (weightComponent / 100);
                  break;
                case PerformanceLevelType.QUANTITATIVE:
                  averageComponent = experienceLearningAverageValuation[0].average
                    ? experienceLearningAverageValuation[0].average
                    : 0;
                  weightComponent = evaluativeComponent.weight ? evaluativeComponent.weight : 0;
                  average += averageComponent * (weightComponent / 100);
                  break;
              }
            }
          }
          switch (performanceLevelType) {
            case PerformanceLevelType.QUALITATIVE:
              let averagePerfomanceLevel = Number(average.toFixed(0));
              studentPeriodValuation.performanceLevelId = performanceLevels?.edges[averagePerfomanceLevel - 1]?.node?.id.toString();
              //studentPeriodValuation.performanceLevelId = performanceLevels?.edges[Math.trunc(average) - 1]?.node?.id.toString();
              break;
            case PerformanceLevelType.QUANTITATIVE:
              studentPeriodValuation.assessment = average;
              perf = performanceLevels?.edges?.find((c: any) => {
                return average < c.node.topScore && average >= c.node.minimumScore;
              });
              if (perf === undefined) {
                perf = performanceLevels?.edges?.find((c: any) => {
                  return average <= c.node.topScore && average > c.node.minimumScore;
                });
              }
              if (perf && perf?.node?.id) {
                performanceLevelId = perf.node.id
              }
              studentPeriodValuation.performanceLevelId = performanceLevelId;
              break;
          }
          studentPeriodValuation.valuationType = ValuationType.CALCULATE;
          if (studentPeriodValuation.id) {
            studentPeriodValuation =
              await this.repositoryAcademicAsignatureCoursePeriodValuation.save({
                _id: new ObjectId(studentPeriodValuation.id.toString()),
                ...studentPeriodValuation,
                version: (studentPeriodValuation?.version as number) + 1,
              });
          } else {
            studentPeriodValuation =
              await this.repositoryAcademicAsignatureCoursePeriodValuation.save({
                ...studentPeriodValuation,
              });
          }
        }
      }
    }
    this.createAcademicAreaCoursePeriodValuationStudent(academicAsignatureCourseId, academicPeriodId, studentId + "")
    return true;
  }


  //este es el que actualiza el area de un estudiante
  @Mutation(() => Boolean)
  async createAcademicAreaCoursePeriodValuationStudent(
    @Arg('academicAsignatureCourseId', () => String) academicAsignatureCourseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('studentId', () => String) studentId: string
  ) {
    let academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
      academicAsignatureCourseId
    );
    let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(academicAsignatureCourse?.academicAsignatureId);
    let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature?.academicAreaId);
    let academicAsignatures = await this.repositoryAcademicAsignature.findBy({ where: { academicAreaId: academicArea?.id?.toString() } });
    let asignaturesAux: any[] = []
    for (let asignature of academicAsignatures) {
      asignaturesAux.push(asignature?.id?.toString());
    }
    let academicAsignaturesCourses = await this.repositoryAcademicAsignatureCourse.findBy({ where: { academicAsignatureId: { $in: asignaturesAux }, courseId: academicAsignatureCourse?.courseId } });
    let hourlyIntensityTotal = 0;
    for (let academicAsignature of academicAsignaturesCourses) {
      hourlyIntensityTotal += academicAsignature?.hourlyIntensity ? academicAsignature?.hourlyIntensity : 0;
    }
    let studentAreaPeriodValuation: AcademicAreaCoursePeriodValuation;
    let average = 0;
    let perf = null;
    let performanceLevelId = undefined;
    let studentAreaPeriodValuationList = await this.repositoryAcademicAreaCoursePeriodValuation.findBy({
      where:
      {
        academicAreaId: academicArea?.id?.toString(),
        academicPeriodId,
        studentId,
      }
    });
    let countDefinitive = 0;
    let countCalculate = 0;
    let countRecovery = 0;

    if (studentAreaPeriodValuationList.length > 1) {
      for (let studentAreaPeriodValuation of studentAreaPeriodValuationList) {
        switch (studentAreaPeriodValuation?.valuationType) {
          case ValuationType?.DEFINITIVE:
            countDefinitive++;
            break;
          case ValuationType?.CALCULATE:
            countCalculate++;
            break;
          case ValuationType?.RECOVERY:
            countRecovery++;
            break;
        }
      }
      if (countCalculate > 1) {
        for (let studentAreaPeriodValuation of studentAreaPeriodValuationList) {
          let result = await this.repositoryAcademicAreaCoursePeriodValuation.deleteOne({ _id: new ObjectId(studentAreaPeriodValuation?.id?.toString()) });
        }
        studentAreaPeriodValuationList = [];
      }
    }
    if (countDefinitive == 0 && countRecovery == 0) {
      if (studentAreaPeriodValuationList.length > 0) {
        studentAreaPeriodValuation = studentAreaPeriodValuationList[0];
      } else {
        studentAreaPeriodValuation = new AcademicAreaCoursePeriodValuation();
        studentAreaPeriodValuation.version = 0;
        studentAreaPeriodValuation.active = true;
        studentAreaPeriodValuation.studentId = studentId;
        studentAreaPeriodValuation.academicPeriodId = academicPeriodId;
        studentAreaPeriodValuation.academicAreaId = academicArea?.id?.toString();
        studentAreaPeriodValuation.assessment = 0;
      }
      let performanceLevelType: any = null;
      let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + "");
      if (performanceLevels) {
        performanceLevelType = performanceLevels?.edges[0]?.node?.type;
      }
      for (let academicAsignature of academicAsignaturesCourses) {
        let studentAsignaturePeriodValuationList =
          await this.repositoryAcademicAsignatureCoursePeriodValuation.findBy({
            where: {
              academicAsignatureCourseId: academicAsignature?.id?.toString(),
              academicPeriodId,
              studentId,
            },
          });
        let countDefinitive = 0;
        let countCalculate = 0;
        let countRecovery = 0;
        for (let studentAsignaturePeriodValuation of studentAsignaturePeriodValuationList) {
          switch (studentAsignaturePeriodValuation?.valuationType) {
            case ValuationType?.DEFINITIVE:
              countDefinitive++;
              break;
            case ValuationType?.CALCULATE:
              countCalculate++;
              break;
            case ValuationType?.RECOVERY:
              countRecovery++;
              break;
          }
        }
        let studentAsignaturePeriodValuationAux: AcademicAsignatureCoursePeriodValuation | null = null;
        if (countCalculate > 0) {
          for (let studentAsignaturePeriodValuation of studentAsignaturePeriodValuationList) {
            if (studentAsignaturePeriodValuation?.valuationType == ValuationType?.CALCULATE) {
              studentAsignaturePeriodValuationAux = studentAsignaturePeriodValuation;
            }
          }
        }
        if (countDefinitive > 0) {
          for (let studentAsignaturePeriodValuation of studentAsignaturePeriodValuationList) {
            if (studentAsignaturePeriodValuation?.valuationType == ValuationType?.DEFINITIVE) {
              studentAsignaturePeriodValuationAux = studentAsignaturePeriodValuation;
            }
          }
        }
        if (countRecovery > 0) {
          for (let studentAsignaturePeriodValuation of studentAsignaturePeriodValuationList) {
            if (studentAsignaturePeriodValuation?.valuationType == ValuationType?.RECOVERY) {
              studentAsignaturePeriodValuationAux = studentAsignaturePeriodValuation;
            }
          }
        }
        if (studentAsignaturePeriodValuationAux != null) {
          let averageAsignatureCourse = 0;
          let horlyIntensityAsignature = 0;
          switch (performanceLevelType) {
            case PerformanceLevelType.QUALITATIVE:
              let performanceLevelIndex = performanceLevels?.edges?.findIndex((i: any) => i.node.id.toString() === studentAsignaturePeriodValuationAux?.performanceLevelId) + 1;
              averageAsignatureCourse = performanceLevelIndex;
              horlyIntensityAsignature = academicAsignature?.hourlyIntensity ? academicAsignature?.hourlyIntensity : 0;
              average += averageAsignatureCourse * (horlyIntensityAsignature / hourlyIntensityTotal);
              break;
            case PerformanceLevelType.QUANTITATIVE:
              averageAsignatureCourse = studentAsignaturePeriodValuationAux.assessment
                ? studentAsignaturePeriodValuationAux.assessment
                : 0;
              horlyIntensityAsignature = academicAsignature.hourlyIntensity ? academicAsignature.hourlyIntensity : 0;
              average += averageAsignatureCourse * (horlyIntensityAsignature / hourlyIntensityTotal);
              break;
          }
        }
      }
      if (Number.isNaN(average) || average < 0) {
        studentAreaPeriodValuation.assessment = 0;
      }
      switch (performanceLevelType) {
        case PerformanceLevelType.QUALITATIVE:
          let averagePerfomanceLevel = Number(average.toFixed(0));
          studentAreaPeriodValuation.performanceLevelId = performanceLevels?.edges[averagePerfomanceLevel - 1]?.node?.id.toString();
          //studentAreaPeriodValuation.performanceLevelId = performanceLevels?.edges[Math.trunc(average) - 1]?.node?.id.toString();
          break;
        case PerformanceLevelType.QUANTITATIVE:
          studentAreaPeriodValuation.assessment = average;
          perf = performanceLevels?.edges?.find((c: any) => {
            return average < c.node.topScore && average >= c.node.minimumScore;
          });
          if (perf === undefined) {
            perf = performanceLevels?.edges?.find((c: any) => {
              return average <= c.node.topScore && average > c.node.minimumScore;
            });
          }
          if (perf && perf?.node?.id) {
            performanceLevelId = perf.node.id
          }
          studentAreaPeriodValuation.performanceLevelId = performanceLevelId;
          break;
      }
      studentAreaPeriodValuation.valuationType = ValuationType.CALCULATE;
      if (studentAreaPeriodValuation.id) {
        studentAreaPeriodValuation =
          await this.repositoryAcademicAreaCoursePeriodValuation.save({
            _id: new ObjectId(studentAreaPeriodValuation.id.toString()),
            ...studentAreaPeriodValuation,
            version: (studentAreaPeriodValuation?.version as number) + 1,
          });
      } else {
        studentAreaPeriodValuation =
          await this.repositoryAcademicAreaCoursePeriodValuation.save({
            ...studentAreaPeriodValuation,
          });
      }
      //courseId: academicAsignatureCourse?.courseId
      return true;
    }
  }

  //aca voy
  // este actualiza el promedio de un estudiante
  @Mutation(() => Boolean)
  async createAveragePeriodValuationStudent(
    @Arg('courseId', () => String) courseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('studentId', () => String) studentId: string
  ) {
    //console.log("llamando ", courseId, academicPeriodId, studentId)
    let academicAsignaturesCourses = await this.repositoryAcademicAsignatureCourse.findBy({ where: { courseId: courseId } });
    let areasAux: any[] = []
    let hourlyIntensityAreaAux = new Array();
    let asignaturesAux: any[] = [];
    for (let asignatureCourse of academicAsignaturesCourses) {
      let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse?.academicAsignatureId);
      let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature?.academicAreaId);
      if (academicArea !== null && academicArea?.isAverage == true) {
        asignaturesAux.push(academicAsignature);
        areasAux.push(academicArea);
      }
    }
    const ids = areasAux.map(o => o.id?.toString())
    const count: any = {};
    ids.forEach(element => {
      count[element] = (count[element] || 0) + 1;
    });
    const filtered = areasAux.filter(({ id }, index) => !ids.includes(id?.toString(), index + 1))
    for (let filter of filtered) {
      filter.count = count[filter?.id];
    }
    let average = 0;
    let performanceLevelType: any = null;
    let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignaturesCourses[0]?.id?.toString() + "");
    if (performanceLevels) {
      performanceLevelType = performanceLevels?.edges[0]?.node?.type;
    }
    let hourlyIntensityTotal = 0;
    for (let area of filtered) {
      let hourlyIntensityArea = 0;
      for (let asignatureCourse of academicAsignaturesCourses) {
        let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse?.academicAsignatureId);
        let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature?.academicAreaId);
        if (academicArea?.id == area?.id?.toString()) {
          hourlyIntensityArea += asignatureCourse?.hourlyIntensity ? asignatureCourse?.hourlyIntensity : 0;
        }
      }
      hourlyIntensityTotal += hourlyIntensityArea;
      let studentAreaPeriodValuationList = await this.repositoryAcademicAreaCoursePeriodValuation.findBy({
        where:
        {
          academicAreaId: area?.id?.toString(),
          academicPeriodId,
          studentId,
        }
      });
      let averageArea = 0;
      switch (performanceLevelType) {
        case PerformanceLevelType.QUALITATIVE:
          let performanceLevelIndex = performanceLevels?.edges?.findIndex((i: any) => i.node.id.toString() === studentAreaPeriodValuationList[0]?.performanceLevelId) + 1;
          averageArea = performanceLevelIndex;
          average += averageArea * hourlyIntensityArea;
          break;
        case PerformanceLevelType.QUANTITATIVE:
          averageArea = studentAreaPeriodValuationList[0]?.assessment
            ? studentAreaPeriodValuationList[0]?.assessment
            : 0;
          average += averageArea * hourlyIntensityArea;
          break;
      }
      //console.log("Area: ", area?.name);
      //console.log("IH:", hourlyIntensityArea);
      //console.log("AverageArea:", averageArea);
    }
    //console.log("AverageTotal:", average / hourlyIntensityTotal)
    //console.log("IHT:", hourlyIntensityTotal);
    average = average / hourlyIntensityTotal;
    let perf = null;
    let performanceLevelId = undefined;
    let averageAcademicPeriodStudent: AverageAcademicPeriodStudent;
    let averageAcademicPeriodStudentList = await this.repositoryAverageAcademicPeriodStudent.findBy({
      where:
      {
        courseId,
        academicPeriodId,
        studentId,
      }
    });
    if (averageAcademicPeriodStudentList.length > 1) {
      //console.log("elminando repetidos")
      for (let averageAcademicPeriodStudents of averageAcademicPeriodStudentList) {
        let result = await this.repositoryAverageAcademicPeriodStudent.deleteOne({ _id: new ObjectId(averageAcademicPeriodStudents?.id?.toString()) });
      }
      averageAcademicPeriodStudentList = [];
    }
    //console.log(averageAcademicPeriodStudentList)
    if (averageAcademicPeriodStudentList.length > 0) {
      averageAcademicPeriodStudent = averageAcademicPeriodStudentList[0];
    } else {
      averageAcademicPeriodStudent = new AverageAcademicPeriodStudent();
      averageAcademicPeriodStudent.version = 0;
      averageAcademicPeriodStudent.active = true;
      averageAcademicPeriodStudent.studentId = studentId;
      averageAcademicPeriodStudent.academicPeriodId = academicPeriodId;
      averageAcademicPeriodStudent.courseId = courseId;
      averageAcademicPeriodStudent.assessment = 0;
    }
    if (Number.isNaN(average) || average < 0) {
      averageAcademicPeriodStudent.assessment = 0;
    } else {
      switch (performanceLevelType) {
        case PerformanceLevelType.QUALITATIVE:
          let averagePerfomanceLevel = Number(average.toFixed(0));
          averageAcademicPeriodStudent.performanceLevelId = performanceLevels?.edges[averagePerfomanceLevel - 1]?.node?.id.toString();
          //averageAcademicPeriodStudent.performanceLevelId = performanceLevels?.edges[Math.trunc(average) - 1]?.node?.id.toString();
          averageAcademicPeriodStudent.assessment = average;
          break;
        case PerformanceLevelType.QUANTITATIVE:
          averageAcademicPeriodStudent.assessment = average;
          perf = performanceLevels?.edges?.find((c: any) => {
            return average < c.node.topScore && average >= c.node.minimumScore;
          });
          if (perf === undefined) {
            perf = performanceLevels?.edges?.find((c: any) => {
              return average <= c.node.topScore && average > c.node.minimumScore;
            });
          }
          if (perf && perf?.node?.id) {
            performanceLevelId = perf.node.id
          }
          // console.log(averageAcademicPeriodStudent?.studentId)
          // console.log(average)
          // console.log(perf?.node?.name);
          averageAcademicPeriodStudent.performanceLevelId = performanceLevelId;
          break;
      }
    }
    //console.log(averageAcademicPeriodStudent);
    if (averageAcademicPeriodStudent.id) {
      //console.log("problema aca ", averageAcademicPeriodStudent);
      averageAcademicPeriodStudent =
        await this.repositoryAverageAcademicPeriodStudent.save({
          _id: new ObjectId(averageAcademicPeriodStudent.id.toString()),
          ...averageAcademicPeriodStudent,
          version: (averageAcademicPeriodStudent?.version as number) + 1,
        });
    } else {
      averageAcademicPeriodStudent =
        await this.repositoryAverageAcademicPeriodStudent.save({
          ...averageAcademicPeriodStudent,
        });
    }
    await this.createAveragePeriodValuationCourse(courseId, academicPeriodId);
    return true;
  }

  @Mutation(() => Boolean)
  async createAveragePeriodValuationCourse(
    @Arg('courseId', () => String) courseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string
  ) {
    const course = await this.repositoryCourse.findOneBy(courseId);
    if (course) {
      let averageAcademicPeriodStudentList = await this.repositoryAverageAcademicPeriodStudent.findBy({
        where:
        {
          courseId,
          academicPeriodId,
        },
        order: { assessment: -1 },
      });
      let average = 0;
      let performanceLevelType: any = null;
      let academicAsignaturesCourses = await this.repositoryAcademicAsignatureCourse.findBy({ where: { courseId: courseId } });
      let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignaturesCourses[0]?.id?.toString() + "");
      if (performanceLevels) {
        performanceLevelType = performanceLevels?.edges[0]?.node?.type;
      }
      let auxCount = 1;
      for (let averageAcademicPeriodStudents of averageAcademicPeriodStudentList) {
        await this.repositoryAverageAcademicPeriodStudent.save({
          _id: new ObjectId(averageAcademicPeriodStudents.id.toString()),
          ...averageAcademicPeriodStudents,
          score: auxCount,
          version: (averageAcademicPeriodStudents?.version as number) + 1,
        });
        auxCount++;
        let averageStudent = 0;
        switch (performanceLevelType) {
          case PerformanceLevelType.QUALITATIVE:
            let performanceLevelIndex = performanceLevels?.edges?.findIndex((i: any) => i.node.id.toString() === averageAcademicPeriodStudents?.performanceLevelId) + 1;
            averageStudent = performanceLevelIndex;
            average += averageStudent;
            break;
          case PerformanceLevelType.QUANTITATIVE:
            averageStudent = averageAcademicPeriodStudents?.assessment
              ? averageAcademicPeriodStudents?.assessment
              : 0;
            average += averageStudent;
            break;
        }
      }
      if (course?.studentsId && course?.studentsId?.length > 0) {
        average = average / course?.studentsId?.length;
      }
      let perf = null;
      let performanceLevelId = undefined;
      let averageAcademicPeriodCourse: AverageAcademicPeriodCourse;
      let averageAcademicPeriodCourseList = await this.repositoryAverageAcademicPeriodCourse.findBy({
        where:
        {
          courseId,
          academicPeriodId,
        }
      });
      if (averageAcademicPeriodCourseList.length > 1) {
        for (let averageAcademicPeriodcourses of averageAcademicPeriodCourseList) {
          let result = await this.repositoryAverageAcademicPeriodCourse.deleteOne({ _id: new ObjectId(averageAcademicPeriodcourses?.id?.toString()) });
        }
        averageAcademicPeriodCourseList = [];
      }
      if (averageAcademicPeriodCourseList.length > 0) {
        averageAcademicPeriodCourse = averageAcademicPeriodCourseList[0];
      } else {
        averageAcademicPeriodCourse = new AverageAcademicPeriodCourse();
        averageAcademicPeriodCourse.version = 0;
        averageAcademicPeriodCourse.active = true;
        averageAcademicPeriodCourse.academicPeriodId = academicPeriodId;
        averageAcademicPeriodCourse.courseId = courseId;
        averageAcademicPeriodCourse.assessment = 0;
      }
      if (Number.isNaN(average) || average < 0) {
        averageAcademicPeriodCourse.assessment = 0;
      }
      switch (performanceLevelType) {
        case PerformanceLevelType.QUALITATIVE:
          let averagePerfomanceLevel = Number(average.toFixed(0));
          averageAcademicPeriodCourse.performanceLevelId = performanceLevels?.edges[averagePerfomanceLevel - 1]?.node?.id.toString();
          //averageAcademicPeriodCourse.performanceLevelId = performanceLevels?.edges[Math.trunc(average) - 1]?.node?.id.toString();
          averageAcademicPeriodCourse.assessment = average;
          break;
        case PerformanceLevelType.QUANTITATIVE:
          averageAcademicPeriodCourse.assessment = average;
          perf = performanceLevels?.edges?.find((c: any) => {
            return average < c.node.topScore && average >= c.node.minimumScore;
          });
          if (perf === undefined) {
            perf = performanceLevels?.edges?.find((c: any) => {
              return average <= c.node.topScore && average > c.node.minimumScore;
            });
          }
          if (perf && perf?.node?.id) {
            performanceLevelId = perf.node.id
          }
          averageAcademicPeriodCourse.performanceLevelId = performanceLevelId;
          break;
      }
      //console.log(averageAcademicPeriodCourse);
      if (averageAcademicPeriodCourse.id) {
        //console.log("problema aca", averageAcademicPeriodCourse);
        averageAcademicPeriodCourse =
          await this.repositoryAverageAcademicPeriodCourse.save({
            _id: new ObjectId(averageAcademicPeriodCourse.id.toString()),
            ...averageAcademicPeriodCourse,
            version: (averageAcademicPeriodCourse?.version as number) + 1,
          });
      } else {
        averageAcademicPeriodCourse =
          await this.repositoryAverageAcademicPeriodCourse.save({
            ...averageAcademicPeriodCourse,
          });
      }
      return true;
    }
  }

  @Mutation(() => Boolean)
  async createAcademicAsignatureCoursePeriodValuationStudents(
    @Arg('academicAsignatureCourseId', () => String) academicAsignatureCourseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('schoolId', () => String) schoolId: string,
    @Arg('experienceLearningType', () => ExperienceLearningType) experienceLearningType: ExperienceLearningType,
  ) {
    const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
      academicAsignatureCourseId
    );
    if (academicAsignatureCourse) {
      const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
      if (course) {
        const students = course.studentsId;
        if (students) {
          for (const student of students) {
            this.createAcademicAsignatureCoursePeriodValuationStudent(
              academicAsignatureCourseId,
              academicPeriodId,
              student as string,
              experienceLearningType
            );
          }
        }
      }
    }
    return true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: ExperienceLearning) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: ExperienceLearning) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Campus, { nullable: true })
  async campus(@Root() data: ExperienceLearning) {
    let id = data.campusId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCampus.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicAsignatureCourse, { nullable: true })
  async academicAsignatureCourse(@Root() data: ExperienceLearning) {
    let id = data.academicAsignatureCourseId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicAsignatureCourse.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicPeriod, { nullable: true })
  async academicPeriod(@Root() data: ExperienceLearning) {
    let id = data.academicPeriodId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicPeriod.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [Learning], { nullable: true })
  async learnigs(@Root() data: ExperienceLearning) {
    let ids = data.learningsId;
    if (ids !== null && ids !== undefined) {
      let dataIds: any[] = [];
      ids.forEach(async (id: any) => {
        dataIds.push(new ObjectId(id));
      });
      const result = await this.repositoryLearning.findBy({ where: { _id: { $in: dataIds } } });
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [EvidenceLearning], { nullable: true })
  async evidenceLearnings(@Root() data: ExperienceLearning) {
    let ids = data.evidenceLearningsId;
    if (ids !== null && ids !== undefined) {
      let dataIds: any[] = [];
      ids.forEach(async (id: any) => {
        dataIds.push(new ObjectId(id));
      });
      const result = await this.repositoryEvidenceLearning.findBy({
        where: { _id: { $in: dataIds } },
      });
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [EvaluativeComponent], { nullable: true })
  async evaluativeComponents(@Root() data: ExperienceLearning) {
    let ids = data.evaluativeComponentsId;
    if (ids !== null && ids !== undefined) {
      let dataIds: any[] = [];
      ids.forEach(async (id: any) => {
        dataIds.push(new ObjectId(id));
      });
      const result = await this.repositoryEvaluativeComponent.findBy({
        where: { _id: { $in: dataIds } },
      });
      return result;
    }
    return null;
  }
}
