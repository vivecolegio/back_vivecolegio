import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Student } from '../GeneralAdministrator/Student';
import { PerformanceLevel } from '../SchoolAdministrator/PerformanceLevel';
import { ExperienceLearning } from './ExperienceLearning';

@ObjectType({
  description: 'The ExperienceLearningRubricValuation model',
  implements: IModelCampusData,
})
@Entity()
export class ExperienceLearningRubricValuation extends IModelCampusData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  experienceLearningId?: string;

  @Field({ nullable: true })
  experienceLearning?: ExperienceLearning;

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
  observations?: String;

  @Field({ nullable: true })
  @Column({ nullable: true })
  performanceLevelId?: String;

  @Field(() => PerformanceLevel, { nullable: true })
  performanceLevel?: PerformanceLevel;
}

@ObjectType()
export class ExperienceLearningRubricValuationEdge extends EdgeType(
  'ExperienceLearningRubricValuation',
  ExperienceLearningRubricValuation
) {}

@ObjectType()
export class ExperienceLearningRubricValuationConnection extends ConnectionType<ExperienceLearningRubricValuationEdge>(
  'ExperienceLearningRubricValuation',
  ExperienceLearningRubricValuationEdge
) {}
