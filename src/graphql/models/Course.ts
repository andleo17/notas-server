import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Group } from './Group';
import { SchoolCurriculum } from './SchoolCurriculum';

@ObjectType()
export class Course {
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

	@Field(() => Int)
	curriculumId: number;

	@Field(() => SchoolCurriculum)
	schoolCurriculum?: SchoolCurriculum;

	@Field(() => [Group])
	groups?: Group[];

	@Field(() => [Course])
	coursePrerequisites?: Course[];

	@Field(() => [Course])
	prerequisitesOf?: Course[];
}
