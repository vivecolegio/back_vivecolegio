import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The Jornadas20230125 model', implements: IModelData })
@Entity()
export class Jornadas20230125 extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  dane?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  consecutivo?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jornada?: string;
}

@ObjectType()
export class Jornadas20230125Edge extends EdgeType('Jornadas20230125', Jornadas20230125) { }

@ObjectType()
export class Jornadas20230125Connection extends ConnectionType<Jornadas20230125Edge>('Jornadas20230125', Jornadas20230125Edge) { }
