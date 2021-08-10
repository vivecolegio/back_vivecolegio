import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewSchoolYear } from '../../inputs/SchoolAdministrator/NewSchoolYear';
import { IContext } from '../../interfaces/IContext';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { SchoolYear, SchoolYearConnection } from '../../models/SchoolAdministrator/SchoolYear';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(SchoolYear)
export class SchoolYearResolver {
  @InjectRepository(SchoolYear)
  private repository = getMongoRepository(SchoolYear);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(School)
  private repositorySchool = getMongoRepository(School);

  @Query(() => SchoolYear, { nullable: true })
  async getSchoolYear(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => SchoolYearConnection)
  async getAllSchoolYear(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<SchoolYearConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.find({
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find();
      }
    } else {
      if (orderCreated) {
        result = await this.repository.find({
          where: {
            active: true,
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find({
          where: {
            active: true,
          },
        });
      }
    }
    let resultConn = new SchoolYearConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => SchoolYear)
  async createSchoolYear(
    @Arg('data') data: NewSchoolYear,
    @Ctx() context: IContext
  ): Promise<SchoolYear> {
    let dataProcess: NewSchoolYear = removeEmptyStringElements(data);
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

  @Mutation(() => SchoolYear)
  async updateSchoolYear(
    @Arg('data') data: NewSchoolYear,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<SchoolYear | undefined> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserid = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
    result = await this.repository.save({
      _id: new ObjectId(id),
      ...result,
      ...dataProcess,
      version: (result?.version as number) + 1,
      updatedByUserid,
    });
    return result;
  }

  @Mutation(() => Boolean)
  async changeActiveSchoolYear(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let updatedByUserid = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
    result = await this.repository.save({
      _id: new ObjectId(id),
      ...result,
      active: active,
      version: (result?.version as number) + 1,
      updatedByUserid,
    });
    if (result.id) {
      return true;
    } else {
      return false;
    }
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: SchoolYear) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: SchoolYear) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: SchoolYear) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOne(id);
      return result;
    }
    return null;
  }
}
