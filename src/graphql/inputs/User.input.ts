import { Field, InputType, Int } from 'type-graphql';
import UserType from '../types/User.type';
import SemesterType from '../types/Semester.type';
import SchoolType from '../types/School.type';
import EnrollmentType from '../types/Enrollment.type';

@InputType()
export default class UserInput implements Partial<UserType> {
	@Field()
	nickname: string;

	@Field()
	password: string;

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

	@Field({ nullable: true })
	state?: boolean;

	@Field((type) => Int, { nullable: true })
	semesterId?: number;

	@Field((type) => Int, { nullable: true })
	schoolId?: number;
}
