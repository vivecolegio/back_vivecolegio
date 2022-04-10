import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { GeneralBasicLearningRight } from '../GeneralAdministrator/GeneralBasicLearningRight';
import { AcademicAsignature } from './AcademicAsignature';
import { AcademicGrade } from './AcademicGrade';
import { AcademicPeriod } from './AcademicPeriod';
import { AcademicStandard } from './AcademicStandard';


@ObjectType({ description: 'The Learning model', implements: IModelSchoolData })
@Entity()
export class Learning extends IModelSchoolData {
    @Field({ nullable: true })
    @Column({ nullable: true })
    statement?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicAsignatureId?: string;

    @Field({ nullable: true })
    academicAsignature?: AcademicAsignature;

    @Field({ nullable: true })
    @Column({ nullable: true })
    generalBasicLearningRightId?: string;

    @Field({ nullable: true })
    generalBasicLearningRight?: GeneralBasicLearningRight;

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicStandardId?: string;

    @Field({ nullable: true })
    academicStandard?: AcademicStandard;

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicGradeId?: string;

    @Field({ nullable: true })
    academicGrade?: AcademicGrade;

    @Field(() => [String], { nullable: true })
    @Column({ nullable: true })
    academicPeriodsId?: String[];;

    @Field(() => [AcademicPeriod], { nullable: true })
    academicPeriods?: AcademicPeriod[];
}

@ObjectType()
export class LearningEdge extends EdgeType(
    'Learning',
    Learning
) { }

@ObjectType()
export class LearningConnection extends ConnectionType<LearningEdge>(
    'Learning',
    LearningEdge
) { }
