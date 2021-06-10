import { InputType, Field } from 'type-graphql';
import { Role } from '../models/Role';

@InputType()
export class RoleInput implements Partial<Role> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  version?: number;
}
