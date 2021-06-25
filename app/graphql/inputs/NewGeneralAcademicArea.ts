import { Field, InputType } from 'type-graphql';
import { GeneralAcademicArea } from '../models/GeneralAcademicArea';

@InputType()
export class NewGeneralAcademicArea implements Partial<GeneralAcademicArea> {
  @Field({ nullable: true })
  name?: string;
}
