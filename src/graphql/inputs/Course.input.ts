import { Field, InputType, Int } from 'type-graphql';
import CourseType from '../types/Course.type';

@InputType()
export default class CourseInput implements Partial<CourseType> {
	@Field()
	name: string;

	@Field()
	code: string;

	@Field((type) => Int)
	credits: number;

	@Field((type) => Int)
	academicPhase: number;

	@Field()
	state?: boolean;

	@Field((type) => Int)
	schoolId?: number;
}
