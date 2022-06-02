import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { ObjectLiteral } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
  AcademicDayRepository,
  CampusRepository,
  JornadasRepository,
  SchoolRepository,
  UserRepository,
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { Day } from '../../enums/Day';
import { NewAcademicDay } from '../../inputs/CampusAdministrator/NewAcademicDay';
import { IContext } from '../../interfaces/IContext';
import { AcademicDay, AcademicDayConnection } from '../../models/CampusAdministrator/AcademicDay';
import { Jornadas } from '../../models/Data/Jornadas';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AcademicDay)
export class AcademicDayResolver {
  @InjectRepository(AcademicDay)
  private repository = AcademicDayRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(Campus)
  private repositoryCampus = CampusRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(Jornadas)
  private repositoryJornadas = JornadasRepository;

  @Query(() => AcademicDay, { nullable: true })
  async getAcademicDay(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => AcademicDayConnection)
  async getAllAcademicDay(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('campusId', () => String) campusId: String,
    @Arg('schoolId', () => String, { nullable: true }) schoolId: String
  ): Promise<AcademicDayConnection> {
    let result;
    let campusDataIds: any[] = [];
    if (schoolId) {
      const campusData = await this.repositoryCampus.findBy({ schoolId, active: true });
      campusData.forEach((campus: any) => {
        campusDataIds.push(campus.id.toString());
      });
    } else {
      campusDataIds.push(campusId);
    }
    if (allData) {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: {
            campusId: { $in: campusDataIds },
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.findBy({
          where: {
            campusId: { $in: campusDataIds },
          },
        });
      }
    } else {
      if (orderCreated) {
        result = await this.repository.findBy({
          where: {
            campusId: { $in: campusDataIds },
            active: true,
          },
          order: { createdAt: 'DESC' },
        });
      } else {
        result = await this.repository.findBy({
          where: {
            campusId: { $in: campusDataIds },
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

  @Mutation(() => Boolean)
  public async createAllInitialsAcademicDay() {
    let schools = await this.repositorySchool.find();
    let count = 0;
    let dataSaveBulk: ObjectLiteral[] = [];
    for (let school of schools) {
      let data = await this.repositoryJornadas.findBy({
        where: { dane: school.daneCode },
      });
      for (let jornada of data) {
        if (jornada.jornada && jornada.consecutivo && jornada.dane) {
          if (
            jornada.jornada.length > 1 &&
            jornada.consecutivo.length > 1 &&
            jornada.dane.length > 1
          ) {
            let campus = await this.repositoryCampus.findBy({
              where: { consecutive: jornada.consecutivo },
            });
            if (campus.length === 1) {
              let academicDay = await this.repository.findBy({
                where: { campusId: campus[0].id.toString(), nameSIMAT: jornada.jornada },
              });
              if (academicDay.length === 0) {
                //const model = await this.repository.create({
                const model = {
                  name: jornada.jornada,
                  nameSIMAT: jornada.jornada,
                  day: [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY],
                  campusId: campus[0].id.toString(),
                  active: true,
                  version: 0,
                };
                dataSaveBulk.push({ insertOne: { document: { ...model } } });
                //let result = await this.repository.save(model);
                //console.log(model);
                count += 1;
                //console.log(count);
              }
            }
          }
        }
      }
    }
    //console.log(dataSaveBulk);
    let result = await this.repository.bulkWrite(dataSaveBulk);
    return true;
  }

  @Mutation(() => AcademicDay)
  async updateAcademicDay(
    @Arg('data') data: NewAcademicDay,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<AcademicDay | null> {
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
  async changeActiveAcademicDay(
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
  async deleteAcademicDay(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: AcademicDay) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: AcademicDay) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Campus, { nullable: true })
  async campus(@Root() data: AcademicDay) {
    let id = data.campusId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCampus.findOneBy(id);
      return result;
    }
    return null;
  }
}
