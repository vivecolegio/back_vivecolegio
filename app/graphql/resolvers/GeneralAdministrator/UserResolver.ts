import bcrypt from 'bcrypt';
import { connectionFromArraySlice } from 'graphql-relay';
import jsonwebtoken from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../../types';
import { NewUser } from '../../inputs/GeneralAdministrator/NewUser';
import { IContext } from '../../interfaces/IContext';
import { DocumentType } from '../../models/GeneralAdministrator/DocumentType';
import { Gender } from '../../models/GeneralAdministrator/Gender';
import { Menu } from '../../models/GeneralAdministrator/Menu';
import { Role } from '../../models/GeneralAdministrator/Role';
import { User, UserConnection } from '../../models/GeneralAdministrator/User';
import { Jwt } from '../../modelsUtils/Jwt';
import { ConnectionArgs } from '../../pagination/relaySpecs';

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
        user.roleId
          ? (jwtUtil.role = (await this.repositoryRole.findOne(user.roleId)) as Role)
          : null;
        if (user.roleId) {
          let menus = await this.repositoryMenu.find({
            where: { roleId: { $in: [user.roleId] }, active: true },
          });
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
      user.roleId
        ? (jwtUtil.role = (await this.repositoryRole.findOne(user.roleId)) as Role)
        : null;
      if (user.roleId) {
        let menus = await this.repositoryMenu.find({
          where: { roleId: { $in: [user.roleId] }, active: true },
        });
        jwtUtil.roleMenus = menus as [Menu];
      }
    }
    return jwtUtil;
  }
}
