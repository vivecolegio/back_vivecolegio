import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { SettingEmail } from '../models/SettingEmail';
import { SettingEmailInput } from '../types/SettingEmailInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from '../models/User';
import { CategoryEmail } from '../models/CategoryEmail';
import { Context } from './UserResolver';

@Resolver(SettingEmail)
export class SettingEmailResolver {
  @InjectRepository(SettingEmail)
  private settingEmailRepository = getMongoRepository(SettingEmail);

  @InjectRepository(SettingEmail)
  private userRepository = getMongoRepository(User);

  @InjectRepository(SettingEmail)
  private categoryEmailRepository = getMongoRepository(CategoryEmail);

  @Query(() => SettingEmail, { nullable: true })
  getSettingEmail(@Arg('id', () => String) id: number) {
    return this.settingEmailRepository.findOne(id);
  }

  @Query(() => [SettingEmail])
  getAllSettingEmails(): Promise<SettingEmail[]> {
    return this.settingEmailRepository.find();
  }

  @Mutation(() => SettingEmail)
  async createSettingEmail(
    @Arg('data') data: SettingEmailInput,
    @Ctx() context: Context
  ): Promise<SettingEmail> {
    let createdBy_id = context.user.authorization.id;
    let user_id = data.userInput?.id ? data.userInput?.id : '';
    let categoryEmail_id = data.categoryEmailInput?.id
      ? data.categoryEmailInput?.id
      : '';
    const model = await this.settingEmailRepository.create({
      ...data,
      user_id,
      categoryEmail_id,
      version: 1,
      createdBy_id,
    });
    return this.settingEmailRepository.save(model);
  }

  @Mutation(() => SettingEmail)
  async updateSettingEmail(
    @Arg('data') data: SettingEmailInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<SettingEmail | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let settingEmail = await this.settingEmailRepository.findOne(id);
    settingEmail = await this.settingEmailRepository.save({
      _id: new ObjectID(id),
      ...settingEmail,
      ...data,
      version: (settingEmail?.version as number) + 1,
      updatedBy_id,
    });
    return settingEmail;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async user(@Root() settingEmail: SettingEmail) {
    let data = settingEmail.user_id
      ? await this.userRepository.findOne(settingEmail.user_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => CategoryEmail, { nullable: true })
  async categoryEmail(@Root() settingEmail: SettingEmail) {
    let data = settingEmail.categoryEmail_id
      ? await this.categoryEmailRepository.findOne(
          settingEmail.categoryEmail_id
        )
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() settingEmail: SettingEmail) {
    let data = settingEmail.createdBy_id
      ? await this.userRepository.findOne(settingEmail.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() settingEmail: SettingEmail) {
    let data = settingEmail.updatedBy_id
      ? await this.userRepository.findOne(settingEmail.updatedBy_id)
      : null;
    return data;
  }
}
