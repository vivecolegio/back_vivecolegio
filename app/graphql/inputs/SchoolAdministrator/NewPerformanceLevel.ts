import { Field, InputType } from 'type-graphql';
import { PerformanceLevel } from '../../models/SchoolAdministrator/PerformanceLevel';

@InputType()
export class NewPerformanceLevel implements Partial<PerformanceLevel> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  minimumScore?: number;

  @Field({ nullable: true })
  topScore?: number;

  @Field({ nullable: true })
  generalPerformanceLevelId?: string;
}
