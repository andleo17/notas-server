import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { Context } from '../../context';
import EnrollmentDetailInput from '../inputs/EnrollmentDetail.input';
import EnrollmentType from '../types/Enrollment.type';
import EnrollmentDetailType from '../types/EnrollmentDetail.type';
import GradeType from '../types/Grade.type';
import GroupType from '../types/Group.type';

@Resolver(() => EnrollmentDetailType)
export default class EnrollmentDetailResolver {
	@FieldResolver(() => EnrollmentType)
	async enrollment(
		@Root() { id }: EnrollmentDetailType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType> {
		return await prisma.enrollmentDetail
			.findUnique({ where: { id } })
			.enrollment();
	}

	@FieldResolver(() => GroupType)
	async group(
		@Root() { id }: EnrollmentDetailType,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.enrollmentDetail
			.findUnique({ where: { id } })
			.group();
	}

	@FieldResolver(() => [GradeType])
	async grades(
		@Root() { id }: EnrollmentDetailType,
		@Ctx() { prisma }: Context
	): Promise<GradeType[]> {
		return await prisma.enrollmentDetail
			.findUnique({ where: { id } })
			.grades();
	}

	@Query(() => EnrollmentDetailType)
	async enrollmentDetail(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType> {
		return await prisma.enrollmentDetail.findUnique({ where: { id } });
	}

	@Query(() => [EnrollmentDetailType])
	async enrollmentDetails(
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType[]> {
		return await prisma.enrollmentDetail.findMany();
	}

	@Mutation(() => EnrollmentDetailType)
	async addEnrollmentDetail(
		@Arg('data') data: EnrollmentDetailInput,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType> {
		return await prisma.enrollmentDetail.create({
			data: {
				enrollment: { connect: { id: data.enrollmentId } },
				group: { connect: { id: data.groupId } },
			},
		});
	}

	@Mutation(() => EnrollmentDetailType)
	async modifyEnrollmentDetail(
		@Arg('id', () => Int) id: number,
		@Arg('data') data: EnrollmentDetailInput,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType> {
		return await prisma.enrollmentDetail.update({
			where: { id },
			data: {
				averageGrade: data.averageGrade,
				state: data.state,
			},
		});
	}

	@Mutation(() => EnrollmentDetailType)
	async deleteEnrollmentDetail(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType> {
		return await prisma.enrollmentDetail.delete({
			where: { id },
		});
	}
}
