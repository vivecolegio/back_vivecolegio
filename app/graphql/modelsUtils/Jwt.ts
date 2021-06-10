import { ObjectType, Field } from 'type-graphql';
import { Role } from '../administration/models/Role';
import { RoleMenu } from '../administration/models/RoleMenu';

@ObjectType({ description: 'The User model' })
export class Jwt {
  @Field({ nullable: true })
  jwt?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  user_id?: string;

  @Field({ nullable: true })
  role?: Role;

  @Field((_type) => [RoleMenu], { nullable: true })
  roleMenus?: [RoleMenu];
}
