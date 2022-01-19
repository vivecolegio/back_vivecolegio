import { Field, ObjectType } from 'type-graphql';
import { Campus } from '../models/GeneralAdministrator/Campus';
import { Menu } from '../models/GeneralAdministrator/Menu';
import { Role } from '../models/GeneralAdministrator/Role';
import { School } from '../models/GeneralAdministrator/School';

@ObjectType({ description: 'The User model' })
export class Jwt {
  @Field({ nullable: true })
  jwt?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field((_type) => [School], { nullable: true })
  schools?: School[];

  @Field((_type) => [Campus], { nullable: true })
  campus?: Campus[];

  @Field({ nullable: true })
  role?: Role;

  @Field((_type) => [Menu], { nullable: true })
  roleMenus?: [Menu];
}
