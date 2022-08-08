import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { IModelSchoolData } from '../../interfaces/IModelSchoolData';
import { ConnectionType, EdgeType } from '../../pagination/relaySpecs';

@ObjectType({ description: 'The SchoolConfiguration model', implements: IModelSchoolData })
@Entity()
export class SchoolConfiguration extends IModelSchoolData {
  @Field({ nullable: true })
  @Column({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  valueNumber?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  valueString?: string;
}

@ObjectType()
export class SchoolConfigurationEdge extends EdgeType('SchoolConfiguration', SchoolConfiguration) { }

@ObjectType()
export class SchoolConfigurationConnection extends ConnectionType<SchoolConfigurationEdge>(
  'SchoolConfiguration',
  SchoolConfigurationEdge
) { }
