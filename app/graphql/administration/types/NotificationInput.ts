import { InputType, Field } from 'type-graphql';
import { Notification } from '../models/Notification';
import { CategoryNotificationInput } from './CategoryNotificationInput';
import { UserInput } from './UserInput';

@InputType()
export class NotificationInput implements Partial<Notification> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  categoryNotificationInput?: CategoryNotificationInput;

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
