import { Field, InputType } from 'type-graphql';
import { AcademicDay } from '../../models/CampusAdministrator/AcademicDay';

@InputType()
export class NewAcademicDay implements Partial<AcademicDay> {
  @Field({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  workingDay?: string;

  @Field({ nullable: true })
  typeDay?: string;
}
