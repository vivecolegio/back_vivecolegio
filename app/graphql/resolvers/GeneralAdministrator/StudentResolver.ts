import bcrypt from 'bcrypt';
import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewStudent } from '../../inputs/GeneralAdministrator/NewStudent';
import { NewUser } from '../../inputs/GeneralAdministrator/NewUser';
import { IContext } from '../../interfaces/IContext';
import { Course } from '../../models/CampusAdministrator/Course';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { School } from '../../models/GeneralAdministrator/School';
import { Student, StudentConnection } from '../../models/GeneralAdministrator/Student';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicGrade } from '../../models/SchoolAdministrator/AcademicGrade';
import { ConnectionArgs } from '../../pagination/relaySpecs';

const BCRYPT_SALT_ROUNDS = 12;

@Resolver(Student)
export class StudentResolver {
  @InjectRepository(Student)
  private repository = getMongoRepository(Student);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(School)
  private repositorySchool = getMongoRepository(School);

  @InjectRepository(Campus)
  private repositoryCampus = getMongoRepository(Campus);

  @InjectRepository(AcademicGrade)
  private repositoryAcademicGrade = getMongoRepository(AcademicGrade);

  @InjectRepository(Course)
  private repositoryCourse = getMongoRepository(Course);

  @Query(() => Student, { nullable: true })
  async getStudent(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => StudentConnection)
  async getAllStudent(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String,
    @Arg('campusId', () => String) campusId: String,
  ): Promise<StudentConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.find({
          where: { schoolId, campusId },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find({ where: { schoolId, campusId } });
      }
    } else {
      if (orderCreated) {
        result = await this.repository.find({
          where: {
            schoolId,
            campusId,
            active: true,
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find({
          where: {
            schoolId,
            campusId,
            active: true,
          },
        });
      }
    }
    let resultConn = new StudentConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => Student)
  async createStudent(@Arg('data') data: NewStudent, @Ctx() context: IContext): Promise<Student> {
    let dataProcess: NewStudent = removeEmptyStringElements(data);
    let dataUserProcess: NewUser = removeEmptyStringElements(dataProcess.newUser);
    let createdByUserId = context?.user?.authorization?.id;
    delete dataProcess.newUser;
    if (dataUserProcess.password != null) {
      let passwordHash = await bcrypt
        .hash(dataUserProcess.password, BCRYPT_SALT_ROUNDS)
        .then(function (hashedPassword: any) {
          return hashedPassword;
        });
      dataUserProcess.password = passwordHash;
    }
    const modelUser = await this.repositoryUser.create({
      ...dataUserProcess,
      active: true,
      version: 0,
      createdByUserId,
    });
    let resultUser = await this.repositoryUser.save(modelUser);
    const model = await this.repository.create({
      ...dataProcess,
      userId: resultUser.id,
      active: true,
      version: 0,
      createdByUserId,
    });
    let result = await this.repository.save(model);
    return result;
  }

  @Mutation(() => Student)
  async updateStudent(
    @Arg('data') data: NewStudent,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Student | undefined> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
    let dataUserProcess: NewUser = removeEmptyStringElements(dataProcess?.newUser);
    let resultUser = await this.repositoryUser.findOne(result?.userId?.toString());
    resultUser = await this.repositoryUser.save({
      _id: new ObjectId(result?.userId?.toString()),
      ...resultUser,
      ...dataUserProcess,
      version: (result?.version as number) + 1,
      updatedByUserId,
    });
    delete dataProcess?.newUser;
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
  async changeActiveStudent(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
    let resultUser = await this.repositoryUser.findOne(result?.userId?.toString());
    resultUser = await this.repositoryUser.save({
      _id: new ObjectId(result?.userId?.toString()),
      ...resultUser,
      active: active,
      version: (result?.version as number) + 1,
      updatedByUserId,
    });
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
  async deleteStudent(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let data = await this.repository.findOne(id);
    let result = await this.repository.deleteOne({ _id: ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: Student) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: Student) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: Student) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.find({ where: { _id: { $in: id } } });
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Campus, { nullable: true })
  async campus(@Root() data: Student) {
    let id = data.campusId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCampus.find({ where: { _id: { $in: id } } });
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async user(@Root() data: Student) {
    let id = data.userId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicGrade, { nullable: true })
  async academicGrade(@Root() data: Student) {
    let id = data.academicGradeId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicGrade.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Course, { nullable: true })
  async course(@Root() data: Student) {
    let id = data.courseId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCourse.findOne(id);
      return result;
    }
    return null;
  }
}
