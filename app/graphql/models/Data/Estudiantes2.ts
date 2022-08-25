import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The Estudiantes2 model', implements: IModelData })
@Entity()
export class Estudiantes2 extends IModelData {
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
export class Estudiantes2Edge extends EdgeType('Estudiantes2', Estudiantes2) { }

@ObjectType()
export class Estudiantes2Connection extends ConnectionType<Estudiantes2Edge>(
  'Estudiantes2',
  Estudiantes2Edge
) { }
