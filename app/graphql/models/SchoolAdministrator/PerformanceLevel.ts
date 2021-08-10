import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { GeneralPerformanceLevel } from '../GeneralAdministrator/GeneralPerformanceLevel';

@ObjectType({ description: 'The PerformanceLevel model', implements: IModelSchoolData })
@Entity()
export class PerformanceLevel extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  minimumScore?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  topScore?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  generalPerformanceLevelId?: string;

  @Field({ nullable: true })
  generalPerformanceLevel?: GeneralPerformanceLevel;
}

@ObjectType()
export class PerformanceLevelEdge extends EdgeType('PerformanceLevel', PerformanceLevel) {}

@ObjectType()
export class PerformanceLevelConnection extends ConnectionType<PerformanceLevelEdge>(
  'PerformanceLevel',
  PerformanceLevelEdge
) {}
