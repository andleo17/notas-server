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

@Resolver((of) => ActivityType)
export default class ActivityResolver {
	@FieldResolver((returns) => TypeActivityType)
	async typeActivity(
		@Root() { id }: ActivityType,
		@Ctx() { prisma }: Context
	): Promise<TypeActivityType> {
		return await prisma.activity.findOne({ where: { id } }).typeActivity();
	}

	@FieldResolver((returns) => ActivityType, { nullable: true })
	async parentActivity(
		@Root() { id }: ActivityType,
		@Ctx() { prisma }: Context
	): Promise<ActivityType> {
		return await prisma.activity
			.findOne({ where: { id } })
			.parentActivity();
	}

	@FieldResolver((returns) => GroupType)
	async group(
		@Root() { id }: ActivityType,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.activity.findOne({ where: { id } }).group();
	}

	@FieldResolver((returns) => [ActivityType])
	async childActivities(
		@Root() { id }: ActivityType,
		@Ctx() { prisma }: Context
	): Promise<ActivityType[]> {
		return await prisma.activity
			.findOne({ where: { id } })
			.childActivities();
	}

	@FieldResolver((returns) => [GradeType])
	async grades(
		@Root() { id }: ActivityType,
		@Ctx() { prisma }: Context
	): Promise<GradeType[]> {
		return await prisma.activity.findOne({ where: { id } }).grades();
	}

	@Query((returns) => ActivityType)
	async activity(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<ActivityType> {
		return await prisma.activity.findOne({ where: { id } });
	}

	@Query((returns) => [ActivityType])
	async activities(@Ctx() { prisma }: Context): Promise<ActivityType[]> {
		return await prisma.activity.findMany();
	}

	@Mutation((returns) => ActivityType)
	async addActivity(
		@Arg('data') data: ActivityInput,
		@Ctx() { prisma }: Context
	): Promise<ActivityType> {
		return await prisma.activity.create({
			data: {
				name: data.name,
				weight: data.weight,
				presentationDate: data.presentationDate,
				typeActivity: { connect: { id: data.typeActivityId } },
				parentActivity: { connect: { id: data.activityId } },
				group: { connect: { id: data.groupId } },
			},
		});
	}

	@Mutation((returns) => ActivityType)
	async modifyActivity(
		@Arg('id', (type) => Int) id: number,
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

	@Mutation((returns) => ActivityType)
	async deleteActivity(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<ActivityType> {
		return await prisma.activity.delete({ where: { id } });
	}
}
