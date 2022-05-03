import { Field, InputType } from 'type-graphql';
import { School } from '../../models/GeneralAdministrator/School';

@InputType()
export class NewSchool implements Partial<School> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  daneCode?: string;

  @Field({ nullable: true })
  pedagogicalModel?: string;

  @Field({ nullable: true })
  educationalModel?: string;

  @Field({ nullable: true })
  curricularComponent?: string;
}
