import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { User } from '../models/User';
import { UserInput } from '../types/UserInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import jwt from 'jsonwebtoken';
import { Jwt } from '../../modelsUtils/Jwt';
import bcrypt from 'bcrypt';
import { Role } from '../models/Role';
import { RoleMenu } from '../models/RoleMenu';

const BCRYPT_SALT_ROUNDS = 12;

export interface Context {
  user: {
    authorization: any;
    iat: any;
    exp: any;
    sub: any;
  };
}
@Resolver(User)
export class UserResolver {
  @InjectRepository(User)
  private userRepository = getMongoRepository(User);

  @InjectRepository(User)
  private roleRepository = getMongoRepository(Role);

  @InjectRepository(User)
  private roleMenuRepository = getMongoRepository(RoleMenu);

  @Query(() => User, { nullable: true })
  getUser(@Arg('id', () => String) id: number) {
    return this.userRepository.findOne(id);
  }

  @Query(() => [User])
  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Mutation(() => User)
  async createUser(
    @Arg('data') data: UserInput,
    @Ctx() context: Context
  ): Promise<User> {
    try {
      let createdBy_id = context.user.authorization.id;
      let role_id = data.roleInput?.id ? data.roleInput?.id : undefined;
      if (data.password != null) {
        let passwordHash = await bcrypt
          .hash(data.password, BCRYPT_SALT_ROUNDS)
          .then(function (hashedPassword) {
            return hashedPassword;
          });
        data.password = passwordHash;
      }
      const model = await this.userRepository.create({
        ...data,
        role_id,
        active: true,
        version: 1,
        createdBy_id,
      });
      return this.userRepository.save(model);
    } catch (err) {
      console.log(err);
      return new User();
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('data') data: UserInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<User | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let user = await this.userRepository.findOne(id);
    user = await this.userRepository.save({
      _id: new ObjectID(id),
      ...user,
      ...data,
      version: (user?.version as number) + 1,
      updatedBy_id,
    });
    return user;
  }

  @FieldResolver((_type) => Role, { nullable: true })
  async role(@Root() user: User) {
    let data = user.role_id
      ? await this.roleRepository.findOne(user.role_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() user: User) {
    let data = user.createdBy_id
      ? await this.userRepository.findOne(user.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() user: User) {
    let data = user.updatedBy_id
      ? await this.userRepository.findOne(user.updatedBy_id)
      : null;
    return data;
  }

  @Mutation(() => Jwt)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {
    let user = await this.userRepository.findOne({ where: { username } });
    let compare = await bcrypt.compare(password, user?.password as string);
    let jwtUtil = new Jwt();
    if (compare) {
      let jwtS = jwt.sign({ authorization: { id: user?.id } }, 'f1BtnWgD3VKY', {
        algorithm: 'HS256',
        subject: username,
        expiresIn: '1d',
      });
      if (user) {
        jwtUtil.name = user.name + ' ' + user.lastName;
        jwtUtil.user_id = user.id;
        user.role_id
          ? (jwtUtil.role = (await this.roleRepository.findOne(
              user.role_id
            )) as Role)
          : null;
        if (user.role_id) {
          let roleMenus = await this.roleMenuRepository.find({
            where: { role_id: user.role_id, active: true },
          });
          jwtUtil.roleMenus = roleMenus as [RoleMenu];
        }
        jwtUtil.jwt = jwtS;
      }
    }
    return jwtUtil;
  }
}
