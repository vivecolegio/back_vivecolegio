import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The Forum model', implements: IModelSchoolData })
@Entity()
export class Forum extends IModelSchoolData {
    @Field({ nullable: true })
    @Column({ nullable: true })
    name?: string;
}

@ObjectType()
export class ForumEdge extends EdgeType('Forum', Forum) { }

@ObjectType()
export class ForumConnection extends ConnectionType<ForumEdge>(
    'Forum',
    ForumEdge
) { }
