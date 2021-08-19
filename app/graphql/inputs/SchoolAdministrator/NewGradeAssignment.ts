import { Field, InputType } from 'type-graphql';
import { GradeAssignment } from '../../models/SchoolAdministrator/GradeAssignment';

@InputType()
export class NewGradeAssignment implements Partial<GradeAssignment> {
  @Field({ nullable: true })
  hourlyintensity?: number;

  @Field({ nullable: true })
  academicGradeId?: string;

  @Field({ nullable: true })
  academicAsignatureId?: string;

  @Field({ nullable: true })
  schoolId?: string;
}
