import { Field, InputType } from 'type-graphql';
import { Teacher } from '../../models/CampusAdministrator/Teacher';

@InputType()
export class NewTeacher implements Partial<Teacher> {
  @Field({ nullable: true })
  schoolId?: string;

  @Field({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  assignaturesId?: string;

  @Field({ nullable: true })
  attentionSchedule?: string;
}
