import { Field, InputType, Int } from 'type-graphql';
import EnrollmentDetailType from '../types/EnrollmentDetail.type';

@InputType()
export default class EnrollmentDetailInput
	implements Partial<EnrollmentDetailType> {
	@Field((type) => Int, { nullable: true })
	averageGrade?: number;

	@Field({ nullable: true })
	state?: boolean;

	@Field((type) => Int, { nullable: true })
	enrollmentId?: number;

	@Field((type) => Int, { nullable: true })
	groupId?: number;
}
