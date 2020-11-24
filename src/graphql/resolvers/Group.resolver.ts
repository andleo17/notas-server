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

@Resolver((of) => GroupType)
export default class GroupResolver {
	@FieldResolver((returns) => CourseType)
	async course(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.group.findUnique({ where: { id } }).course();
	}

	@FieldResolver((returns) => TeacherType)
	async teacher(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<TeacherType> {
		return await prisma.group.findUnique({ where: { id } }).teacher();
	}

	@FieldResolver((returns) => SemesterType)
	async semester(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
		return await prisma.group.findUnique({ where: { id } }).semester();
	}

	@FieldResolver((returns) => [EnrollmentDetailType])
	async enrollmentDetails(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentDetailType[]> {
		return await prisma.group
			.findUnique({ where: { id } })
			.enrollmentDetails();
	}

	@FieldResolver((returns) => [ActivityType])
	async activities(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<ActivityType[]> {
		return await prisma.group.findUnique({ where: { id } }).activities();
	}

	@FieldResolver((returns) => [ScheduleType])
	async schedules(
		@Root() { id }: GroupType,
		@Ctx() { prisma }: Context
	): Promise<ScheduleType[]> {
		return await prisma.group.findUnique({ where: { id } }).schedules();
	}

	@Query((returns) => GroupType)
	async group(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.group.findUnique({ where: { id } });
	}

	@Query((returns) => [GroupType])
	async groups(@Ctx() { prisma }: Context): Promise<GroupType[]> {
		return await prisma.group.findMany();
	}

	@Mutation((returns) => GroupType)
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

	@Mutation((returns) => GroupType)
	async modifyGroup(
		@Arg('id', (type) => Int) id: number,
		@Arg('data') data: GroupInput,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return await prisma.group.update({
			where: { id },
			data: { denomination: data.denomination, state: data.state },
		});
	}

	@Mutation((returns) => GroupType)
	async deleteGroup(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<GroupType> {
		return prisma.group.delete({ where: { id } });
	}
}
