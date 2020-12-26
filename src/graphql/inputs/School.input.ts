import { Field, InputType, Int } from 'type-graphql';
import SchoolType from '../types/School.type';

@InputType()
export default class SchoolInput implements Partial<SchoolType> {
	@Field({ nullable: true })
	name: string;

	@Field({ nullable: true })
	state?: boolean;

	@Field(() => Int, { nullable: true })
	facultyId?: number;
}
