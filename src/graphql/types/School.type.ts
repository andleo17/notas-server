import { School } from '../../../prisma/@client';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import CourseType from './Course.type';
import FacultyType from './Faculty.type';
import UserType from './User.type';

@ObjectType('School')
export default class SchoolType implements School {
	@Field(() => ID)
	id: number;

	@Field()
	name: string;

	@Field()
	state: boolean;

	@Field(() => Int)
	facultyId: number;

	@Field(() => FacultyType)
	faculty?: FacultyType;

	@Field(() => [UserType])
	users?: UserType[];

	@Field(() => [CourseType])
	courses?: CourseType[];
}
