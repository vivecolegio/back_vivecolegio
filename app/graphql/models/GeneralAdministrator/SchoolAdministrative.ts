import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Campus } from './Campus';
import { School } from './School';
import { User } from './User';

@ObjectType({ description: 'The SchoolAdministrative model', implements: IModelData })
@Entity()
export class SchoolAdministrative extends IModelData {
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
  @Column({ nullable: true })
  user?: User;
}

@ObjectType()
export class SchoolAdministrativeEdge extends EdgeType(
  'SchoolAdministrative',
  SchoolAdministrative
) {}

@ObjectType()
export class SchoolAdministrativeConnection extends ConnectionType<SchoolAdministrativeEdge>(
  'SchoolAdministrative',
  SchoolAdministrativeEdge
) {}
