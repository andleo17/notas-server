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

@Resolver(() => ScheduleType)
export default class ScheduleResolver {
	@FieldResolver(() => GroupType)
	async group(
		@Root() { id }: ScheduleType,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.schedule.findUnique({ where: { id } }).group();
	}

	@Query(() => ScheduleType)
	async schedule(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<ScheduleType> {
		return await prisma.schedule.findUnique({ where: { id } });
	}

	@Query(() => [ScheduleType])
	async schedules(@Ctx() { prisma }: Context): Promise<ScheduleType[]> {
		return await prisma.schedule.findMany();
	}

	@Mutation(() => ScheduleType)
	async addSchedule(
		@Arg('data') data: ScheduleInput,
		@Ctx() { prisma }: Context
	): Promise<ScheduleType> {
		return await prisma.schedule.create({
			data: {
				day: data.day,
				startHour: data.startHour,
				finishHour: data.finishHour,
				state: data.state,
				group: { connect: { id: data.groupId } },
			},
		});
	}

	@Mutation(() => ScheduleType)
	async modifySchedule(
		@Arg('id', () => Int) id: number,
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

	@Mutation(() => ScheduleType)
	async deleteSchedule(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<ScheduleType> {
		return await prisma.schedule.delete({ where: { id } });
	}
}
