import { Field, InputType, Int } from 'type-graphql';
import EnrollmentType from '../types/Enrollment.type';

@InputType()
export default class EnrollmentInput implements Partial<EnrollmentType> {
	@Field(() => Int, { nullable: true })
	weightedAverage?: number;

	@Field({ nullable: true })
	state?: boolean;

	@Field(() => Int, { nullable: true })
	userId?: number;

	@Field({ nullable: true })
	semesterId?: string;
}
