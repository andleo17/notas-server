import { Arg, Ctx, Int, Query, Resolver } from 'type-graphql';
import { APIContext } from '../../utils/context';
import { Teacher } from '../models/Teacher';

@Resolver(() => Teacher)
export default class TeacherResolver {
	@Query(() => Teacher)
	async teacher(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: APIContext
	): Promise<Teacher> {
		return prisma.teacher.findUnique({ where: { id } });
	}

	@Query(() => [Teacher])
	async teachers(
		@Arg('names') names: string,
		@Ctx() { prisma }: APIContext
	): Promise<Teacher[]> {
		return prisma.teacher.findMany({
			where: {
				OR: [
					{ name: { contains: names, mode: 'insensitive' } },
					{ lastname: { contains: names, mode: 'insensitive' } },
				],
			},
			orderBy: [{ lastname: 'asc' }, { name: 'asc' }],
		});
	}
}
