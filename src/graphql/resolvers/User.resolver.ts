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
import UserInput from '../inputs/User.input';
import UserType from '../types/User.type';
import SemesterType from '../types/Semester.type';
import SchoolType from '../types/School.type';
import EnrollmentType from '../types/Enrollment.type';
import { empty } from '@prisma/client';

@Resolver((of) => UserType)
export default class UserResolver {
	@FieldResolver((returns) => SemesterType)
	async semester(
		@Root() { id }: UserType,
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
		return await prisma.user.findOne({ where: { id } }).semester();
	}

	@FieldResolver((returns) => SchoolType)
	async school(
		@Root() { id }: UserType,
		@Ctx() { prisma }: Context
	): Promise<SchoolType> {
		return await prisma.user.findOne({ where: { id } }).school();
	}

	@FieldResolver((returns) => [EnrollmentType])
	async enrollments(
		@Root() { id }: UserType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType[]> {
		return await prisma.user.findOne({ where: { id } }).enrollments();
	}

	@Query((returns) => UserType)
	async user(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<UserType> {
		return await prisma.user.findOne({ where: { id } });
	}

	@Query((returns) => [UserType])
	async users(@Ctx() { prisma }: Context): Promise<UserType[]> {
		return await prisma.user.findMany();
	}

	@Mutation((returns) => UserType)
	async addUser(
		@Arg('data') data: UserInput,
		@Ctx() { prisma }: Context
	): Promise<UserType> {
		return await prisma.user.create({
			data: {
				nickname: data.nickname,
				password: data.password,
				email: data.email,
				name: data.name,
				lastname: data.lastname,
				birthDate: data.birthDate,
				photo: data.photo,
				genre: data.genre,
				semester: { connect: { id: data.semesterId } },
				school: { connect: { id: data.schoolId } },
			},
		});
	}

	@Query((returns) => UserType)
	async login(
		@Arg('email', (type) => String) email: string,
		@Arg('password', (type) => String) password: string,
		@Ctx() { prisma }: Context

	): Promise<UserType[]>{
		const userLogin = await prisma.user.findMany({ where: { email : email, password: password} })

		if(userLogin){
			return userLogin;
		}else{
			empty
		}
	}
	
}
