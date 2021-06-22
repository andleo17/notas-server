import { Field, ID, ObjectType } from 'type-graphql';
import { School } from './School';

@ObjectType()
export class Faculty {
	@Field(() => ID)
	id: number;

	@Field(() => String)
	name: string;

	@Field(() => Boolean)
	state: boolean;

	@Field(() => [School])
	schools?: School[];
}
