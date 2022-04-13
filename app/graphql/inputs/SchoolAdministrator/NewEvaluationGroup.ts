import { Field, InputType } from 'type-graphql';
import { EvaluationGroup } from '../../models/SchoolAdministrator/EvaluationGroup';

@InputType()
export class NewEvaluationGroup implements Partial<EvaluationGroup> {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    weight?: number;

    @Field({ nullable: true })
    schoolId?: string;
}
