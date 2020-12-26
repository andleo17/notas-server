import { Enrollment } from '../../../prisma/@client';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import EnrollmentDetailType from './EnrollmentDetail.type';
import SemesterType from './Semester.type';
import UserType from './User.type';

@ObjectType('Enrollment')
export default class EnrollmentType implements Enrollment {
	@Field(() => ID)
	id: number;

	@Field(() => Int, { nullable: true })
	weightedAverage: number;

	@Field()
	state: boolean;

	@Field(() => Int)
	userId: number;

	@Field()
	semesterId: string;

	@Field(() => UserType)
	user?: UserType;

	@Field(() => SemesterType)
	semester?: SemesterType;

	@Field(() => [EnrollmentDetailType])
	enrollmentDetails?: EnrollmentDetailType[];
}
