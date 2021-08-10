import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicArea } from './AcademicArea';
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
  weight?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicAreaId?: string;

  @Field({ nullable: true })
  academicArea?: AcademicArea;
}

@ObjectType()
export class AcademicAsignatureEdge extends EdgeType('AcademicAsignature', AcademicAsignature) {}

@ObjectType()
export class AcademicAsignatureConnection extends ConnectionType<AcademicAsignatureEdge>(
  'AcademicAsignature',
  AcademicAsignatureEdge
) {}
