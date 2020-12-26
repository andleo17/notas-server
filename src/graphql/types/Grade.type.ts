import { Grade } from '../../../prisma/@client';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import ActivityType from './Activity.type';
import EnrollmentDetailType from './EnrollmentDetail.type';

@ObjectType('Grade')
export default class GradeType implements Grade {
	@Field(() => ID)
	id: number;

	@Field(() => Float, { nullable: true })
	calification: number;

	@Field()
	confirmated: boolean;

	@Field()
	state: boolean;

	@Field(() => Int)
	activityId: number;

	@Field(() => Int)
	enrollmentDetailId: number;

	@Field(() => ActivityType)
	activity?: ActivityType;

	@Field(() => EnrollmentDetailType)
	enrollmentDetail?: EnrollmentDetailType;
}
