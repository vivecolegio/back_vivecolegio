import { Field, InputType } from 'type-graphql';
import { Menu } from '../models/Menu';

@InputType()
export class NewMenu implements Partial<Menu> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  sorting?: Number;

  @Field({ nullable: true })
  parentId?: string;

  @Field({ nullable: true })
  moduleId?: string;
}
