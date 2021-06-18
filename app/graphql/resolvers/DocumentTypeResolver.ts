import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectID } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { removeEmptyStringElements } from '../../types';
import { NewDocumentType } from '../inputs/NewDocumentType';
import { IContext } from '../interfaces/IContext';
import { DocumentType, DocumentTypeConnection } from '../models/DocumentType';
import { User } from '../models/User';
import { ConnectionArgs } from '../pagination/relaySpecs';

@Resolver(DocumentType)
export class DocumentTypeResolver {
  @InjectRepository(DocumentType)
  private repository = getMongoRepository(DocumentType);

  @InjectRepository(User)
  private repositoryUser = getMongoRepository(User);

  @Query(() => DocumentType, { nullable: true })
  async getDocumentType(@Arg('id', () => String) id: string) {
    const result = await this.repository.findOne(id);
    return result;
  }

  @Query(() => DocumentTypeConnection)
  async getAllDocumentType(
    @Args() args: ConnectionArgs,
    @Arg('allData', () => Boolean) allData: Boolean,
    @Arg('orderCreated', () => Boolean) orderCreated: Boolean
  ): Promise<DocumentTypeConnection> {
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
    let resultConn = new DocumentTypeConnection();
    let resultConnection = connectionFromArraySlice(result, args, {
      sliceStart: 0,
      arrayLength: result.length,
    });
    resultConn = { ...resultConnection, totalCount: result.length };
    return resultConn;
  }

  @Mutation(() => DocumentType)
  async createDocumentType(
    @Arg('data') data: NewDocumentType,
    @Ctx() context: IContext
  ): Promise<DocumentType> {
    let dataProcess: NewDocumentType = removeEmptyStringElements(data);
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

  @Mutation(() => DocumentType)
  async updateDocumentType(
    @Arg('data') data: NewDocumentType,
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<DocumentType | undefined> {
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
  async changeActiveDocumentType(
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
  async createdByUser(@Root() data: DocumentType) {
    let id = data.createdByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedByUser(@Root() data: DocumentType) {
    let id = data.updatedByUserId;
    if (id !== null && id !== undefined) {
      const result = await this.repositoryUser.findOne(id);
      return result;
    }
    return null;
  }
}
