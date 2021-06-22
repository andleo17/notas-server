import { Ctx, Query, Resolver } from 'type-graphql';
import { APIContext } from '../../utils/context';
import { Faculty } from '../models/Faculty';

@Resolver(() => Faculty)
export default class FacultyResolver {
	@Query(() => Faculty)
	async faculty(
		@Ctx()
		{ prisma, user }: APIContext
	): Promise<Faculty> {
		return prisma.school.findUnique({ where: { id: user.schoolId } }).faculty();
	}
}
