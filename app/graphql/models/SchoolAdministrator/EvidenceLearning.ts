import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Learning } from './Learning';

@ObjectType({ description: 'The EvidenceLearning model', implements: IModelSchoolData })
@Entity()
export class EvidenceLearning extends IModelSchoolData {
    @Field({ nullable: true })
    @Column({ nullable: true })
    statement?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    learningId?: string;

    @Field({ nullable: true })
    learning?: Learning;
}

@ObjectType()
export class EvidenceLearningEdge extends EdgeType(
    'EvidenceLearning',
    EvidenceLearning
) { }

@ObjectType()
export class EvidenceLearningConnection extends ConnectionType<EvidenceLearningEdge>(
    'EvidenceLearning',
    EvidenceLearningEdge
) { }
