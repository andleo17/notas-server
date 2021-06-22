import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { APIContext } from '../../utils/context';
import { Group } from '../models/Group';
import { Semester } from '../models/Semester';

@Resolver(() => Semester)
export default class SemesterResolver {
	@FieldResolver(() => [Group])
	async groups(
		@Arg('courseCode', { nullable: true }) courseCode: string,
		@Root() { name }: Semester,
		@Ctx() { prisma }: APIContext
	): Promise<Group[]> {
		return prisma.semester
			.findUnique({ where: { name } })
			.groups({ where: { courseCode } });
	}

	@Query(() => Semester)
	async semester(
		@Arg('name') name: string,
		@Ctx() { prisma }: APIContext
	): Promise<Semester> {
		return prisma.semester.findUnique({ where: { name } });
	}

	@Query(() => [Semester])
	async semesters(@Ctx() { prisma }: APIContext): Promise<Semester[]> {
		return prisma.semester.findMany({ orderBy: { name: 'asc' } });
	}

	@Query(() => Semester)
	async currentSemester(@Ctx() { prisma }: APIContext): Promise<Semester> {
		return prisma.semester.findFirst({ where: { current: true } });
	}
}
