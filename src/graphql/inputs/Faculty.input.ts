import { Field, InputType } from 'type-graphql';
import FacultyType from '../types/Faculty.type';

@InputType()
export default class FacultyInput implements Partial<FacultyType> {
	@Field()
	name: string;

	@Field({ nullable: true })
	state?: boolean;
}