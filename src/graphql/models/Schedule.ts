import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Group } from './Group';

@ObjectType()
export class Schedule {
	@Field(() => ID)
	id: number;

	@Field(() => Int)
	day: number;

	@Field()
	startHour: Date;

	@Field()
	finishHour: Date;

	@Field()
	state: boolean;

	@Field(() => Int)
	groupId: number;

	@Field(() => Group)
	group?: Group;
}
