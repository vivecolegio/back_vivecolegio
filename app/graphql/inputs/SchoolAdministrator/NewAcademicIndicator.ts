import { Field, InputType } from 'type-graphql';
import { AcademicIndicator } from '../../models/SchoolAdministrator/AcademicIndicator';

@InputType()
export class NewAcademicIndicator implements Partial<AcademicIndicator> {
  @Field({ nullable: true })
  indicator?: string;

  @Field({ nullable: true })
  academicStandardId?: string;

  @Field({ nullable: true })
  academicAsignatureId?: string;

  @Field({ nullable: true })
  academicGradeId?: string;
}
