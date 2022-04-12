import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Student } from '../GeneralAdministrator/Student';
import { ExperienceLearning } from './ExperienceLearning';

@ObjectType({ description: 'The ExperienceLearningCoEvaluation model', implements: IModelCampusData })
@Entity()
export class ExperienceLearningCoEvaluation extends IModelCampusData {

    @Field({ nullable: true })
    @Column({ nullable: true })
    experienceLearningId?: string;

    @Field({ nullable: true })
    experienceLearning?: ExperienceLearning;

    @Field({ nullable: true })
    @Column({ nullable: true })
    coEvaluatorId?: String;

    @Field({ nullable: true })
    coEvaluator?: Student;

    @Field({ nullable: true })
    @Column({ nullable: true })
    studentId?: String;

    @Field({ nullable: true })
    student?: Student;

    @Field({ nullable: true })
    @Column({ nullable: true })
    assessment?: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    observations?: String;

}

@ObjectType()
export class ExperienceLearningCoEvaluationEdge extends EdgeType('ExperienceLearningCoEvaluation', ExperienceLearningCoEvaluation) { }

@ObjectType()
export class ExperienceLearningCoEvaluationConnection extends ConnectionType<ExperienceLearningCoEvaluationEdge>('ExperienceLearningCoEvaluation', ExperienceLearningCoEvaluationEdge) { }
