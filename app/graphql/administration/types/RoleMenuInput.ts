import { InputType, Field } from 'type-graphql';
import { RoleMenu } from '../models/RoleMenu';
import { RoleInput } from './RoleInput';
import { MenuInput } from './MenuInput';

@InputType()
export class RoleMenuInput implements Partial<RoleMenu> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  roleInput?: RoleInput;

  @Field({ nullable: true })
  menuInput?: MenuInput;

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

  @Field({ nullable: true })
  auditAction?: Boolean;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  version?: number;
}
