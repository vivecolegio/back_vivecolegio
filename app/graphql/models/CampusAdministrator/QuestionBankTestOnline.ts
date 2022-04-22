import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { AcademicAsignature } from '../SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../SchoolAdministrator/AcademicGrade';
import { Teacher } from './Teacher';

@ObjectType({ description: 'The QuestionBankTestOnline model', implements: IModelCampusData })
@Entity()
export class QuestionBankTestOnline extends IModelCampusData {

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicAsignatureId?: string;

    @Field({ nullable: true })
    academicAsignature?: AcademicAsignature;

    @Field({ nullable: true })
    @Column({ nullable: true })
    academicGradeId?: string;

    @Field({ nullable: true })
    academicGrade?: AcademicGrade;

    @Field({ nullable: true })
    @Column({ nullable: true })
    teacherId?: string;

    @Field({ nullable: true })
    teacher?: Teacher;
}

@ObjectType()
export class QuestionBankTestOnlineEdge extends EdgeType('QuestionBankTestOnline', QuestionBankTestOnline) { }

@ObjectType()
export class QuestionBankTestOnlineConnection extends ConnectionType<QuestionBankTestOnlineEdge>('QuestionBankTestOnline', QuestionBankTestOnlineEdge) { }
