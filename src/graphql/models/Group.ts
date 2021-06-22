import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Activity } from './Activity';
import { Course } from './Course';
import { EnrollmentDetail } from './EnrollmentDetail';
import { Schedule } from './Schedule';
import { Semester } from './Semester';
import { Teacher } from './Teacher';

@ObjectType()
export class Group {
	@Field(() => ID)
	id: number;

	@Field()
	denomination: string;

	@Field()
	state: boolean;

	@Field()
	courseCode: string;

	@Field(() => Int)
	teacherId: number;

	@Field()
	semesterId: string;

	@Field(() => Course)
	course?: Course;

	@Field(() => Teacher)
	teacher?: Teacher;

	@Field(() => Semester)
	semester?: Semester;

	@Field(() => [EnrollmentDetail])
	enrollmentDetails?: EnrollmentDetail[];

	@Field(() => [Activity])
	activities?: Activity[];

	@Field(() => [Schedule])
	schedules?: Schedule[];
}
