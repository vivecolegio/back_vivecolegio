import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicAsignature } from '../SchoolAdministrator/AcademicAsignature';
import { Course } from './Course';
import { Teacher } from './Teacher';

@ObjectType({ description: 'The AcademicAsignatureCourse model', implements: IModelCampusData })
@Entity()
export class AcademicAsignatureCourse extends IModelCampusData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  hourlyIntensity?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  academicAsignatureId?: string;

  @Field({ nullable: true })
  academicAsignature?: AcademicAsignature;

  @Field({ nullable: true })
  @Column({ nullable: true })
  courseId?: string;

  @Field({ nullable: true })
  course?: Course;

  @Field({ nullable: true })
  @Column({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  teacherId?: string;

  @Field({ nullable: true })
  teacher?: Teacher;
}

@ObjectType()
export class AcademicAsignatureCourseEdge extends EdgeType(
  'AcademicAsignatureCourse',
  AcademicAsignatureCourse
) {}

@ObjectType()
export class AcademicAsignatureCourseConnection extends ConnectionType<AcademicAsignatureCourseEdge>(
  'AcademicAsignatureCourse',
  AcademicAsignatureCourseEdge
) {}
