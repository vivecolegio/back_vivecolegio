import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Student } from '../GeneralAdministrator/Student';
import { ExperienceLearning } from './ExperienceLearning';

@ObjectType({ description: 'The ExperienceLearningSelfAssessmentValuation model', implements: IModelCampusData })
@Entity()
export class ExperienceLearningSelfAssessmentValuation extends IModelCampusData {

    @Field({ nullable: true })
    @Column({ nullable: true })
    experienceLearningId?: string;

    @Field({ nullable: true })
    experienceLearning?: ExperienceLearning;

    @Field({ nullable: true })
    @Column({ nullable: true })
    studentId?: String;

    @Field({ nullable: true })
    student?: Student;

    @Field({ nullable: true })
    @Column({ nullable: true })
    assessment?: number;

}

@ObjectType()
export class ExperienceLearningSelfAssessmentValuationEdge extends EdgeType('ExperienceLearningSelfAssessmentValuation', ExperienceLearningSelfAssessmentValuation) { }

@ObjectType()
export class ExperienceLearningSelfAssessmentValuationConnection extends ConnectionType<ExperienceLearningSelfAssessmentValuationEdge>('ExperienceLearningSelfAssessmentValuation', ExperienceLearningSelfAssessmentValuationEdge) { }
