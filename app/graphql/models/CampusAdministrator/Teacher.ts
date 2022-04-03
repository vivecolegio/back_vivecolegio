import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Campus } from '../GeneralAdministrator/Campus';
import { School } from '../GeneralAdministrator/School';
import { User } from '../GeneralAdministrator/User';
import { AcademicAsignature } from '../SchoolAdministrator/AcademicAsignature';

@ObjectType({ description: 'The Teacher model', implements: IModelData })
@Entity()
export class Teacher extends IModelData {
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

  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  academicAsignatureId?: [string];

  @Field(() => [AcademicAsignature], { nullable: true })
  academicAsignature?: [AcademicAsignature];

  @Field({ nullable: true })
  @Column({ nullable: true })
  attentionSchedule?: string;
}

@ObjectType()
export class TeacherEdge extends EdgeType('Teacher', Teacher) { }

@ObjectType()
export class TeacherConnection extends ConnectionType<TeacherEdge>('Teacher', TeacherEdge) { }
