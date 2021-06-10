import { InputType, Field } from 'type-graphql';
import { Version } from '../models/Version';

@InputType()
export class VersionInput implements Partial<Version> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  number?: Number;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  version?: number;
}
