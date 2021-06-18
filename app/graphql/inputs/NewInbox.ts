import { Field, InputType } from 'type-graphql';
import { Inbox } from '../models/Inbox';

@InputType()
export class NewInbox implements Partial<Inbox> {
  @Field({ nullable: true })
  toId?: string;

  @Field({ nullable: true })
  fromId?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  dateSend?: Date;

  @Field({ nullable: true })
  dateRead?: Date;
}
