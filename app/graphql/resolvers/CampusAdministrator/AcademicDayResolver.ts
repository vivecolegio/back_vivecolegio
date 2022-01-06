import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewAcademicDay } from '../../inputs/CampusAdministrator/NewAcademicDay';
import { IContext } from '../../interfaces/IContext';
import { AcademicDay, AcademicDayConnection } from '../../models/CampusAdministrator/AcademicDay';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AcademicDay)
export class AcademicDayResolver {
  @InjectRepository(AcademicDay)
  private repository = getMongoRepository(AcademicDay);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(Campus)
  private repositoryCampus = getMongoRepository(Campus);

  @Query(() => AcademicDay, { nullable: true })
  async getAcademicDay(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => AcademicDayConnection)
  async getAllAcademicDay(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('campusId', () => String) campusId: String,
  ): Promise<AcademicDayConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.find({
          where: {
            campusId
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find({
          where: {
            campusId
          },
        });
      }
    } else {
      if (orderCreated) {
        result = await this.repository.find({
          where: {
            campusId,
            active: true,
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.find({
          where: {
            campusId,
            active: true,
          },
        });
      }
    }
    let resultConn = new AcademicDayConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => AcademicDay)
  async createAcademicDay(
    @Arg('data') data: NewAcademicDay,
    @Ctx() context: IContext
  ): Promise<AcademicDay> {
    let dataProcess: NewAcademicDay = removeEmptyStringElements(data);
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

  @Mutation(() => AcademicDay)
  async updateAcademicDay(
    @Arg('data') data: NewAcademicDay,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<AcademicDay | undefined> {
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
  async changeActiveAcademicDay(
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
  async deleteAcademicDay(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let data = await this.repository.findOne(id);
    let result = await this.repository.deleteOne({ _id: ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: AcademicDay) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: AcademicDay) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Campus, { nullable: true })
  async campus(@Root() data: AcademicDay) {
    let id = data.campusId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCampus.findOne(id);
      return result;
    }
    return null;
  }
}
