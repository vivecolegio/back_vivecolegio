import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelData } from '../interfaces/IModelData';
import { ConnectionType, EdgeType } from '../pagination/relaySpecs';
import { Campus } from './Campus';
import { School } from './School';
import { User } from './User';

@ObjectType({ description: 'The Student model', implements: IModelData })
@Entity()
export class Student extends IModelData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  schoolId?: string;

  @Field({ nullable: true })
  school?: School;

  @Field({ nullable: true })
  @Column({ nullable: true })
  campusId?: string;

  @Field({ nullable: true })
  campus?: Campus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  user?: User;
}

@ObjectType()
export class StudentEdge extends EdgeType('Student', Student) {}

@ObjectType()
export class StudentConnection extends ConnectionType<StudentEdge>('Student', StudentEdge) {}
