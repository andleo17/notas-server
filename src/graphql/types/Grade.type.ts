import { Grade } from '@prisma/client';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import ActivityType from './Activity.type';
import EnrollmentDetailType from './EnrollmentDetail.type';

@ObjectType('Grade')
export default class GradeType implements Grade {
	@Field((type) => ID)
	id: number;

	@Field((type) => Float, { nullable: true })
	calification: number;

	@Field()
	confirmated: boolean;

	@Field()
	state: boolean;

	@Field((type) => Int)
	activityId: number;

	@Field((type) => Int)
	enrollmentDetailId: number;

	@Field((type) => ActivityType)
	activity?: ActivityType;

	@Field((type) => EnrollmentDetailType)
	enrollmentDetail?: EnrollmentDetailType;
}
