import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicAsignatureCourse } from './AcademicAsignatureCourse';

@ObjectType({ description: 'The ExperienceLearning model', implements: IModelCampusData })
@Entity()
export class ExperienceLearning extends IModelCampusData {
    @Field({ nullable: true })
    @Column({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicAsignatureCourseId?: string;

    @Field({ nullable: true })
    academicAsignatureCourse?: AcademicAsignatureCourse;

}

@ObjectType()
export class ExperienceLearningEdge extends EdgeType('ExperienceLearning', ExperienceLearning) { }

@ObjectType()
export class ExperienceLearningConnection extends ConnectionType<ExperienceLearningEdge>(
    'ExperienceLearning',
    ExperienceLearningEdge
) { }
