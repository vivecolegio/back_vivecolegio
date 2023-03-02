import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The Estudiantes20230125 model', implements: IModelData })
@Entity()
export class Estudiantes20230125 extends IModelData {
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  doc?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tipodoc?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  apellido1?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  apellido2?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nombre1?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nombre2?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  genero?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fecha_nacimiento?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  procesado?: boolean;
}

@ObjectType()
export class Estudiantes20230125Edge extends EdgeType('Estudiantes20230125', Estudiantes20230125) { }

@ObjectType()
export class Estudiantes20230125Connection extends ConnectionType<Estudiantes20230125Edge>(
  'Estudiantes20230125',
  Estudiantes20230125Edge
) { }
