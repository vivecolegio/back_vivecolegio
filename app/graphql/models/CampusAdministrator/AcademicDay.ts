import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Campus } from '../GeneralAdministrator/Campus';

@ObjectType({ description: 'The AcademicDay model', implements: IModelData })
@Entity()
export class AcademicDay extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  campus?: Campus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  workingDay?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  typeDay?: string; // DROPDWON
}

@ObjectType()
export class AcademicDayEdge extends EdgeType('AcademicDay', AcademicDay) {}

@ObjectType()
export class AcademicDayConnection extends ConnectionType<AcademicDayEdge>(
  'AcademicDay',
  AcademicDayEdge
) {}
