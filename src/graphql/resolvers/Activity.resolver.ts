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
import ActivityInput from '../inputs/Activity.input';
import ActivityType from '../types/Activity.type';
import GradeType from '../types/Grade.type';
import GroupType from '../types/Group.type';
import TypeActivityType from '../types/TypeActivity.type';

@Resolver(() => ActivityType)
export default class ActivityResolver {
	@FieldResolver(() => TypeActivityType)
	async typeActivity(
		@Root() { id }: ActivityType,
		@Ctx() { prisma }: Context
	): Promise<TypeActivityType> {
		return await prisma.activity
			.findUnique({ where: { id } })
			.typeActivity();
	}

	@FieldResolver(() => ActivityType, { nullable: true })
	async parentActivity(
		@Root() { id }: ActivityType,
		@Ctx() { prisma }: Context
	): Promise<ActivityType> {
		return await prisma.activity
			.findUnique({ where: { id } })
			.parentActivity();
	}

	@FieldResolver(() => GroupType)
	async group(
		@Root() { id }: ActivityType,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.activity.findUnique({ where: { id } }).group();
	}

	@FieldResolver(() => [ActivityType])
	async childActivities(
		@Root() { id }: ActivityType,
		@Ctx() { prisma }: Context
	): Promise<ActivityType[]> {
		return await prisma.activity
			.findUnique({ where: { id } })
			.childActivities();
	}

	@FieldResolver(() => [GradeType])
	async grades(
		@Root() { id }: ActivityType,
		@Ctx() { prisma }: Context
	): Promise<GradeType[]> {
		return await prisma.activity.findUnique({ where: { id } }).grades();
	}

	@Query(() => ActivityType)
	async activity(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<ActivityType> {
		return await prisma.activity.findUnique({ where: { id } });
	}

	@Query(() => [ActivityType])
	async activities(@Ctx() { prisma }: Context): Promise<ActivityType[]> {
		return await prisma.activity.findMany();
	}

	@Mutation(() => ActivityType)
	async addActivity(
		@Arg('data') data: ActivityInput,
		@Ctx() { prisma }: Context
	): Promise<ActivityType> {
		return await prisma.activity.create({
			data: {
				name: data.name,
				weight: data.weight,
				presentationDate: data.presentationDate,
				state: data.state,
				typeActivity: { connect: { id: data.typeActivityId } },
				parentActivity: { connect: { id: data.activityId } },
				group: { connect: { id: data.groupId } },
			},
		});
	}

	@Mutation(() => ActivityType)
	async modifyActivity(
		@Arg('id', () => Int) id: number,
		@Arg('data') data: ActivityInput,
		@Ctx() { prisma }: Context
	): Promise<ActivityType> {
		return await prisma.activity.update({
			where: { id },
			data: {
				name: data.name,
				weight: data.weight,
				presentationDate: data.presentationDate,
				state: data.state,
			},
		});
	}

	@Mutation(() => ActivityType)
	async deleteActivity(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<ActivityType> {
		return await prisma.activity.delete({ where: { id } });
	}
}
