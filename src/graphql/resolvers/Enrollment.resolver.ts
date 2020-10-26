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

@Resolver((of) => EnrollmentType)
export default class EnrollmentResolver {
	@FieldResolver((returns) => UserType)
	async user(
		@Root() { id }: EnrollmentType,
		@Ctx() { prisma }: Context
	): Promise<UserType> {
		return await prisma.enrollment.findOne({ where: { id } }).user();
	}

	@FieldResolver((returns) => SemesterType)
	async semester(
		@Root() { id }: EnrollmentType,
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
		return await prisma.enrollment.findOne({ where: { id } }).semester();
	}

	@FieldResolver((returns) => [EnrollmentDetailType])
	async enrollmentDetails(
		@Root() { id }: EnrollmentType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType[]> {
		return await prisma.enrollment
			.findOne({ where: { id } })
			.enrollmentDetails();
	}

	@Query((returns) => EnrollmentType)
	async enrollment(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType> {
		return await prisma.enrollment.findOne({ where: { id } });
	}

	@Query((returns) => [EnrollmentType])
	async enrollments(@Ctx() { prisma }: Context): Promise<EnrollmentType[]> {
		return await prisma.enrollment.findMany();
	}

	@Mutation((returns) => EnrollmentType)
	async addEnrollment(
		@Arg('data') data: EnrollmentInput,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType> {
		return await prisma.enrollment.create({
			data: {
				user: { connect: { id: data.userId } },
				semester: { connect: { name: data.semesterId } },
			},
		});
	}

	@Mutation((returns) => EnrollmentType)
	async modifyEnrollment(
		@Arg('id', (type) => Int) id: number,
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

	@Mutation((returns) => EnrollmentType)
	async deleteEnrollment(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType> {
		return await prisma.enrollment.delete({ where: { id } });
	}
}
