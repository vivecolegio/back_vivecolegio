import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Campus } from '../GeneralAdministrator/Campus';
import { School } from '../GeneralAdministrator/School';
import { User } from '../GeneralAdministrator/User';

@ObjectType({ description: 'The CampusAdministrator model', implements: IModelData })
@Entity()
export class CampusAdministrator extends IModelData {
  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  schoolId?: String[];

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
export class CampusAdministratorEdge extends EdgeType('CampusAdministrator', CampusAdministrator) { }

@ObjectType()
export class CampusAdministratorConnection extends ConnectionType<CampusAdministratorEdge>(
  'CampusAdministrator',
  CampusAdministratorEdge
) { }
