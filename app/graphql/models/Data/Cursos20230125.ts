import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The Cursos20230125 model', implements: IModelData })
@Entity()
export class Cursos20230125 extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  dane?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  consecutivo?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jornada?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  grado_cod?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  grupo?: string;
}

@ObjectType()
export class Cursos20230125Edge extends EdgeType('Cursos20230125', Cursos20230125) { }

@ObjectType()
export class Cursos20230125Connection extends ConnectionType<Cursos20230125Edge>('Cursos20230125', Cursos20230125Edge) { }
