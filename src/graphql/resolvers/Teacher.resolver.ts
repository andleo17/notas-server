import { Prisma } from '@prisma/client';
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
import { Context, UserRole } from '../../context';
import TeacherInput from '../inputs/Teacher.input';
import GroupType from '../types/Group.type';
import TeacherType from '../types/Teacher.type';

@Resolver((of) => TeacherType)
export default class TeacherResolver {
	@FieldResolver((returns) => [GroupType])
	async groups(
		@Root() { id }: TeacherType,
		@Ctx() { prisma }: Context
	): Promise<GroupType[]> {
		return await prisma.teacher.findUnique({ where: { id } }).groups();
	}

	@Query((returns) => TeacherType)
	async teacher(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<TeacherType> {
		return await prisma.teacher.findUnique({ where: { id } });
	}

	@Query((returns) => [TeacherType])
	async teachers(
		@Arg('names') names: string,
		@Ctx() { prisma, user }: Context
	): Promise<TeacherType[]> {
		const args: Prisma.FindManyTeacherArgs = {
			where: {
				OR: [
					{ name: { contains: names, mode: 'insensitive' } },
					{ lastname: { contains: names, mode: 'insensitive' } },
				],
			},
			orderBy: [{ lastname: 'asc' }, { name: 'asc' }],
		};
		if (user.role !== UserRole.ADMIN) args.where.state = true;
		return await prisma.teacher.findMany(args);
	}

	@Mutation((returns) => TeacherType)
	async addTeacher(
		@Arg('data') data: TeacherInput,
		@Ctx() { prisma }: Context
	): Promise<TeacherType> {
		return await prisma.teacher.create({
			data: {
				name: data.name,
				lastname: data.lastname,
				state: data.state,
			},
		});
	}

	@Mutation((returns) => TeacherType)
	async modifyTeacher(
		@Arg('id', (type) => Int) id: number,
		@Arg('data') data: TeacherInput,
		@Ctx() { prisma }: Context
	): Promise<TeacherType> {
		return await prisma.teacher.update({
			where: { id },
			data: {
				name: data.name,
				lastname: data.lastname,
				state: data.state,
			},
		});
	}

	@Mutation((returns) => TeacherType)
	async deleteTeacher(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<TeacherType> {
		return await prisma.teacher.delete({ where: { id } });
	}
}
