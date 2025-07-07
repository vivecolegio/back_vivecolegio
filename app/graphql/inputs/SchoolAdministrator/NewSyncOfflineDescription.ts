import { Field, InputType } from 'type-graphql';
import { SyncOfflineDescription } from '../../models/SchoolAdministrator/objectType/SyncOfflineDescription';

@InputType()
export class NewSyncOfflineDescription implements Partial<SyncOfflineDescription> {
  @Field({ nullable: true })
  entity?: string;

  @Field({ nullable: true })
  offline?: number;

  @Field({ nullable: true })
  online?: number;

  @Field({ nullable: true })
  finish?: boolean;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => [String], { nullable: true })
  entityIds?: string[];

  @Field(() => [String], { nullable: true })
  entityNames?: string[];

  @Field({ nullable: true })
  entityDetails?: string; // JSON string con detalles adicionales
}
