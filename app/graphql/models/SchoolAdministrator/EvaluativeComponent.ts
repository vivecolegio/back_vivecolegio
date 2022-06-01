import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { EvaluativeComponentType } from '../../enums/EvaluativeComponentType';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicArea } from './AcademicArea';
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

  @Field(() => EvaluativeComponentType, { nullable: true })
  @Column({ nullable: true })
  type?: EvaluativeComponentType;

  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  academicAsignaturesId?: String[];

  @Field(() => [AcademicAsignature], { nullable: true })
  academicAsignatures?: AcademicAsignature[];

  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  academicAreasId?: String[];

  @Field(() => [AcademicArea], { nullable: true })
  academicAreas?: AcademicArea[];
}

@ObjectType()
export class EvaluativeComponentEdge extends EdgeType('EvaluativeComponent', EvaluativeComponent) {}

@ObjectType()
export class EvaluativeComponentConnection extends ConnectionType<EvaluativeComponentEdge>(
  'EvaluativeComponent',
  EvaluativeComponentEdge
) {}
