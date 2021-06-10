import { InputType, Field } from 'type-graphql';
import { Module } from '../models/Module';

@InputType()
export class ModuleInput implements Partial<Module> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  version?: number;
}
