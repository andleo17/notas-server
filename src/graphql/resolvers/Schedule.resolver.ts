import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { Context } from '../../context';
import ScheduleInput from '../inputs/Schedule.input';
import GroupType from '../types/Group.type';
import ScheduleType from '../types/Schedule.type';

@Resolver((of) => ScheduleType)
export default class ScheduleResolver {
	@FieldResolver((returns) => GroupType)
	async group(
		@Root() { id }: ScheduleType,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.schedule.findOne({ where: { id } }).group();
	}

	@Query((returns) => ScheduleType)
	async schedule(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<ScheduleType> {
		return await prisma.schedule.findOne({ where: { id } });
	}

	@Query((returns) => [ScheduleType])
	async schedules(@Ctx() { prisma }: Context): Promise<ScheduleType[]> {
		return await prisma.schedule.findMany();
	}

	@Mutation((returns) => ScheduleType)
	async addSchedule(
		@Arg('data') data: ScheduleInput,
		@Ctx() { prisma }: Context
	): Promise<ScheduleType> {
		return await prisma.schedule.create({
			data: {
				day: data.day,
				startHour: data.startHour,
				finishHour: data.finishHour,
				group: { connect: { id: data.groupId } },
			},
		});
	}

	@Mutation((returns) => ScheduleType)
	async modifySchedule(
		@Arg('id', (type) => Int) id: number,
		@Arg('data') data: ScheduleInput,
		@Ctx() { prisma }: Context
	): Promise<ScheduleType> {
		return await prisma.schedule.update({
			where: { id },
			data: {
				day: data.day,
				startHour: data.startHour,
				finishHour: data.finishHour,
				state: data.state,
			},
		});
	}

	@Mutation((returns) => ScheduleType)
	async deleteSchedule(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<ScheduleType> {
		return await prisma.schedule.delete({ where: { id } });
	}
}
