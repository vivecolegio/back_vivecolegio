import { Field } from "type-graphql";
import { Column } from "typeorm";
import { PerformanceLevel } from "../SchoolAdministrator/PerformanceLevel";

export class ExperienceLearningRubricCriteriaPerformanceLevel {
    @Field({ nullable: true })
    @Column({ nullable: true })
    criteria?: String;

    @Field({ nullable: true })
    @Column({ nullable: true })
    performanceLevelId?: String;

    @Field(() => PerformanceLevel, { nullable: true })
    performanceLevel?: PerformanceLevel;
}