import { Field, InputType } from 'type-graphql';
import { SchoolYear } from '../../models/SchoolAdministrator/SchoolYear';

@InputType()
export class NewSchoolYear implements Partial<SchoolYear> {
  @Field({ nullable: true })
  schoolYear?: number;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  folioNumber?: number;
}
