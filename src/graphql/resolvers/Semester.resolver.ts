import { Prisma } from '@prisma/client';
import { AuthenticationError } from 'apollo-server';
import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { Context, UserRole } from '../../context';
import { NO_ADMIN } from '../../utils/errors';
import SemesterInput from '../inputs/Semester.input';
import EnrollmentType from '../types/Enrollment.type';
import GroupType from '../types/Group.type';
import SemesterType from '../types/Semester.type';
import UserType from '../types/User.type';

@Resolver((of) => SemesterType)
export default class SemesterResolver {
	@FieldResolver((returns) => [UserType])
	async users(
		@Root() { name }: SemesterType,
		@Ctx() { prisma }: Context
	): Promise<UserType[]> {
		return await prisma.semester.findUnique({ where: { name } }).users();
	}

	@FieldResolver((returns) => [UserType])
	async groups(
		@Root() { name }: SemesterType,
		@Ctx() { prisma }: Context
	): Promise<GroupType[]> {
		return await prisma.semester.findUnique({ where: { name } }).groups();
	}

	@FieldResolver((returns) => [UserType])
	async enrollments(
		@Root() { name }: SemesterType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType[]> {
		return await prisma.semester.findUnique({ where: { name } }).enrollments();
	}

	@Query((returns) => SemesterType)
	async semester(
		@Arg('name') name: string,
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
		return await prisma.semester.findUnique({ where: { name } });
	}

	@Query((returns) => [SemesterType])
	async semesters(@Ctx() { prisma, user }: Context): Promise<SemesterType[]> {
		const args: Prisma.FindManySemesterArgs = { orderBy: { name: 'asc' } };
		if (user.role === UserRole.USER)
			args.where = { startDate: { lte: new Date() } };
		return await prisma.semester.findMany(args);
	}

	@Query((returns) => SemesterType)
	async currentSemester(@Ctx() { prisma }: Context): Promise<SemesterType> {
		return await prisma.semester.findFirst({ where: { state: true } });
	}

	@Mutation((returns) => SemesterType)
	async addSemester(
		@Arg('data') data: SemesterInput,
		@Ctx() { prisma, user }: Context
	): Promise<SemesterType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.semester.create({
			data: {
				name: data.name,
				startDate: data.startDate,
				finishDate: data.finishDate,
				state: data.state,
			},
		});
	}

	@Mutation((returns) => SemesterType)
	async modifySemester(
		@Arg('name') name: string,
		@Arg('data') data: SemesterInput,
		@Ctx() { prisma, user }: Context
	): Promise<SemesterType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.semester.update({
			where: { name },
			data: {
				startDate: data.startDate,
				finishDate: data.finishDate,
				state: data.state,
			},
		});
	}

	@Mutation((returns) => SemesterType)
	async deleteSemester(
		@Arg('name') name: string,
		@Ctx() { prisma, user }: Context
	): Promise<SemesterType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.semester.delete({ where: { name } });
	}
}
