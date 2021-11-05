import { Field, InputType } from 'type-graphql';
import { CampusCoordinator } from '../../models/SchoolAdministrator/CampusCoordinator';
import { NewUser } from '../GeneralAdministrator/NewUser';

@InputType()
export class NewCampusCoordinator implements Partial<CampusCoordinator> {
  @Field({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  schoolId?: string;

  @Field({ nullable: true })
  newUser?: NewUser;
}
