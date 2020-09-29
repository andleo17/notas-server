import { Field, InputType } from 'type-graphql';
import SemesterType from '../types/Semester.type';

@InputType()
export default class SemesterInput implements Partial<SemesterType> {
	@Field()
	name: string;

	@Field()
	startDate?: Date;

	@Field()
	finishDate?: Date;

	@Field()
	state?: boolean;
}
