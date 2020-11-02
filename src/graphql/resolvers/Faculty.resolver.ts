import { FindManyFacultyArgs, FindOneFacultyArgs } from '@prisma/client';
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
import FacultyInput from '../inputs/Faculty.input';
import FacultyType from '../types/Faculty.type';
import SchoolType from '../types/School.type';

@Resolver((of) => FacultyType)
export default class FacultyResolver {
	@FieldResolver((returns) => [SchoolType])
	async schools(
		@Root() { id }: FacultyType,
		@Ctx() { prisma }: Context
	): Promise<SchoolType[]> {
		return await prisma.faculty.findOne({ where: { id } }).schools();
	}

	@Query((returns) => FacultyType)
	async faculty(
		@Arg('id', (type) => Int, { nullable: true }) id: number,
		@Arg('name', { nullable: true }) name: string,
		@Ctx()
		{ prisma }: Context
	): Promise<FacultyType> {
		return await prisma.faculty.findFirst({
			where: { id, name: { contains: name, mode: 'insensitive' } },
		});
	}

	@Query((returns) => [FacultyType])
	async faculties(@Ctx() { prisma, user }: Context): Promise<FacultyType[]> {
		const args: FindManyFacultyArgs = { orderBy: { name: 'asc' } };
		if (user.role === UserRole.USER) args.where = { state: true };
		return await prisma.faculty.findMany(args);
	}

	@Mutation((returns) => FacultyType)
	async addFaculty(
		@Arg('data') data: FacultyInput,
		@Ctx() { prisma, user }: Context
	): Promise<FacultyType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError('No admin');
		return await prisma.faculty.create({
			data: { name: data.name, state: data.state },
		});
	}

	@Mutation((returns) => FacultyType)
	async modifyFaculty(
		@Arg('id', (type) => Int) id: number,
		@Arg('data') data: FacultyInput,
		@Ctx() { prisma, user }: Context
	): Promise<FacultyType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError('No admin');
		return await prisma.faculty.update({
			where: { id },
			data: { name: data.name, state: data.state },
		});
	}

	@Mutation((returns) => FacultyType)
	async deleteFaculty(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma, user }: Context
	): Promise<FacultyType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError('No admin');
		return prisma.faculty.delete({ where: { id } });
	}
}
