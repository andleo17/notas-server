import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { APIContext } from '../../utils/context';
import { Course } from '../models/Course';
import { Group } from '../models/Group';
import { SchoolCurriculum } from '../models/SchoolCurriculum';

@Resolver(Course)
export default class CourseResolver {
	@FieldResolver(() => SchoolCurriculum)
	async schoolCurriculum(
		@Root() { code }: Course,
		@Ctx() { prisma }: APIContext
	): Promise<SchoolCurriculum> {
		return prisma.course.findUnique({ where: { code } }).schoolCurriculum();
	}

	@FieldResolver(() => [Group])
	async groups(
		@Root() { code }: Course,
		@Ctx() { prisma }: APIContext
	): Promise<Group[]> {
		return prisma.course.findUnique({ where: { code } }).groups();
	}

	@FieldResolver(() => [Course])
	async coursePrerequisites(
		@Root() { code }: Course,
		@Ctx() { prisma }: APIContext
	): Promise<Course[]> {
		return prisma.course
			.findUnique({ where: { code } })
			.coursePrerequisites({ orderBy: { name: 'asc' } });
	}

	@FieldResolver(() => [Course])
	async prerequisitesOf(
		@Root() { code }: Course,
		@Ctx() { prisma }: APIContext
	): Promise<Course[]> {
		return prisma.course
			.findUnique({ where: { code } })
			.prerequisitesOf({ orderBy: { name: 'asc' } });
	}

	@Query(() => Course)
	async course(
		@Arg('code', { nullable: true }) code: string,
		@Ctx() { prisma }: APIContext
	): Promise<Course> {
		return prisma.course.findUnique({ where: { code } });
	}

	@Query(() => [Course])
	async courses(
		@Arg('name', { nullable: true }) name: string,
		@Arg('academicPhase', { nullable: true }) academicPhase: number,
		@Arg('school', { nullable: true }) schoolId: number,
		@Ctx() { prisma }: APIContext
	): Promise<Course[]> {
		return prisma.course.findMany({
			where: {
				name: { contains: name, mode: 'insensitive' },
				academicPhase,
				schoolId,
			},
			orderBy: { name: 'asc' },
		});
	}
}
