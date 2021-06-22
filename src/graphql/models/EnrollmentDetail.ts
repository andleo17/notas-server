import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { Enrollment } from './Enrollment';
import { Grade } from './Grade';
import { Group } from './Group';

@ObjectType()
export class EnrollmentDetail {
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

	@Field(() => Enrollment)
	enrollment?: Enrollment;

	@Field(() => Group)
	group?: Group;

	@Field(() => [Grade])
	grades?: Grade[];
}
