import { Course } from '@prisma/client';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import GroupType from './Group.type';
import SchoolType from './School.type';

@ObjectType('Course')
export default class CourseType implements Course {
	@Field((type) => ID)
	id: number;

	@Field()
	name: string;

	@Field()
	code: string;

	@Field((type) => Int)
	credits: number;

	@Field((type) => Int)
	academicPhase: number;

	@Field()
	state: boolean;

	@Field((type) => Int)
	schoolId: number;

	@Field((type) => SchoolType)
	school?: SchoolType;

	@Field((type) => [GroupType])
	groups?: GroupType[];
}
