import { School } from '@prisma/client';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import CourseType from './Course.type';
import FacultyType from './Faculty.type';
import UserType from './User.type';

@ObjectType('School')
export default class SchoolType implements School {
	@Field((type) => ID)
	id: number;

	@Field()
	name: string;

	@Field()
	state: boolean;

	@Field((type) => Int)
	facultyId: number;

	@Field((type) => FacultyType)
	faculty?: FacultyType;

	@Field((type) => [UserType])
	users?: UserType[];

	@Field((tpye) => [CourseType])
	courses?: CourseType[];
}
