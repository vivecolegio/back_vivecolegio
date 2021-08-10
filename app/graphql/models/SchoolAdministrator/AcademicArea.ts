import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { GeneralAcademicArea } from '../GeneralAdministrator/GeneralAcademicArea';

@ObjectType({ description: 'The AcademicArea model', implements: IModelSchoolData })
@Entity()
export class AcademicArea extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  abbreviation?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  generalAcademicAreaId?: string;

  @Field({ nullable: true })
  generalAcademicArea?: GeneralAcademicArea;
}

@ObjectType()
export class AcademicAreaEdge extends EdgeType('AcademicArea', AcademicArea) {}

@ObjectType()
export class AcademicAreaConnection extends ConnectionType<AcademicAreaEdge>(
  'AcademicArea',
  AcademicAreaEdge
) {}
