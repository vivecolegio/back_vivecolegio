import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
  AcademicAsignatureCourseRepository,
  AcademicAsignatureRepository,
  CampusRepository,
  CourseRepository,
  ExperienceLearningRepository,
  GradeAssignmentRepository,
  TeacherRepository,
  UserRepository,
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewAcademicAsignatureCourse } from '../../inputs/CampusAdministrator/NewAcademicAsignatureCourse';
import { IContext } from '../../interfaces/IContext';
import {
  AcademicAsignatureCourse,
  AcademicAsignatureCourseConnection,
} from '../../models/CampusAdministrator/AcademicAsignatureCourse';
import { Course } from '../../models/CampusAdministrator/Course';
import { ExperienceLearning } from '../../models/CampusAdministrator/ExperienceLearning';
import { Teacher } from '../../models/CampusAdministrator/Teacher';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import { GradeAssignment } from '../../models/SchoolAdministrator/GradeAssignment';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AcademicAsignatureCourse)
export class AcademicAsignatureCourseResolver {
  @InjectRepository(AcademicAsignatureCourse)
  private repository = AcademicAsignatureCourseRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(Campus)
  private repositoryCampus = CampusRepository;

  @InjectRepository(AcademicAsignature)
  private repositoryAcademicAsignature = AcademicAsignatureRepository;

  @InjectRepository(Course)
  private repositoryCourse = CourseRepository;

  @InjectRepository(Teacher)
  private repositoryTeacher = TeacherRepository;

  @InjectRepository(ExperienceLearning)
  private repositoryExperienceLearning = ExperienceLearningRepository;

  @InjectRepository(GradeAssignment)
  private repositoryGradeAssignment = GradeAssignmentRepository;

  @Query(() => AcademicAsignatureCourse, { nullable: true })
  async getAcademicAsignatureCourse(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => AcademicAsignatureCourseConnection)
  async getAllAcademicAsignatureCourse(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('campusId', () => String, { nullable: true }) campusId: String,
    @Arg('courseId', () => String, { nullable: true }) courseId: String
  ): Promise<AcademicAsignatureCourseConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        if (campusId && courseId) {
          result = await this.repository.findBy({
            where: { campusId, courseId },
            order: { createdAt: 'DESC' },
          });
        } else {
          if (campusId) {
            result = await this.repository.findBy({
              where: { campusId },
              order: { createdAt: 'DESC' },
            });
          } else {
            result = await this.repository.findBy({
              where: { courseId },
              order: { createdAt: 'DESC' },
            });
          }
        }
      } else {
        if (campusId && courseId) {
          result = await this.repository.findBy({
            where: { campusId, courseId },
          });
        } else {
          if (campusId) {
            result = await this.repository.findBy({
              where: { campusId },
            });
          } else {
            result = await this.repository.findBy({
              where: { courseId },
            });
          }
        }
      }
    } else {
      if (orderCreated) {
        if (campusId && courseId) {
          result = await this.repository.findBy({
            where: {
              campusId,
              courseId,
              active: true,
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          if (campusId) {
            result = await this.repository.findBy({
              where: {
                campusId,
                active: true,
              },
              order: { createdAt: 'DESC' },
            });
          } else {
            result = await this.repository.findBy({
              where: {
                courseId,
                active: true,
              },
              order: { createdAt: 'DESC' },
            });
          }
        }
      } else {
        if (campusId && courseId) {
          result = await this.repository.findBy({
            where: {
              campusId,
              courseId,
              active: true,
            },
          });
        } else {
          if (campusId) {
            result = await this.repository.findBy({
              where: {
                campusId,
                active: true,
              },
            });
          } else {
            result = await this.repository.findBy({
              where: {
                courseId,
                active: true,
              },
            });
          }
        }
      }
    }
    let resultConn = new AcademicAsignatureCourseConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => AcademicAsignatureCourse)
  async createAcademicAsignatureCourse(
    @Arg('data') data: NewAcademicAsignatureCourse,
    @Ctx() context: IContext
  ): Promise<AcademicAsignatureCourse> {
    let dataProcess: NewAcademicAsignatureCourse = removeEmptyStringElements(data);
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

  @Mutation(() => AcademicAsignatureCourse)
  async updateAcademicAsignatureCourse(
    @Arg('data') data: NewAcademicAsignatureCourse,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<AcademicAsignatureCourse | null> {
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
  async changeActiveAcademicAsignatureCourse(
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
  async deleteAcademicAsignatureCourse(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @Query(() => [ExperienceLearning], { nullable: true })
  async getAllExperienceLearningAcademicPeriodEvaluativeComponentAcademicAsignatureCourse(
    @Arg('id', () => String) id: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('evaluativeComponentId', () => String) evaluativeComponentId: string
  ) {
    const result = await this.repositoryExperienceLearning.findBy({
      where: {
        academicAsignatureCourseId: id,
        academicPeriodId,
        evaluativeComponentId,
        active: true,
      },
      order: { createdAt: 'ASC' },
    });
    return result;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: AcademicAsignatureCourse) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: AcademicAsignatureCourse) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Campus, { nullable: true })
  async campus(@Root() data: AcademicAsignatureCourse) {
    let id = data.campusId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCampus.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicAsignature, { nullable: true })
  async academicAsignature(@Root() data: AcademicAsignatureCourse) {
    let id = data.academicAsignatureId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicAsignature.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Course, { nullable: true })
  async course(@Root() data: AcademicAsignatureCourse) {
    let id = data.courseId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCourse.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Teacher, { nullable: true })
  async teacher(@Root() data: AcademicAsignatureCourse) {
    let id = data.teacherId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryTeacher.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => GradeAssignment, { nullable: true })
  async gradeAssignment(@Root() data: AcademicAsignatureCourse) {
    let id = data.gradeAssignmentId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGradeAssignment.findOneBy(id);
      return result;
    }
    return null;
  }
}
