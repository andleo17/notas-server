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
import AuthenticationPayloadType from '../types/AuthenticationPayload.type';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { APP_SECRET } from '../../utils/env';

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

	@Query((returns) => AuthenticationPayloadType)
	async login(
		@Arg('nickname') nickname: string,
		@Arg('password') password: string,
		@Ctx() { prisma }: Context
	): Promise<AuthenticationPayloadType> {
		const user = await prisma.user.findOne({ where: { nickname } });
		if (!user)
			throw new AuthenticationError('No se ha encontrado el usuario');

		const valid = await compare(password, user.password);
		if (!valid) throw new AuthenticationError('Contraseña incorrecta');

		const token = sign({ id: user.id }, APP_SECRET);
		return { user, token };
	}

	@Mutation((returns) => AuthenticationPayloadType)
	async signup(
		@Arg('data') data: UserInput,
		@Ctx() { prisma }: Context
	): Promise<AuthenticationPayloadType> {
		const password = await hash(data.password, 10);
		const userCreated = await prisma.user.create({
			data: {
				nickname: data.nickname,
				password,
				email: data.email,
				name: data.name,
				lastname: data.lastname,
				birthDate: data.birthDate,
				photo: data.photo,
				genre: data.genre,
				state: data.state,
				semester: { connect: { name: data.semesterId } },
				school: { connect: { id: data.schoolId } },
			},
		});
		const token = sign({ id: userCreated.id }, APP_SECRET);
		return { token, user: userCreated };
	}

	@Mutation((returns) => UserType)
	async modifyUser(
		@Arg('id', (type) => Int) id: number,
		@Arg('data') data: UserInput,
		@Ctx() { prisma }: Context
	): Promise<UserType> {
		return await prisma.user.update({
			where: { id },
			data: {
				nickname: data.nickname,
				email: data.email,
				name: data.name,
				lastname: data.lastname,
				birthDate: data.birthDate,
				photo: data.photo,
				genre: data.genre,
				state: data.state,
				semester: { connect: { name: data.semesterId } },
				school: { connect: { id: data.schoolId } },
			},
		});
	}

	@Mutation((returns) => UserType)
	async deleteUser(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma }: Context
	): Promise<UserType> {
		return await prisma.user.delete({ where: { id } });
	}
}
