import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { ExperienceType } from '../../enums/ExperienceType';
import { NavigationMethodTestOnline } from '../../enums/NavigationMethodTestOnline';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicPeriod } from '../SchoolAdministrator/AcademicPeriod';
import { EvaluativeComponent } from '../SchoolAdministrator/EvaluativeComponent';
import { EvidenceLearning } from '../SchoolAdministrator/EvidenceLearning';
import { Learning } from '../SchoolAdministrator/Learning';
import { AcademicAsignatureCourse } from './AcademicAsignatureCourse';
import { ExperienceLearningPerformanceLevel } from './ExperienceLearningPerformanceLevel';

@ObjectType({ description: 'The ExperienceLearning model', implements: IModelCampusData })
@Entity()
export class ExperienceLearning extends IModelCampusData {
    @Field({ nullable: true })
    @Column({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicAsignatureCourseId?: string;

    @Field({ nullable: true })
    academicAsignatureCourse?: AcademicAsignatureCourse;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string;

    @Field(() => ExperienceType, { nullable: true })
    @Column({ nullable: true })
    experienceType?: ExperienceType;

    @Field({ nullable: true })
    @Column({ nullable: true })
    dateDelivery?: Date;

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    learningsId?: String[];

    @Field(() => [Learning], { nullable: true })
    learnigs?: Learning[];

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    evidenciceLearningsId?: String[];

    @Field(() => [EvidenceLearning], { nullable: true })
    evidenciceLearnings?: EvidenceLearning[];

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicPeriodId?: string;

    @Field({ nullable: true })
    academicPeriod?: AcademicPeriod;

    @Field({ nullable: true })
    @Column({ nullable: true })
    evaluativeComponentId?: string;

    @Field({ nullable: true })
    evaluativeComponent?: EvaluativeComponent;

    @Field({ nullable: true })
    @Column({ nullable: true })
    onlineDelivery?: Boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    criteria?: String;

    @Field(() => [ExperienceLearningPerformanceLevel], { nullable: true })
    @Column({ nullable: true })
    experienceLearningPerformanceLevel?: ExperienceLearningPerformanceLevel[];

    @Field({ nullable: true })
    @Column({ nullable: true })
    openTestDate?: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    closeTestDate?: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    navigationMethod?: NavigationMethodTestOnline;

    @Field({ nullable: true })
    @Column({ nullable: true })
    shuffleQuestions?: Boolean;

}

@ObjectType()
export class ExperienceLearningEdge extends EdgeType('ExperienceLearning', ExperienceLearning) { }

@ObjectType()
export class ExperienceLearningConnection extends ConnectionType<ExperienceLearningEdge>(
    'ExperienceLearning',
    ExperienceLearningEdge
) { }
