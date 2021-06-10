import { InputType, Field } from 'type-graphql';
import { Inbox } from '../models/Inbox';
import { UserInput } from './UserInput';

@InputType()
export class InboxInput implements Partial<Inbox> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  userInput?: UserInput;

  @Field({ nullable: true })
  transmitterInput?: UserInput;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  dateSend?: Date;

  @Field({ nullable: true })
  dateRead?: Date;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  version?: number;
}
