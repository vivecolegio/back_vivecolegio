import { Field, InputType } from 'type-graphql';
import { AcademicHour } from '../../models/CampusAdministrator/AcademicHour';

@InputType()
export class NewAcademicHour implements Partial<AcademicHour> {
  @Field({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  academicDayId?: string;

  @Field({ nullable: true })
  startTime?: string;

  @Field({ nullable: true })
  endTime?: string;
}
