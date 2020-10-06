import { Field, Float, InputType, Int } from 'type-graphql';
import GradeType from '../types/Grade.type';

@InputType()
export default class GradeInput implements Partial<GradeType> {
	@Field((type) => Float, { nullable: true })
	calification?: number;

	@Field({ nullable: true })
	confirmated?: boolean;

	@Field({ nullable: true })
	state?: boolean;

	@Field((type) => Int, { nullable: true })
	activityId?: number;

	@Field((type) => Int, { nullable: true })
	enrollmentDetailId?: number;
}
