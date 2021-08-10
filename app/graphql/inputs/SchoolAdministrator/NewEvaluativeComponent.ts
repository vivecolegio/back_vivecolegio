import { Field, InputType } from 'type-graphql';
import { EvaluativeComponent } from '../../models/SchoolAdministrator/EvaluativeComponent';

@InputType()
export class NewEvaluativeComponent implements Partial<EvaluativeComponent> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  weight?: number;
}
