import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { Context } from '../../context';
import CourseInput from '../inputs/Course.input';
import CourseType from '../types/Course.type';
import GroupType from '../types/Group.type';
import SchoolType from '../types/School.type';

@Resolver(() => CourseType)
export default class CourseResolver {
	@FieldResolver(() => SchoolType)
	async school(
		@Root() { code }: CourseType,
		@Ctx() { prisma }: Context
	): Promise<SchoolType> {
		return await prisma.course.findUnique({ where: { code } }).school();
	}

	@FieldResolver(() => [GroupType])
	async groups(
		@Root() { code }: CourseType,
		@Ctx() { prisma }: Context
	): Promise<GroupType[]> {
		return await prisma.course.findUnique({ where: { code } }).groups();
	}

	@FieldResolver(() => [CourseType])
	async coursePrerequisites(
		@Root() { code }: CourseType,
		@Ctx() { prisma }: Context
	): Promise<CourseType[]> {
		return await prisma.course
			.findUnique({ where: { code } })
			.coursePrerequisites({ orderBy: { name: 'asc' } });
	}

	@FieldResolver(() => [CourseType])
	async prerequisitesOf(
		@Root() { code }: CourseType,
		@Ctx() { prisma }: Context
	): Promise<CourseType[]> {
		return await prisma.course
			.findUnique({ where: { code } })
			.prerequisitesOf({ orderBy: { name: 'asc' } });
	}

	@Query(() => CourseType)
	async course(
		@Arg('code', { nullable: true }) code: string,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.course.findUnique({ where: { code } });
	}

	@Query(() => [CourseType])
	async courses(
		@Arg('name', { nullable: true }) name: string,
		@Arg('academicPhase', { nullable: true }) academicPhase: number,
		@Arg('school', { nullable: true }) schoolId: number,
		@Ctx() { prisma }: Context
	): Promise<CourseType[]> {
		return await prisma.course.findMany({
			where: {
				name: { contains: name, mode: 'insensitive' },
				academicPhase,
				schoolId,
			},
			orderBy: { name: 'asc' },
		});
	}

	@Mutation(() => CourseType)
	async addCourse(
		@Arg('data') data: CourseInput,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.course.create({
			data: {
				code: data.code,
				name: data.name,
				credits: data.credits,
				academicPhase: data.academicPhase,
				state: data.state,
				school: { connect: { id: data.schoolId } },
				coursePrerequisites: {
					connect: data.prerequisites?.map((c) => ({
						code: c,
					})),
				},
			},
		});
	}

	@Mutation(() => CourseType)
	async modifyCourse(
		@Arg('code') code: string,
		@Arg('data') data: CourseInput,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.course.update({
			where: { code },
			data: {
				name: data.name,
				credits: data.credits,
				academicPhase: data.academicPhase,
				state: data.state,
			},
		});
	}

	@Mutation(() => CourseType)
	async deleteCourse(
		@Arg('code') code: string,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.course.delete({ where: { code } });
	}
}
