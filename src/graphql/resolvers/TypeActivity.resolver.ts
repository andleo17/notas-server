import { AuthenticationError } from 'apollo-server';
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
import { Context, UserRole } from '../../context';
import { NO_ADMIN } from '../../utils/errors';
import TypeActivityInput from '../inputs/TypeActivity.input';
import ActivityType from '../types/Activity.type';
import TypeActivityType from '../types/TypeActivity.type';

@Resolver(() => TypeActivityType)
export default class TypeActivityResolver {
	@FieldResolver(() => [ActivityType])
	async activities(
		@Root() { id }: TypeActivityType,
		@Ctx() { prisma }: Context
	): Promise<ActivityType[]> {
		return await prisma.typeActivity
			.findUnique({ where: { id } })
			.activities();
	}

	@Query(() => TypeActivityType)
	async typeActivity(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<TypeActivityType> {
		return await prisma.typeActivity.findUnique({ where: { id } });
	}

	@Query(() => [TypeActivityType])
	async typesActivity(
		@Ctx() { prisma }: Context
	): Promise<TypeActivityType[]> {
		return await prisma.typeActivity.findMany({ orderBy: { name: 'asc' } });
	}

	@Mutation(() => TypeActivityType)
	async addTypeActivity(
		@Arg('data') data: TypeActivityInput,
		@Ctx() { prisma, user }: Context
	): Promise<TypeActivityType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.typeActivity.create({ data: { name: data.name } });
	}

	@Mutation(() => TypeActivityType)
	async modifyTypeActivity(
		@Arg('id', () => Int) id: number,
		@Arg('data') data: TypeActivityInput,
		@Ctx() { prisma, user }: Context
	): Promise<TypeActivityType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.typeActivity.update({
			where: { id },
			data: { name: data.name },
		});
	}

	@Mutation(() => TypeActivityType)
	async deleteTypeActivity(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma, user }: Context
	): Promise<TypeActivityType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.typeActivity.delete({ where: { id } });
	}
}
