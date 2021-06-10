import { InputType, Field } from 'type-graphql';
import { Email } from '../models/Email';
import { CategoryEmailInput } from './CategoryEmailInput';
import { UserInput } from './UserInput';

@InputType()
export class EmailInput implements Partial<Email> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  categoryEmailInput?: CategoryEmailInput;

  @Field({ nullable: true })
  userInput?: UserInput;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  dateSend?: Date;

  @Field({ nullable: true })
  dateRead?: Date;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  version?: number;
}
