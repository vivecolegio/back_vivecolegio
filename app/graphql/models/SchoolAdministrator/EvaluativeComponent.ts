import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicAsignature } from './AcademicAsignature';

@ObjectType({ description: 'The EvaluativeComponent model', implements: IModelSchoolData })
@Entity()
export class EvaluativeComponent extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  default?: true;

  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  academicAsignaturesId?: String[];

  @Field(() => [AcademicAsignature], { nullable: true })
  academicAsignatures?: AcademicAsignature[];

}

@ObjectType()
export class EvaluativeComponentEdge extends EdgeType('EvaluativeComponent', EvaluativeComponent) { }

@ObjectType()
export class EvaluativeComponentConnection extends ConnectionType<EvaluativeComponentEdge>(
  'EvaluativeComponent',
  EvaluativeComponentEdge
) { }
