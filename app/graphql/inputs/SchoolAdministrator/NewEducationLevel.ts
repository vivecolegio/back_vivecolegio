import { Field, InputType } from 'type-graphql';
import { EducationLevel } from '../../models/SchoolAdministrator/EducationLevel';

@InputType()
export class NewEducationLevel implements Partial<EducationLevel> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}
