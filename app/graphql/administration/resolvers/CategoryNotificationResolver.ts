import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';
import { CategoryNotification } from '../models/CategoryNotification';
import { CategoryNotificationInput } from '../types/CategoryNotificationInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from '../models/User';
import { Context } from './UserResolver';

@Resolver(CategoryNotification)
export class CategoryNotificationResolver {
  @InjectRepository(CategoryNotification)
  private categoryNotificationRepository = getMongoRepository(
    CategoryNotification
  );

  @InjectRepository(CategoryNotification)
  private userRepository = getMongoRepository(User);

  @Query(() => CategoryNotification, { nullable: true })
  getCategoryNotification(@Arg('id', () => String) id: number) {
    return this.categoryNotificationRepository.findOne(id);
  }

  @Query(() => [CategoryNotification])
  getAllCategoryNotifications(): Promise<CategoryNotification[]> {
    return this.categoryNotificationRepository.find();
  }

  @Mutation(() => CategoryNotification)
  async createCategoryNotification(
    @Arg('data') data: CategoryNotificationInput,
    @Ctx() context: Context
  ): Promise<CategoryNotification> {
    let createdBy_id = context.user.authorization.id;
    const model = await this.categoryNotificationRepository.create({
      ...data,
      version: 1,
      createdBy_id,
    });
    return this.categoryNotificationRepository.save(model);
  }

  @Mutation(() => CategoryNotification)
  async updateCategoryNotification(
    @Arg('data') data: CategoryNotificationInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<CategoryNotification | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let categoryNotification = await this.categoryNotificationRepository.findOne(
      id
    );
    categoryNotification = await this.categoryNotificationRepository.save({
      _id: new ObjectID(id),
      ...categoryNotification,
      ...data,
      version: (categoryNotification?.version as number) + 1,
      updatedBy_id,
    });
    return categoryNotification;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() categoryNotification: CategoryNotification) {
    let data = categoryNotification.createdBy_id
      ? await this.userRepository.findOne(categoryNotification.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() categoryNotification: CategoryNotification) {
    let data = categoryNotification.updatedBy_id
      ? await this.userRepository.findOne(categoryNotification.updatedBy_id)
      : null;
    return data;
  }
}
