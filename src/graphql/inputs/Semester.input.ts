import { Field, InputType } from 'type-graphql';
import SemesterType from '../types/Semester.type';

@InputType()
export default class SemesterInput implements Partial<SemesterType> {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	startDate?: Date;

	@Field({ nullable: true })
	finishDate?: Date;

	@Field({ nullable: true })
	state?: boolean;
}
