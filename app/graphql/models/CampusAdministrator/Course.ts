import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicGrade } from '../SchoolAdministrator/AcademicGrade';
import { AcademicDay } from './AcademicDay';
import { Teacher } from './Teacher';

@ObjectType({ description: 'The Course model', implements: IModelCampusData })
@Entity()
export class Course extends IModelCampusData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  academicGradeId?: string;

  @Field({ nullable: true })
  academicGrade?: AcademicGrade;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicDayId?: string;

  @Field({ nullable: true })
  academicDay?: AcademicDay;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  order?: string;

  @Field(() => [String], { nullable: true })
  @Column({ nullable: true })
  studentsId?: String[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  teacherId?: string;

  @Field({ nullable: true })
  teacher?: Teacher;
}

@ObjectType()
export class CourseEdge extends EdgeType('Course', Course) {}

@ObjectType()
export class CourseConnection extends ConnectionType<CourseEdge>('Course', CourseEdge) {}
