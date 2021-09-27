import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Campus } from '../GeneralAdministrator/Campus';
import { AcademicDay } from './AcademicDay';

@ObjectType({ description: 'The AcademicHour model', implements: IModelData })
@Entity()
export class AcademicHour extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  campus?: Campus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicDayId?: string;

  @Field({ nullable: true })
  academicDay?: AcademicDay;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startTime?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endTime?: string;
}

@ObjectType()
export class AcademicHourEdge extends EdgeType('AcademicHour', AcademicHour) {}

@ObjectType()
export class AcademicHourConnection extends ConnectionType<AcademicHourEdge>(
  'AcademicHour',
  AcademicHourEdge
) {}
