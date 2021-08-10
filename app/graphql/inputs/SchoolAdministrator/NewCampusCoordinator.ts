import { Field, InputType } from 'type-graphql';
import { CampusCoordinator } from '../../models/SchoolAdministrator/CampusCoordinator';

@InputType()
export class NewCampusCoordinator implements Partial<CampusCoordinator> {
  @Field({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  userId?: string;
}
