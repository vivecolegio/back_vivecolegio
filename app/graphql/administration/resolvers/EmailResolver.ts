import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { Email } from '../models/Email';
import { EmailInput } from '../types/EmailInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CategoryEmail } from '../models/CategoryEmail';
import { User } from '../models/User';
import { Context } from './UserResolver';

@Resolver(Email)
export class EmailResolver {
  @InjectRepository(Email)
  private emailRepository = getMongoRepository(Email);

  @InjectRepository(Email)
  private categoryEmailRepository = getMongoRepository(CategoryEmail);

  @InjectRepository(Email)
  private userRepository = getMongoRepository(User);

  @Query(() => Email, { nullable: true })
  getEmail(@Arg('id', () => String) id: number) {
    return this.emailRepository.findOne(id);
  }

  @Query(() => [Email])
  getAllEmails(): Promise<Email[]> {
    return this.emailRepository.find();
  }

  @Mutation(() => Email)
  async createEmail(
    @Arg('data') data: EmailInput,
    @Ctx() context: Context
  ): Promise<Email> {
    let createdBy_id = context.user.authorization.id;
    let categoryEmail_id = data.categoryEmailInput?.id
      ? data.categoryEmailInput?.id
      : '';
    let user_id = data.userInput?.id ? data.userInput?.id : '';
    const model = await this.emailRepository.create({
      ...data,
      categoryEmail_id,
      user_id,
      version: 1,
      createdBy_id,
    });
    return this.emailRepository.save(model);
  }

  @Mutation(() => Email)
  async updateEmail(
    @Arg('data') data: EmailInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<Email | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let email = await this.emailRepository.findOne(id);
    email = await this.emailRepository.save({
      _id: new ObjectID(id),
      ...email,
      ...data,
      version: (email?.version as number) + 1,
      updatedBy_id,
    });
    return email;
  }

  @FieldResolver((_type) => CategoryEmail, { nullable: true })
  async categoryEmail(@Root() email: Email) {
    let data = email.categoryEmail_id
      ? await this.categoryEmailRepository.findOne(email.categoryEmail_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async user(@Root() email: Email) {
    let data = email.user_id
      ? await this.userRepository.findOne(email.user_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() email: Email) {
    let data = email.createdBy_id
      ? await this.userRepository.findOne(email.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() email: Email) {
    let data = email.updatedBy_id
      ? await this.userRepository.findOne(email.updatedBy_id)
      : null;
    return data;
  }
}
