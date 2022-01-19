import bcrypt from 'bcrypt';
import { connectionFromArraySlice } from 'graphql-relay';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import jsonwebtoken from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { finished } from 'stream/promises';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewUser } from '../../inputs/GeneralAdministrator/NewUser';
import { IContext } from '../../interfaces/IContext';
import { Guardian } from '../../models/CampusAdministrator/Guardian';
import { Teacher } from '../../models/CampusAdministrator/Teacher';
import { DocumentType } from '../../models/GeneralAdministrator/DocumentType';
import { Gender } from '../../models/GeneralAdministrator/Gender';
import { Menu } from '../../models/GeneralAdministrator/Menu';
import { MenuItem } from '../../models/GeneralAdministrator/MenuItem';
import { Role } from '../../models/GeneralAdministrator/Role';
import { School } from '../../models/GeneralAdministrator/School';
import { SchoolAdministrator } from '../../models/GeneralAdministrator/SchoolAdministrator';
import { Student } from '../../models/GeneralAdministrator/Student';
import { User, UserConnection } from '../../models/GeneralAdministrator/User';
import { CampusAdministrator } from '../../models/SchoolAdministrator/CampusAdministrator';
import { CampusCoordinator } from '../../models/SchoolAdministrator/CampusCoordinator';
import { Jwt } from '../../modelsUtils/Jwt';
import { ConnectionArgs } from '../../pagination/relaySpecs';
import { Campus } from './../../models/GeneralAdministrator/Campus';

const BCRYPT_SALT_ROUNDS = 12;


@Resolver(User)
export class UserResolver {
  @InjectRepository(User)
  private repository = getMongoRepository(User);

  @InjectRepository(Gender)
  private repositoryGender = getMongoRepository(Gender);

  @InjectRepository(DocumentType)
  private repositoryDocumentType = getMongoRepository(DocumentType);

  @InjectRepository(Role)
  private repositoryRole = getMongoRepository(Role);

  @InjectRepository(Menu)
  private repositoryMenu = getMongoRepository(Menu);

  @InjectRepository(MenuItem)
  private repositoryMenuItem = getMongoRepository(MenuItem);

  @InjectRepository(SchoolAdministrator)
  private repositorySchoolAdministrator = getMongoRepository(SchoolAdministrator);

  @InjectRepository(CampusAdministrator)
  private repositoryCampusAdministrator = getMongoRepository(CampusAdministrator);

  @InjectRepository(CampusCoordinator)
  private repositoryCampusCoordinator = getMongoRepository(CampusCoordinator);

  @InjectRepository(Student)
  private repositoryStudent = getMongoRepository(Student);

  @InjectRepository(Teacher)
  private repositoryTeacher = getMongoRepository(Teacher);

  @InjectRepository(Guardian)
  private repositoryGuardian = getMongoRepository(Guardian);

  @InjectRepository(Campus)
  private repositoryCampus = getMongoRepository(Campus);

  @InjectRepository(School)
  private repositorySchool = getMongoRepository(School);

  @Query(() => User, { nullable: true })
  async getUser(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => UserConnection)
  async getAllUser(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<UserConnection> {
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
    let resultConn = new UserConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: NewUser, @Ctx() context: IContext): Promise<User> {
    let dataProcess: NewUser = removeEmptyStringElements(data);
    let createdByUserId = context?.user?.authorization?.id;
    if (data.password != null) {
      let passwordHash = await bcrypt
        .hash(data.password, BCRYPT_SALT_ROUNDS)
        .then(function (hashedPassword) {
          return hashedPassword;
        });
      data.password = passwordHash;
    }
    const model = await this.repository.create({
      ...dataProcess,
      active: true,
      version: 0,
      createdByUserId,
    });
    let result = await this.repository.save(model);
    return result;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('data') data: NewUser,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<User | undefined> {
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
  async changeActiveUser(
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
  async deleteUser(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let data = await this.repository.findOne(id);
    let result = await this.repository.deleteOne({ _id: ObjectId(id) });
    return result?.result?.ok === 1 ?? true;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: User) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repository.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: User) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repository.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Gender, { nullable: true })
  async gender(@Root() data: User) {
    let id = data.genderId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryGender.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => DocumentType, { nullable: true })
  async documentType(@Root() data: User) {
    let id = data.documentTypeId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryDocumentType.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => Role, { nullable: true })
  async role(@Root() data: User) {
    let id = data.roleId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryRole.findOne(id);
      return result;
    }
    return null;
  }

  @Mutation(() => Jwt)
  async login(@Arg('username') username: string, @Arg('password') password: string) {
    let user = await this.repository.findOne({ where: { username } });
    let compare = await bcrypt.compare(password, user?.password as string);
    let jwtUtil = new Jwt();
    if (compare) {
      let jwtS = jsonwebtoken.sign({ authorization: { id: user?.id } }, 'f1BtnWgD3VKY', {
        algorithm: 'HS256',
        subject: username,
        expiresIn: '1d',
      });
      if (user) {
        jwtUtil.name = user.name + ' ' + user.lastName;
        jwtUtil.userId = user.id;
        let role = (await this.repositoryRole.findOne(user.roleId)) as Role;
        user.roleId ? (jwtUtil.role = role) : null;
        let campusId;
        let schoolId;
        if (role.isSchoolAdministrator) {
          let userRole = await this.repositorySchoolAdministrator.find({
            where: { userId: user.id.toString() },
          });
          if (userRole && userRole.length > 0) {
            schoolId = userRole[0].schoolId;
          }
        }
        if (role.isCampusAdministrator) {
          let userRole = await this.repositoryCampusAdministrator.find({
            where: { userId: user.id.toString() },
          });
          if (userRole && userRole.length > 0) {
            schoolId = userRole[0].schoolId;
            campusId = userRole[0].campusId;
          }
        }
        if (role.isCampusCoordinator) {
          let userRole = await this.repositoryCampusCoordinator.find({
            where: { userId: user.id.toString() },
          });
          if (userRole && userRole.length > 0) {
            schoolId = userRole[0].schoolId;
            campusId = userRole[0].campusId;
          }
        }
        if (role.isStudent) {
          let userRole = await this.repositoryStudent.find({
            where: { userId: user.id.toString() },
          });
          if (userRole && userRole.length > 0) {
            schoolId = userRole[0].schoolId;
            campusId = userRole[0].campusId;
          }
        }
        if (role.isTeacher) {
          let userRole = await this.repositoryTeacher.find({
            where: { userId: user.id.toString() },
          });
          if (userRole && userRole.length > 0) {
            schoolId = userRole[0].schoolId;
            campusId = userRole[0].campusId;
          }
        }
        if (role.isGuardian) {
          let userRole = await this.repositoryGuardian.find({
            where: { userId: user.id.toString() },
          });
          if (userRole && userRole.length > 0) {
            schoolId = userRole[0].schoolId;
            campusId = userRole[0].campusId;
          }
        }
        let campus = await this.repositoryCampus.findOne(campusId);
        let school = await this.repositorySchool.findOne(schoolId);
        if (campus) {
          jwtUtil.campus = [campus];
        }
        if (school) {
          jwtUtil.schools = [school];
        }
        if (user.roleId) {
          let menus = await this.repositoryMenu.find({
            where: { rolesId: { $in: [user.roleId] }, active: true },
            order: { order: 'ASC' },
          });
          for (let index = 0; index < menus.length; index++) {
            let menusItems = await this.repositoryMenuItem.find({
              where: {
                menuId: menus[index].id.toString(),
                rolesId: { $in: [user?.roleId] },
                active: true,
              },
              order: { order: 'ASC' },
            });
            menus[index].menuItemsLogin = menusItems as [MenuItem];
          }
          jwtUtil.roleMenus = menus as [Menu];
        }
        jwtUtil.jwt = jwtS;
      }
    }
    return jwtUtil;
  }

  @Query(() => Jwt)
  async me(@Ctx() context: IContext) {
    let userId = context?.user?.authorization?.id;
    let user = await this.repository.findOne(userId);
    let jwtUtil = new Jwt();
    if (user) {
      jwtUtil.name = user.name + ' ' + user.lastName;
      jwtUtil.userId = user.id;
      let role = (await this.repositoryRole.findOne(user.roleId)) as Role;
      user.roleId ? (jwtUtil.role = role) : null;
      let campusId;
      let schoolId;
      if (role.isSchoolAdministrator) {
        let userRole = await this.repositorySchoolAdministrator.find({
          where: { userId: user.id.toString() },
        });
        if (userRole && userRole.length > 0) {
          schoolId = userRole[0].schoolId;
        }
      }
      if (role.isCampusAdministrator) {
        let userRole = await this.repositoryCampusAdministrator.find({
          where: { userId: user.id.toString() },
        });
        if (userRole && userRole.length > 0) {
          schoolId = userRole[0].schoolId;
          campusId = userRole[0].campusId;
        }
      }
      if (role.isCampusCoordinator) {
        let userRole = await this.repositoryCampusCoordinator.find({
          where: { userId: user.id.toString() },
        });
        if (userRole && userRole.length > 0) {
          schoolId = userRole[0].schoolId;
          campusId = userRole[0].campusId;
        }
      }
      if (role.isStudent) {
        let userRole = await this.repositoryStudent.find({
          where: { userId: user.id.toString() },
        });
        if (userRole && userRole.length > 0) {
          schoolId = userRole[0].schoolId;
          campusId = userRole[0].campusId;
        }
      }
      if (role.isTeacher) {
        let userRole = await this.repositoryTeacher.find({
          where: { userId: user.id.toString() },
        });
        if (userRole && userRole.length > 0) {
          schoolId = userRole[0].schoolId;
          campusId = userRole[0].campusId !== undefined ? userRole[0].campusId[0] : "";
        }
      }
      if (role.isGuardian) {
        let userRole = await this.repositoryGuardian.find({
          where: { userId: user.id.toString() },
        });
        if (userRole && userRole.length > 0) {
          schoolId = userRole[0].schoolId;
          campusId = userRole[0].campusId;
        }
      }
      let campus = await this.repositoryCampus.findOne(campusId);
      let school = await this.repositorySchool.findOne(schoolId);
      if (campus) {
        jwtUtil.campus = [campus];
      }
      if (school) {
        jwtUtil.schools = [school];
      }
      if (user.roleId) {
        let menus = await this.repositoryMenu.find({
          where: { rolesId: { $in: [user.roleId] }, active: true },
          order: { order: 'ASC' },
        });
        for (let index = 0; index < menus.length; index++) {
          let menusItems = await this.repositoryMenuItem.find({
            where: {
              menuId: menus[index].id.toString(),
              rolesId: { $in: [user?.roleId] },
              active: true,
            },
            order: { order: 'ASC' },
          });
          menus[index].menuItemsLogin = menusItems as [MenuItem];
        }
        jwtUtil.roleMenus = menus as [Menu];
      }
    }
    return jwtUtil;
  }

  @Mutation(() => Boolean)
  async singleUpload(@Arg('id', () => String) id: string, @Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload) {
    if (file?.filename) {
      var fs = require('fs');
      var dir = './public/uploads/users/profile/' + id;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const stream = file?.createReadStream();
      const out = fs.createWriteStream(dir + "/" + file?.filename);
      stream.pipe(out);
      await finished(out);
      // return { filename, mimetype, encoding };
      return true;
    } else {
      return false;
    }
  }
}
