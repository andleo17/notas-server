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
import { FacultyInput } from '../inputs/Faculty.input';
import { FacultyType } from '../types/Faculty.type';
import { SchoolType } from '../types/School.type';

@Resolver((of) => FacultyType)
export class FacultyResolver {
	@FieldResolver((returns) => [SchoolType])
	async schools(
		@Root() { id }: FacultyType,
		@Ctx() { prisma }: Context
	): Promise<SchoolType[]> {
		return await prisma.faculty.findOne({ where: { id } }).schools();
	}

	@Query((returns) => FacultyType)
	async faculty(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<FacultyType> {
		return await prisma.faculty.findOne({ where: { id } });
	}

	@Query((returns) => [FacultyType])
	async faculties(@Ctx() { prisma }: Context): Promise<FacultyType[]> {
		return await prisma.faculty.findMany();
	}

	@Mutation((returns) => FacultyType)
	async addFaculty(
		@Arg('data') data: FacultyInput,
		@Ctx() { prisma }: Context
	): Promise<FacultyType> {
		return await prisma.faculty.create({
			data: { name: data.name, state: data.state },
		});
	}

	@Mutation((returns) => FacultyType)
	async modifyFaculty(
		@Arg('id', (type) => Int) id: number,
		@Arg('data') data: FacultyInput,
		@Ctx() { prisma }: Context
	): Promise<FacultyType> {
		return await prisma.faculty.update({
			where: { id },
			data: { name: data.name, state: data.state },
		});
	}

	@Mutation((returns) => FacultyType)
	async deleteFaculty(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<FacultyType> {
		return prisma.faculty.delete({ where: { id } });
	}
}
