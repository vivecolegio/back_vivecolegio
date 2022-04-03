import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { Day } from '../../enums/Day';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The AcademicDay model', implements: IModelCampusData })
@Entity()
export class AcademicDay extends IModelCampusData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field(() => [Day], { nullable: true })
  @Column({ nullable: true })
  day?: [Day];
}

@ObjectType()
export class AcademicDayEdge extends EdgeType('AcademicDay', AcademicDay) { }

@ObjectType()
export class AcademicDayConnection extends ConnectionType<AcademicDayEdge>(
  'AcademicDay',
  AcademicDayEdge
) { }
