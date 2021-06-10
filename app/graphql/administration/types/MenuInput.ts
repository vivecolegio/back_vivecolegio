import { InputType, Field } from 'type-graphql';
import { Menu } from '../models/Menu';
import { ModuleInput } from './ModuleInput';

@InputType()
export class MenuInput implements Partial<Menu> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  sorting?: Number;

  @Field({ nullable: true })
  parentInput?: MenuInput;

  @Field({ nullable: true })
  moduleInput?: ModuleInput;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  version?: number;
}
