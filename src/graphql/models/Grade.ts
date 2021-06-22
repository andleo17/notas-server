import { Field, Float, InputType, Int, ObjectType } from 'type-graphql';
import { Activity } from './Activity';
import { EnrollmentDetail } from './EnrollmentDetail';

@ObjectType()
export class Grade {
	@Field(() => Int)
	activityId: number;

	@Field(() => Int)
	enrollmentDetailId: number;

	@Field(() => Float, { nullable: true })
	calification: number;

	@Field()
	confirmated: boolean;

	@Field()
	state: boolean;

	@Field(() => Activity)
	activity?: Activity;

	@Field(() => EnrollmentDetail)
	enrollmentDetail?: EnrollmentDetail;
}

@InputType()
export class GradeInput implements Partial<Grade> {
	@Field(() => Float, { nullable: true })
	calification?: number;

	@Field({ nullable: true })
	confirmated?: boolean;

	@Field({ nullable: true })
	state?: boolean;
}
