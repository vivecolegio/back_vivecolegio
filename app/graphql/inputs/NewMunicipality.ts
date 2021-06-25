import { Field, InputType } from 'type-graphql';
import { Municipality } from '../models/Municipality';

@InputType()
export class NewMunicipality implements Partial<Municipality> {
  @Field({ nullable: true })
  name?: string;
}
