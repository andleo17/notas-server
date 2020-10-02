import { Field, InputType, Int } from 'type-graphql';
import UserType from '../types/User.type';
import SemesterType from '../types/Semester.type';
import SchoolType from '../types/School.type';
import EnrollmentType from '../types/Enrollment.type';

@InputType()
export default class UserInput implements Partial<UserType> {

	@Field({ nullable: true })
	state?: boolean;

	@Field((type) => Int, { nullable: true })
    facultyId?: number;
    
    @Field()
	nickname: string;

	@Field()
	password: string;

	@Field()
	email: string;

	@Field()
	name: string;

	@Field()
	lastname: string;

	@Field()
	birthDate: Date;

	@Field()
	photo: string;

	@Field()
	genre: boolean;

	@Field((type) => Int)
	semesterId: number;

	@Field((type) => Int)
	schoolId: number;

	@Field((type) => SemesterType)
	semester?: SemesterType;

	@Field((type) => SchoolType)
	school?: SchoolType;

	@Field((type) => [EnrollmentType])
    enrollments?: EnrollmentType[];
    
}