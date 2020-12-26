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
import SchoolInput from '../inputs/School.input';
import CourseType from '../types/Course.type';
import FacultyType from '../types/Faculty.type';
import SchoolType from '../types/School.type';
import UserType from '../types/User.type';

@Resolver(() => SchoolType)
export default class SchoolResolver {
	@FieldResolver(() => FacultyType)
	async faculty(
		@Root() { id }: SchoolType,
		@Ctx() { prisma }: Context
	): Promise<FacultyType> {
		return await prisma.school.findUnique({ where: { id } }).faculty();
	}

	@FieldResolver(() => [UserType])
	async users(
		@Root() { id }: SchoolType,
		@Ctx() { prisma }: Context
	): Promise<UserType[]> {
		return await prisma.school.findUnique({ where: { id } }).users();
	}

	@FieldResolver(() => [CourseType])
	async courses(
		@Root() { id }: SchoolType,
		@Ctx() { prisma }: Context
	): Promise<CourseType[]> {
		return await prisma.school.findUnique({ where: { id } }).courses();
	}

	@Query(() => SchoolType)
	async school(
		@Arg('id', () => Int, { nullable: true }) id: number,
		@Arg('name', { nullable: true }) name: string,
		@Ctx() { prisma }: Context
	): Promise<SchoolType> {
		return await prisma.school.findFirst({
			where: { id, name: { contains: name, mode: 'insensitive' } },
		});
	}

	@Query(() => [SchoolType])
	async schools(
		@Arg('facultyId', () => Int, { nullable: true }) facultyId: number,
		@Ctx() { prisma, user }: Context
	): Promise<SchoolType[]> {
		const args: Prisma.FindManySchoolArgs = {
			orderBy: { name: 'asc' },
			where: { facultyId },
		};
		if (user.role === UserRole.USER) args.where.state = true;
		return await prisma.school.findMany(args);
	}

	@Mutation(() => SchoolType)
	async addSchool(
		@Arg('data') data: SchoolInput,
		@Ctx() { prisma, user }: Context
	): Promise<SchoolType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.school.create({
			data: {
				name: data.name,
				state: data.state,
				faculty: { connect: { id: data.facultyId } },
			},
		});
	}

	@Mutation(() => SchoolType)
	async modifySchool(
		@Arg('id', () => Int) id: number,
		@Arg('data') data: SchoolInput,
		@Ctx() { prisma, user }: Context
	): Promise<SchoolType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.school.update({
			where: { id },
			data: { name: data.name, state: data.state },
		});
	}

	@Mutation(() => SchoolType)
	async deleteSchool(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma, user }: Context
	): Promise<SchoolType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.school.delete({ where: { id } });
	}
}
