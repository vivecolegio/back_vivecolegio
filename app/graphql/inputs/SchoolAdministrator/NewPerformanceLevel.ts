import { Field, InputType } from 'type-graphql';
import { PerformanceLevelType } from '../../enums/PerformanceLevelType';
import { PerformanceLevel } from '../../models/SchoolAdministrator/PerformanceLevel';

@InputType()
export class NewPerformanceLevel implements Partial<PerformanceLevel> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  minimumScore?: number;

  @Field({ nullable: true })
  topScore?: number;

  @Field(()=> PerformanceLevelType, { nullable: true })
  type?: PerformanceLevelType;

  @Field({ nullable: true })
  generalPerformanceLevelId?: string;

  @Field(() => [String], { nullable: true })
  campusId?: String[];

  @Field({ nullable: true })
  schoolId?: string;
}
