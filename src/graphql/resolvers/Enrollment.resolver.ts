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
import EnrollmentInput from '../inputs/Enrollment.input';
import EnrollmentType from '../types/Enrollment.type';
import EnrollmentDetailType from '../types/EnrollmentDetail.type';
import SemesterType from '../types/Semester.type';
import UserType from '../types/User.type';

@Resolver(() => EnrollmentType)
export default class EnrollmentResolver {
	@FieldResolver(() => UserType)
	async user(
		@Root() { id }: EnrollmentType,
		@Ctx() { prisma }: Context
	): Promise<UserType> {
		return await prisma.enrollment.findUnique({ where: { id } }).user();
	}

	@FieldResolver(() => SemesterType)
	async semester(
		@Root() { id }: EnrollmentType,
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
		return await prisma.enrollment.findUnique({ where: { id } }).semester();
	}

	@FieldResolver(() => [EnrollmentDetailType])
	async enrollmentDetails(
		@Root() { id }: EnrollmentType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType[]> {
		return await prisma.enrollment
			.findUnique({ where: { id } })
			.enrollmentDetails();
	}

	@Query(() => EnrollmentType)
	async enrollment(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType> {
		return await prisma.enrollment.findUnique({ where: { id } });
	}

	@Query(() => [EnrollmentType])
	async enrollments(@Ctx() { prisma }: Context): Promise<EnrollmentType[]> {
		return await prisma.enrollment.findMany();
	}

	@Mutation(() => EnrollmentType)
	async addEnrollment(
		@Arg('data') data: EnrollmentInput,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType> {
		return await prisma.enrollment.create({
			data: {
				weightedAverage: data.weightedAverage,
				state: data.state,
				user: { connect: { id: data.userId } },
				semester: { connect: { name: data.semesterId } },
			},
		});
	}

	@Mutation(() => EnrollmentType)
	async modifyEnrollment(
		@Arg('id', () => Int) id: number,
		@Arg('data') data: EnrollmentInput,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType> {
		return await prisma.enrollment.update({
			where: { id },
			data: {
				weightedAverage: data.weightedAverage,
				state: data.state,
			},
		});
	}

	@Mutation(() => EnrollmentType)
	async deleteEnrollment(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType> {
		return await prisma.enrollment.delete({ where: { id } });
	}
}
