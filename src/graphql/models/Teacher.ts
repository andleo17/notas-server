import { Field, ID, ObjectType } from 'type-graphql';
import { Group } from './Group';

@ObjectType()
export class Teacher {
	@Field(() => ID)
	id: number;

	@Field()
	name: string;

	@Field()
	lastname: string;

	@Field(() => [Group])
	groups?: Group[];
}
