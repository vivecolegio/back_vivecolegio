import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The EvaluationGroup model', implements: IModelSchoolData })
@Entity()
export class EvaluationGroup extends IModelSchoolData {
    @Field({ nullable: true })
    @Column({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    weight?: number;
}

@ObjectType()
export class EvaluationGroupEdge extends EdgeType('EvaluationGroup', EvaluationGroup) { }

@ObjectType()
export class EvaluationGroupConnection extends ConnectionType<EvaluationGroupEdge>(
    'EvaluationGroup',
    EvaluationGroupEdge
) { }
