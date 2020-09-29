import { Activity } from '@prisma/client';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import GradeType from './Grade.type';
import GroupType from './Group.type';
import TypeActivityType from './TypeActivity.type';

@ObjectType('Activity')
export default class ActivityType implements Activity {
	@Field((type) => ID)
	id: number;

	@Field()
	name: string;

	@Field((type) => Float)
	weight: number;

	@Field({ nullable: true })
	presentationDate: Date;

	@Field()
	state: boolean;

	@Field((type) => Int)
	typeActivityId: number;

	@Field((type) => Int, { nullable: true })
	activityId: number;

	@Field((type) => Int)
	groupId: number;

	@Field((type) => TypeActivityType)
	typeActivity?: TypeActivityType;

	@Field((type) => ActivityType, { nullable: true })
	activity?: ActivityType;

	@Field((type) => GroupType)
	group?: GroupType;

	@Field((type) => [ActivityType])
	activities?: ActivityType[];

	@Field((type) => [GradeType])
	grades?: GradeType[];
}
