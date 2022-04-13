import { Field, InputType } from 'type-graphql';
import { ExperienceType } from '../../enums/ExperienceType';
import { ExperienceLearning } from '../../models/CampusAdministrator/ExperienceLearning';
import { NewExperienceLearningPerformanceLevel } from './NewExperienceLearningPerformanceLevel';

@InputType()
export class NewExperienceLearning implements Partial<ExperienceLearning> {
    @Field({ nullable: true })
    campusId?: string;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    academicAsignatureCourseId?: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => ExperienceType, { nullable: true })
    experienceType?: ExperienceType;

    @Field({ nullable: true })
    dateDelivery?: Date;

    @Field(() => [String], { nullable: true })
    learningsId?: String[];

    @Field(() => [String], { nullable: true })
    evidenciceLearningsId?: String[];

    @Field({ nullable: true })
    academicPeriodId?: string;

    @Field({ nullable: true })
    evaluativeComponentId?: string;

    @Field({ nullable: true })
    onlineDelivery?: Boolean;

    @Field({ nullable: true })
    criteria?: String;

    @Field(() => [NewExperienceLearningPerformanceLevel], { nullable: true })
    experienceLearningPerformanceLevel?: NewExperienceLearningPerformanceLevel[];
}
