import { Field, Int, ObjectType } from 'type-graphql';
import { Course } from './Course';
import { Curriculum } from './Curriculum';
import { School } from './School';

@ObjectType()
export class SchoolCurriculum {
	@Field(() => Int)
	schoolId: number;

	@Field(() => Int)
	curriculumId: number;

	@Field(() => School)
	school?: School;

	@Field(() => Curriculum)
	curriculum?: Curriculum;

	@Field(() => [Course])
	courses?: Course[];
}
