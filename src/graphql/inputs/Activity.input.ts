import { Field, Float, InputType, Int } from 'type-graphql';
import ActivityType from '../types/Activity.type';

@InputType()
export default class ActivityInput implements Partial<ActivityType> {
	@Field({ nullable: true })
	name: string;

	@Field((type) => Float, { nullable: true })
	weight: number;

	@Field({ nullable: true })
	presentationDate?: Date;

	@Field({ nullable: true })
	state?: boolean;

	@Field((type) => Int, { nullable: true })
	typeActivityId?: number;

	@Field((type) => Int, { nullable: true })
	activityId?: number;

	@Field((type) => Int, { nullable: true })
	groupId?: number;
}
