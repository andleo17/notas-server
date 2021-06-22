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
import { Course } from '../models/Course';
import { EnrollmentDetail } from '../models/EnrollmentDetail';
import { Group } from '../models/Group';
import { Schedule } from '../models/Schedule';
import { Semester } from '../models/Semester';
import { Teacher } from '../models/Teacher';

@Resolver(() => Group)
export default class GroupResolver {
	@FieldResolver(() => Course)
	async course(
		@Root() { id }: Group,
		@Ctx() { prisma }: APIContext
	): Promise<Course> {
		return prisma.group.findUnique({ where: { id } }).course();
	}

	@FieldResolver(() => Teacher)
	async teacher(
		@Root() { id }: Group,
		@Ctx() { prisma }: APIContext
	): Promise<Teacher> {
		return prisma.group.findUnique({ where: { id } }).teacher();
	}

	@FieldResolver(() => Semester)
	async semester(
		@Root() { id }: Group,
		@Ctx() { prisma }: APIContext
	): Promise<Semester> {
		return prisma.group.findUnique({ where: { id } }).semester();
	}

	@FieldResolver(() => [EnrollmentDetail])
	async enrollmentDetails(
		@Root() { id }: Group,
		@Ctx() { prisma }: APIContext
	): Promise<EnrollmentDetail[]> {
		return prisma.group.findUnique({ where: { id } }).enrollmentDetails();
	}

	@FieldResolver(() => [Activity])
	async activities(
		@Root() { id }: Group,
		@Ctx() { prisma }: APIContext
	): Promise<Activity[]> {
		return prisma.group.findUnique({ where: { id } }).activities();
	}

	@FieldResolver(() => [Schedule])
	async schedules(
		@Root() { id }: Group,
		@Ctx() { prisma }: APIContext
	): Promise<Schedule[]> {
		return prisma.group.findUnique({ where: { id } }).schedules();
	}

	@Query(() => Group)
	async group(
		@Arg('id', () => Int) id: number,
		@Ctx() { prisma }: APIContext
	): Promise<Group> {
		return prisma.group.findUnique({ where: { id } });
	}

	@Query(() => [Group])
	async groups(
		@Arg('semesterId', { nullable: true }) semesterId: string,
		@Ctx() { prisma }: APIContext
	): Promise<Group[]> {
		return prisma.group.findMany({ where: { semesterId } });
	}
}
