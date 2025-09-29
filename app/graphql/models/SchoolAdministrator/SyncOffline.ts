import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index } from 'typeorm';

import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicPeriod } from './AcademicPeriod';
import { SchoolYear } from './SchoolYear';
import { Campus } from '../GeneralAdministrator/Campus';
import { SyncOfflineDescription } from './objectType/SyncOfflineDescription';

@Index('index_full', ['schoolId', 'schoolYearId'])
@ObjectType({ description: 'The SyncOffline model', implements: IModelSchoolData })
@Entity()
export class SyncOffline extends IModelSchoolData {
  @Index('index_schoolYearId')
  @Field({ nullable: true })
  @Column({ nullable: true })
  schoolYearId?: string;

  @Field({ nullable: true })
  schoolYear?: SchoolYear;

  @Index('index_academicPeriodId')
  @Field({ nullable: true })
  @Column({ nullable: true })
  academicPeriodId?: string;

  @Field({ nullable: true })
  academicPeriod?: AcademicPeriod;

  @Index('index_campusId')
  @Field({ nullable: true })
  @Column({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  campus?: Campus;

  @Field((type) => [SyncOfflineDescription], { nullable: true })
  @Column({ nullable: true })
  syncOfflineDescriptions?: SyncOfflineDescription[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  finish?: boolean;
}

@ObjectType()
export class SyncOfflineEdge extends EdgeType('SyncOffline', SyncOffline) {}

@ObjectType()
export class SyncOfflineConnection extends ConnectionType<SyncOfflineEdge>(
  'SyncOffline',
  SyncOfflineEdge,
) {}