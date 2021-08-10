import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { SchoolYear } from './SchoolYear';

@ObjectType({ description: 'The AcademicPeriod model', implements: IModelSchoolData })
@Entity()
export class AcademicPeriod extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  schoolYearId?: string;

  @Field({ nullable: true })
  schoolYear?: SchoolYear;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  weight?: number;
}

@ObjectType()
export class AcademicPeriodEdge extends EdgeType('AcademicPeriod', AcademicPeriod) {}

@ObjectType()
export class AcademicPeriodConnection extends ConnectionType<AcademicPeriodEdge>(
  'AcademicPeriod',
  AcademicPeriodEdge
) {}
