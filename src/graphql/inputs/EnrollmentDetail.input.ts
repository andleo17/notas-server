import { Field, InputType, Int } from 'type-graphql';
import EnrollmentDetailType from '../types/EnrollmentDetail.type';

@InputType()
export default class EnrollmentDetailInput
	implements Partial<EnrollmentDetailType> {
	@Field(() => Int, { nullable: true })
	averageGrade?: number;

	@Field({ nullable: true })
	state?: boolean;

	@Field(() => Int, { nullable: true })
	enrollmentId?: number;

	@Field(() => Int, { nullable: true })
	groupId?: number;
}
