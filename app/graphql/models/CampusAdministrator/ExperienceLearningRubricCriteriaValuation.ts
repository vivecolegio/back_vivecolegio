import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Student } from '../GeneralAdministrator/Student';
import { PerformanceLevel } from '../SchoolAdministrator/PerformanceLevel';
import { ExperienceLearningRubricCriteria } from './ExperienceLearningRubricCriteria';

@ObjectType({
  description: 'The ExperienceLearningRubricCriteriaValuation model',
  implements: IModelCampusData,
})
@Entity()
export class ExperienceLearningRubricCriteriaValuation extends IModelCampusData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  experienceLearningRubricCriteriaId?: string;

  @Field({ nullable: true })
  experienceLearningRubricCriteria?: ExperienceLearningRubricCriteria;

  @Field({ nullable: true })
  @Column({ nullable: true })
  studentId?: String;

  @Field({ nullable: true })
  student?: Student;

  @Field({ nullable: true })
  @Column({ nullable: true })
  assessment?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  performanceLevelId?: String;

  @Field(() => PerformanceLevel, { nullable: true })
  performanceLevel?: PerformanceLevel;
}

@ObjectType()
export class ExperienceLearningRubricCriteriaValuationEdge extends EdgeType(
  'ExperienceLearningRubricCriteriaValuation',
  ExperienceLearningRubricCriteriaValuation
) {}

@ObjectType()
export class ExperienceLearningRubricCriteriaValuationConnection extends ConnectionType<ExperienceLearningRubricCriteriaValuationEdge>(
  'ExperienceLearningRubricCriteriaValuation',
  ExperienceLearningRubricCriteriaValuationEdge
) {}
