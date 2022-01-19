import { Field, InputType } from 'type-graphql';
import { Course } from '../../models/CampusAdministrator/Course';

@InputType()
export class NewCourse implements Partial<Course> {
  @Field({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  academicGradeId?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  order?: string;
}
