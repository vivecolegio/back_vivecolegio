import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
  AcademicDayRepository,
  AcademicGradeRepository,
  CampusRepository,
  CourseRepository,
  CursosRepository,
  SchoolRepository,
  StudentRepository,
  TeacherRepository,
  UserRepository,
} from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewCourse } from '../../inputs/CampusAdministrator/NewCourse';
import { IContext } from '../../interfaces/IContext';
import { AcademicDay } from '../../models/CampusAdministrator/AcademicDay';
import { Course, CourseConnection } from '../../models/CampusAdministrator/Course';
import { Teacher } from '../../models/CampusAdministrator/Teacher';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { School } from '../../models/GeneralAdministrator/School';
import { Student } from '../../models/GeneralAdministrator/Student';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicGrade } from '../../models/SchoolAdministrator/AcademicGrade';
import { ConnectionArgs } from '../../pagination/relaySpecs';
import { Cursos } from './../../models/Data/Cursos';

@Resolver(Course)
export class CourseResolver {
  @InjectRepository(Course)
  private repository = CourseRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(Campus)
  private repositoryCampus = CampusRepository;

  @InjectRepository(AcademicGrade)
  private repositoryAcademicGrade = AcademicGradeRepository;

  @InjectRepository(Student)
  private repositoryStudent = StudentRepository;

  @InjectRepository(AcademicDay)
  private repositoryAcademicDay = AcademicDayRepository;

  @InjectRepository(Teacher)
  private repositoryTeacher = TeacherRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(Cursos)
  private repositoryCursos = CursosRepository;

  @Query(() => Course, { nullable: true })
  async getCourse(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOneBy(id);
    return result;
  }

  @Query(() => CourseConnection)
  async getAllCourse(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
    @Arg('campusId', () => String) campusId: String,
    @Arg('schoolId', () => String, { nullable: true }) schoolId: String,
    @Arg('academicGradeId', () => String, { nullable: true }) academicGradeId: String
  ): Promise<CourseConnection> {
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
        if (academicGradeId) {
          result = await this.repository.findBy({
            where: {
              campusId: { $in: campusDataIds },
              academicGradeId,
            },
            order: { createdAt: 'DESC' },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              campusId: { $in: campusDataIds },
            },
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (academicGradeId) {
          result = await this.repository.findBy({
            where: {
              campusId: { $in: campusDataIds },
              academicGradeId,
            },
          });
        } else {
          result = await this.repository.findBy({
            where: {
              campusId: { $in: campusDataIds },
            },
          });
        }
      }
    } else {
      if (orderCreated) {
        if (academicGradeId) {
          result = await this.repository.findBy({
            where: {
              campusId: { $in: campusDataIds },
              academicGradeId,
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
            order: { createdAt: 'DESC' },
          });
        }
      } else {
        if (academicGradeId) {
          result = await this.repository.findBy({
            where: {
              campusId: { $in: campusDataIds },
              academicGradeId,
              active: true,
            },
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
    }
    let resultConn = new CourseConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => Course)
  async createCourse(@Arg('data') data: NewCourse, @Ctx() context: IContext): Promise<Course> {
    let dataProcess: NewCourse = removeEmptyStringElements(data);
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
  public async createAllInitialsCourse() {
    let schools = await this.repositorySchool.find();
    let count = 0;
    for (let school of schools) {
      let data = await this.repositoryCursos.findBy({
        where: { dane: school.daneCode },
      });
      for (let curso of data) {
        if (curso.jornada && curso.consecutivo && curso.dane && curso.grado_cod && curso.grupo) {
          if (
            curso.jornada.length > 1 &&
            curso.consecutivo.length > 1 &&
            curso.dane.length > 1 &&
            curso.grado_cod.length > 0 &&
            curso.grupo.length > 0
          ) {
            let campus = await this.repositoryCampus.findBy({
              where: { consecutive: curso.consecutivo },
            });
            // let academicDay = await this.repository.findBy({
            //   where: { campusId: campus[0].id.toString(), nameSIMAT: curso.jornada },
            // });
            //if (campus.length === 1 && academicDay.length === 1) {
            if (campus.length === 1) {
              let course = await this.repository.findBy({
                where: {
                  campusId: campus[0].id.toString(),
                  //academicDayId: academicDay[0].id.toString(),
                  grupoSIMAT: curso.grupo,
                  gradoCodSIMAT: curso.grado_cod,
                  jornadaSIMAT: curso.jornada,
                },
              });
              if (course.length === 0) {
                const model = await this.repository.create({
                  name: curso.grupo,
                  grupoSIMAT: curso.grupo,
                  gradoCodSIMAT: curso.grado_cod,
                  jornadaSIMAT: curso.jornada,
                  campusId: campus[0].id.toString(),
                  active: true,
                  version: 0,
                });
                let result = await this.repository.save(model);
                //console.log(model);
                count += 1;
                console.log(count);
              }
            }
          }
        }
      }
    }
    return true;
  }

  @Mutation(() => Course)
  async updateCourse(
    @Arg('data') data: NewCourse,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Course | null> {
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
  async changeActiveCourse(
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
  async deleteCourse(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    let data = await this.repository.findOneBy(id);
    let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: Course) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: Course) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Campus, { nullable: true })
  async campus(@Root() data: Course) {
    let id = data.campusId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryCampus.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicGrade, { nullable: true })
  async academicGrade(@Root() data: Course) {
    let id = data.academicGradeId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicGrade.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => AcademicDay, { nullable: true })
  async academicDay(@Root() data: Course) {
    let id = data.academicDayId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryAcademicDay.findOneBy(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => [Student], { nullable: true })
  async students(@Root() data: Course) {
    let ids = data.studentsId;
    if (ids !== null && ids !== undefined) {
      let dataIds: any[] = [];
      ids.forEach(async (id: any) => {
        dataIds.push(new ObjectId(id));
      });
      const result = await this.repositoryStudent.findBy({ where: { _id: { $in: dataIds } } });
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Teacher, { nullable: true })
  async teacher(@Root() data: Course) {
    let id = data.teacherId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryTeacher.findOneBy(id);
      return result;
    }
    return null;
  }
}
