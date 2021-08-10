import { Field, InputType } from 'type-graphql';
import { CampusAdministrator } from '../../models/SchoolAdministrator/CampusAdministrator';

@InputType()
export class NewCampusAdministrator implements Partial<CampusAdministrator> {
  @Field({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  userId?: string;
}
