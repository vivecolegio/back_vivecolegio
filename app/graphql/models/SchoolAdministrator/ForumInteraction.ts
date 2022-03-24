import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Forum } from './Forum';

@ObjectType({ description: 'The ForumInteraction model', implements: IModelSchoolData })
@Entity()
export class ForumInteraction extends IModelSchoolData {
    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    forumId?: string;

    @Field(() => Forum, { nullable: true })
    forum?: Forum;
}

@ObjectType()
export class ForumInteractionEdge extends EdgeType('ForumInteraction', ForumInteraction) { }

@ObjectType()
export class ForumInteractionConnection extends ConnectionType<ForumInteractionEdge>(
    'ForumInteraction',
    ForumInteractionEdge
) { }
