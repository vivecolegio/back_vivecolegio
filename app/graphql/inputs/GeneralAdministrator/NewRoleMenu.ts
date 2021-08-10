import { Field, InputType } from 'type-graphql';
import { RoleMenu } from '../../models/GeneralAdministrator/RoleMenu';

@InputType()
export class NewRoleMenu implements Partial<RoleMenu> {
  @Field({ nullable: true })
  roleId?: string;

  @Field({ nullable: true })
  menuId?: string;

  @Field({ nullable: true })
  createAction?: Boolean;

  @Field({ nullable: true })
  deleteAction?: Boolean;

  @Field({ nullable: true })
  updateAction?: Boolean;

  @Field({ nullable: true })
  readAction?: Boolean;

  @Field({ nullable: true })
  fullAccess?: Boolean;

  @Field({ nullable: true })
  activateAction?: Boolean;

  @Field({ nullable: true })
  inactiveAction?: Boolean;
}
