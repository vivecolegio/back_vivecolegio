import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Campus } from '../GeneralAdministrator/Campus';
import { School } from '../GeneralAdministrator/School';
import { User } from '../GeneralAdministrator/User';

@ObjectType({ description: 'The Guardian model', implements: IModelData })
@Entity()
export class Guardian extends IModelData {
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  studentsId?: string;
}

@ObjectType()
export class GuardianEdge extends EdgeType('Guardian', Guardian) { }

@ObjectType()
export class GuardianConnection extends ConnectionType<GuardianEdge>('Guardian', GuardianEdge) { }
