import bcrypt from 'bcrypt';
import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CampusRepository, SchoolRepository, TeacherRepository, UserRepository } from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewTeacher } from '../../inputs/CampusAdministrator/NewTeacher';
import { NewUser } from '../../inputs/GeneralAdministrator/NewUser';
import { IContext } from '../../interfaces/IContext';
import { Teacher, TeacherConnection } from '../../models/CampusAdministrator/Teacher';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';

const BCRYPT_SALT_ROUNDS = 12;

@Resolver(Teacher)
export class TeacherResolver {
  @InjectRepository(Teacher)
  private repository = TeacherRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(Campus)
  private repositoryCampus = CampusRepository;

  @Query(() => Teacher, { nullable: true })
  async getTeacher(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => TeacherConnection)
  async getAllTeacher(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => [String]) schoolId: String[],
    @Arg('campusId', () => [String], { nullable: true }) campusId: String[],
  ): Promise<TeacherConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        if (campusId) {
          result = await this.repository.findBy({
            where: { schoolId: { $in: [schoolId] }, campusId: { $in: [campusId] } },
            order: { createdAt: 'DESC' },
          });
        } else {
          result = await this.repository.findBy({
            where: { schoolId: { $in: [schoolId] } },
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (campusId) {
          result = await this.repository.findBy({ where: { schoolId: { $in: [schoolId] }, campusId: { $in: [campusId] } } });
        } else {
          result = await this.repository.findBy({ where: { schoolId: { $in: [schoolId] } } });
        }
      }
    } else {
      if (orderCreated) {
        if (campusId) {
          result = await this.repository.findBy({
            where: {
              schoolId: { $in: [schoolId] },
              campusId: { $in: [campusId] },
              active: true,
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              schoolId: { $in: [schoolId] },
              active: true,
            },
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (campusId) {
          result = await this.repository.findBy({
            where: {
              schoolId: { $in: [schoolId] },
              campusId: { $in: [campusId] },
              active: true,
            },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              schoolId,
              active: true,
            },
          });
        }
      }
    }
    let resultConn = new TeacherConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => Teacher)
  async createTeacher(@Arg('data') data: NewTeacher, @Ctx() context: IContext): Promise<Teacher> {
    let dataProcess: NewTeacher = removeEmptyStringElements(data);
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

  @Mutation(() => Teacher)
  async updateTeacher(
    @Arg('data') data: NewTeacher,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Teacher | null> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOneBy(id);
    let dataUserProcess: NewUser = removeEmptyStringElements(dataProcess?.newUser);
    let resultUser = await this.repositoryUser.findOneBy(result?.userId?.toString());
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
  async changeActiveTeacher(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOneBy(id);
    let resultUser = await this.repositoryUser.findOneBy(result?.userId?.toString());
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
  async deleteTeacher(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: Teacher) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: Teacher) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async user(@Root() data: Teacher) {
    let id = data.userId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: Teacher) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findBy({ where: { _id: { $in: id } } });
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [Campus], { nullable: true })
  async campus(@Root() data: Teacher) {
    let id = data.campusId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCampus.findBy({ where: { _id: { $in: id } } });
      return result;
    }
    return null;
  }
}
