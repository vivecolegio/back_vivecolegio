import { Field, InputType } from 'type-graphql';
import { SchoolAdministrator } from '../models/SchoolAdministrator';

@InputType()
export class NewSchoolAdministrator implements Partial<SchoolAdministrator> {
  @Field({ nullable: true })
  schoolId?: string;

  @Field({ nullable: true })
  userId?: string;
}
