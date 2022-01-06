import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewGradeAssignment } from '../../inputs/SchoolAdministrator/NewGradeAssignment';
import { IContext } from '../../interfaces/IContext';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../../models/SchoolAdministrator/AcademicGrade';
import {
  GradeAssignment,
  GradeAssignmentConnection
} from '../../models/SchoolAdministrator/GradeAssignment';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(GradeAssignment)
export class GradeAssignmentResolver {
  @InjectRepository(GradeAssignment)
  private repository = getMongoRepository(GradeAssignment);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(AcademicGrade)
  private repositoryAcademicGrade = getMongoRepository(AcademicGrade);

  @InjectRepository(AcademicAsignature)
  private repositoryAcademicAsignature = getMongoRepository(AcademicAsignature);

  @InjectRepository(School)
  private repositorySchool = getMongoRepository(School);

  @Query(() => GradeAssignment, { nullable: true })
  async getGradeAssignment(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => GradeAssignmentConnection)
  async getAllGradeAssignment(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String,
  ): Promise<GradeAssignmentConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.find({
          where: { schoolId },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find({ where: { schoolId } });
      }
    } else {
      if (orderCreated) {
        result = await this.repository.find({
          where: {
            schoolId,
            active: true,
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find({
          where: {
            schoolId,
            active: true,
          },
        });
      }
    }
    let resultConn = new GradeAssignmentConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => GradeAssignment)
  async createGradeAssignment(
    @Arg('data') data: NewGradeAssignment,
    @Ctx() context: IContext
  ): Promise<GradeAssignment> {
    let dataProcess: NewGradeAssignment = removeEmptyStringElements(data);
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

  @Mutation(() => GradeAssignment)
  async updateGradeAssignment(
    @Arg('data') data: NewGradeAssignment,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<GradeAssignment | undefined> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
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
  async changeActiveGradeAssignment(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let updatedByUserId = context?.user?.authorization?.id;
    let result = await this.repository.findOne(id);
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
  async deleteGradeAssignment(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let data = await this.repository.findOne(id);
    let result = await this.repository.deleteOne({ _id: ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: GradeAssignment) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: GradeAssignment) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicGrade, { nullable: true })
  async academicGrade(@Root() data: GradeAssignment) {
    let id = data.academicGradeId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicGrade.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicAsignature, { nullable: true })
  async academicAsignature(@Root() data: GradeAssignment) {
    let id = data.academicAsignatureId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicAsignature.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: GradeAssignment) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOne(id);
      return result;
    }
    return null;
  }
}
