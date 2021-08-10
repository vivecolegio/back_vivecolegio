import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { GeneralAcademicCycle } from './GeneralAcademicCycle';

@ObjectType({ description: 'The GeneralAcademicGrade model', implements: IModelData })
@Entity()
export class GeneralAcademicGrade extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  generalAcademicCycleId?: string;

  @Field({ nullable: true })
  generalAcademicCycle?: GeneralAcademicCycle;
}

@ObjectType()
export class GeneralAcademicGradeEdge extends EdgeType(
  'GeneralAcademicGrade',
  GeneralAcademicGrade
) {}

@ObjectType()
export class GeneralAcademicGradeConnection extends ConnectionType<GeneralAcademicGradeEdge>(
  'GeneralAcademicGrade',
  GeneralAcademicGradeEdge
) {}
