import bcrypt from 'bcrypt';
import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SchoolAdministratorRepository, SchoolRepository, UserRepository } from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewSchoolAdministrator } from '../../inputs/GeneralAdministrator/NewSchoolAdministrator';
import { NewUser } from '../../inputs/GeneralAdministrator/NewUser';
import { IContext } from '../../interfaces/IContext';
import { School } from '../../models/GeneralAdministrator/School';
import {
  SchoolAdministrator,
  SchoolAdministratorConnection
} from '../../models/GeneralAdministrator/SchoolAdministrator';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';

const BCRYPT_SALT_ROUNDS = 12;

@Resolver(SchoolAdministrator)
export class SchoolAdministratorResolver {
  @InjectRepository(SchoolAdministrator)
  private repository = SchoolAdministratorRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @Query(() => SchoolAdministrator, { nullable: true })
  async getSchoolAdministrator(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => SchoolAdministratorConnection)
  async getAllSchoolAdministrator(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String,
  ): Promise<SchoolAdministratorConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: { schoolId },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.findBy({ where: { schoolId } });
      }
    } else {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: {
            schoolId,
            active: true,
          },
          order: { createdAt: 'DESC' },
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
    let resultConn = new SchoolAdministratorConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => SchoolAdministrator)
  async createSchoolAdministrator(
    @Arg('data') data: NewSchoolAdministrator,
    @Ctx() context: IContext
  ): Promise<SchoolAdministrator> {
    let dataProcess: NewSchoolAdministrator = removeEmptyStringElements(data);
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

  @Mutation(() => SchoolAdministrator)
  async updateSchoolAdministrator(
    @Arg('data') data: NewSchoolAdministrator,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<SchoolAdministrator | null> {
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
  async changeActiveSchoolAdministrator(
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
  async deleteSchoolAdministrator(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: SchoolAdministrator) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: SchoolAdministrator) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: SchoolAdministrator) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findBy({ where: { _id: { $in: id } } });
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async user(@Root() data: SchoolAdministrator) {
    let id = data.userId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }
}
