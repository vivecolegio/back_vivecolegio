import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
  AcademicAsignatureCoursePeriodValuationRepository,
  AcademicAsignatureCourseRepository,
  AcademicAsignatureRepository,
  AcademicPeriodRepository,
  CampusRepository,
  CourseRepository,
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
  LearningRepository,
  PerformanceLevelRepository,
  UserRepository
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { ExperienceType } from '../../enums/ExperienceType';
import { PerformanceLevelType } from '../../enums/PerformanceLevelType';
import { NewExperienceLearning } from '../../inputs/CampusAdministrator/NewExperienceLearning';
import { IContext } from '../../interfaces/IContext';
import { AcademicAsignatureCourse } from '../../models/CampusAdministrator/AcademicAsignatureCourse';
import { AcademicAsignatureCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAsignatureCoursePeriodValuation';
import { Course } from '../../models/CampusAdministrator/Course';
import {
  ExperienceLearning,
  ExperienceLearningConnection
} from '../../models/CampusAdministrator/ExperienceLearning';
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
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
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
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          if (academicAsignatureCourseId) {
            result = await this.repository.findBy({
              where: {
                academicAsignatureCourseId,
                campusId,
              },
              order: { createdAt: 'DESC' },
            });
          } else {
            if (academicPeriodId) {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  academicPeriodId,
                },
                order: { createdAt: 'DESC' },
              });
            } else {
              result = await this.repository.findBy({
                where: {
                  campusId,
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
            },
          });
        } else {
          if (academicAsignatureCourseId) {
            result = await this.repository.findBy({
              where: {
                academicAsignatureCourseId,
                campusId,
              },
            });
          } else {
            if (academicPeriodId) {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  academicPeriodId,
                },
              });
            } else {
              result = await this.repository.findBy({
                where: {
                  campusId,
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
                  active: true,
                },
                order: { createdAt: 'DESC' },
              });
            } else {
              result = await this.repository.findBy({
                where: {
                  campusId,
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
              active: true,
            },
          });
        } else {
          if (academicAsignatureCourseId) {
            result = await this.repository.findBy({
              where: {
                academicAsignatureCourseId,
                campusId,
                active: true,
              },
            });
          } else {
            if (academicPeriodId) {
              result = await this.repository.findBy({
                where: {
                  campusId,
                  academicPeriodId,
                  active: true,
                },
              });
            } else {
              result = await this.repository.findBy({
                where: {
                  campusId,
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
    @Arg('studentId', () => String) studentId: string
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
          let studentAverage: ExperienceLearningAverageValuation;
          let average = 0;
          let evaluations = [];
          let performanceLevelType: any = null;
          let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourse({}, academicAsignatureCourseId + "");
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
              // case ExperienceType.ONLINETEST:
              //   break;
            }
          }
          if (average != null && average > 0 && countExperienceLearningAssessment > 0) {
            studentAverage.average = average / countExperienceLearningAssessment;
            studentAverage.performanceLevelId = performanceLevels?.edges[Math.trunc(average) - 1]?.node?.id.toString();
          } else {
            studentAverage.average = 0;
          }
          if (Number.isNaN(studentAverage.average)) {
            studentAverage.average = 0;
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
    @Arg('evaluativeComponentId', () => String) evaluativeComponentId: string
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
                student as string
              );
            }
          }
          return true;
        }
      }
    }
  }

  @Mutation(() => Boolean)
  async createAcademicAsignatureCoursePeriodValuationStudent(
    @Arg('academicAsignatureCourseId', () => String) academicAsignatureCourseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('studentId', () => String) studentId: string
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
        if (studentPeriodValuationList.length > 0) {
          studentPeriodValuation = studentPeriodValuationList[0];
        } else {
          studentPeriodValuation = new ExperienceLearningAverageValuation();
          studentPeriodValuation.version = 0;
          studentPeriodValuation.active = true;
          studentPeriodValuation.studentId = studentId;
          studentPeriodValuation.academicPeriodId = academicPeriodId;
          studentPeriodValuation.academicAsignatureCourseId = academicAsignatureCourseId;
          studentPeriodValuation.assessment = 0;
        }
        let performanceLevelType: any = null;
        let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourse({}, academicAsignatureCourseId + "");
        if (performanceLevels) {
          performanceLevelType = performanceLevels?.edges[0]?.node?.type;
        }
        for (let evaluativeComponent of evaluativeComponents) {
          await this.createExperienceLearningAverageValuationStudent(academicAsignatureCourseId, academicPeriodId, evaluativeComponent.id.toString(), studentId);
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
            studentPeriodValuation.performanceLevelId = performanceLevels?.edges[Math.trunc(average) - 1]?.node?.id.toString();
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
        //console.log(studentPeriodValuation)
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
    return true;
  }

  @Mutation(() => Boolean)
  async createAcademicAsignatureCoursePeriodValuationStudents(
    @Arg('academicAsignatureCourseId', () => String) academicAsignatureCourseId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('schoolId', () => String) schoolId: string
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
              student as string
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
