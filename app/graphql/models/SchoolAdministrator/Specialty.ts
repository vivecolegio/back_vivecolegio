import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Modality } from './Modality';

@ObjectType({ description: 'The Specialty model', implements: IModelSchoolData })
@Entity()
export class Specialty extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  modalityId?: string;

  @Field({ nullable: true })
  modality?: Modality;
}

@ObjectType()
export class SpecialtyEdge extends EdgeType('Specialty', Specialty) {}

@ObjectType()
export class SpecialtyConnection extends ConnectionType<SpecialtyEdge>(
  'Specialty',
  SpecialtyEdge
) {}
