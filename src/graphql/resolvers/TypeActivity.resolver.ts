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
import { TypeActivity } from '../models/TypeActivity';

@Resolver(() => TypeActivity)
export default class TypeActivityResolver {
	@FieldResolver(() => [Activity])
	async activities(
		@Root() { id }: TypeActivity,
		@Ctx() { prisma }: APIContext
	): Promise<Activity[]> {
		return await prisma.typeActivity.findUnique({ where: { id } }).activities();
	}

	@Query(() => TypeActivity)
	async typeActivity(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: APIContext
	): Promise<TypeActivity> {
		return await prisma.typeActivity.findUnique({ where: { id } });
	}

	@Query(() => [TypeActivity])
	async typesActivity(@Ctx() { prisma }: APIContext): Promise<TypeActivity[]> {
		return await prisma.typeActivity.findMany({ orderBy: { name: 'asc' } });
	}
}
