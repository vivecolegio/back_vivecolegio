import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';
import { CategoryEmail } from '../models/CategoryEmail';
import { CategoryEmailInput } from '../types/CategoryEmailInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from '../models/User';
import { Context } from './UserResolver';

@Resolver(CategoryEmail)
export class CategoryEmailResolver {
  @InjectRepository(CategoryEmail)
  private categoryEmailRepository = getMongoRepository(CategoryEmail);

  @InjectRepository(CategoryEmail)
  private userRepository = getMongoRepository(User);

  @Query(() => CategoryEmail, { nullable: true })
  getCategoryEmail(@Arg('id', () => String) id: number) {
    return this.categoryEmailRepository.findOne(id);
  }

  @Query(() => [CategoryEmail])
  getAllCategoryEmails(): Promise<CategoryEmail[]> {
    return this.categoryEmailRepository.find();
  }

  @Mutation(() => CategoryEmail)
  async createCategoryEmail(
    @Arg('data') data: CategoryEmailInput,
    @Ctx() context: Context
  ): Promise<CategoryEmail> {
    let createdBy_id = context.user.authorization.id;
    const model = await this.categoryEmailRepository.create({
      ...data,
      version: 1,
      createdBy_id,
    });
    return this.categoryEmailRepository.save(model);
  }

  @Mutation(() => CategoryEmail)
  async updateCategoryEmail(
    @Arg('data') data: CategoryEmailInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<CategoryEmail | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let categoryEmail = await this.categoryEmailRepository.findOne(id);
    categoryEmail = await this.categoryEmailRepository.save({
      _id: new ObjectID(id),
      ...categoryEmail,
      ...data,
      version: (categoryEmail?.version as number) + 1,
      updatedBy_id,
    });
    return categoryEmail;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() categoryEmail: CategoryEmail) {
    let data = categoryEmail.createdBy_id
      ? await this.userRepository.findOne(categoryEmail.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() categoryEmail: CategoryEmail) {
    let data = categoryEmail.updatedBy_id
      ? await this.userRepository.findOne(categoryEmail.updatedBy_id)
      : null;
    return data;
  }
}
