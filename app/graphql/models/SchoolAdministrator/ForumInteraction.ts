import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Forum } from './Forum';

@Index("index_full", ["forumId", "schoolId"])
@ObjectType({ description: 'The ForumInteraction model', implements: IModelSchoolData })
@Entity()
export class ForumInteraction extends IModelSchoolData {
    @Field({ nullable: true })
    @Column({ nullable: true })
    comment?: string;

    @Index("index_forumId")
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
