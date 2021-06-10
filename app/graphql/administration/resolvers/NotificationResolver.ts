import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { Notification } from '../models/Notification';
import { NotificationInput } from '../types/NotificationInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CategoryNotification } from '../models/CategoryNotification';
import { User } from '../models/User';
import { Context } from './UserResolver';

@Resolver(Notification)
export class NotificationResolver {
  @InjectRepository(Notification)
  private notificationRepository = getMongoRepository(Notification);

  @InjectRepository(Notification)
  private categoryNotificationRepository = getMongoRepository(
    CategoryNotification
  );

  @InjectRepository(Notification)
  private userRepository = getMongoRepository(User);

  @Query(() => Notification, { nullable: true })
  getNotification(@Arg('id', () => String) id: number) {
    return this.notificationRepository.findOne(id);
  }

  @Query(() => [Notification])
  getAllNotifications(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }

  @Mutation(() => Notification)
  async createNotification(
    @Arg('data') data: NotificationInput,
    @Ctx() context: Context
  ): Promise<Notification> {
    let createdBy_id = context.user.authorization.id;
    let categoryNotification_id = data.categoryNotificationInput?.id
      ? data.categoryNotificationInput?.id
      : '';
    let user_id = data.userInput?.id ? data.userInput?.id : '';
    const model = await this.notificationRepository.create({
      ...data,
      categoryNotification_id,
      user_id,
      version: 1,
      createdBy_id,
    });
    return this.notificationRepository.save(model);
  }

  @Mutation(() => Notification)
  async updateNotification(
    @Arg('data') data: NotificationInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<Notification | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let notification = await this.notificationRepository.findOne(id);
    notification = await this.notificationRepository.save({
      _id: new ObjectID(id),
      ...notification,
      ...data,
      version: (notification?.version as number) + 1,
      updatedBy_id,
    });
    return notification;
  }

  @FieldResolver((_type) => CategoryNotification, { nullable: true })
  async categoryNotification(@Root() notification: Notification) {
    let data = notification.categoryNotification_id
      ? await this.categoryNotificationRepository.findOne(
          notification.categoryNotification_id
        )
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async user(@Root() notification: Notification) {
    let data = notification.user_id
      ? await this.userRepository.findOne(notification.user_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() notification: Notification) {
    let data = notification.createdBy_id
      ? await this.userRepository.findOne(notification.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() notification: Notification) {
    let data = notification.updatedBy_id
      ? await this.userRepository.findOne(notification.updatedBy_id)
      : null;
    return data;
  }
}
