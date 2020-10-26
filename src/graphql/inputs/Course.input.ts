import { Field, InputType, Int } from 'type-graphql';
import CourseType from '../types/Course.type';

@InputType()
export default class CourseInput implements Partial<CourseType> {
	@Field({ nullable: true })
	code?: string;

	@Field()
	name: string;

	@Field((type) => Int)
	credits: number;

	@Field((type) => Int)
	academicPhase: number;

	@Field()
	state?: boolean;

	@Field((type) => Int)
	schoolId?: number;

	@Field({ nullable: true })
	prerequisites?: string[];
}
