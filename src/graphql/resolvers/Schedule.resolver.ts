import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { APIContext } from '../../utils/context';
import { Group } from '../models/Group';
import { Schedule } from '../models/Schedule';

@Resolver(() => Schedule)
export default class ScheduleResolver {
	@FieldResolver(() => Group)
	async group(
		@Root() { id }: Schedule,
		@Ctx() { prisma }: APIContext
	): Promise<Group> {
		return prisma.schedule.findUnique({ where: { id } }).group();
	}

	@Query(() => Schedule)
	async schedule(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: APIContext
	): Promise<Schedule> {
		return prisma.schedule.findUnique({ where: { id } });
	}

	@Query(() => [Schedule])
	async schedules(
		@Arg('groupId', () => Int) groupId: number,
		@Ctx() { prisma }: APIContext
	): Promise<Schedule[]> {
		return prisma.schedule.findMany({ where: { groupId } });
	}
}
