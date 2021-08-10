import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Campus } from '../GeneralAdministrator/Campus';
import { User } from '../GeneralAdministrator/User';

@ObjectType({ description: 'The CampusAdministrator model', implements: IModelSchoolData })
@Entity()
export class CampusAdministrator extends IModelSchoolData {
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
export class CampusAdministratorEdge extends EdgeType('CampusAdministrator', CampusAdministrator) {}

@ObjectType()
export class CampusAdministratorConnection extends ConnectionType<CampusAdministratorEdge>(
  'CampusAdministrator',
  CampusAdministratorEdge
) {}
