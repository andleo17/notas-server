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
import { Activity } from '../models/Activity';
import { Group } from '../models/Group';
import { TypeActivity } from '../models/TypeActivity';

@Resolver(() => Activity)
export default class ActivityResolver {
	@FieldResolver(() => TypeActivity)
	async typeActivity(
		@Root() { id }: Activity,
		@Ctx() { prisma }: APIContext
	): Promise<TypeActivity> {
		return prisma.activity.findUnique({ where: { id } }).typeActivity();
	}

	@FieldResolver(() => Activity, { nullable: true })
	async parentActivity(
		@Root() { id }: Activity,
		@Ctx() { prisma }: APIContext
	): Promise<Activity> {
		return prisma.activity.findUnique({ where: { id } }).parentActivity();
	}

	@FieldResolver(() => Group)
	async group(
		@Root() { id }: Activity,
		@Ctx() { prisma }: APIContext
	): Promise<Group> {
		return prisma.activity.findUnique({ where: { id } }).group();
	}

	@FieldResolver(() => [Activity])
	async childActivities(
		@Root() { id }: Activity,
		@Ctx() { prisma }: APIContext
	): Promise<Activity[]> {
		return prisma.activity.findUnique({ where: { id } }).childActivities();
	}

	@Query(() => Activity)
	async activity(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: APIContext
	): Promise<Activity> {
		return prisma.activity.findUnique({ where: { id } });
	}

	@Query(() => [Activity])
	async activities(
		@Arg('groupId', () => Int) groupId: number,
		@Ctx() { prisma }: APIContext
	): Promise<Activity[]> {
		return prisma.activity.findMany({ where: { groupId } });
	}
}
