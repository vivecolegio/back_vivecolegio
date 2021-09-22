import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';
import { Campus } from '../GeneralAdministrator/Campus';

@ObjectType({ description: 'The Course model', implements: IModelData })
@Entity()
export class Course extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  campus?: Campus;
}

@ObjectType()
export class CourseEdge extends EdgeType('Course', Course) {}

@ObjectType()
export class CourseConnection extends ConnectionType<CourseEdge>('Course', CourseEdge) {}
