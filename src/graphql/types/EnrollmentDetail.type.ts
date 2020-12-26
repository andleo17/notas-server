import { EnrollmentDetail } from '../../../prisma/@client';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import EnrollmentType from './Enrollment.type';
import GradeType from './Grade.type';
import GroupType from './Group.type';

@ObjectType('EnrollmentDetail')
export default class EnrollmentDetailType implements EnrollmentDetail {
	@Field(() => ID)
	id: number;

	@Field(() => Float, { nullable: true })
	averageGrade: number;

	@Field()
	state: boolean;

	@Field(() => Int)
	enrollmentId: number;

	@Field(() => Int)
	groupId: number;

	@Field(() => EnrollmentType)
	enrollment?: EnrollmentType;

	@Field(() => GroupType)
	group?: GroupType;

	@Field(() => [GradeType])
	grades?: GradeType[];
}
