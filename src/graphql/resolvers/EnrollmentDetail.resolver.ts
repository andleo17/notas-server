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
import { Grade } from '../models/Grade';
import { Group } from '../models/Group';

@Resolver(() => EnrollmentDetail)
export default class EnrollmentDetailResolver {
	@FieldResolver(() => Enrollment)
	async enrollment(
		@Root() { id }: EnrollmentDetail,
		@Ctx() { prisma }: APIContext
	): Promise<Enrollment> {
		return prisma.enrollmentDetail.findUnique({ where: { id } }).enrollment();
	}

	@FieldResolver(() => Group)
	async group(
		@Root() { id }: EnrollmentDetail,
		@Ctx() { prisma }: APIContext
	): Promise<Group> {
		return prisma.enrollmentDetail.findUnique({ where: { id } }).group();
	}

	@FieldResolver(() => [Grade])
	async grades(
		@Root() { id }: EnrollmentDetail,
		@Ctx() { prisma }: APIContext
	): Promise<Grade[]> {
		return prisma.enrollmentDetail.findUnique({ where: { id } }).grades();
	}

	@Query(() => EnrollmentDetail)
	async enrollmentDetail(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: APIContext
	): Promise<EnrollmentDetail> {
		return prisma.enrollmentDetail.findUnique({ where: { id } });
	}

	@Query(() => [EnrollmentDetail])
	async enrollmentDetails(
		@Arg('enrollmentId', () => Int) enrollmentId: number,
		@Ctx() { prisma }: APIContext
	): Promise<EnrollmentDetail[]> {
		return prisma.enrollmentDetail.findMany({ where: { enrollmentId } });
	}
}
