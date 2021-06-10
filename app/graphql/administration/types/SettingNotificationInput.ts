import { InputType, Field } from 'type-graphql';
import { SettingNotification } from '../models/SettingNotification';
import { UserInput } from './UserInput';
import { CategoryNotificationInput } from './CategoryNotificationInput';

@InputType()
export class SettingNotificationInput implements Partial<SettingNotification> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  userInput?: UserInput;

  @Field({ nullable: true })
  categoryNotificationInput?: CategoryNotificationInput;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  version?: number;
}
