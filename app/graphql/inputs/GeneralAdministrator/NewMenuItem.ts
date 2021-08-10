import { Field, InputType } from 'type-graphql';
import { MenuItem } from '../../models/GeneralAdministrator/MenuItem';

@InputType()
export class NewMenuItem implements Partial<MenuItem> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  sorting?: Number;

  @Field({ nullable: true })
  menuId?: string;

  @Field({ nullable: true })
  moduleId?: string;
}
