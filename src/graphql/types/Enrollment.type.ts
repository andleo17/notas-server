import { Enrollment } from '@prisma/client';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import EnrollmentDetailType from './EnrollmentDetail.type';
import SemesterType from './Semester.type';
import UserType from './User.type';

@ObjectType('Enrollment')
export default class EnrollmentType implements Enrollment {
	@Field((type) => ID)
	id: number;

	@Field((type) => Int, { nullable: true })
	weightedAverage: number;

	@Field()
	state: boolean;

	@Field((type) => Int)
	userId: number;

	@Field((type) => Int)
	semesterId: number;

	@Field((type) => UserType)
	user?: UserType;

	@Field((type) => SemesterType)
	semester?: SemesterType;

	@Field((type) => [EnrollmentDetailType])
	enrollmentDetails?: EnrollmentDetailType[];
}
