import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { GeneralAcademicStandard } from '../GeneralAdministrator/GeneralAcademicStandard';
import { GeneralAcademicCycle } from './../GeneralAdministrator/GeneralAcademicCycle';
import { AcademicAsignature } from './AcademicAsignature';

@ObjectType({ description: 'The AcademicStandard model', implements: IModelSchoolData })
@Entity()
export class AcademicStandard extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  standard?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  generalAcademicStandardId?: string;

  @Field({ nullable: true })
  generalAcademicStandard?: GeneralAcademicStandard;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicAsignatureId?: string;

  @Field({ nullable: true })
  academicAsignature?: AcademicAsignature;

  @Field({ nullable: true })
  @Column({ nullable: true })
  generalAcademicCycleId?: string;

  @Field({ nullable: true })
  generalAcademicCycle?: GeneralAcademicCycle;
}

@ObjectType()
export class AcademicStandardEdge extends EdgeType('AcademicStandard', AcademicStandard) {}

@ObjectType()
export class AcademicStandardConnection extends ConnectionType<AcademicStandardEdge>(
  'AcademicStandard',
  AcademicStandardEdge
) {}
