import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Student } from '../GeneralAdministrator/Student';
import { AcademicPeriod } from '../SchoolAdministrator/AcademicPeriod';
import { EvaluativeComponent } from '../SchoolAdministrator/EvaluativeComponent';
import { AcademicAsignatureCourse } from './AcademicAsignatureCourse';

@ObjectType({ description: 'The ExperienceLearningAverageValuation model', implements: IModelCampusData })
@Entity()
export class ExperienceLearningAverageValuation extends IModelCampusData {

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
    average?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    evaluativeComponentId?: string;

    @Field({ nullable: true })
    evaluativeComponent?: EvaluativeComponent;

}

@ObjectType()
export class ExperienceLearningAverageValuationEdge extends EdgeType('ExperienceLearningAverageValuation', ExperienceLearningAverageValuation) { }

@ObjectType()
export class ExperienceLearningAverageValuationConnection extends ConnectionType<ExperienceLearningAverageValuationEdge>('ExperienceLearningAverageValuation', ExperienceLearningAverageValuationEdge) { }

