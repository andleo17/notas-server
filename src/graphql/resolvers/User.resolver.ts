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
import { Context, UserAuth, UserRole } from '../../context';
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
import { BANNED, NO_ADMIN } from '../../utils/errors';

@Resolver((of) => UserType)
export default class UserResolver {
	@FieldResolver((returns) => SemesterType)
	async semester(
		@Root() { id }: UserType,
		@Ctx() { prisma }: Context
	): Promise<SemesterType> {
		return await prisma.user.findUnique({ where: { id } }).semester();
	}

	@FieldResolver((returns) => SchoolType)
	async school(
		@Root() { id }: UserType,
		@Ctx() { prisma }: Context
	): Promise<SchoolType> {
		return await prisma.user.findUnique({ where: { id } }).school();
	}

	@FieldResolver((returns) => [EnrollmentType])
	async enrollments(
		@Root() { id }: UserType,
		@Ctx() { prisma }: Context
	): Promise<EnrollmentType[]> {
		return await prisma.user.findUnique({ where: { id } }).enrollments();
	}

	@Query((returns) => UserType)
	async user(
		@Arg('id', (type) => Int, { nullable: true }) id: number,
		@Ctx() { prisma, user }: Context
	): Promise<UserType> {
		if (user.role === UserRole.USER) id = user.id;
		return await prisma.user.findUnique({ where: { id } });
	}

	@Query((returns) => [UserType])
	async users(@Ctx() { prisma, user }: Context): Promise<UserType[]> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.user.findMany();
	}

	@Query((returns) => AuthenticationPayloadType)
	async login(
		@Arg('nickname') nickname: string,
		@Arg('password') password: string,
		@Ctx() { prisma, user }: Context
	): Promise<AuthenticationPayloadType> {
		const userLogged = await prisma.user.findFirst({
			where: { OR: [{ nickname }, { email: nickname }] },
		});
		if (!userLogged)
			throw new AuthenticationError('No se ha encontrado el usuario');

		const valid = await compare(password, userLogged.password);
		if (!valid) throw new AuthenticationError('Contraseña incorrecta');
		if (!userLogged.state) throw new AuthenticationError(BANNED);

		const token = sign(
			<UserAuth>{ id: userLogged.id, role: user.role },
			APP_SECRET
		);
		return { user: userLogged, token };
	}

	@Mutation((returns) => AuthenticationPayloadType)
	async signup(
		@Arg('data') data: UserInput,
		@Ctx() { prisma, user }: Context
	): Promise<AuthenticationPayloadType> {
		const userCreated = await prisma.user.create({
			data: {
				nickname: data.nickname,
				password: await hash(data.password, 10),
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
		const token = sign(
			<UserAuth>{ id: userCreated.id, role: user.role },
			APP_SECRET
		);
		return { token, user: userCreated };
	}

	@Mutation((returns) => UserType)
	async modifyUser(
		@Arg('id', (type) => Int, { nullable: true }) id: number,
		@Arg('data') data: UserInput,
		@Ctx() { prisma, user }: Context
	): Promise<UserType> {
		if (user.role === UserRole.USER) id = user.id;
		return await prisma.user.update({
			where: { id },
			data: {
				nickname: data.nickname,
				password: data.password && (await hash(data.password, 10)),
				email: data.email,
				name: data.name,
				lastname: data.lastname,
				birthDate: data.birthDate,
				photo: data.photo,
				genre: data.genre,
				state: data.state,
				semester: data.semesterId && {
					connect: { name: data.semesterId },
				},
				school: data.schoolId && { connect: { id: data.schoolId } },
			},
		});
	}

	@Mutation((returns) => UserType)
	async deleteUser(
		@Arg('id', (type) => Int) id: number,
		@Ctx() { prisma, user }: Context
	): Promise<UserType> {
		if (user.role !== UserRole.ADMIN)
			throw new AuthenticationError(NO_ADMIN);
		return await prisma.user.delete({ where: { id } });
	}
}
