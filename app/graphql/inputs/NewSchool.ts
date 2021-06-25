import { Field, InputType } from 'type-graphql';
import { School } from '../models/School';

@InputType()
export class NewSchool implements Partial<School> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  daneCode?: string;
}
