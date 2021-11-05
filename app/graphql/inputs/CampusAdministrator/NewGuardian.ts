import { Field, InputType } from 'type-graphql';
import { Guardian } from '../../models/CampusAdministrator/Guardian';
import { NewUser } from '../GeneralAdministrator/NewUser';

@InputType()
export class NewGuardian implements Partial<Guardian> {
  @Field({ nullable: true })
  schoolId?: string;

  @Field({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  studentsId?: string;

  @Field({ nullable: true })
  newUser?: NewUser;
}
