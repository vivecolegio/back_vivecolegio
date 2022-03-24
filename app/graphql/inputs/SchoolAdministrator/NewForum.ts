import { Field, InputType } from 'type-graphql';
import { Forum } from '../../models/SchoolAdministrator/Forum';

@InputType()
export class NewForum implements Partial<Forum> {
    @Field({ nullable: true })
    name?: string;
}
