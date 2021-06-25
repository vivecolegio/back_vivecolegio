import { Field, InputType } from 'type-graphql';
import { GeneralAcademicGrade } from '../models/GeneralAcademicGrade';

@InputType()
export class NewGeneralAcademicGrade implements Partial<GeneralAcademicGrade> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  cycleId?: string;
}
