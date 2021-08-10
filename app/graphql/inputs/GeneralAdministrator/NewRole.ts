import { Field, InputType } from 'type-graphql';
import { Role } from '../../models/GeneralAdministrator/Role';

@InputType()
export class NewRole implements Partial<Role> {
  @Field({ nullable: true })
  name?: string;
}
