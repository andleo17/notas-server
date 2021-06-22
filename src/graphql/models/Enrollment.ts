import { Field, ID, Int, ObjectType } from 'type-graphql';
import { EnrollmentDetail } from './EnrollmentDetail';
import { Semester } from './Semester';
import { User } from './User';

@ObjectType()
export class Enrollment {
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

	@Field(() => User)
	user?: User;

	@Field(() => Semester)
	semester?: Semester;

	@Field(() => [EnrollmentDetail])
	enrollmentDetails?: EnrollmentDetail[];
}
