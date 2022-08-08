import { Field, InputType } from 'type-graphql';

import { AcademicAreaCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAreaCoursePeriodValuation';

@InputType()
export class NewAcademicAreaCoursePeriodValuation implements Partial<AcademicAreaCoursePeriodValuation> {
  @Field({ nullable: true })
  academicAreaId?: string;

  @Field({ nullable: true })
  academicPeriodId?: string;

  @Field({ nullable: true })
  studentId?: String;

  @Field({ nullable: true })
  assessment?: number;

  @Field({ nullable: true })
  performanceLevelId?: String;

}