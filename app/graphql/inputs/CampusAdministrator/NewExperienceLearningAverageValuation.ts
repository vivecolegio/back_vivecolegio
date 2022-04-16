import { Field, InputType } from 'type-graphql';
import { ExperienceType } from '../../enums/ExperienceType';
import { ExperienceLearningAverageValuation } from '../../models/CampusAdministrator/ExperienceLearningAverageValuation';

@InputType()
export class NewExperienceLearningAverageValuation implements Partial<ExperienceLearningAverageValuation> {

    @Field({ nullable: true })
    academicAsignatureCourseId?: string;

    @Field({ nullable: true })
    academicPeriodId?: string;

    @Field({ nullable: true })
    studentId?: String;

    @Field({ nullable: true })
    average?: number;

    @Field(() => ExperienceType, { nullable: true })
    experienceType?: ExperienceType;

}
