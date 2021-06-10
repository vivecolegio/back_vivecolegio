import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import { Inbox } from '../models/Inbox';
import { InboxInput } from '../types/InboxInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from '../models/User';
import { Context } from './UserResolver';

@Resolver(Inbox)
export class InboxResolver {
  @InjectRepository(Inbox)
  private inboxRepository = getMongoRepository(Inbox);

  @InjectRepository(Inbox)
  private userRepository = getMongoRepository(User);

  @InjectRepository(Inbox)
  private transmitterRepository = getMongoRepository(User);

  @Query(() => Inbox, { nullable: true })
  getInbox(@Arg('id', () => String) id: number) {
    return this.inboxRepository.findOne(id);
  }

  @Query(() => [Inbox])
  getAllInboxs(): Promise<Inbox[]> {
    return this.inboxRepository.find();
  }

  @Mutation(() => Inbox)
  async createInbox(
    @Arg('data') data: InboxInput,
    @Ctx() context: Context
  ): Promise<Inbox> {
    let createdBy_id = context.user.authorization.id;
    let user_id = data.userInput?.id ? data.userInput?.id : '';
    let transmitter_id = data.transmitterInput?.id
      ? data.transmitterInput?.id
      : '';
    const model = await this.inboxRepository.create({
      ...data,
      user_id,
      transmitter_id,
      version: 1,
      createdBy_id,
    });
    return this.inboxRepository.save(model);
  }

  @Mutation(() => Inbox)
  async updateInbox(
    @Arg('data') data: InboxInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<Inbox | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let inbox = await this.inboxRepository.findOne(id);
    inbox = await this.inboxRepository.save({
      _id: new ObjectID(id),
      ...inbox,
      ...data,
      version: (inbox?.version as number) + 1,
      updatedBy_id,
    });
    return inbox;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async user(@Root() inbox: Inbox) {
    let data = inbox.user_id
      ? await this.userRepository.findOne(inbox.user_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async transmitter(@Root() inbox: Inbox) {
    let data = inbox.transmitter_id
      ? await this.transmitterRepository.findOne(inbox.transmitter_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async createdBy(@Root() inbox: Inbox) {
    let data = inbox.createdBy_id
      ? await this.userRepository.findOne(inbox.createdBy_id)
      : null;
    return data;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async updatedBy(@Root() inbox: Inbox) {
    let data = inbox.updatedBy_id
      ? await this.userRepository.findOne(inbox.updatedBy_id)
      : null;
    return data;
  }
}
