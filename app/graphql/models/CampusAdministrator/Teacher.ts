import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Campus } from '../GeneralAdministrator/Campus';
import { School } from '../GeneralAdministrator/School';
import { User } from '../GeneralAdministrator/User';

@ObjectType({ description: 'The Teacher model', implements: IModelData })
@Entity()
export class Teacher extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  schoolId?: string;

  @Field({ nullable: true })
  school?: School;

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
  assignaturesId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  attentionSchedule?: string;
}

@ObjectType()
export class TeacherEdge extends EdgeType('Teacher', Teacher) { }

@ObjectType()
export class TeacherConnection extends ConnectionType<TeacherEdge>('Teacher', TeacherEdge) { }
