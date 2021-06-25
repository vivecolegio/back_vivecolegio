import { Field, InputType } from 'type-graphql';
import { GeneralAcademicCycle } from '../models/GeneralAcademicCycle';

@InputType()
export class NewGeneralAcademicCycle implements Partial<GeneralAcademicCycle> {
  @Field({ nullable: true })
  name?: string;
}
