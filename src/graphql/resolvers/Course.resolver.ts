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
import CourseInput from '../inputs/Course.input';
import CourseType from '../types/Course.type';
import GroupType from '../types/Group.type';
import SchoolType from '../types/School.type';

@Resolver((of) => CourseType)
export default class CourseResolver {
	@FieldResolver((returns) => SchoolType)
	async school(
		@Root() { code }: CourseType,
		@Ctx() { prisma }: Context
	): Promise<SchoolType> {
		return await prisma.course.findOne({ where: { code } }).school();
	}

	@FieldResolver((returns) => [GroupType])
	async groups(
		@Root() { code }: CourseType,
		@Ctx() { prisma }: Context
	): Promise<GroupType[]> {
		return await prisma.course.findOne({ where: { code } }).groups();
	}

	@FieldResolver((returns) => [CourseType])
	async coursePrerequisites(
		@Root() { code }: CourseType,
		@Ctx() { prisma }: Context
	): Promise<CourseType[]> {
		return await prisma.course
			.findOne({ where: { code } })
			.coursePrerequisites({ orderBy: { name: 'asc' } });
	}

	@FieldResolver((returns) => [CourseType])
	async prerequisitesOf(
		@Root() { code }: CourseType,
		@Ctx() { prisma }: Context
	): Promise<CourseType[]> {
		return await prisma.course
			.findOne({ where: { code } })
			.prerequisitesOf({ orderBy: { name: 'asc' } });
	}

	@Query((returns) => CourseType)
	async course(
		@Arg('code', { nullable: true }) code: string,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.course.findOne({ where: { code } });
	}

	@Query((returns) => [CourseType])
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

	@Mutation((returns) => CourseType)
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

	@Mutation((returns) => CourseType)
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

	@Mutation((returns) => CourseType)
	async deleteCourse(
		@Arg('code') code: string,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.course.delete({ where: { code } });
	}
}
