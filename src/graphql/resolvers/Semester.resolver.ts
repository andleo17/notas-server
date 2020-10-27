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
		return await prisma.semester.findOne({ where: { name } }).users();
	}

	@FieldResolver((returns) => [UserType])
	async groups(
		@Root() { name }: SemesterType,
		@Ctx() { prisma }: Context
	): Promise<GroupType[]> {
		return await prisma.semester.findOne({ where: { name } }).groups();
	}

	@FieldResolver((returns) => [UserType])
	async enrollments(
		@Root() { name }: SemesterType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType[]> {
		return await prisma.semester.findOne({ where: { name } }).enrollments();
	}

	@Query((returns) => SemesterType)
	async semester(
		@Arg('name') name: string,
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
		return await prisma.semester.findOne({ where: { name } });
	}

	@Query((returns) => [SemesterType])
	async semesters(@Ctx() { prisma }: Context): Promise<SemesterType[]> {
		return await prisma.semester.findMany();
	}

	@Mutation((returns) => SemesterType)
	async addSemester(
		@Arg('data') data: SemesterInput,
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
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
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
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
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
		return await prisma.semester.delete({ where: { name } });
	}
}
