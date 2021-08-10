import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The EducationLevel model', implements: IModelSchoolData })
@Entity()
export class EducationLevel extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;
}

@ObjectType()
export class EducationLevelEdge extends EdgeType('EducationLevel', EducationLevel) {}

@ObjectType()
export class EducationLevelConnection extends ConnectionType<EducationLevelEdge>(
  'EducationLevel',
  EducationLevelEdge
) {}
