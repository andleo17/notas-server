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
import { Activity } from '../models/Activity';
import { EnrollmentDetail } from '../models/EnrollmentDetail';
import { Grade } from '../models/Grade';

@Resolver(() => Grade)
export default class GradeResolver {
	@FieldResolver(() => Activity)
	async activity(
		@Root() { activityId, enrollmentDetailId }: Grade,
		@Ctx() { prisma }: APIContext
	): Promise<Activity> {
		return prisma.grade
			.findUnique({
				where: {
					activityId_enrollmentDetailId: { activityId, enrollmentDetailId },
				},
			})
			.activity();
	}

	@FieldResolver(() => EnrollmentDetail)
	async enrollmentDetail(
		@Root() { activityId, enrollmentDetailId }: Grade,
		@Ctx() { prisma }: APIContext
	): Promise<EnrollmentDetail> {
		return prisma.grade
			.findUnique({
				where: {
					activityId_enrollmentDetailId: { activityId, enrollmentDetailId },
				},
			})
			.enrollmentDetail();
	}

	@Query(() => Grade)
	async grade(
		@Arg('activityId', () => Int) activityId: number,
		@Arg('enrollmentDetailId', () => Int) enrollmentDetailId: number,
		@Ctx() { prisma }: APIContext
	): Promise<Grade> {
		return prisma.grade.findUnique({
			where: {
				activityId_enrollmentDetailId: { activityId, enrollmentDetailId },
			},
		});
	}

	@Query(() => [Grade])
	async grades(
		@Arg('enrollmentDetailId', () => Int) enrollmentDetailId: number,
		@Ctx() { prisma }: APIContext
	): Promise<Grade[]> {
		return prisma.grade.findMany({ where: { enrollmentDetailId } });
	}
}
