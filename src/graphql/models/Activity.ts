import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { Grade } from './Grade';
import { Group } from './Group';
import { TypeActivity } from './TypeActivity';

@ObjectType()
export class Activity {
	@Field(() => ID)
	id: number;

	@Field()
	name: string;

	@Field(() => Float)
	weight: number;

	@Field({ nullable: true })
	presentationDate: Date;

	@Field()
	state: boolean;

	@Field(() => Int)
	typeActivityId: number;

	@Field(() => Int, { nullable: true })
	activityId: number;

	@Field(() => Int)
	groupId: number;

	@Field(() => TypeActivity)
	typeActivity?: TypeActivity;

	@Field(() => Activity, { nullable: true })
	parentActivity?: Activity;

	@Field(() => Group)
	group?: Group;

	@Field(() => [Activity])
	childActivities?: Activity[];

	@Field(() => [Grade])
	grades?: Grade[];
}
