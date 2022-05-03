import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { GeneralBasicLearningRight } from '../GeneralAdministrator/GeneralBasicLearningRight';
import { AcademicAsignature } from '../SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../SchoolAdministrator/AcademicGrade';
import { AcademicPeriod } from '../SchoolAdministrator/AcademicPeriod';
import { AcademicStandard } from '../SchoolAdministrator/AcademicStandard';
import { Learning } from '../SchoolAdministrator/Learning';
import { ClassroomPlanExpectedPerformance } from './ClassroomPlanExpectedPerformance';
import { ClassroomPlanMethodologicalRoute } from './ClassroomPlanMethodologicalRoute';
import { ClassroomPlanPerformanceAppraisalStrategy } from './ClassroomPlanPerformanceAppraisalStrategy';

@ObjectType({ description: 'The ClassroomPlan model', implements: IModelCampusData })
@Entity()
export class ClassroomPlan extends IModelCampusData {

    @Field({ nullable: true })
    @Column({ nullable: true })
    startDate?: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    endDate?: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicPeriodId?: string;

    @Field({ nullable: true })
    academicPeriod?: AcademicPeriod;

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicAsignatureId?: string;

    @Field({ nullable: true })
    academicAsignature?: AcademicAsignature;

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicGradeId?: string;

    @Field({ nullable: true })
    academicGrade?: AcademicGrade;

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    learningsId?: String[];

    @Field(() => [Learning], { nullable: true })
    learnigs?: Learning[];

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    academicStandardsId?: String[];

    @Field(() => [AcademicStandard], { nullable: true })
    academicStandards?: AcademicStandard[];

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    generalBasicLearningRightsId?: String[];

    @Field(() => [GeneralBasicLearningRight], { nullable: true })
    generalBasicLearningRights?: GeneralBasicLearningRight;

    @Field(() => [ClassroomPlanExpectedPerformance], { nullable: true })
    @Column({ nullable: true })
    classroomPlanExpectedPerformances?: ClassroomPlanExpectedPerformance[];

    @Field(() => [ClassroomPlanPerformanceAppraisalStrategy], { nullable: true })
    @Column({ nullable: true })
    classroomPlanPerformanceAppraisalStrategies?: ClassroomPlanPerformanceAppraisalStrategy[];

    @Field(() => [ClassroomPlanMethodologicalRoute], { nullable: true })
    @Column({ nullable: true })
    classroomPlanMethodologicalRoutes?: ClassroomPlanMethodologicalRoute[];
}

@ObjectType()
export class ClassroomPlanEdge extends EdgeType('ClassroomPlan', ClassroomPlan) { }

@ObjectType()
export class ClassroomPlanConnection extends ConnectionType<ClassroomPlanEdge>(
    'ClassroomPlan',
    ClassroomPlanEdge
) { }
