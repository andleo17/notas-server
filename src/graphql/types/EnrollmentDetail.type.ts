import { EnrollmentDetail } from '@prisma/client';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import EnrollmentType from './Enrollment.type';
import GradeType from './Grade.type';
import GroupType from './Group.type';

@ObjectType('EnrollmentDetail')
export default class EnrollmentDetailType implements EnrollmentDetail {
	@Field((type) => ID)
	id: number;

	@Field((type) => Float, { nullable: true })
	averageGrade: number;

	@Field()
	state: boolean;

	@Field((type) => Int)
	enrollmentId: number;

	@Field((type) => Int)
	groupId: number;

	@Field((type) => EnrollmentType)
	enrollment?: EnrollmentType;

	@Field((type) => GroupType)
	group?: GroupType;

	@Field((type) => [GradeType])
	grades?: GradeType[];
}
