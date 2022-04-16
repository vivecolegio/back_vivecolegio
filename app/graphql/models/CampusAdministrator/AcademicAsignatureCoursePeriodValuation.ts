import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Student } from '../GeneralAdministrator/Student';
import { AcademicPeriod } from '../SchoolAdministrator/AcademicPeriod';
import { AcademicAsignatureCourse } from './AcademicAsignatureCourse';

@ObjectType({ description: 'The AcademicAsignatureCoursePeriodValuation model', implements: IModelCampusData })
@Entity()
export class AcademicAsignatureCoursePeriodValuation extends IModelCampusData {

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicAsignatureCourseId?: string;

    @Field({ nullable: true })
    academicAsignatureCourse?: AcademicAsignatureCourse;

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicPeriodId?: string;

    @Field({ nullable: true })
    academicPeriod?: AcademicPeriod;

    @Field({ nullable: true })
    @Column({ nullable: true })
    studentId?: String;

    @Field({ nullable: true })
    student?: Student;

    @Field({ nullable: true })
    @Column({ nullable: true })
    assessment?: number;

}

@ObjectType()
export class AcademicAsignatureCoursePeriodValuationEdge extends EdgeType('AcademicAsignatureCoursePeriodValuation', AcademicAsignatureCoursePeriodValuation) { }

@ObjectType()
export class AcademicAsignatureCoursePeriodValuationConnection extends ConnectionType<AcademicAsignatureCoursePeriodValuationEdge>(
    'AcademicAsignatureCoursePeriodValuation',
    AcademicAsignatureCoursePeriodValuationEdge
) { }
