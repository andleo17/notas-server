import { Semester } from '../../../prisma/@client';
import { Field, ID, ObjectType } from 'type-graphql';
import EnrollmentType from './Enrollment.type';
import GroupType from './Group.type';
import UserType from './User.type';

@ObjectType('Semester')
export default class SemesterType implements Semester {
	@Field(() => ID)
	name: string;

	@Field({ nullable: true })
	startDate: Date;

	@Field({ nullable: true })
	finishDate: Date;

	@Field()
	state: boolean;

	@Field(() => [UserType])
	users?: UserType[];

	@Field(() => [GroupType])
	groups?: GroupType[];

	@Field(() => [EnrollmentType])
	enrollments?: EnrollmentType[];
}
