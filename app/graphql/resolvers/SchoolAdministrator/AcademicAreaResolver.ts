import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewAcademicArea } from '../../inputs/SchoolAdministrator/NewAcademicArea';
import { IContext } from '../../interfaces/IContext';
import { GeneralAcademicArea } from '../../models/GeneralAdministrator/GeneralAcademicArea';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import {
  AcademicArea,
  AcademicAreaConnection
} from '../../models/SchoolAdministrator/AcademicArea';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AcademicArea)
export class AcademicAreaResolver {
  @InjectRepository(AcademicArea)
  private repository = getMongoRepository(AcademicArea);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @InjectRepository(GeneralAcademicArea)
  private repositoryGeneralAcademicArea = getMongoRepository(GeneralAcademicArea);

  @InjectRepository(School)
  private repositorySchool = getMongoRepository(School);

  @Query(() => AcademicArea, { nullable: true })
  async getAcademicArea(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => AcademicAreaConnection)
  async getAllAcademicArea(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String,
  ): Promise<AcademicAreaConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: {
            schoolId,
          },
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
    let resultConn = new AcademicAreaConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => AcademicArea)
  async createAcademicArea(
    @Arg('data') data: NewAcademicArea,
    @Ctx() context: IContext
  ): Promise<AcademicArea> {
    let dataProcess: NewAcademicArea = removeEmptyStringElements(data);
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

  @Mutation(() => AcademicArea)
  async updateAcademicArea(
    @Arg('data') data: NewAcademicArea,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<AcademicArea | null> {
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
  async changeActiveAcademicArea(
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
  async deleteAcademicArea(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: AcademicArea) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: AcademicArea) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => GeneralAcademicArea, { nullable: true })
  async generalAcademicArea(@Root() data: AcademicArea) {
    let id = data.generalAcademicAreaId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGeneralAcademicArea.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: AcademicArea) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOneBy(id);
      return result;
    }
    return null;
  }
}
