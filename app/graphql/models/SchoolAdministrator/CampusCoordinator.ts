import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { School } from '../GeneralAdministrator/School';
import { User } from '../GeneralAdministrator/User';
import { Campus } from './../GeneralAdministrator/Campus';

@ObjectType({ description: 'The CampusCoordinator model', implements: IModelData })
@Entity()
export class CampusCoordinator extends IModelData {
  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  schoolId?: string[];

  @Field(() => [School], { nullable: true })
  school?: School[];

  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  campusId?: String[];

  @Field(() => [Campus], { nullable: true })
  campus?: Campus[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  user?: User;
}

@ObjectType()
export class CampusCoordinatorEdge extends EdgeType('CampusCoordinator', CampusCoordinator) { }

@ObjectType()
export class CampusCoordinatorConnection extends ConnectionType<CampusCoordinatorEdge>(
  'CampusCoordinator',
  CampusCoordinatorEdge
) { }
