import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { APIContext } from '../../utils/context';
import { Curriculum } from '../models/Curriculum';
import { SchoolCurriculum } from '../models/SchoolCurriculum';

@Resolver(Curriculum)
export default class CurriculumResolver {
	@FieldResolver(() => [SchoolCurriculum])
	async schools(
		@Root() { id }: Curriculum,
		@Ctx() { prisma }: APIContext
	): Promise<SchoolCurriculum[]> {
		return prisma.curriculum.findUnique({ where: { id } }).schools();
	}

	@Query(() => Curriculum)
	async curriculum(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: APIContext
	): Promise<Curriculum> {
		return prisma.curriculum.findUnique({ where: { id } });
	}

	@Query(() => [Curriculum])
	async curriculums(
		@Ctx() { prisma, user }: APIContext
	): Promise<Curriculum[]> {
		return prisma.curriculum.findMany({
			where: { schools: { every: { schoolId: user.schoolId } } },
		});
	}
}
