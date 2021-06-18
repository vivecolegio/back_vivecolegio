import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectID } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../types';
import { NewEmail } from '../inputs/NewEmail';
import { IContext } from '../interfaces/IContext';
import { Email, EmailConnection } from '../models/Email';
import { User } from '../models/User';
import { ConnectionArgs } from '../pagination/relaySpecs';

@Resolver(Email)
export class EmailResolver {
  @InjectRepository(Email)
  private repository = getMongoRepository(Email);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @Query(() => Email, { nullable: true })
  async getEmail(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => EmailConnection)
  async getAllEmail(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<EmailConnection> {
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
    let resultConn = new EmailConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => Email)
  async createEmail(@Arg('data') data: NewEmail, @Ctx() context: IContext): Promise<Email> {
    let dataProcess: NewEmail = removeEmptyStringElements(data);
    let createdByUserId = context.user.authorization.id;
    const model = await this.repository.create({
      ...dataProcess,
      active: true,
      version: 0,
      createdByUserId,
    });
    let result = await this.repository.save(model);
    return result;
  }

  @Mutation(() => Email)
  async updateEmail(
    @Arg('data') data: NewEmail,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Email | undefined> {
    let dataProcess = removeEmptyStringElements(data);
    let updatedByUserid = context.user.authorization.id;
    let result = await this.repository.findOne(id);
    result = await this.repository.save({
      _id: new ObjectID(id),
      ...result,
      ...dataProcess,
      version: (result?.version as number) + 1,
      updatedByUserid,
    });
    return result;
  }

  @Mutation(() => Boolean)
  async changeActiveEmail(
    @Arg('active', () => Boolean) active: boolean,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | undefined> {
    let updatedByUserid = context.user.authorization.id;
    let result = await this.repository.findOne(id);
    result = await this.repository.save({
      _id: new ObjectID(id),
      ...result,
      active: active,
      version: (result?.version as number) + 1,
      updatedByUserid,
    });
    if (result.id) {
      return true;
    } else {
      return false;
    }
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdByUser(@Root() data: Email) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: Email) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async to(@Root() data: Email) {
    let id = data.toId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }
}
