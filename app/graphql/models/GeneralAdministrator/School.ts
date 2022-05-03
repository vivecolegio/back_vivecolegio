import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The School model', implements: IModelData })
@Entity()
export class School extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  daneCode?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pedagogicalModel?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  educationalModel?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  curricularComponent?: string;

}

@ObjectType()
export class SchoolEdge extends EdgeType('School', School) { }

@ObjectType()
export class SchoolConnection extends ConnectionType<SchoolEdge>('School', SchoolEdge) { }
