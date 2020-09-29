import { Semester } from '@prisma/client';
import { Field, ID, ObjectType } from 'type-graphql';
import EnrollmentType from './Enrollment.type';
import GroupType from './Group.type';
import UserType from './User.type';

@ObjectType('Semester')
export default class SemesterType implements Semester {
	@Field((type) => ID)
	id: number;

	@Field()
	name: string;

	@Field()
	startDate: Date;

	@Field()
	finishDate: Date;

	@Field()
	state: boolean;

	@Field((type) => [UserType])
	users?: UserType[];

	@Field((type) => [GroupType])
	groups?: GroupType[];

	@Field((type) => [EnrollmentType])
	enrollments?: EnrollmentType[];
}
