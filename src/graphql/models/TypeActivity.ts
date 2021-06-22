import { Field, ID, ObjectType } from 'type-graphql';
import { Activity } from './Activity';

@ObjectType()
export class TypeActivity {
	@Field(() => ID)
	id: number;

	@Field()
	name: string;

	@Field(() => [Activity])
	activities?: Activity[];
}
