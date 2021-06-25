import { Field, InputType } from 'type-graphql';
import { Student } from '../models/Student';

@InputType()
export class NewStudent implements Partial<Student> {
  @Field({ nullable: true })
  schoolId?: string;

  @Field({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  userId?: string;
}
