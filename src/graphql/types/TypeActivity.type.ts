import { TypeActivity } from '@prisma/client';
import { Field, ID, ObjectType } from 'type-graphql';
import ActivityType from './Activity.type';

@ObjectType('TypeActivity')
export default class TypeActivityType implements TypeActivity {
	@Field((type) => ID)
	id: number;

	@Field()
	name: string;

	@Field((type) => [ActivityType])
	activities?: ActivityType[];
}