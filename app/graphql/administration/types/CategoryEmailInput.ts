import { InputType, Field } from 'type-graphql';
import { CategoryEmail } from '../models/CategoryEmail';

@InputType()
export class CategoryEmailInput implements Partial<CategoryEmail> {
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
