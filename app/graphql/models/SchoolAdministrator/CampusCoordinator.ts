import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { User } from '../GeneralAdministrator/User';
import { Campus } from './../GeneralAdministrator/Campus';

@ObjectType({ description: 'The CampusCoordinator model', implements: IModelSchoolData })
@Entity()
export class CampusCoordinator extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  campus?: Campus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  user?: User;
}

@ObjectType()
export class CampusCoordinatorEdge extends EdgeType('CampusCoordinator', CampusCoordinator) {}

@ObjectType()
export class CampusCoordinatorConnection extends ConnectionType<CampusCoordinatorEdge>(
  'CampusCoordinator',
  CampusCoordinatorEdge
) {}
