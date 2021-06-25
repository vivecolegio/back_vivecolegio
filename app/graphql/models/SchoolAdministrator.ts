import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../pagination/relaySpecs';
import { School } from './School';
import { User } from './User';

@ObjectType({ description: 'The SchoolAdministrator model', implements: IModelData })
@Entity()
export class SchoolAdministrator extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  schoolId?: string;

  @Field({ nullable: true })
  school?: School;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  user?: User;
}

@ObjectType()
export class SchoolAdministratorEdge extends EdgeType('SchoolAdministrator', SchoolAdministrator) {}

@ObjectType()
export class SchoolAdministratorConnection extends ConnectionType<SchoolAdministratorEdge>(
  'SchoolAdministrator',
  SchoolAdministratorEdge
) {}
