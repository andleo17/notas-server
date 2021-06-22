import { Field, ID, ObjectType } from 'type-graphql';
import { Enrollment } from './Enrollment';
import { Group } from './Group';
import { User } from './User';

@ObjectType()
export class Semester {
	@Field(() => ID)
	name: string;

	@Field({ nullable: true })
	startDate: Date;

	@Field({ nullable: true })
	finishDate: Date;

	@Field()
	current: boolean;

	@Field(() => [User])
	users?: User[];

	@Field(() => [Group])
	groups?: Group[];

	@Field(() => [Enrollment])
	enrollments?: Enrollment[];
}
