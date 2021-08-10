import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { GeneralAcademicCycle } from '../GeneralAdministrator/GeneralAcademicCycle';
import { EducationLevel } from './EducationLevel';
import { Specialty } from './Specialty';

@ObjectType({ description: 'The AcademicGrade model', implements: IModelSchoolData })
@Entity()
export class AcademicGrade extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  educationLevelId?: string;

  @Field({ nullable: true })
  educationLevel?: EducationLevel;

  @Field({ nullable: true })
  @Column({ nullable: true })
  specialtyId?: string;

  @Field({ nullable: true })
  specialty?: Specialty;

  @Field({ nullable: true })
  @Column({ nullable: true })
  generalAcademicCycleId?: string;

  @Field({ nullable: true })
  generalAcademicCycle?: GeneralAcademicCycle;
}

@ObjectType()
export class AcademicGradeEdge extends EdgeType('AcademicGrade', AcademicGrade) {}

@ObjectType()
export class AcademicGradeConnection extends ConnectionType<AcademicGradeEdge>(
  'AcademicGrade',
  AcademicGradeEdge
) {}
