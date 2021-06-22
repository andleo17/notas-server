import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { APIContext } from '../../utils/context';
import { Course } from '../models/Course';
import { Curriculum } from '../models/Curriculum';
import { School } from '../models/School';
import { SchoolCurriculum } from '../models/SchoolCurriculum';

@Resolver(SchoolCurriculum)
export default class SchoolCurriculumResolver {
	@FieldResolver(() => School)
	async school(
		@Root() { schoolId, curriculumId }: SchoolCurriculum,
		@Ctx() { prisma }: APIContext
	): Promise<School> {
		return prisma.schoolCurriculum
			.findUnique({
				where: { schoolId_curriculumId: { schoolId, curriculumId } },
			})
			.school();
	}

	@FieldResolver(() => Curriculum)
	async curriculum(
		@Root() { schoolId, curriculumId }: SchoolCurriculum,
		@Ctx() { prisma }: APIContext
	): Promise<Curriculum> {
		return prisma.schoolCurriculum
			.findUnique({
				where: { schoolId_curriculumId: { schoolId, curriculumId } },
			})
			.curriculum();
	}

	@FieldResolver(() => [Course])
	async courses(
		@Root() { schoolId, curriculumId }: SchoolCurriculum,
		@Ctx() { prisma }: APIContext
	): Promise<Course[]> {
		return prisma.schoolCurriculum
			.findUnique({
				where: { schoolId_curriculumId: { schoolId, curriculumId } },
			})
			.courses();
	}
}
