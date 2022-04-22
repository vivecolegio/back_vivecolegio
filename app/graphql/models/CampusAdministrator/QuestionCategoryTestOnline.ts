import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { QuestionBankTestOnline } from './QuestionBankTestOnline';

@ObjectType({ description: 'The QuestionCategoryTestOnline model', implements: IModelCampusData })
@Entity()
export class QuestionCategoryTestOnline extends IModelCampusData {

    @Field({ nullable: true })
    @Column({ nullable: true })
    questionBankTestOnlineId?: string;

    @Field({ nullable: true })
    questionBankTestOnline?: QuestionBankTestOnline;

    @Field({ nullable: true })
    @Column({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string;
}

@ObjectType()
export class QuestionCategoryTestOnlineEdge extends EdgeType('QuestionCategoryTestOnline', QuestionCategoryTestOnline) { }

@ObjectType()
export class QuestionCategoryTestOnlineConnection extends ConnectionType<QuestionCategoryTestOnlineEdge>('QuestionCategoryTestOnline', QuestionCategoryTestOnlineEdge) { }
