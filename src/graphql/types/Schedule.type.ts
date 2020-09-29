import { Schedule } from '@prisma/client';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import GroupType from './Group.type';

@ObjectType('Schedule')
export default class ScheduleType implements Schedule {
	@Field((type) => ID)
	id: number;

	@Field((type) => Int)
	day: number;

	@Field()
	startHour: Date;

	@Field()
	finishHour: Date;

	@Field()
	state: boolean;

	@Field((type) => Int)
	groupId: number;

	@Field((type) => GroupType)
	group?: GroupType;
}
