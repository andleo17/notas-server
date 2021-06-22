import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { Enrollment } from './Enrollment';
import { School } from './School';
import { Semester } from './Semester';

@ObjectType()
export class User {
	@Field(() => ID)
	id: number;

	@Field()
	nickname: string;

	@Field()
	password: string;

	@Field()
	name: string;

	@Field()
	lastname: string;

	@Field()
	birthDate: Date;

	@Field()
	state: boolean;

	@Field()
	semesterId: string;

	@Field(() => Int)
	schoolId: number;

	@Field(() => Semester)
	semesterIn?: Semester;

	@Field(() => School)
	school?: School;

	@Field(() => [Enrollment])
	enrollments?: Enrollment[];
}

@InputType()
export class UserAuthInput {
	@Field()
	nickname: string;

	@Field()
	password: string;
}
