import { Schedule } from '../../../prisma/@client';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import GroupType from './Group.type';

@ObjectType('Schedule')
export default class ScheduleType implements Schedule {
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

	@Field(() => GroupType)
	group?: GroupType;
}
