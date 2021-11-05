import { Field, InputType } from 'type-graphql';
import { CampusAdministrator } from '../../models/SchoolAdministrator/CampusAdministrator';
import { NewUser } from '../GeneralAdministrator/NewUser';

@InputType()
export class NewCampusAdministrator implements Partial<CampusAdministrator> {
  @Field({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  schoolId?: string;

  @Field({ nullable: true })
  newUser?: NewUser;
}
