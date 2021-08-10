import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicAsignature } from './AcademicAsignature';
import { AcademicGrade } from './AcademicGrade';
import { AcademicStandard } from './AcademicStandard';

@ObjectType({ description: 'The AcademicIndicator model', implements: IModelSchoolData })
@Entity()
export class AcademicIndicator extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  indicator?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicStandardId?: string;

  @Field({ nullable: true })
  academicStandard?: AcademicStandard;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicAsignatureId?: string;

  @Field({ nullable: true })
  academicAsignature?: AcademicAsignature;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicGradeId?: string;

  @Field({ nullable: true })
  academicGrade?: AcademicGrade;
}

@ObjectType()
export class AcademicIndicatorEdge extends EdgeType('AcademicIndicator', AcademicIndicator) {}

@ObjectType()
export class AcademicIndicatorConnection extends ConnectionType<AcademicIndicatorEdge>(
  'AcademicIndicator',
  AcademicIndicatorEdge
) {}
