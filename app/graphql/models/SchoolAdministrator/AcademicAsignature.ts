import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { GeneralAcademicAsignature } from '../GeneralAdministrator/GeneralAcademicAsignature';
import { AcademicArea } from './AcademicArea';
import { AcademicGrade } from './AcademicGrade';
@ObjectType({ description: 'The AcademicAsignature model', implements: IModelSchoolData })
@Entity()
export class AcademicAsignature extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  abbreviation?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  minWeight?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  maxWeight?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicAreaId?: string;

  @Field({ nullable: true })
  academicArea?: AcademicArea;

  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  academicGradeId?: [string];

  @Field(() => [AcademicGrade], { nullable: true })
  academicGrade?: [AcademicGrade];

  @Field({ nullable: true })
  @Column({ nullable: true })
  generalAcademicAsignatureId?: string;

  @Field({ nullable: true })
  generalAcademicAsignature?: GeneralAcademicAsignature;
}

@ObjectType()
export class AcademicAsignatureEdge extends EdgeType('AcademicAsignature', AcademicAsignature) { }

@ObjectType()
export class AcademicAsignatureConnection extends ConnectionType<AcademicAsignatureEdge>(
  'AcademicAsignature',
  AcademicAsignatureEdge
) { }
