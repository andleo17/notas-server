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
import CourseInput from '../inputs/Course.input';
import CourseType from '../types/Course.type';
import GroupType from '../types/Group.type';
import SchoolType from '../types/School.type';

@Resolver((of) => CourseType)
export default class CourseResolver {
	@FieldResolver((returns) => SchoolType)
	async school(
		@Root() { id }: CourseType,
		@Ctx() { prisma }: Context
	): Promise<SchoolType> {
		return await prisma.course.findOne({ where: { id } }).school();
	}

	@FieldResolver((returns) => [GroupType])
	async groups(
		@Root() { id }: CourseType,
		@Ctx() { prisma }: Context
	): Promise<GroupType[]> {
		return await prisma.course.findOne({ where: { id } }).groups();
	}

	@Query((returns) => CourseType)
	async course(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.course.findOne({ where: { id } });
	}

	@Query((returns) => [CourseType])
	async courses(@Ctx() { prisma }: Context): Promise<CourseType[]> {
		return await prisma.course.findMany();
	}

	@Mutation((returns) => CourseType)
	async addCourse(
		@Arg('data') data: CourseInput,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.course.create({
			data: {
				name: data.name,
				code: data.code,
				credits: data.credits,
				academicPhase: data.academicPhase,
				school: { connect: { id: data.schoolId } },
			},
		});
	}

	@Mutation((returns) => CourseType)
	async modifyCourse(
		@Arg('id', (type) => Int) id: number,
		@Arg('data') data: CourseInput,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.course.update({
			where: { id },
			data: {
				name: data.name,
				code: data.code,
				credits: data.credits,
				academicPhase: data.academicPhase,
				state: data.state,
			},
		});
	}

	@Mutation((returns) => CourseType)
	async deleteCourse(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<CourseType> {
		return await prisma.course.delete({ where: { id } });
	}
}
