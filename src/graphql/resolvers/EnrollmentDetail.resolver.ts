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

@Resolver((of) => EnrollmentDetailType)
export default class EnrollmentDetailResolver {
	@FieldResolver((returns) => EnrollmentType)
	async enrollment(
		@Root() { id }: EnrollmentDetailType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType> {
		return await prisma.enrollmentDetail
			.findUnique({ where: { id } })
			.enrollment();
	}

	@FieldResolver((returns) => GroupType)
	async group(
		@Root() { id }: EnrollmentDetailType,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.enrollmentDetail.findUnique({ where: { id } }).group();
	}

	@FieldResolver((returns) => [GradeType])
	async grades(
		@Root() { id }: EnrollmentDetailType,
		@Ctx() { prisma }: Context
	): Promise<GradeType[]> {
		return await prisma.enrollmentDetail
			.findUnique({ where: { id } })
			.grades();
	}

	@Query((returns) => EnrollmentDetailType)
	async enrollmentDetail(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType> {
		return await prisma.enrollmentDetail.findUnique({ where: { id } });
	}

	@Query((returns) => [EnrollmentDetailType])
	async enrollmentDetails(
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType[]> {
		return await prisma.enrollmentDetail.findMany();
	}

	@Mutation((returns) => EnrollmentDetailType)
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

	@Mutation((returns) => EnrollmentDetailType)
	async modifyEnrollmentDetail(
		@Arg('id', (type) => Int) id: number,
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

	@Mutation((returns) => EnrollmentDetailType)
	async deleteEnrollmentDetail(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType> {
		return await prisma.enrollmentDetail.delete({
			where: { id },
		});
	}
}
