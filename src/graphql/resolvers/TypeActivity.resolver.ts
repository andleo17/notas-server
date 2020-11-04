import { FindManyTypeActivityArgs } from '@prisma/client';
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

@Resolver((of) => TypeActivityType)
export default class TypeActivityResolver {
	@FieldResolver((returns) => [ActivityType])
	async activities(
		@Root() { id }: TypeActivityType,
		@Ctx() { prisma }: Context
	): Promise<ActivityType[]> {
		return await prisma.typeActivity
			.findOne({ where: { id } })
			.activities();
	}

	@Query((returns) => TypeActivityType)
	async typeActivity(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<TypeActivityType> {
		return await prisma.typeActivity.findOne({ where: { id } });
	}

	@Query((returns) => [TypeActivityType])
	async typesActivity(
		@Ctx() { prisma }: Context
	): Promise<TypeActivityType[]> {
		return await prisma.typeActivity.findMany({ orderBy: { name: 'asc' } });
	}

	@Mutation((returns) => TypeActivityType)
	async addTypeActivity(
		@Arg('data') data: TypeActivityInput,
		@Ctx() { prisma, user }: Context
	): Promise<TypeActivityType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.typeActivity.create({ data: { name: data.name } });
	}

	@Mutation((returns) => TypeActivityType)
	async modifyTypeActivity(
		@Arg('id', (type) => Int) id: number,
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

	@Mutation((returns) => TypeActivityType)
	async deleteTypeActivity(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma, user }: Context
	): Promise<TypeActivityType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.typeActivity.delete({ where: { id } });
	}
}
