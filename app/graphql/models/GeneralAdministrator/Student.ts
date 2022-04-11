import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Course } from '../CampusAdministrator/Course';
import { AcademicGrade } from '../SchoolAdministrator/AcademicGrade';
import { Campus } from './Campus';
import { School } from './School';
import { User } from './User';

@ObjectType({ description: 'The Student model', implements: IModelData })
@Entity()
export class Student extends IModelData {
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
  academicGradeId?: string;

  @Field({ nullable: true })
  academicGrade?: AcademicGrade;

  @Field({ nullable: true })
  @Column({ nullable: true })
  courseId?: string;

  @Field({ nullable: true })
  course?: Course;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  code?: number;
}

@ObjectType()
export class StudentEdge extends EdgeType('Student', Student) { }

@ObjectType()
export class StudentConnection extends ConnectionType<StudentEdge>('Student', StudentEdge) { }
