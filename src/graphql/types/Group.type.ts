import { Group } from '../../../prisma/@client';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import ActivityType from './Activity.type';
import CourseType from './Course.type';
import EnrollmentDetailType from './EnrollmentDetail.type';
import ScheduleType from './Schedule.type';
import SemesterType from './Semester.type';
import TeacherType from './Teacher.type';

@ObjectType('Group')
export default class GroupType implements Group {
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

	@Field(() => CourseType)
	course?: CourseType;

	@Field(() => TeacherType)
	teacher?: TeacherType;

	@Field(() => SemesterType)
	semester?: SemesterType;

	@Field(() => [EnrollmentDetailType])
	enrollmentDetails?: EnrollmentDetailType[];

	@Field(() => [ActivityType])
	activities?: ActivityType[];

	@Field(() => [ScheduleType])
	schedules?: ScheduleType[];
}
