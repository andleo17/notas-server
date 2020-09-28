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
import SchoolInput from '../inputs/School.input';
import CourseType from '../types/Course.type';
import FacultyType from '../types/Faculty.type';
import SchoolType from '../types/School.type';
import UserType from '../types/User.type';

@Resolver((of) => SchoolType)
export default class SchoolResolver {
	@FieldResolver((returns) => FacultyType)
	async faculty(
		@Root() { id }: SchoolType,
		@Ctx() { prisma }: Context
	): Promise<FacultyType> {
		return await prisma.school.findOne({ where: { id } }).faculty();
	}

	@FieldResolver((returns) => [UserType])
	async users(
		@Root() { id }: SchoolType,
		@Ctx() { prisma }: Context
	): Promise<UserType[]> {
		return await prisma.school.findOne({ where: { id } }).users();
	}

	@FieldResolver((returns) => [CourseType])
	async courses(
		@Root() { id }: SchoolType,
		@Ctx() { prisma }: Context
	): Promise<CourseType[]> {
		return await prisma.school.findOne({ where: { id } }).courses();
	}

	@Query((returns) => SchoolType)
	async school(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<SchoolType> {
		return await prisma.school.findOne({ where: { id } });
	}

	@Query((returns) => [SchoolType])
	async schools(@Ctx() { prisma }: Context): Promise<SchoolType[]> {
		return await prisma.school.findMany();
	}

	@Mutation((returns) => SchoolType)
	async addSchool(
		@Arg('data') data: SchoolInput,
		@Ctx() { prisma }: Context
	): Promise<SchoolType> {
		return await prisma.school.create({
			data: {
				name: data.name,
				faculty: { connect: { id: data.facultyId } },
			},
		});
	}

	@Mutation((returns) => SchoolType)
	async modifySchool(
		@Arg('id', (type) => Int) id: number,
		@Arg('data') data: SchoolInput,
		@Ctx() { prisma }: Context
	): Promise<SchoolType> {
		return await prisma.school.update({
			where: { id },
			data: { name: data.name, state: data.state },
		});
	}

	@Mutation((returns) => SchoolType)
	async deleteSchool(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<SchoolType> {
		return await prisma.school.delete({ where: { id } });
	}
}
