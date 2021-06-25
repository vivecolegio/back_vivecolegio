import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../pagination/relaySpecs';
import { GeneralAcademicAsignature } from './GeneralAcademicAsignature';
import { GeneralAcademicCycle } from './GeneralAcademicCycle';

@ObjectType({ description: 'The GeneralAcademicStandard model', implements: IModelData })
@Entity()
export class GeneralAcademicStandard extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  standard?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subtype?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  generalAcademicAsignatureId?: string;

  @Field({ nullable: true })
  generalAcademicAsignature?: GeneralAcademicAsignature;

  @Field({ nullable: true })
  @Column({ nullable: true })
  generalAcademicCycleId?: string;

  @Field({ nullable: true })
  generalAcademicCycle?: GeneralAcademicCycle;
}

@ObjectType()
export class GeneralAcademicStandardEdge extends EdgeType(
  'GeneralAcademicStandard',
  GeneralAcademicStandard
) {}

@ObjectType()
export class GeneralAcademicStandardConnection extends ConnectionType<GeneralAcademicStandardEdge>(
  'GeneralAcademicStandard',
  GeneralAcademicStandardEdge
) {}
