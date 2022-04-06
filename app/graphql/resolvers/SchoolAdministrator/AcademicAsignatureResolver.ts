import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AcademicAreaRepository, AcademicAsignatureRepository, GeneralAcademicAsignatureRepository, SchoolRepository, UserRepository } from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewAcademicAsignature } from '../../inputs/SchoolAdministrator/NewAcademicAsignature';
import { IContext } from '../../interfaces/IContext';
import { GeneralAcademicAsignature } from '../../models/GeneralAdministrator/GeneralAcademicAsignature';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicArea } from '../../models/SchoolAdministrator/AcademicArea';
import {
  AcademicAsignature,
  AcademicAsignatureConnection
} from '../../models/SchoolAdministrator/AcademicAsignature';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AcademicAsignature)
export class AcademicAsignatureResolver {
  @InjectRepository(AcademicAsignature)
  private repository = AcademicAsignatureRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(AcademicArea)
  private repositoryAcademicArea = AcademicAreaRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(GeneralAcademicAsignature)
  private repositoryGeneralAcademicAsignature = GeneralAcademicAsignatureRepository;

  @Query(() => AcademicAsignature, { nullable: true })
  async getAcademicAsignature(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => AcademicAsignatureConnection)
  async getAllAcademicAsignature(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String,
    @Arg('academicAreaId', () => String, { nullable: true }) academicAreaId: string,
  ): Promise<AcademicAsignatureConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        if (academicAreaId) {
          result = await this.repository.findBy({
            where: { schoolId, academicAreaId },
            order: { createdAt: 'DESC' },
          });
        } else {
          result = await this.repository.findBy({
            where: { schoolId },
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (academicAreaId) {
          result = await this.repository.findBy({ where: { schoolId, academicAreaId } });
        } else {
          result = await this.repository.findBy({ where: { schoolId } });
        }
      }
    } else {
      if (orderCreated) {
        if (academicAreaId) {
          result = await this.repository.findBy({
            where: {
              schoolId,
              academicAreaId,
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
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (academicAreaId) {
          result = await this.repository.findBy({
            where: {
              schoolId, academicAreaId,
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
    let resultConn = new AcademicAsignatureConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => AcademicAsignature)
  async createAcademicAsignature(
    @Arg('data') data: NewAcademicAsignature,
    @Ctx() context: IContext
  ): Promise<AcademicAsignature> {
    let dataProcess: NewAcademicAsignature = removeEmptyStringElements(data);
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

  @Mutation(() => AcademicAsignature)
  async updateAcademicAsignature(
    @Arg('data') data: NewAcademicAsignature,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<AcademicAsignature | null> {
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
  async changeActiveAcademicAsignature(
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
  async deleteAcademicAsignature(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: AcademicAsignature) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: AcademicAsignature) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicArea, { nullable: true })
  async academicArea(@Root() data: AcademicAsignature) {
    let id = data.academicAreaId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicArea.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => GeneralAcademicAsignature, { nullable: true })
  async generalAcademicAsignature(@Root() data: AcademicAsignature) {
    let id = data.generalAcademicAsignatureId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGeneralAcademicAsignature.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: AcademicAsignature) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOneBy(id);
      return result;
    }
    return null;
  }
}
