import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { QuestionTypeTestOnline } from '../../enums/QuestionTypeTestOnline';
import { IModelCampusData } from '../../interfaces/IModelCampusData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { QuestionCategoryTestOnline } from './QuestionCategoryTestOnline';

@ObjectType({ description: 'The QuestionTestOnline model', implements: IModelCampusData })
@Entity()
export class QuestionTestOnline extends IModelCampusData {

    @Field({ nullable: true })
    @Column({ nullable: true })
    questionCategoryTestOnlineId?: string;

    @Field({ nullable: true })
    questionCategoryTestOnline?: QuestionCategoryTestOnline;

    @Field({ nullable: true })
    @Column({ nullable: true })
    questionType?: QuestionTypeTestOnline;

    @Field({ nullable: true })
    @Column({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    statement?: string;
}

@ObjectType()
export class QuestionTestOnlineEdge extends EdgeType('QuestionTestOnline', QuestionTestOnline) { }

@ObjectType()
export class QuestionTestOnlineConnection extends ConnectionType<QuestionTestOnlineEdge>('QuestionTestOnline', QuestionTestOnlineEdge) { }
