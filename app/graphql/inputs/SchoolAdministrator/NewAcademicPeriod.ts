import { Field, InputType } from 'type-graphql';
import { AcademicPeriod } from '../../models/SchoolAdministrator/AcademicPeriod';

@InputType()
export class NewAcademicPeriod implements Partial<AcademicPeriod> {
  @Field({ nullable: true })
  schoolYearId?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  weight?: number;
}
