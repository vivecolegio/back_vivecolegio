import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
  AcademicDayRepository,
  AcademicHourRepository,
  CampusRepository,
  UserRepository,
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewAcademicHour } from '../../inputs/CampusAdministrator/NewAcademicHour';
import { IContext } from '../../interfaces/IContext';
import { AcademicDay } from '../../models/CampusAdministrator/AcademicDay';
import {
  AcademicHour,
  AcademicHourConnection,
} from '../../models/CampusAdministrator/AcademicHour';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AcademicHour)
export class AcademicHourResolver {
  @InjectRepository(AcademicHour)
  private repository = AcademicHourRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(Campus)
  private repositoryCampus = CampusRepository;

  @InjectRepository(AcademicDay)
  private repositoryAcademicDay = AcademicDayRepository;

  @Query(() => AcademicHour, { nullable: true })
  async getAcademicHour(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => AcademicHourConnection)
  async getAllAcademicHour(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('campusId', () => String) campusId: String,
    @Arg('academicDayId', () => String, { nullable: true }) academicDayId: String
  ): Promise<AcademicHourConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        if (academicDayId) {
          result = await this.repository.findBy({
            where: {
              campusId,
              academicDayId,
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
      } else {
        if (academicDayId) {
          result = await this.repository.findBy({
            where: {
              campusId,
              academicDayId,
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
    } else {
      if (orderCreated) {
        if (academicDayId) {
          result = await this.repository.findBy({
            where: {
              campusId,
              academicDayId,
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
      } else {
        if (academicDayId) {
          result = await this.repository.findBy({
            where: {
              campusId,
              academicDayId,
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
    let resultConn = new AcademicHourConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => AcademicHour)
  async createAcademicHour(
    @Arg('data') data: NewAcademicHour,
    @Ctx() context: IContext
  ): Promise<AcademicHour> {
    let dataProcess: NewAcademicHour = removeEmptyStringElements(data);
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

  @Mutation(() => AcademicHour)
  async updateAcademicHour(
    @Arg('data') data: NewAcademicHour,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<AcademicHour | null> {
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
  async changeActiveAcademicHour(
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
  async deleteAcademicHour(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: AcademicHour) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: AcademicHour) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Campus, { nullable: true })
  async campus(@Root() data: AcademicHour) {
    let id = data.campusId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCampus.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicDay, { nullable: true })
  async academicDay(@Root() data: AcademicHour) {
    let id = data.academicDayId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicDay.findOneBy(id);
      return result;
    }
    return null;
  }
}
