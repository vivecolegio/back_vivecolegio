import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { GeneralAcademicAsignature } from './GeneralAcademicAsignature';
import { GeneralAcademicGrade } from './GeneralAcademicGrade';

@ObjectType({ description: 'The GeneralBasicLearningRight model', implements: IModelData })
@Entity()
export class GeneralBasicLearningRight extends IModelData {
    @Field({ nullable: true })
    @Column({ nullable: true })
    dba?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    category?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    generalAcademicAsignatureId?: string;

    @Field({ nullable: true })
    generalAcademicAsignature?: GeneralAcademicAsignature;

    @Field({ nullable: true })
    @Column({ nullable: true })
    generalAcademicGradeId?: string;

    @Field({ nullable: true })
    generalAcademicGrade?: GeneralAcademicGrade;
}

@ObjectType()
export class GeneralBasicLearningRightEdge extends EdgeType(
    'GeneralBasicLearningRight',
    GeneralBasicLearningRight
) { }

@ObjectType()
export class GeneralBasicLearningRightConnection extends ConnectionType<GeneralBasicLearningRightEdge>(
    'GeneralBasicLearningRight',
    GeneralBasicLearningRightEdge
) { }
