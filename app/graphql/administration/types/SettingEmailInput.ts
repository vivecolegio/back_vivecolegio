import { InputType, Field } from 'type-graphql';
import { SettingEmail } from '../models/SettingEmail';
import { UserInput } from './UserInput';
import { CategoryEmailInput } from './CategoryEmailInput';

@InputType()
export class SettingEmailInput implements Partial<SettingEmail> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  userInput?: UserInput;

  @Field({ nullable: true })
  categoryEmailInput?: CategoryEmailInput;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  version?: number;
}
