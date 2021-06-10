import { InputType, Field } from 'type-graphql';
import { AuditLogin } from '../models/AuditLogin';
import { UserInput } from './UserInput';

@InputType()
export class AuditLoginInput implements Partial<AuditLogin> {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  userInput?: UserInput;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  userIp?: string;

  @Field({ nullable: true })
  userPort?: string;

  @Field({ nullable: true })
  userAgent?: string;

  @Field({ nullable: true })
  auth?: Boolean;
}
