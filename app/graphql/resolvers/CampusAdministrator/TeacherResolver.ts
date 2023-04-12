import bcrypt from 'bcrypt';
import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
  CampusRepository,
  PlantaDocenteRepository,
  SchoolRepository,
  TeacherRepository,
  UserRepository
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewTeacher } from '../../inputs/CampusAdministrator/NewTeacher';
import { NewUser } from '../../inputs/GeneralAdministrator/NewUser';
import { IContext } from '../../interfaces/IContext';
import { Teacher, TeacherConnection } from '../../models/CampusAdministrator/Teacher';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';
import { PlantaDocente } from './../../models/Data/PlantaDocente';

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

  @InjectRepository(PlantaDocente)
  private repositoryPlantaDocente = PlantaDocenteRepository;

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
    @Arg('schoolYearId', () => [String], { nullable: true }) schoolYearId: String[]
  ): Promise<TeacherConnection> {
    let result;
    if (allData) {
      if (orderCreated) {
        if (campusId) {
          result = await this.repository.findBy({
            where: { schoolId: { $in: schoolId }, campusId: { $in: campusId }, schoolYearId: { $in: schoolYearId } },
            order: { createdAt: 'DESC' },
          });
        } else {
          result = await this.repository.findBy({
            where: { schoolId: { $in: schoolId }, schoolYearId: { $in: schoolYearId } },
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (campusId) {
          result = await this.repository.findBy({
            where: { schoolId: { $in: schoolId }, campusId: { $in: campusId }, schoolYearId: { $in: schoolYearId } },
          });
        } else {
          result = await this.repository.findBy({ where: { schoolId: { $in: schoolId }, schoolYearId: { $in: schoolYearId } } });
        }
      }
    } else {
      if (orderCreated) {
        if (campusId) {
          result = await this.repository.findBy({
            where: {
              schoolId: { $in: schoolId },
              campusId: { $in: campusId },
              schoolYearId: { $in: schoolYearId },
              active: true,
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              schoolId: { $in: schoolId },
              schoolYearId: { $in: schoolYearId },
              active: true,
            },
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (campusId) {
          result = await this.repository.findBy({
            where: {
              schoolId: { $in: schoolId },
              campusId: { $in: campusId },
              schoolYearId: { $in: schoolYearId },
              active: true,
            },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              schoolId: { $in: schoolId },
              schoolYearId: { $in: schoolYearId },
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
    if (dataUserProcess.documentNumber != null) {
      let passwordHash = await bcrypt
        .hash(dataUserProcess.documentNumber, BCRYPT_SALT_ROUNDS)
        .then(function (hashedPassword: any) {
          return hashedPassword;
        });
      dataUserProcess.password = passwordHash;
    }
    const modelUser = await this.repositoryUser.create({
      ...dataUserProcess,
      username: dataUserProcess.documentNumber,
      active: true,
      version: 0,
      createdByUserId,
    });
    let resultUser = await this.repositoryUser.save(modelUser);
    const model = await this.repository.create({
      ...dataProcess,
      userId: resultUser.id.toString(),
      active: true,
      version: 0,
      createdByUserId,
    });
    let result = await this.repository.save(model);
    return result;
  }

  @Mutation(() => Boolean)
  public async createAllInitialsTeachers() {
    let schools = await this.repositorySchool.find();
    let count = 0;
    for (let school of schools) {
      let data = await this.repositoryPlantaDocente.findBy({
        where: { school_id: school.id.toString(), procesado: null },
      });
      for (let docente of data) {
        if (
          docente.documento &&
          docente.school_id &&
          docente.sede_dane &&
          docente.cargo === 'Docente'
        ) {
          if (
            docente.documento.length > 1 &&
            docente.school_id.length > 1 &&
            docente.sede_dane.length > 1
          ) {
            let user = await this.repositoryUser.findBy({ username: docente.documento });
            if (user.length === 0) {
              let campus = await this.repositoryCampus.findBy({
                where: { consecutive: docente.sede_dane },
              });
              if (campus.length === 1) {
                let passwordHash = await bcrypt
                  .hash(docente.documento ? docente.documento : 'VIVE2022', BCRYPT_SALT_ROUNDS)
                  .then(function (hashedPassword: any) {
                    return hashedPassword;
                  });
                let fechaNacimiento = docente.fechanacimiento?.split('/');
                const modelUser = await this.repositoryUser.create({
                  name: docente.empleado,
                  lastName: '',
                  username: docente.documento,
                  password: passwordHash,
                  documentNumber: docente.documento,
                  documentTypeId: '60cfc792445f133f9e261eae',
                  genderId:
                    docente.sexo == 'F' ? '60cfc51e445f133f9e261ead' : '60ecc36d6c716a21bee51e00',
                  birthdate: fechaNacimiento
                    ? new Date(
                      Number(fechaNacimiento[2]),
                      Number(fechaNacimiento[1]) - 1,
                      Number(fechaNacimiento[0])
                    )
                    : undefined,
                  phone: docente.telefono,
                  email: docente.email,
                  roleId: '619551da882a2fb6525a3079',
                  active: true,
                  version: 0,
                });
                //console.log(modelUser);
                let resultUser = await this.repositoryUser.save(modelUser);
                const model = await this.repository.create({
                  schoolId: [school.id.toString()],
                  campusId: [campus[0].id.toString()],
                  userId: resultUser.id.toString(),
                  active: true,
                  version: 0,
                });
                //console.log(model);
                let result = await this.repository.save(model);
                count += 1;
                //console.log(count);
              }
            } else {
              for (let use of user) {
                await this.repositoryUser.save({
                  _id: new ObjectId(use.id.toString()),
                  ...use,
                  documentNumber: use.username,
                  version: (use?.version as number) + 1,
                });
              }
              const model = await this.repositoryPlantaDocente.create({
                ...docente,
                procesado: true,
              });
              count += 1;
              //console.log(model);
              let result = await this.repositoryPlantaDocente.save(model);
              console.log('procesados ' + count);
            }
          }
        }
      }
    }
    return true;
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
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
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
    let ids = data.schoolId;
    if (ids !== null && ids !== undefined) {
      let dataIds: any[] = [];
      ids.forEach(async (id: any) => {
        dataIds.push(new ObjectId(id));
      });
      const result = await this.repositorySchool.findBy({ where: { _id: { $in: dataIds } } });
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [Campus], { nullable: true })
  async campus(@Root() data: Teacher) {
    let ids = data.campusId;
    if (ids !== null && ids !== undefined) {
      let dataIds: any[] = [];
      ids.forEach(async (id: any) => {
        dataIds.push(new ObjectId(id));
      });
      const result = await this.repositoryCampus.findBy({ where: { _id: { $in: dataIds } } });
      return result;
    }
    return null;
  }
}
