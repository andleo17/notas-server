import { Prisma } from '../../../prisma/@client';
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
import FacultyInput from '../inputs/Faculty.input';
import FacultyType from '../types/Faculty.type';
import SchoolType from '../types/School.type';

@Resolver(() => FacultyType)
export default class FacultyResolver {
	@FieldResolver(() => [SchoolType])
	async schools(
		@Root() { id }: FacultyType,
		@Ctx() { prisma }: Context
	): Promise<SchoolType[]> {
		return await prisma.faculty.findUnique({ where: { id } }).schools();
	}

	@Query(() => FacultyType)
	async faculty(
		@Arg('id', () => Int, { nullable: true }) id: number,
		@Arg('name', { nullable: true }) name: string,
		@Ctx()
		{ prisma }: Context
	): Promise<FacultyType> {
		return await prisma.faculty.findFirst({
			where: { id, name: { contains: name, mode: 'insensitive' } },
		});
	}

	@Query(() => [FacultyType])
	async faculties(@Ctx() { prisma, user }: Context): Promise<FacultyType[]> {
		const args: Prisma.FindManyFacultyArgs = { orderBy: { name: 'asc' } };
		if (user.role === UserRole.USER) args.where = { state: true };
		return await prisma.faculty.findMany(args);
	}

	@Mutation(() => FacultyType)
	async addFaculty(
		@Arg('data') data: FacultyInput,
		@Ctx() { prisma, user }: Context
	): Promise<FacultyType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.faculty.create({
			data: { name: data.name, state: data.state },
		});
	}

	@Mutation(() => FacultyType)
	async modifyFaculty(
		@Arg('id', () => Int) id: number,
		@Arg('data') data: FacultyInput,
		@Ctx() { prisma, user }: Context
	): Promise<FacultyType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.faculty.update({
			where: { id },
			data: { name: data.name, state: data.state },
		});
	}

	@Mutation(() => FacultyType)
	async deleteFaculty(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma, user }: Context
	): Promise<FacultyType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return prisma.faculty.delete({ where: { id } });
	}
}
