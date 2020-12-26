import { Field, Float, InputType, Int } from 'type-graphql';
import GradeType from '../types/Grade.type';

@InputType()
export default class GradeInput implements Partial<GradeType> {
	@Field(() => Float, { nullable: true })
	calification?: number;

	@Field({ nullable: true })
	confirmated?: boolean;

	@Field({ nullable: true })
	state?: boolean;

	@Field(() => Int, { nullable: true })
	activityId?: number;

	@Field(() => Int, { nullable: true })
	enrollmentDetailId?: number;
}
