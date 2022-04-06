import { Field, InputType } from 'type-graphql';
import { ExperienceLearning } from '../../models/CampusAdministrator/ExperienceLearning';

@InputType()
export class NewExperienceLearning implements Partial<ExperienceLearning> {
    @Field({ nullable: true })
    campusId?: string;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    academicAsignatureCourseId?: string;

}
