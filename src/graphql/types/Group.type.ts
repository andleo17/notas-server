import { Group } from '@prisma/client';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import ActivityType from './Activity.type';
import CourseType from './Course.type';
import EnrollmentDetailType from './EnrollmentDetail.type';
import ScheduleType from './Schedule.type';
import SemesterType from './Semester.type';
import TeacherType from './Teacher.type';

@ObjectType('Group')
export default class GroupType implements Group {
	@Field((type) => ID)
	id: number;

	@Field()
	denomination: string;

	@Field((type) => Int)
	courseId: number;

	@Field((type) => Int)
	teacherId: number;

	@Field((type) => Int)
	semesterId: number;

	@Field((type) => CourseType)
	course?: CourseType;

	@Field((type) => TeacherType)
	teacher?: TeacherType;

	@Field((type) => SemesterType)
	semester?: SemesterType;

	@Field((type) => [EnrollmentDetailType])
	enrollmentDetails?: EnrollmentDetailType[];

	@Field((type) => [ActivityType])
	activities?: ActivityType[];

	@Field((type) => [ScheduleType])
	schedules?: ScheduleType[];
}
