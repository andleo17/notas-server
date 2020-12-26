import { Field, InputType, Int } from 'type-graphql';
import CourseType from '../types/Course.type';

@InputType()
export default class CourseInput implements Partial<CourseType> {
	@Field({ nullable: true })
	code?: string;

	@Field({ nullable: true })
	name: string;

	@Field(() => Int, { nullable: true })
	credits: number;

	@Field(() => Int, { nullable: true })
	academicPhase: number;

	@Field({ nullable: true })
	state?: boolean;

	@Field(() => Int, { nullable: true })
	schoolId?: number;

	@Field(() => [String], { nullable: true })
	prerequisites?: string[];
}
