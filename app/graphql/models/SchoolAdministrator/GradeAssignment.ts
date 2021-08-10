import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicAsignature } from './AcademicAsignature';
import { AcademicGrade } from './AcademicGrade';

@ObjectType({ description: 'The GradeAssignment model', implements: IModelSchoolData })
@Entity()
export class GradeAssignment extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  hourlyintensity?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicGradeId?: string;

  @Field({ nullable: true })
  academicGrade?: AcademicGrade;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicAsignatureId?: string;

  @Field({ nullable: true })
  academicAsignature?: AcademicAsignature;
}

@ObjectType()
export class GradeAssignmentEdge extends EdgeType('GradeAssignment', GradeAssignment) {}

@ObjectType()
export class GradeAssignmentConnection extends ConnectionType<GradeAssignmentEdge>(
  'GradeAssignment',
  GradeAssignmentEdge
) {}
