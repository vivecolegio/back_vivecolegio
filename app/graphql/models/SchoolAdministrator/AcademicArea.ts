import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index } from 'typeorm';

import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { GeneralAcademicArea } from '../GeneralAdministrator/GeneralAcademicArea';
import { AcademicGrade } from './AcademicGrade';

@Index("index_full", ["generalAcademicAreaId", "academicGradeId", "schoolId"])
@ObjectType({ description: 'The AcademicArea model', implements: IModelSchoolData })
@Entity()
export class AcademicArea extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  abbreviation?: string;

  @Index("index_generalAcademicAreaId")
  @Field({ nullable: true })
  @Column({ nullable: true })
  generalAcademicAreaId?: string;

  @Field({ nullable: true })
  generalAcademicArea?: GeneralAcademicArea;

  @Index("index_academicGradeId")
  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  academicGradeId?: [string];

  @Field(() => [AcademicGrade], { nullable: true })
  academicGrade?: [AcademicGrade];

  @Field({ nullable: true })
  @Column({ nullable: true })
  order?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  isAverage?: boolean;
}

@ObjectType()
export class AcademicAreaEdge extends EdgeType('AcademicArea', AcademicArea) { }

@ObjectType()
export class AcademicAreaConnection extends ConnectionType<AcademicAreaEdge>(
  'AcademicArea',
  AcademicAreaEdge
) { }
