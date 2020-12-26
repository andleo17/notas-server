import { Field, InputType, Int } from 'type-graphql';
import ScheduleType from '../types/Schedule.type';

@InputType()
export default class ScheduleInput implements Partial<ScheduleType> {
	@Field(() => Int, { nullable: true })
	day: number;

	@Field({ nullable: true })
	startHour: Date;

	@Field({ nullable: true })
	finishHour: Date;

	@Field({ nullable: true })
	state?: boolean;

	@Field(() => Int, { nullable: true })
	groupId?: number;
}
