import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { ExperienceType } from '../../enums/ExperienceType';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { EvidenceLearning } from '../SchoolAdministrator/EvidenceLearning';
import { Learning } from '../SchoolAdministrator/Learning';
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

    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string;

    @Field(() => ExperienceType, { nullable: true })
    @Column({ nullable: true })
    experienceType?: ExperienceType;

    @Field({ nullable: true })
    @Column({ nullable: true })
    fecha?: Date;

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    learningsId?: String[];

    @Field(() => [Learning], { nullable: true })
    learnigs?: Learning[];

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    evidenciceLearningsId?: String[];

    @Field(() => [EvidenceLearning], { nullable: true })
    evidenciceLearnings?: EvidenceLearning[];
}

@ObjectType()
export class ExperienceLearningEdge extends EdgeType('ExperienceLearning', ExperienceLearning) { }

@ObjectType()
export class ExperienceLearningConnection extends ConnectionType<ExperienceLearningEdge>(
    'ExperienceLearning',
    ExperienceLearningEdge
) { }
