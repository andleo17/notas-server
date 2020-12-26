import { Course } from '../../../prisma/@client';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import GroupType from './Group.type';
import SchoolType from './School.type';

@ObjectType('Course')
export default class CourseType implements Course {
	@Field(() => ID)
	code: string;

	@Field()
	name: string;

	@Field(() => Int)
	credits: number;

	@Field(() => Int)
	academicPhase: number;

	@Field()
	state: boolean;

	@Field(() => Int)
	schoolId: number;

	@Field(() => SchoolType)
	school?: SchoolType;

	@Field(() => [GroupType])
	groups?: GroupType[];

	@Field(() => [CourseType])
	coursePrerequisites?: CourseType[];

	@Field(() => [CourseType])
	prerequisitesOf?: CourseType[];
}
