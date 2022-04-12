import { Field, InputType } from 'type-graphql';
import { ExperienceLearningRubricValuation } from '../../models/CampusAdministrator/ExperienceLearningRubricValuation';

@InputType()
export class NewExperienceLearningRubricValuation implements Partial<ExperienceLearningRubricValuation> {
    @Field({ nullable: true })
    experienceLearningId?: string;

    @Field({ nullable: true })
    studentId?: String;

    @Field({ nullable: true })
    assessment?: number;

}
