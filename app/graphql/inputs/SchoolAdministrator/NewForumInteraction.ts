import { Field, InputType } from 'type-graphql';
import { ForumInteraction } from '../../models/SchoolAdministrator/ForumInteraction';

@InputType()
export class NewForumInteraction implements Partial<ForumInteraction> {
    @Field({ nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    forumId?: string;
}
