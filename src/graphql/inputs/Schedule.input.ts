import { Field, InputType, Int } from 'type-graphql';
import ScheduleType from '../types/Schedule.type';

@InputType()
export default class ScheduleInput implements Partial<ScheduleType> {
	@Field((type) => Int)
	day: number;

	@Field()
	startHour: Date;

	@Field()
	finishHour: Date;

	@Field({ nullable: true })
	state?: boolean;

	@Field((type) => Int, { nullable: true })
	groupId?: number;
}
