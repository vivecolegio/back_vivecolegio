import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicAsignatureCourse } from './AcademicAsignatureCourse';
import { AcademicHour } from './AcademicHour';
import { Course } from './Course';
import { Teacher } from './Teacher';

@ObjectType({ description: 'The AcademicSchedule model', implements: IModelSchoolData })
@Entity()
export class AcademicSchedule extends IModelSchoolData {

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicAsignatureCourseId?: string;

    @Field({ nullable: true })
    academicAsignatureCourse?: AcademicAsignatureCourse;

    @Field({ nullable: true })
    @Column({ nullable: true })
    courseId?: string;

    @Field({ nullable: true })
    course?: Course;

    @Field({ nullable: true })
    @Column({ nullable: true })
    teacherId?: string;

    @Field({ nullable: true })
    teacher?: Teacher;

    @Field({ nullable: true })
    @Column({ nullable: true })
    startAcademicHourId?: string;

    @Field({ nullable: true })
    startAcademicHour?: AcademicHour;

    @Field({ nullable: true })
    @Column({ nullable: true })
    endAcademicHourId?: string;

    @Field({ nullable: true })
    endAcademicHour?: AcademicHour;

}

@ObjectType()
export class AcademicScheduleEdge extends EdgeType('AcademicSchedule', AcademicSchedule) { }

@ObjectType()
export class AcademicScheduleConnection extends ConnectionType<AcademicScheduleEdge>(
    'AcademicSchedule',
    AcademicScheduleEdge
) { }
