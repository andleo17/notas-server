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
import { Enrollment } from '../models/Enrollment';
import { EnrollmentDetail } from '../models/EnrollmentDetail';
import { Semester } from '../models/Semester';

@Resolver(() => Enrollment)
export default class EnrollmentResolver {
	@FieldResolver(() => Semester)
	async semester(
		@Root() { id }: Enrollment,
		@Ctx() { prisma }: APIContext
	): Promise<Semester> {
		return prisma.enrollment.findUnique({ where: { id } }).semester();
	}

	@FieldResolver(() => [EnrollmentDetail])
	async enrollmentDetails(
		@Root() { id }: Enrollment,
		@Ctx() { prisma }: APIContext
	): Promise<EnrollmentDetail[]> {
		return prisma.enrollment.findUnique({ where: { id } }).enrollmentDetails();
	}

	@Query(() => Enrollment)
	async enrollment(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: APIContext
	): Promise<Enrollment> {
		return prisma.enrollment.findUnique({ where: { id } });
	}

	@Query(() => [Enrollment])
	async enrollments(
		@Ctx() { prisma, user }: APIContext
	): Promise<Enrollment[]> {
		return prisma.enrollment.findMany({ where: { userId: user.id } });
	}
}
