import { Field, InputType } from 'type-graphql';
import { Course } from '../../models/CampusAdministrator/Course';

@InputType()
export class NewCourse implements Partial<Course> {
  @Field({ nullable: true })
  campusId?: string;
}
