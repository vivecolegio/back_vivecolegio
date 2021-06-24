import { Field, ObjectType } from 'type-graphql';
import { Role } from '../models/Role';
import { RoleMenu } from '../models/RoleMenu';

@ObjectType({ description: 'The User model' })
export class Jwt {
  @Field({ nullable: true })
  jwt?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  role?: Role;

  @Field((_type) => [RoleMenu], { nullable: true })
  roleMenus?: [RoleMenu];
}
