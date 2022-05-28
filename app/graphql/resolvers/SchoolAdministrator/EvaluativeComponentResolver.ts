import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AcademicAreaRepository, AcademicAsignatureRepository, EvaluativeComponentRepository, SchoolRepository, UserRepository } from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewEvaluativeComponent } from '../../inputs/SchoolAdministrator/NewEvaluativeComponent';
import { IContext } from '../../interfaces/IContext';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicArea } from '../../models/SchoolAdministrator/AcademicArea';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import {
  EvaluativeComponent,
  EvaluativeComponentConnection
} from '../../models/SchoolAdministrator/EvaluativeComponent';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(EvaluativeComponent)
export class EvaluativeComponentResolver {
  @InjectRepository(EvaluativeComponent)
  private repository = EvaluativeComponentRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(AcademicAsignature)
  private repositoryAcademicAsignature = AcademicAsignatureRepository;

  @InjectRepository(AcademicArea)
  private repositoryAcademicArea = AcademicAreaRepository;

  @Query(() => EvaluativeComponent, { nullable: true })
  async getEvaluativeComponent(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => EvaluativeComponentConnection)
  async getAllEvaluativeComponent(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('schoolId', () => String) schoolId: String,
    @Arg('academicAsignatureId', () => String, { nullable: true }) academicAsignatureId: String,
  ): Promise<EvaluativeComponentConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        if (academicAsignatureId) {
          result = await this.repository.findBy({
            where: {
              schoolId, academicAsignatureId: { $in: [academicAsignatureId] }
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          result = await this.repository.findBy({
            where: { schoolId },
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (academicAsignatureId) {
          result = await this.repository.findBy({
            where: {
              schoolId, academicAsignatureId: { $in: [academicAsignatureId] }
            },
          });
        } else {
          result = await this.repository.findBy({
            where: { schoolId },
          });
        }
      }
    } else {
      if (orderCreated) {
        if (academicAsignatureId) {
          result = await this.repository.findBy({
            where: {
              schoolId, academicAsignatureId: { $in: [academicAsignatureId] },
              default: true,
              active: true
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              schoolId,
              default: true,
              active: true
            },
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (academicAsignatureId) {
          result = await this.repository.findBy({
            where: {
              schoolId, academicAsignatureId: { $in: [academicAsignatureId] },
              default: true,
              active: true
            },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              schoolId, default: true,
              active: true
            },
          });
        }
      }
    }
    let resultConn = new EvaluativeComponentConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => EvaluativeComponent)
  async createEvaluativeComponent(
    @Arg('data') data: NewEvaluativeComponent,
    @Ctx() context: IContext
  ): Promise<EvaluativeComponent> {
    let dataProcess: NewEvaluativeComponent = removeEmptyStringElements(data);
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

  @Mutation(() => EvaluativeComponent)
  async updateEvaluativeComponent(
    @Arg('data') data: NewEvaluativeComponent,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<EvaluativeComponent | null> {
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
  async changeActiveEvaluativeComponent(
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
  async deleteEvaluativeComponent(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: EvaluativeComponent) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: EvaluativeComponent) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => School, { nullable: true })
  async school(@Root() data: EvaluativeComponent) {
    let id = data.schoolId;
    if (id !== null && id !== undefined) {
      const result = await this.repositorySchool.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [AcademicAsignature], { nullable: true })
  async academicAsignatures(@Root() data: EvaluativeComponent) {
    let ids = data.academicAsignaturesId;
    if (ids !== null && ids !== undefined) {
      let dataIds: any[] = [];
      ids.forEach(async (id: any) => {
        dataIds.push(new ObjectId(id));
      });
      const result = await this.repositoryAcademicAsignature.findBy({ where: { _id: { $in: dataIds } } });
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [AcademicArea], { nullable: true })
  async academicAreas(@Root() data: EvaluativeComponent) {
    let ids = data.academicAreasId;
    if (ids !== null && ids !== undefined) {
      let dataIds: any[] = [];
      ids.forEach(async (id: any) => {
        dataIds.push(new ObjectId(id));
      });
      const result = await this.repositoryAcademicArea.findBy({ where: { _id: { $in: dataIds } } });
      return result;
    }
    return null;
  }
}
