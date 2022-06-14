import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
  AcademicAsignatureCoursePeriodValuationRepository,
  AcademicAsignatureCourseRepository,
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
  UserRepository,
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { ExperienceType } from '../../enums/ExperienceType';
import { NewExperienceLearning } from '../../inputs/CampusAdministrator/NewExperienceLearning';
import { IContext } from '../../interfaces/IContext';
import { AcademicAsignatureCourse } from '../../models/CampusAdministrator/AcademicAsignatureCourse';
import { AcademicAsignatureCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAsignatureCoursePeriodValuation';
import { Course } from '../../models/CampusAdministrator/Course';
import {
  ExperienceLearning,
  ExperienceLearningConnection,
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
import { AcademicPeriod } from '../../models/SchoolAdministrator/AcademicPeriod';
import { EvaluativeComponent } from '../../models/SchoolAdministrator/EvaluativeComponent';
import { EvidenceLearning } from '../../models/SchoolAdministrator/EvidenceLearning';
import { Learning } from '../../models/SchoolAdministrator/Learning';
import { ConnectionArgs } from '../../pagination/relaySpecs';

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
                  assessment = assessment / count;
                  const model = await this.repositoryExperienceLearningCoEvaluationValuation.create(
                    {
                      experienceLearningId: id,
                      studentId: student,
                      assessment,
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
                  assessment = assessment / count;
                  let data = experienceLearningCoEvaluationValuation[0];
                  let result = await this.repositoryExperienceLearningCoEvaluationValuation.save({
                    _id: data.id,
                    ...data,
                    assessment,
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
        case ExperienceType.ONLINETEST:
          break;
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
        evaluativeComponentId,
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
                  average += evaluation?.assessment ? evaluation?.assessment : 0;
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
                  average += evaluation?.assessment ? evaluation?.assessment : 0;
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
                  average += evaluation?.assessment ? evaluation?.assessment : 0;
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
                  average += evaluation?.assessment ? evaluation?.assessment : 0;
                });
                break;
              case ExperienceType.ONLINETEST:
                break;
            }
          }
          if (average != null && average > 0 && experienceLearnings.length > 0) {
            studentAverage.average = average / experienceLearnings.length;
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
        evaluativeComponentId,
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
              this.createExperienceLearningAverageValuationStudent(
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
    const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(
      academicAsignatureCourseId
    );
    let evaluativeComponents: EvaluativeComponent[] = [];
    if (academicAsignatureCourse) {
      evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
        where: {
          academicAsignatureId: { $in: [academicAsignatureCourse.academicAsignatureId] },
          active: true,
        },
      });
      if (evaluativeComponents.length == 0) {
        evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
          where: {
            default: true,
            active: true,
          },
        });
      }
    }
    if (academicAsignatureCourse) {
      const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
      if (course) {
        let studentPeriodValuation: AcademicAsignatureCoursePeriodValuation;
        let average = 0;
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
        for (let evaluativeComponent of evaluativeComponents) {
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
            const averageComponent = experienceLearningAverageValuation[0].average
              ? experienceLearningAverageValuation[0].average
              : 0;
            const weightComponent = evaluativeComponent.weight ? evaluativeComponent.weight : 0;
            average += averageComponent * (weightComponent / 100);
          }
        }
        if (average) {
          studentPeriodValuation.assessment = average;
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
    let evaluativeComponents: EvaluativeComponent[] = [];
    if (academicAsignatureCourse) {
      evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
        where: {
          schoolId,
          academicAsignatureId: { $in: [academicAsignatureCourse.academicAsignatureId] },
          active: true,
        },
      });
      if (evaluativeComponents.length == 0) {
        evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
          where: {
            schoolId,
            default: true,
            active: true,
          },
        });
      }
    }
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
