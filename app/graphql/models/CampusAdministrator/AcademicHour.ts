import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicDay } from './AcademicDay';

@ObjectType({ description: 'The AcademicHour model', implements: IModelCampusData })
@Entity()
export class AcademicHour extends IModelCampusData {
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  order?: number;
}

@ObjectType()
export class AcademicHourEdge extends EdgeType('AcademicHour', AcademicHour) { }

@ObjectType()
export class AcademicHourConnection extends ConnectionType<AcademicHourEdge>(
  'AcademicHour',
  AcademicHourEdge
) { }
