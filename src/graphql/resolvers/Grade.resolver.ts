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
import GradeInput from '../inputs/Grade.input';
import ActivityType from '../types/Activity.type';
import EnrollmentDetailType from '../types/EnrollmentDetail.type';
import GradeType from '../types/Grade.type';

@Resolver((of) => GradeType)
export default class GradeResolver {
	@FieldResolver((returns) => ActivityType)
	async activity(
		@Root() { id }: GradeType,
		@Ctx() { prisma }: Context
	): Promise<ActivityType> {
		return await prisma.grade.findUnique({ where: { id } }).activity();
	}

	@FieldResolver((returns) => EnrollmentDetailType)
	async enrollmentDetail(
		@Root() { id }: GradeType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType> {
		return await prisma.grade.findUnique({ where: { id } }).enrollmentDetail();
	}

	@Query((returns) => GradeType)
	async grade(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<GradeType> {
		return await prisma.grade.findUnique({ where: { id } });
	}

	@Query((returns) => [GradeType])
	async grades(@Ctx() { prisma }: Context): Promise<GradeType[]> {
		return await prisma.grade.findMany();
	}

	@Mutation((returns) => GradeType)
	async addGrade(
		@Arg('data') data: GradeInput,
		@Ctx() { prisma }: Context
	): Promise<GradeType> {
		return await prisma.grade.create({
			data: {
				calification: data.calification,
				confirmated: data.confirmated,
				state: data.state,
				activity: { connect: { id: data.activityId } },
				enrollmentDetail: { connect: { id: data.enrollmentDetailId } },
			},
		});
	}

	@Mutation((returns) => GradeType)
	async modifyGrade(
		@Arg('id', (type) => Int) id: number,
		@Arg('data') data: GradeInput,
		@Ctx() { prisma }: Context
	): Promise<GradeType> {
		return await prisma.grade.update({
			where: { id },
			data: {
				calification: data.calification,
				confirmated: data.confirmated,
				state: data.state,
			},
		});
	}

	@Mutation((returns) => GradeType)
	async deleteGrade(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<GradeType> {
		return await prisma.grade.delete({ where: { id } });
	}
}
