import { InputType, Field } from 'type-graphql';
import { User } from '../models/User';
import { RoleInput } from './RoleInput';
import { Gender, DocumentType } from '../enumTypes/UserEnumTypes';
@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  username?: string;

  @Field((_type) => Gender, { nullable: true })
  gender?: string;

  @Field((_type) => DocumentType, { nullable: true })
  documentType?: string;

  @Field({ nullable: true })
  documentNumber?: string;

  @Field({ nullable: true })
  birthdate?: Date;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  active?: Boolean;

  @Field({ nullable: true })
  roleInput?: RoleInput;

  @Field({ nullable: true })
  version?: number;
}
