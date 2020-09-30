import { Field, InputType } from 'type-graphql';
import TeacherType from '../types/Teacher.type';

@InputType()
export default class TeacherInput implements Partial<TeacherType> {
	@Field()
	name: string;

	@Field()
	lastname: string;

	@Field({ nullable: true })
	state?: boolean;
}
