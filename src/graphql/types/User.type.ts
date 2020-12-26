import { User } from '../../../prisma/@client';
import { IsEmail } from 'class-validator';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import EnrollmentType from './Enrollment.type';
import SchoolType from './School.type';
import SemesterType from './Semester.type';

@ObjectType('User')
export default class UserType implements User {
	@Field(() => ID)
	id: number;

	@Field()
	nickname: string;

	@Field()
	password: string;

	@IsEmail()
	@Field()
	email: string;

	@Field()
	name: string;

	@Field()
	lastname: string;

	@Field()
	birthDate: Date;

	@Field()
	photo: string;

	@Field()
	genre: boolean;

	@Field()
	state: boolean;

	@Field()
	semesterId: string;

	@Field(() => Int)
	schoolId: number;

	@Field(() => SemesterType)
	semester?: SemesterType;

	@Field(() => SchoolType)
	school?: SchoolType;

	@Field(() => [EnrollmentType])
	enrollments?: EnrollmentType[];
}
