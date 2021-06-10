import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { SettingNotification } from '../models/SettingNotification';
import { SettingNotificationInput } from '../types/SettingNotificationInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from '../models/User';
import { CategoryNotification } from '../models/CategoryNotification';
import { Context } from './UserResolver';

@Resolver(SettingNotification)
export class SettingNotificationResolver {
  @InjectRepository(SettingNotification)
  private settingNotificationRepository = getMongoRepository(
    SettingNotification
  );

  @InjectRepository(SettingNotification)
  private userRepository = getMongoRepository(User);

  @InjectRepository(SettingNotification)
  private categoryNotificationRepository = getMongoRepository(
    CategoryNotification
  );

  @Query(() => SettingNotification, { nullable: true })
  getSettingNotification(@Arg('id', () => String) id: number) {
    return this.settingNotificationRepository.findOne(id);
  }

  @Query(() => [SettingNotification])
  getAllSettingNotifications(): Promise<SettingNotification[]> {
    return this.settingNotificationRepository.find();
  }

  @Mutation(() => SettingNotification)
  async createSettingNotification(
    @Arg('data') data: SettingNotificationInput,
    @Ctx() context: Context
  ): Promise<SettingNotification> {
    let createdBy_id = context.user.authorization.id;
    let user_id = data.userInput?.id ? data.userInput?.id : '';
    let categoryNotification_id = data.categoryNotificationInput?.id
      ? data.categoryNotificationInput?.id
      : '';
    const model = await this.settingNotificationRepository.create({
      ...data,
      user_id,
      categoryNotification_id,
      version: 1,
      createdBy_id,
    });
    return this.settingNotificationRepository.save(model);
  }

  @Mutation(() => SettingNotification)
  async updateSettingNotification(
    @Arg('data') data: SettingNotificationInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<SettingNotification | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let settingNotification = await this.settingNotificationRepository.findOne(
      id
    );
    settingNotification = await this.settingNotificationRepository.save({
      _id: new ObjectID(id),
      ...settingNotification,
      ...data,
      version: (settingNotification?.version as number) + 1,
      updatedBy_id,
    });
    return settingNotification;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async user(@Root() settingNotification: SettingNotification) {
    let data = settingNotification.user_id
      ? await this.userRepository.findOne(settingNotification.user_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => CategoryNotification, { nullable: true })
  async categoryNotification(@Root() settingNotification: SettingNotification) {
    let data = settingNotification.categoryNotification_id
      ? await this.categoryNotificationRepository.findOne(
          settingNotification.categoryNotification_id
        )
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() settingNotification: SettingNotification) {
    let data = settingNotification.createdBy_id
      ? await this.userRepository.findOne(settingNotification.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() settingNotification: SettingNotification) {
    let data = settingNotification.updatedBy_id
      ? await this.userRepository.findOne(settingNotification.updatedBy_id)
      : null;
    return data;
  }
}
