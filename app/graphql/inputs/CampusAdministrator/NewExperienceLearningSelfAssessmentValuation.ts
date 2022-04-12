import { Field, InputType } from 'type-graphql';
import { ExperienceLearningSelfAssessmentValuation } from '../../models/CampusAdministrator/ExperienceLearningSelfAssessmentValuation';

@InputType()
export class NewExperienceLearningSelfAssessmentValuation implements Partial<ExperienceLearningSelfAssessmentValuation> {
    @Field({ nullable: true })
    campusId?: string;

    @Field({ nullable: true })
    experienceLearningId?: string;

    @Field({ nullable: true })
    studentId?: String;

    @Field({ nullable: true })
    assessment?: number;

}
