import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The Modality model', implements: IModelSchoolData })
@Entity()
export class Modality extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;
}

@ObjectType()
export class ModalityEdge extends EdgeType('Modality', Modality) {}

@ObjectType()
export class ModalityConnection extends ConnectionType<ModalityEdge>('Modality', ModalityEdge) {}
