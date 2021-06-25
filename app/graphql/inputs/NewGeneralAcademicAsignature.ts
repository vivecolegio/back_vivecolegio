import { Field, InputType } from 'type-graphql';
import { GeneralAcademicAsignature } from '../models/GeneralAcademicAsignature';

@InputType()
export class NewGeneralAcademicAsignature implements Partial<GeneralAcademicAsignature> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  generalAcademicAreaId?: string;
}
