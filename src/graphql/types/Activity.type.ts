import { Activity } from '../../../prisma/@client';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import GradeType from './Grade.type';
import GroupType from './Group.type';
import TypeActivityType from './TypeActivity.type';

@ObjectType('Activity')
export default class ActivityType implements Activity {
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

	@Field(() => TypeActivityType)
	typeActivity?: TypeActivityType;

	@Field(() => ActivityType, { nullable: true })
	parentActivity?: ActivityType;

	@Field(() => GroupType)
	group?: GroupType;

	@Field(() => [ActivityType])
	childActivities?: ActivityType[];

	@Field(() => [GradeType])
	grades?: GradeType[];
}
