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
import GroupInput from '../inputs/Group.input';
import ActivityType from '../types/Activity.type';
import CourseType from '../types/Course.type';
import EnrollmentDetailType from '../types/EnrollmentDetail.type';
import GroupType from '../types/Group.type';
import ScheduleType from '../types/Schedule.type';
import SemesterType from '../types/Semester.type';
import TeacherType from '../types/Teacher.type';

@Resolver(() => GroupType)
export default class GroupResolver {
	@FieldResolver(() => CourseType)
	async course(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.group.findUnique({ where: { id } }).course();
	}

	@FieldResolver(() => TeacherType)
	async teacher(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<TeacherType> {
		return await prisma.group.findUnique({ where: { id } }).teacher();
	}

	@FieldResolver(() => SemesterType)
	async semester(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
		return await prisma.group.findUnique({ where: { id } }).semester();
	}

	@FieldResolver(() => [EnrollmentDetailType])
	async enrollmentDetails(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType[]> {
		return await prisma.group
			.findUnique({ where: { id } })
			.enrollmentDetails();
	}

	@FieldResolver(() => [ActivityType])
	async activities(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<ActivityType[]> {
		return await prisma.group.findUnique({ where: { id } }).activities();
	}

	@FieldResolver(() => [ScheduleType])
	async schedules(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<ScheduleType[]> {
		return await prisma.group.findUnique({ where: { id } }).schedules();
	}

	@Query(() => GroupType)
	async group(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.group.findUnique({ where: { id } });
	}

	@Query(() => [GroupType])
	async groups(@Ctx() { prisma }: Context): Promise<GroupType[]> {
		return await prisma.group.findMany();
	}

	@Mutation(() => GroupType)
	async addGroup(
		@Arg('data') data: GroupInput,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.group.create({
			data: {
				denomination: data.denomination,
				state: data.state,
				course: { connect: { code: data.courseCode } },
				teacher: { connect: { id: data.teacherId } },
				semester: { connect: { name: data.semesterId } },
			},
		});
	}

	@Mutation(() => GroupType)
	async modifyGroup(
		@Arg('id', () => Int) id: number,
		@Arg('data') data: GroupInput,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.group.update({
			where: { id },
			data: { denomination: data.denomination, state: data.state },
		});
	}

	@Mutation(() => GroupType)
	async deleteGroup(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return prisma.group.delete({ where: { id } });
	}
}
