import { Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { APIContext } from '../../utils/context';
import { Faculty } from '../models/Faculty';
import { School } from '../models/School';
import { SchoolCurriculum } from '../models/SchoolCurriculum';

@Resolver(() => School)
export default class SchoolResolver {
	@FieldResolver(() => Faculty)
	async faculty(
		@Root() { id }: School,
		@Ctx() { prisma }: APIContext
	): Promise<Faculty> {
		return prisma.school.findUnique({ where: { id } }).faculty();
	}

	@FieldResolver(() => [SchoolCurriculum])
	async curriculums(
		@Root() { id }: School,
		@Ctx() { prisma }: APIContext
	): Promise<SchoolCurriculum[]> {
		return prisma.school.findUnique({ where: { id } }).curriculums();
	}

	@Query(() => School)
	async school(@Ctx() { prisma, user }: APIContext): Promise<School> {
		return prisma.school.findUnique({ where: { id: user.schoolId } });
	}
}
