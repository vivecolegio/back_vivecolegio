import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index } from 'typeorm';
import { PerformanceLevelCategory } from '../../enums/PerformanceLevelCategory';
import { PerformanceLevelType } from '../../enums/PerformanceLevelType';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Campus } from '../GeneralAdministrator/Campus';
import { GeneralPerformanceLevel } from '../GeneralAdministrator/GeneralPerformanceLevel';
import { AcademicGrade } from './AcademicGrade';

@Index("index_full", ["generalPerformanceLevelId", "campusId", "academicGradesId", "schoolId"])
@ObjectType({ description: 'The PerformanceLevel model', implements: IModelSchoolData })
@Entity()
export class PerformanceLevel extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  minimumScore?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  topScore?: number;

  @Field(() => PerformanceLevelType, { nullable: true })
  @Column({ nullable: true })
  type?: PerformanceLevelType;

  @Field(() => PerformanceLevelCategory, { nullable: true })
  @Column({ nullable: true })
  category?: PerformanceLevelCategory;

  @Index("index_generalPerformanceLevelId")
  @Field({ nullable: true })
  @Column({ nullable: true })
  generalPerformanceLevelId?: string;

  @Field({ nullable: true })
  generalPerformanceLevel?: GeneralPerformanceLevel;

  @Index("index_campusId")
  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  campusId?: String[];

  @Field(() => [Campus], { nullable: true })
  campus?: Campus[];

  @Index("index_academicGradesId")
  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  academicGradesId?: String[];

  @Field(() => [AcademicGrade], { nullable: true })
  academicGrades?: AcademicGrade[];
}

@ObjectType()
export class PerformanceLevelEdge extends EdgeType('PerformanceLevel', PerformanceLevel) { }

@ObjectType()
export class PerformanceLevelConnection extends ConnectionType<PerformanceLevelEdge>(
  'PerformanceLevel',
  PerformanceLevelEdge
) { }
