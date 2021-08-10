import { Field, InputType } from 'type-graphql';
import { AcademicAsignature } from './../../models/SchoolAdministrator/AcademicAsignature';

@InputType()
export class NewAcademicAsignature implements Partial<AcademicAsignature> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  abbreviation?: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  academicAreaId?: string;
}
