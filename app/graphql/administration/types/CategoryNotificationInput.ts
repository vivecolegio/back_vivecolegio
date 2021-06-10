import { InputType, Field } from 'type-graphql';
import { CategoryNotification } from '../models/CategoryNotification';

@InputType()
export class CategoryNotificationInput
  implements Partial<CategoryNotification> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  titleTemplate?: string;

  @Field({ nullable: true })
  messageTemplate?: string;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  version?: number;
}
